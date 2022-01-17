<template>
  <b-card-group>
    <task-day title="Monday" :number="getDateDay(0)" :tasks="tasksForDay(0)" />
    <task-day title="Tuesday" :number="getDateDay(1)" :tasks="tasksForDay(1)" />
    <task-day title="Wednesday" :number="getDateDay(2)" :tasks="tasksForDay(2)" />
    <task-day title="Thursday" :number="getDateDay(3)" :tasks="tasksForDay(3)" />
    <task-day title="Friday" :number="getDateDay(4)" :tasks="tasksForDay(4)" />
  </b-card-group>
</template>

<script>
import TaskDay from './TaskDay.vue'
export default {
  name: 'TaskWeek',
  components: {
    TaskDay
  },
  props: {
    title: { type: String },
    tasks: { type: Array },
    startDate: { type: String }
  },
  methods: {
    tasksForDay (days) {
      let date = new Date(this.startDate)
      date.setUTCDate(date.getUTCDate() + days)
      return this.tasks
        .filter(x =>  new Date(x.dueOn).getUTCDate() === date.getUTCDate())
    },
    getDateDay (days) {
      let date = new Date(this.startDate)
      date.setUTCDate(date.getUTCDate() + days)
      return date.getUTCDate()
    }
  }
}
</script>

<style>

</style>