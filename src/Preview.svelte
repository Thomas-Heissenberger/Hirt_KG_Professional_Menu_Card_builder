<script lang="ts">
  //A4 format
  const DOCUMENT_WIDTH: number = 595;
  const DOCUMENT_HEIGHT: number = 842;

  let mockData = {
    datumMontag: "",
    menuList: [
      {
        menuNr: 1,
        mcSchnitzel: "Tiroler Gröstl mit Spiegelei und Salat vom Buffet",
        preisVomMcSchnitzel: 7.9,
        instantAids: "A,C,G",
      },
      {
        menuNr: 2,
        mcSchnitzel: "Champignonrahmschnitzel mit Erbsenreis",
        preisVomMcSchnitzel: 8.9,
        instantAids: "A,G",
      },
      {
        menuNr: 3,
        mcSchnitzel: "Gemüse-Käselaibchen mit Schnittlauchrahmsauce",
        preisVomMcSchnitzel: 9.9,
        instantAids: "A,C,G",
      },
      {
        menuNr: 4,
        mcSchnitzel:
          "Schnitzelteller (Sesam-, Kürbiskern-, Wiener Schnitzel) mit Erbsenreis und Salat vom Buffet",
        preisVomMcSchnitzel: 12.9,
        instantAids: "A,C,G,N",
      },
      {
        menuNr: 5,
        mcSchnitzel:
          "Zanderfilet gegrillt mit Mozarella und Tomatenscheiben überbacken mit Basmatireis und Rieslingersauce",
        preisVomMcSchnitzel: 13.9,
        instantAids: "A,C,D,G,O",
      },
    ],
  };

  function getJSONData(){
    fetch("http://localhost:8081")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector("#result").innerHTML=JSON.stringify(data);
      });
  }

  function printToPDF() {

    fetch("http://localhost:8081", {
      method: "POST",
      body: JSON.stringify(mockData),
      headers: {
        "Content-Type":"application/json, charset=UTF-8"
      }
    })
    .then(response=>response.blob())
    .then(blob=>{
      let iFrame = document.createElement("iframe");
      iFrame.src=URL.createObjectURL(blob);
      iFrame.width=String(DOCUMENT_WIDTH);
      iFrame.height=String(DOCUMENT_HEIGHT);
      document.querySelector("#result").appendChild(iFrame);
      console.log(blob);
    });
  }
</script>

<main>
  <button on:click={printToPDF}>To PDF</button>
  <div id="result" />
</main>