<script>
  import materialStore from "./material-store.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let materials = [];
  materialStore.subscribe(items => {
    materials = items;
  });

  function edit(id, name, price) {
    dispatch("edit", { id, name, price });
  }

  $: total = materials.reduce((prev, next) => {
    prev += next.price;
    return prev;
  }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  function remove(id) {
    materialStore.remove(id);
  }
</script>

<style>
  tr {
    cursor: pointer;
  }
  tr:last-of-type {
    cursor: inherit;
  }
</style>

<table class="primary">
  <thead>
    <tr>
      <th>Material</th>
      <th>Price</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each materials as material (material.id)}
      <tr on:click={edit(material.id, material.name, material.price)}>
        <td>{material.name}</td>
        <td>{formatter.format(material.price)}</td>
        <td>
          <i
            class="far fa-trash-alt"
            on:click|stopPropagation={remove(material.id)} />
        </td>
      </tr>
    {/each}
    <tr>
      <td>Total</td>
      <td colspan="2">{formatter.format(total)}</td>
    </tr>
  </tbody>
</table>
