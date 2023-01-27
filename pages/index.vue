<template>

  <CFlex w="100vw" h="100vh" flex-dir="column" justify-content="center" v-bind="mainStyles[colorMode]"
    direction="column" align="center">
    <CBox>
      <header align="center">
        <CHeading size="lg">Menu Selector/Creator</CHeading>
      </header>
      <CBox>
        <CSimpleGrid :columns="2" border-radius="1.5rem" margin="0.75rem" :bg="theme.secondary" w="70rem" h="46rem"
          spacing=".75rem" padding="2.5rem" boxShadow="lg">
          <CFlex flex-wrap="wrap">
            <CList spacing="1.5rem">
              <CInputGroup>
                <CInputLeftElement>
                  <date-picker v-model="selected.datum" mode="date" :masks="masks" z-index="999">
                    <template v-slot="{ inputValue, inputEvents }">
                      <fa :icon="['fas', 'calendar']" :value="inputValue" v-on="inputEvents"/>
                    </template>
                  </date-picker>
                    
                  
                  
                </CInputLeftElement>

                
                <CInput placeholder="Datum" size="md" v-model="selected.datum" />
              </CInputGroup>
              <!--<CInput placeholder="Select Week" size="md" type="text" v-model="selected.datum"/>-->
              <CInput placeholder="Gericht" size="md" v-model="selected.mcSchnitzel" />
              <CInput placeholder="Beilage (optional)" size="md" v-model="selected.klansSchnitzel" />
              <CInputGroup>
                <CInputLeftElement>
                  <fa :icon="['fas', 'euro']" />
                </CInputLeftElement>
                <CInput placeholder="Preis" size="md" v-model="selected.preisVomMcSchnitzel" />
              </CInputGroup>
              <CInput placeholder="Allergene" size="md" v-model="selected.instantAids" />
              <CStack spacing="4" align-items="start" is-inline flex-wrap="wrap">
                <CTag v-for="allergen in hiv.split(',')" size="lg" :key="allergen" borderRadius='full' variant='solid'
                  :variantColor="isPositive(allergen) ? theme.selected : theme.unselected" margin=".25rem">
                  <CButton @click="(e) => { e.preventDefault(); detectAids(allergen) }" w="0" h="0">{{ allergen }}</CButton>
                </CTag>
              </CStack>
              <CDivider />
              <CStack spacing="4" align="center" is-inline wrap>
                <CButton @click="getSchnitzel" color="whiteAlpha.900" :bg="theme.primary" :_hover="{ bg: theme.glow }"
                  :_active="{ bg: theme.highlight }">GET</CButton>
                <CButton @click="postSchnitzel" :disabled="isLoading" color="whiteAlpha.900" :bg="theme.primary"
                  :_hover="{ bg: theme.glow }" :_active="{ bg: theme.highlight }">POST</CButton>
                <CSpinner v-if="isLoading" :color="theme.color" />

                <CIconButton @click="previous" :disabled="currIdx === 0" margin-left="auto" aria-label="Go Previous"
                  icon="chevron-left" color="whiteAlpha.900" :bg="theme.primary" :_hover="{ bg: theme.glow }"
                  :_active="{ bg: theme.highlight }">Servas</CIconButton>
                <CIconButton @click="next" :disabled="menuList.length === 0 || currIdx === menuList.length - 1"
                  aria-label="Go Next" icon="chevron-right" color="whiteAlpha.900" :bg="theme.primary"
                  :_hover="{ bg: theme.glow }" :_active="{ bg: theme.highlight }" />

              </CStack>
            </CList>
            <CIconButton @click="toggleColorMode" align-self="flex-end" aria-label="Change Theme" color="whiteAlpha.900"
              :icon="colorMode === 'light' ? 'sun' : 'moon'"
              :bg="colorMode === 'light' ? theme.unselected + '.500' : theme.unselected + '.300'" :_hover="theme.unselected"
              :_active="theme.unselected" />

          </CFlex>
          <CFlex spacing="4">
            <CImage v-if="currentPDF == ''"
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs' borderRadius='lg' max-width="100%" max-height="50%" />
            <iframe :src="currentPDF" id="pdfFrame" width="100%" height="100%" frameborder="0" />

          </CFlex>
        </CSimpleGrid>
      </CBox>
    </CBox>
  </CFlex>

</template>
<script>

export default {
  inject: ["$chakraColorMode", "$toggleColorMode"],
  computed: {
    colorMode() {
      return this.$chakraColorMode();
    },
    toggleColorMode() {
      return this.$toggleColorMode;
    },
    theme() {
      return this.mainStyles[this.colorMode];
    }
  },
  data() {
    return {
      mainStyles: {
        dark: {
          bg: "blackAlpha.900",
          color: "whiteAlpha.900",
          primary: "cyan.600",
          secondary: "gray.700",
          glow: "cyan.500",
          highlight: "cyan.600",
          selected: "cyan",
          unselected: "whiteAlpha"
        },
        light: {
          bg: "#BCB382",
          color: "blackAlpha.700",
          primary: "orange.400",
          secondary: "#E5C687",
          glow: "orange.300",
          highlight: "orange.500",
          selected: "orange",
          unselected: "blackAlpha"
        }
      },
      sizes: ["sm", "md", "lg"],
      menuList: [],
      currIdx: 0,
      selected: {
        "menuNr": "",
        "mcSchnitzel": "",
        "preisVomMcSchnitzel": "",
        "klansSchnitzel": "",
        "instantAids": '',
        "datum": (() => { let today = new Date(); return today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate(); })()
      },
      currentPDF: "",
      hiv: "A,B,C,D,E,F,G,H,I,J,K,L",
      isLoading: false,
      dateRange: [
        new Date(),
        new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
      ],
      masks: {
        input: 'YYYY-MM-DD',
      },
    };
  },
  methods: {
    async getSchnitzel() {
      fetch('http://localhost:8081/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          this.menuList = data.menuList;
          this.selected = this.menuList[this.currIdx];
        });
      //  this.menuList = res.data.menuList;

    },
    async postSchnitzel() {
      this.isLoading = true;

      let data = { menuList: this.menuList };
      //data.instantAids=data.instantAids.join(',');

      fetch('http://localhost:8081', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.blob())
        .then(blob => {
          this.currentPDF = URL.createObjectURL(blob) + '#view=fit';
          this.isLoading = false;
        });
      /*
              axios.post('http://localhost:8081', JSON.stringify({menuList:this.json}), {'Content-Type': 'application/json', 'responseType':'blob'})
                .then(response=>{
                    this.currentPDF=URL.createObjectURL(response.data);
                    let iframe=document.getElementById("pdfFrame");
                    //iframe.parentNode.style.height="100%";
                    //iframe.parentNode.style.width="100%";
                    //iframe.style.height="100%";
                    //iframe.style.width="100%";
                    this.isLoading=false;
    
              });*/
    },
    isPositive(hiv) {
      return this.selected.instantAids.includes(hiv);
    },
    detectAids(allergen) {
      this.isPositive(allergen) ? this.healAids(allergen) : this.getAids(allergen);
    },
    healAids(allergen) {
      let arr = [];
      if (typeof this.selected.instantAids === 'string') {
        arr = this.selected.instantAids.split(',');
      } else {
        arr = this.selected.instantAids;
      }

      this.selected.instantAids = arr.filter(el => el !== allergen).join(',');

    },
    getAids(allergen) {
      let arr = this.selected.instantAids.split(',');
      arr.push(allergen);
      arr.sort();
      this.selected.instantAids = arr.join(',');
    },
    next() {
      console.log(this.currIdx);
      console.log(this.menuList.length - 1);
      console.log(this.menuList.length);
      if (this.currIdx < this.menuList.length - 1) {
        this.currIdx++;
        this.selected = this.menuList[this.currIdx];
      }
    },
    previous() {
      if (this.currIdx > 0) {
        this.currIdx--;
        this.selected = this.menuList[this.currIdx];
      }
    },
    pickDate() {

    }
  },
}
</script>
<style>
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
}

.full-screen-div {
  width: 100vw;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>