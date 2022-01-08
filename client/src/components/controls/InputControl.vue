<template>
  <control-wrapper :title="title" :error="error" :icon="icon">
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
  },
  computed: {
    icon: function () {
      switch (this.type) {
        case "text": return "fa-font"
        case "email": return "fa-at"
        case "password": return "fa-lock"
        case "url": return "fa-link"
        default: return ""
      }
    }
  },
}
</script>

<style scoped>
input {
  border: 0;
}
input:focus {
  box-shadow: none;
}
</style>
