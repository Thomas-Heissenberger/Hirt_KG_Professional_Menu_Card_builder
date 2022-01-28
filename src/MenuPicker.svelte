<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import Checkbox from '@smui/checkbox';
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field'
    export let isInactive: boolean | undefined = true;

    let options = [
      {
        name: 'Broom',
        description: 'A wooden handled broom.',
        isActive: false,
      },
      {
        name: 'Dust Pan',
        description: 'A plastic dust pan.',
        isActive: false,
      },
      {
        name: 'Mop',
        description: 'A strong, durable mop.',
        isActive: false,
      },
      {
        name: 'Horse',
        description: "She's got some miles on her.",
        isActive: false,
      },
      {
        name: 'Bucket',
        description: 'A metal bucket.',
        isActive: false,
      },
    ];
    //Current Selected Item
    let selected = [options[2]];
    //Activate the Data Form 
    let checked = isInactive || false;
    
  </script>
   
   <pre class="status" style="color:black">Selected: {selected.name} Active: {checked}</pre>
   <div>
    <FormField>
      <Checkbox bind:checked />
      <span slot="label">Beilage ausblenden</span>
    </FormField>
  </div>

{
  #if checked === false
}
<DataTable style="max-width: 100%; ">
    <Head>
      <Row>
        <Cell >
        </Cell>
        <Cell>Name</Cell>
        <Cell>Description</Cell>
        <Cell boolean>Active</Cell>
      </Row>
    </Head>
    <Body>
      {#each options as option (option.name)}
        <Row>
          <Cell >
            <Radio bind:group={selected}
            value={option}
           disabled={option.isActive}/>
          </Cell>
          <Cell>{option.name}</Cell>
          <Cell>{option.description}</Cell>
          <Cell boolean>{option.isActive}</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
  
 {
   /if
 }
  

  