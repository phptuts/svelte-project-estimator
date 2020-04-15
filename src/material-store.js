import { writable } from 'svelte/store';

const materialStore = writable([]);

if (localStorage.getItem('materials')) {
  materialStore.set(JSON.parse(localStorage.getItem('materials')));
}

materialStore.subscribe((items) => {
  localStorage.setItem('materials', JSON.stringify(items));
});

const add = (name, price) => {
  materialStore.update((items) => {
    const item = {
      name,
      price,
      id: new Date().getTime(),
    };

    return [...items, item];
  });
};

const edit = (id, name, price) => {
  materialStore.update((items) => {
    const updatedItems = items.filter((i) => i.id !== id);

    const item = {
      name,
      price,
      id,
    };

    return [...updatedItems, item];
  });
};

const remove = (id) => {
  materialStore.update((items) => {
    return items.filter((i) => i.id !== id);
  });
};

export default {
  subscribe: materialStore.subscribe,
  add,
  edit,
  remove,
};
