<script lang="ts">
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    import MenuPicker from './MenuPicker.svelte';
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    const TRUE : boolean = true;
  </script>


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
<div>
<LayoutGrid>
    {#each Array(2) as _unused, i}
      <Cell>
        <div class="menuPicker">
            <MenuPicker isInactive={false}/>
        </div>
      </Cell>
    {/each}
    {#each Array(4) as _unused, i}
      <Cell>
        <div class="menuPicker">
            <MenuPicker isInactive={true}/>
        </div>
      </Cell>
    {/each}
  </LayoutGrid>
</div>