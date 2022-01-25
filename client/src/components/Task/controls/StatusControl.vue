<template>
  <single-select-control title="Status" :value="value" :source="statuses" @input="input">
    <template v-slot:button-content>
      <i :class="'fas mr-2 ' + statusIcon"></i> {{ statusText }}
    </template>
    <template v-slot:item-content="slotProps">
      <i :class="'fas mr-2 ' + slotProps.item.icon"></i> {{ slotProps.item.text }}
    </template>
  </single-select-control>
</template>

<script>
import SingleSelectControl from '@/components/controls/SingleSelectControl.vue'
export default {
  components: {
    SingleSelectControl
  },
  data () {
    return {
      statuses: { // TODO move statuses and priorities to helper file
        'notstarted': { text: 'Not Started', icon: 'fa-hourglass-start text-primary' },
        'inprogress': { text: 'In Progress', icon: 'fa-hourglass-half text-info' },
        'completed': { text: 'Completed', icon: 'fa-hourglass-end text-success' }
      }
    }
  },
  computed: {
    statusText: function () {
      return this.value
        ? this.statuses[this.value].text
        : ''
    },
    statusIcon: function () {
      return this.value
        ? this.statuses[this.value].icon
        : ''
    }
  },
  props: {
    value: {
      type: String
    },
    input: {
      type: Function
    }
  }
}
</script>

<style>

</style>
