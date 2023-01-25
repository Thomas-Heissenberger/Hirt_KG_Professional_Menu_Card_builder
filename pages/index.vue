<template>
  <CBox d="flex" w="100vw" h="100vh" flex-dir="column" justify-content="center" v-bind="mainStyles[colorMode]">
    <CFlex justify="center" direction="column" align="center">
      <CBox>
        <header align="center">
          <CHeading size="lg">Menu Selector/Creator</CHeading>
        </header>
        <CBox >
          <CSimpleGrid :columns="2" border-radius="1.5rem" margin="0.75rem"  :bg="theme.secondary" w="70rem" h="45rem"
            spacing=".75rem" padding="2.5rem" boxShadow="lg" >
            <CList spacing="1.5rem" padding="0rem">
              <CInput placeholder="Select Week" size="md" type="date" v-model="selected.datum"/>
              <CInput placeholder="Gericht" size="md" v-model="selected.mcSchnitzel"/>
              <CInput placeholder="Beilage (optional)" size="md" v-model="selected.klansSchnitzel"/>
              <CInput placeholder="Preis (in €)" size="md" v-model="selected.preisVomMcSchnitzel"/>
              <CInput placeholder="Allergene" size="md" v-model="selected.instantAids"/>
              <CStack :spacing="4" align-items="start" is-inline flex-wrap="wrap">
                <CTag v-for="allergen in hiv.split(',')" size="lg" :key="allergen" borderRadius='full' variant='solid'
                  :variantColor="isPositive(allergen)? theme.selected:theme.unselected" margin=".25rem">
                  <CTagLabel>{{ allergen }}</CTagLabel>
                  <CTagCloseButton />
                </CTag>
              </CStack>
              <CButton @click="()=>{getData();toggleColorMode()}" :bg="theme.primary" :_hover="{bg:theme.glow}" :_active="{bg:theme.highlight}">Click me</CButton>
            </CList>
            <CImage
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs' borderRadius='lg' />
            <CText> {{ json }}</CText>
          </CSimpleGrid>
        </CBox>
      </CBox>
    </CFlex>
  </CBox>
</template>
<script>
import axios from 'axios';

export default {
  inject: ['$chakraColorMode', '$toggleColorMode'],
  computed: {
      colorMode () {
        return this.$chakraColorMode()
      },
      /*theme () {
        return  this.$chakraTheme()
      },*/
      toggleColorMode () {
        return this.$toggleColorMode
      },  
      theme(){
        return this.mainStyles[this.colorMode];
      }   
    },
  data() {
    return {
      mainStyles: {
          dark: {
            bg: 'blackAlpha.900',
            color: 'whiteAlpha.900',
            primary: "green.600",
            secondary: "gray.700",
            glow: "green.500",
            highlight: "green.600",
            selected: "green",
            unselected: "whiteAlpha"
          },
          light: {
           
            bg: '#BCB382',
            color: 'blackAlpha.700',
            primary: "#e6ac00",
            secondary: "#E5C687",
            glow: "yellow.300",
            highlight: "yellow.500",
            selected: "yellow",
            unselected: "blackAlpha"
          }
        },
      sizes: ['sm', 'md', 'lg'],
      json: "",
      selected: {
            "menuNr":"",
            "mcSchnitzel":"",
            "preisVomMcSchnitzel":"",
            "klansSchnitzel":"",
            "instantAids":"",
            "datum": (()=>{let today=new Date(); return today.getFullYear()+"-"+today.getMonth()+1+"-"+today.getDate()})()
        },
      hiv:"A,B,C,D,E,F,G,H,I,J,K,L"
    }
  },
  methods: {

    async getData() {
      this.json=await (await axios.get("http://localhost:8081/data"));
      this.json=this.json.data.menuList;
      this.selected=this.json[0];
    }, 

    isPositive(hiv){
      return this.selected.instantAids.split(',').includes(hiv);
    },
  }
}
</script>
<style>

</style>