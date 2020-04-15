<script>
  import Form from "./Form.svelte";
  import Table from "./Table.svelte";
  let id;
  let name = "";
  let price = "";
  function edit(event) {
    console.log(event.detail);
    ({ id, name, price } = event.detail);
  }
</script>

<style>
  main {
    flex: 1;
    align-content: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
  }
  :global(table) {
    width: 100%;
  }
</style>

<main>
  <h1>Project Estimator</h1>
  <Form bind:id bind:name bind:price />

  <Table on:edit={edit} />

</main>
