<script lang="ts">
    import Autocomplete from '@smui-extra/autocomplete';
    import { Text } from '@smui/list';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    
    
    type Item = {
      id: number;
      label: string;
      instantAids: string;
    };
    export let value: Item | undefined = undefined;
    export let keyVal = "";
    
    

    let options: Item[];
    $: options;  
    
      
    // [
    //   {
    //     id: 0,
    //     label: 'Schnitzl',
    //   },
    //   {
    //     id: 1,
    //     label: 'Pommes',
    //   },
    //   {
    //     id: 2,
    //     label: 'McSuppn',
    //   },
    //   {
    //     id: 3,
    //     label: 'Gulasch',
    //   },
    //   {
    //     id: 4,
    //     label: 'Solot',
    //   },
    // ];
  
    
    let text = '';
    
    async function getJSON(){
      let json;
      await fetch("http://localhost:8081").then(response => response.json()).then(value=>{json=value; console.log(value)});
      return json;
    }
    async function getList(input:string)
    {
      if(!options){
        const json = await getJSON();
        if (keyVal === "Hauptgerichte"){
          options = json.Hauptgerichte.map((element, index)=>{return {id:index, label: element.label, instantAids: element.instantAids}});
        }
        else
        {  
          options = json.Beilagen.map((element, index)=>{return {id:index, label: element.label, instantAids: element.instantAids}});
        }
       
      }
      console.log(options);
      return options.filter((e) => e.label.includes(input))
      
    } 

    
  </script>
  
<div>
    <Autocomplete
      search={getList}
      getOptionLabel={(option) =>
        option ? `${option.label}` : ''}
      bind:value
      bind:text
      noMatchesActionDisabled={false}
      label={keyVal}
    >
    </Autocomplete>
  
    <pre class="status">Selected: {value ? JSON.stringify(value) : ''}</pre>
  
  </div>
  
 