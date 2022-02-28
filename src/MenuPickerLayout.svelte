<script lang="ts">
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import SideDishPicker from "./SideDishPicker.svelte";
  import { afterUpdate } from "svelte";


  export let currentMenu: string;
  
  let t = 1;
  let currentIndex=1;
  let testVariable = [];

  
  console.log(testVariable);
  console.log(testVariable[0]);
  let menuList = [];
  afterUpdate(()=>{
    currentIndex = 0; //currentMenu.charAt(5) as unknown as number;
    console.log(currentMenu + " " + currentIndex);
  })
</script>

<div>
  <Button on:click={() => {t++; menuList.push(); console.log(t); console.log(menuList)}}>
    <Label>Beilage hinzufügen</Label>
  </Button>
  <Button on:click={() => {if (t!==0){ //sehr wichtiger code, sonst  wird der Array Index -1 und es kommt zu Problemen
    t--
    menuList.pop();
  }
  console.log(t);
  }}>
    <Label>Beilage entfernen</Label>
  </Button>
  <LayoutGrid>
    <!-- <Tester bind:testVariable={testVariable[0]}/> 
    <Tester bind:testVariable={testVariable[1]}/>  -->
      <Cell>
        <div class="menuPicker">
          <SideDishPicker keyVal={"Hauptgerichte"} bind:value={testVariable[0]}/>
        </div>
      </Cell>
      {#each Array(t) as _unused, i}
      <Cell>
        <div class="menuPicker">
          <SideDishPicker keyVal={"Beilage"} bind:value={testVariable[i+1]}/>
        </div>
      </Cell>
      {/each}
  </LayoutGrid>

  <Button on:click={() => {console.log(JSON.parse(`{"${currentMenu}": ${JSON.stringify(testVariable)}}`))}}>
    <Label>Menü speichern</Label>
  </Button>

  {#each Array(t+1) as _unused, i}
  <pre class="status">testVariable: {testVariable[i] ? JSON.stringify(testVariable[i])  : ''}</pre>
  {/each}
</div>

<style>
  .menuPicker {
    height: 60px;
    display: contents;
    justify-content: safe;
    align-items: baseline;
    background-color: var(--mdc-theme-secondary, #333);
    color: var(--mdc-theme-on-secondary, #fff);
  }
</style>
