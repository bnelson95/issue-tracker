<template>
  <single-select-control title="Priority" :value="value" :source="$store.state.priorities" @input="input">
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
      return this.value ? this.$store.getters.getPriorityText(this.value) : ''
    },
    priorityIcon: function () {
      return this.value ? this.$store.getters.getPriorityIcon(this.value) : ''
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
