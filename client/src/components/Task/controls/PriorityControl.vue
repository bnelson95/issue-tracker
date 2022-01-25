<template>
  <single-select-control title="Priority" :value="task.priority" :source="$store.state.priorities" @input="input">
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
  computed: {
    priorityText: function () {
      return this.task && this.task.priority
        ? this.$store.getters.getPriorityText(this.task.priority)
        : ''
    },
    priorityIcon: function () {
      return this.task && this.task.priority
        ? this.$store.getters.getPriorityIcon(this.task.priority)
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
