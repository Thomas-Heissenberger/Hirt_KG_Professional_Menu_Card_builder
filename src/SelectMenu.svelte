<script lang="ts">
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    import MenuPickerLayout from './MenuPickerLayout.svelte'
    import MenuPicker from './MenuPicker.svelte';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
import MenuTabs from './MenuTabs.svelte';

    const TRUE : boolean = true;
  </script>

<div class="accordion-container">
    <Accordion> 
      <Panel>
        <Header>Wochenmenüs
          <span slot="description">Description of panel 1.</span>
      </Header>
      <Content>
          <MenuTabs menus={3} startcount= {3}/>
      </Content>
    </Panel>
    <Panel>
      <Header>Montag
        <span slot="description">Description of panel 1.</span>
    </Header>
    <Content>

    </Content>
  </Panel>
  <Panel>
        <Header>Dienstag
            <span slot="description">Description of panel 2.</span>
        </Header>
        <Content >
          <!-- <MenuTabs menus={2} startcount= {1} /> -->
        </Content>
      </Panel>
      <Panel>
        <Header>Mittwoch
            <span slot="description">Description of panel 3.</span>
        </Header>
        <Content>
          <!-- <MenuTabs menus={2} startcount= {1} /> -->
        </Content>
      </Panel>
      <Panel>
        <Header>Donnerstag
            <span slot="description">Description of panel 4.</span>
        </Header>
        <Content>
          If you like this component, you can thank <a
            href="https://github.com/SlickNicky10"
            target="_blank">SlickNicky</a
          > who pushed me to make it. He was right, accordions are awesome! :D
        </Content>
      </Panel>
      <Panel>
        <Header>Freitag
            <span slot="description">Description of panel 5.</span>
        </Header>
        <Content>
          If you like this component, you can thank <a
            href="https://github.com/SlickNicky10"
            target="_blank">SlickNicky</a
          > who pushed me to make it. He was right, accordions are awesome! :D
        </Content>
      </Panel>
      <Panel>
        <Header>Samstag
            <span slot="description">Description of panel 6.</span>
        </Header>
        <Content>
          If you like this component, you can thank <a
            href="https://github.com/SlickNicky10"
            target="_blank">SlickNicky</a
          > who pushed me to make it. He was right, accordions are awesome! :D
        </Content>
      </Panel>
    </Accordion>
  </div>