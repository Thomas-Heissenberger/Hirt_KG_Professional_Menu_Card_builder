   
  <script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import MenuPickerLayout from './MenuPickerLayout.svelte'
    

    export let menus: number = 1;
    export let startcount: number = 1;
    let active = "Menü " + startcount;
    let menuList = [];
    for (let index = menus; index > 0; index--) {
        menuList.push("Menü " + startcount++);
    }
    
  </script>

<div>

      <TabBar tabs={menuList} let:tab bind:active>
        <!-- Note: the `tab` property is required! -->
        <Tab {tab}>
          <Label>{tab}</Label>
        </Tab>
      </TabBar>
      <MenuPickerLayout currentMenu={active}/>
      <pre class="status">Selected: {active}</pre>
    
  </div>
