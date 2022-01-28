<script lang="ts">
  import "../node_modules/svelte-material-ui/bare.css";
  export let name: string;
  import Textfield from "@smui/textfield";
  import Icon from "@smui/textfield/icon";
  import HelperText from "@smui/textfield/helper-text";
  import SelectMenu from "./SelectMenu.svelte";
  import Button, {Label} from '@smui/button';

  let focused = false;
  let value: string | null = null;
  let dirty = false;
  let invalid = false;
  $: disabled = focused || !value || !dirty || invalid;
  let t=123;
  function clickHandler() {
    alert(`Sending to ${value}!`);
    value = null;
    dirty = false;
  }

</script>

<Button on:click={()=>t++}>
	<Label>Click Me!</Label>
</Button>	
<h1>{t}</h1>
  <!--
	  Note: when you bind to `invalid`, but you only want to
	  monitor it instead of updating it yourself, you also
	  should include `updateInvalid`.
	-->
  <SelectMenu/>