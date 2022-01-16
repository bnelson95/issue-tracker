<template>
  <control-wrapper :title="title">
    <template v-slot:control-content>
      <b-form-datepicker
        :value="value"
        class="border-0 bg-light"
        calendar-width="100%"
        menu-class="w-100"
        hide-header
        @input="$emit('input', $event)">
      </b-form-datepicker>
    </template>
  </control-wrapper>
</template>

<script>
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
export default {
  name: 'DateControl',
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
      type: String
    }
  }
}
</script>

<style scoped>
.btn::after {
  float: right;
}
.btn {
   text-align: left !important;
}
</style>
