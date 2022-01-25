<template>
  <control-wrapper :title="title">
    <template v-slot:control-content>
      <b-form-radio-group
        id="toggle-control-radios"
        :checked="value"
        :options="options"
        name="toggle-control-radios"
        buttons
        button-variant="light"
        class="d-flex"
        @input="$emit('input', $event)">
      </b-form-radio-group>
    </template>
  </control-wrapper>
</template>

<script>
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
export default {
  name: 'ToggleControl',
  components: {
    ControlWrapper
  },
  data () {
    return {
      options: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ]
    }
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
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>
