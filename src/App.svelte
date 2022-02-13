<script lang="ts">
  import "../node_modules/svelte-material-ui/bare.css";
  export let name: string;
  import Textfield from "@smui/textfield";
  import Icon from "@smui/textfield/icon";
  import HelperText from "@smui/textfield/helper-text";
  import SelectMenu from "./SelectMenu.svelte";
  import Button, {Label} from '@smui/button';
  import Preview from "./Preview.svelte";

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
<h1>Die Hirt KG Professional Suite Menüempfehlungen Generatorpolynom V1 Pro Version ©️</h1>
  <!--
	  Note: when you bind to `invalid`, but you only want to
	  monitor it instead of updating it yourself, you also
	  should include `updateInvalid`.
	-->
<div class="wrapper">
      <SelectMenu/>
      <Preview/>

</div>

<style>
  div.wrapper {
    width: 95%;
    height: 400px;
    margin: auto;
}
</style>