<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import Checkbox from '@smui/checkbox';
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field'
    import App from './App.svelte';
    import { beforeUpdate, afterUpdate, onMount } from 'svelte';
    export let isInactive: boolean = true;
    

    let options = [
      {
        name: 'Broom',
        description: 'A wooden handled broom.',
      },
      {
        name: 'Dust Pan',
        description: 'A plastic dust pan.',
      },
      {
        name: 'Mop',
        description: 'A strong, durable mop.',
      },
      {
        name: 'Horse',
        description: "She's got some miles on her.",
      },
      {
        name: 'Bucket',
        description: 'A metal bucket.',
      },
      {
        name: 'Bucket 2',
        description: 'A metal bucket.',

      },
    ];

 

    //Current Selected Item
    export let index:number;
    $: selected = options[index];
    
    //Activate the Data Form 
    let checked = isInactive || false;
      
    $: {
      console.log("selected: " + selected.name);
    }

    afterUpdate(()=>{
      console.log(index);
    });
    /* onMount(()=>{
     index=index;
    }); */

  </script>
   
   <pre class="status" style="color:black">Selected: {selected} Active: {index} </pre>
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
        <Cell>Beilagen</Cell>
      </Row>
    </Head>
    <Body>
      {#each options as option (option.name)}
        <Row>
          <Cell >
            <Radio bind:group={selected}
            value={option}
            on:click={()=>{index=options.findIndex(value => value.name===option.name)}}
           />
          </Cell>
          <Cell>{option.name}</Cell>
          <Cell>{option.description}</Cell>
          <Cell>Beilagen</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
  
 {
   /if
 }
  

  