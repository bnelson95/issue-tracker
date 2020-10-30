<template>
  <single-select-control title="Priority" :value="task.priority" :source="priorities" @input="input">
    <template v-slot:button-content>
      <i :class="'fas mr-2 ' + priorityIcon"></i> {{ priorityText }}
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
      priorities: { // TODO translate
        'urgent': { text: 'Urgent', icon: 'fa-exclamation text-danger', rank: 0 },
        'high': { text: 'High', icon: 'fa-angle-double-up text-warning', rank: 1 },
        'normal': { text: 'Normal', icon: 'fa-angle-up text-secondary', rank: 2 },
        'low': { text: 'Low', icon: 'fa-angle-down text-success', rank: 3 }
      }
    }
  },
  computed: {
    priorityText: function () {
      return this.task && this.task.priority
        ? this.priorities[this.task.priority].text
        : ''
    },
    priorityIcon: function () {
      return this.task && this.task.priority
        ? this.priorities[this.task.priority].icon
        : ''
    }
  },
  props: {
    task: {
      type: Object
    },
    input: {
      type: Function
    }
  }
}
</script>

<style>

</style>
