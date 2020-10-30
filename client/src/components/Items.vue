<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="mt-3">Items</h1>
        <b-input-group prepend="New Item" class="mt-3">
          <b-form-input v-model="description"></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" @click="addItem" :disabled="!description">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-input-group v-for="(item, i) in items" :key="item._id" class="mt-3">
          <b-form-input v-model="item.description" :disabled="!isSelected(item)"></b-form-input>
          <b-input-group-append>
            <b-button @click="isSelected(item) ? unselect() : select(item)">
              {{isSelected(item) ? 'Close': 'Edit'}}
            </b-button>
            <b-button @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)">
              {{isSelected(item) ? 'Save': 'Delete'}}
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ItemService from '@/services/ItemService'
export default {
  name: "App",
  data() {
    return {
      items: [],
      description: "",
      selected: {}
    };
  },
  async mounted() {
    const response = await ItemService.getItems();
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await ItemService.addItem({
        description: this.description
      });
      this.items.push(response.data);
      this.description = "";
    },
    async removeItem(item, i) {
      await ItemService.deleteItem({ id: item._id });
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      const response = await ItemService.updateItem({
        id: item._id,
        description: item.description
      });
      this.items[i] = response.data;
      this.unselect();
    }
  }
};
</script>

<style>
.icon {
  cursor: pointer;
}
table {
  width: 100%;
}
td:last-child {
  width: 1px;
  white-space: nowrap;
}
input {
  width: 100%;
  font-size: 1rem;
}
</style>
