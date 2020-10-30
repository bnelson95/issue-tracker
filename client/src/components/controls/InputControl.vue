<template>
  <control-wrapper :title="title" :error="error">
    <template v-slot:control-content>
      <b-form-input
        :type="type"
        shadow-none
        :placeholder="title"
        :value="value"
        @input="$emit('input', $event)">
      </b-form-input>
    </template>
  </control-wrapper>
</template>

<script>
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
export default {
  name: 'InputControl',
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
      type: String,
      default: () => ''
    },
    error: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    }
  }
}
</script>

<style scoped>
input {
  border: 0;
}
</style>
