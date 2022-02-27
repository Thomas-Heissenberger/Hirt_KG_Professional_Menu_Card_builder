<script lang="ts">
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import SideDishPicker from "./SideDishPicker.svelte";
import { afterUpdate } from "svelte";

  export let currentMenu: string;

  let t = 1;
  let currentIndex=1;

  afterUpdate(()=>{
    currentIndex = 0; //currentMenu.charAt(5) as unknown as number;
    console.log(currentMenu + " " + currentIndex);
  })
</script>

<div>
  <Button on:click={() => t++}>
    <Label>Beilage hinzufügen</Label>
  </Button>
  <Button on:click={() => t--}>
    <Label>Beilage entfernen</Label>
  </Button>
  <LayoutGrid>
      <Cell>
        <div class="menuPicker">
          <SideDishPicker keyVal={"Hauptspeise"}/>
        </div>
      </Cell>
      <Cell>
        {#each Array(t) as _unused, i}
        <div class="menuPicker">
          <SideDishPicker keyVal={"Hauptspeise"}/>
        </div>
        {/each}
      </Cell>
  </LayoutGrid>
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
