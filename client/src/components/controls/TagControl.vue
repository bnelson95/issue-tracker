<template>
  <control-wrapper :title="title" icon="fa-tags">
    <template v-slot:control-content>
      <b-form-tags class="p-0" size="lg" :value="value" @input="$emit('input', $event)" tag-variant="light">
        <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
          <b-input-group>
            <b-form-input
              id="range-1"
              shadow-none
              list="my-list-id"
              v-bind="inputAttrs"
              v-on="inputHandlers"
              :placeholder="placeholder || 'New tag - Press enter to add'"
              class="form-control p-1">
            </b-form-input>
            <datalist id="my-list-id">
              <option>TODO</option>
            </datalist>
            <b-input-group-append>
              <b-button class="rounded" variant="light" @click="addTag()">Add</b-button>
            </b-input-group-append>
          </b-input-group>
          <div v-if="tags.length > 0">
            <b-form-tag
              v-for="tag in tags"
              @remove="removeTag(tag)"
              :key="tag"
              :title="tag"
              :variant="tagVariant"
              class="mt-2 mr-2 px-2 py-1">
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
    placeholder: {
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
}
input:focus {
  box-shadow: none;
}
</style>
