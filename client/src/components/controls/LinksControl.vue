<template>
  <control-wrapper :title="title" icon="fa-link">
    <template v-slot:control-content>
      <b-button-group v-for="link in links" :key="link.ref" class="d-flex mb-2">
        <b-button @click="openLink(link.ref)" variant="light" class="w-100 text-left">
          <i class="mr-1 fas fa-external-link-alt"></i> {{ link.title }}
        </b-button>
        <b-dropdown right variant="light">
          <b-dropdown-item @click="selectLinkForEdit(link)">Edit</b-dropdown-item>
          <b-dropdown-item @click="selectLinkForDelete(link)">Delete</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
      <b-button v-b-modal.modal-add-link variant="light">Add</b-button>

      <b-modal title="Add Link" id="modal-add-link" @ok="addLink">
        <input-control title="Link" type="url" :value="newRef" @input="value => newRef = value" />
        <input-control title="Title" type="text" :value="newTitle" @input="value => newTitle = value" />
      </b-modal>
      <b-modal title="Edit Link" ref="modal-edit-link" @ok="editLink">
        <input-control title="Link" type="url" :value="newRef" @input="value => newRef = value" />
        <input-control title="Title" type="text" :value="newTitle" @input="value => newTitle = value" />
      </b-modal>
    </template>
  </control-wrapper>
</template>

<script>
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
import InputControl from '@/components/controls/InputControl.vue'
export default {
  name: 'LinksControl',
  components: {
    ControlWrapper,
    InputControl
  },
  data() {
    return {
      newRef: '',
      newTitle: '',
      selectedRef: ''
    }
  },
  model: {
    prop: 'links',
    event: 'input'
  },
  props: {
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    links: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async addLink () {
      this.links.push({ ref: this.newRef, title: this.newTitle })
      this.selectedRef = ''
      this.newRef = ''
      this.newTitle = ''
    },
    async editLink () {
      let index = this.links.findIndex((link => link.ref == this.selectedRef));
      this.links[index].ref = this.newRef
      this.links[index].title = this.newTitle
      this.selectedRef = ''
      this.newRef = ''
      this.newTitle = ''
    },
    selectLinkForEdit(link) {
      this.selectedRef = link.ref
      this.newRef = link.ref
      this.newTitle = link.title
      this.$refs['modal-edit-link'].show()
    },
    selectLinkForDelete(link) {
      let index = this.links.findIndex((x => x.ref == link.ref));
      this.links.splice(index, 1);
    },
    openLink(ref) {
      window.open(ref)
    }
  }
}
</script>

<style>
input {
  border: 0;
}
input:focus {
  box-shadow: none;
}
</style>