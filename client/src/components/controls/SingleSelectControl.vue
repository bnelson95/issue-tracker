<template>
  <control-wrapper :title="title">
    <template v-slot:control-content>
      <b-dropdown variant="light" class="text-left">
        <template v-slot:button-content>
          <slot name="button-content"></slot>
        </template>
        <b-dropdown-item v-if="allowEmpty" @click="$emit('input', '')">
          <p>-</p>
        </b-dropdown-item>
        <b-dropdown-item v-for="(item, key) in source" :key="key" @click="$emit('input', key)">
          <slot name="item-content" :item="item"></slot>
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </control-wrapper>
</template>

<script>
import ControlWrapper from '@/components/controls/ControlWrapper.vue'
export default {
  name: 'SingleSelectControl',
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
    source: {
      type: Object
    },
    allowEmpty: {
      type: Boolean
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
