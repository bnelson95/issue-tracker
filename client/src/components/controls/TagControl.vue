<template>
  <control-wrapper :title="title">
    <template v-slot:control-content>
      <b-form-tags class="rounded-0 p-0" size="lg" :value="value" @input="$emit('input', $event)" tag-variant="light">
        <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
          <b-input-group>
            <b-form-input
              id="range-1"
              shadow-none
              list="my-list-id"
              v-bind="inputAttrs"
              v-on="inputHandlers"
              placeholder="New tag - Press enter to add"
              class="form-control">
            </b-form-input>
            <datalist id="my-list-id">
              <option>TODO</option>
            </datalist>
            <b-input-group-append>
              <b-button variant="light" class="border-left" @click="addTag()">Add</b-button>
            </b-input-group-append>
          </b-input-group>
          <div class="p-1 border-top" v-if="tags.length > 0">
            <b-form-tag
              v-for="tag in tags"
              @remove="removeTag(tag)"
              :key="tag"
              :title="tag"
              :variant="tagVariant"
              class="m-1 px-2 py-1 border rounded-0">
              {{ tag }}
            </b-form-tag>
          </div>
        </template>
      </b-form-tags>
    </template>
  </control-wrapper>
</template>

<script>
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
export default {
  name: 'TagControl',
  components: {
    ControlWrapper
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
input, input:focus {
  background-color: transparent;
}
input {
  border: 0;
  border-radius: 0;
}
input:focus {
  box-shadow: none;
}
</style>
