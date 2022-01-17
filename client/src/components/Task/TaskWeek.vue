<template>
  <b-card-group>
    <task-day title="Monday" :date="getDate(0)" :tasks="tasksForDay(0)" />
    <task-day title="Tuesday" :date="getDate(1)" :tasks="tasksForDay(1)" />
    <task-day title="Wednesday" :date="getDate(2)" :tasks="tasksForDay(2)" />
    <task-day title="Thursday" :date="getDate(3)" :tasks="tasksForDay(3)" />
    <task-day title="Friday" :date="getDate(4)" :tasks="tasksForDay(4)" />
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
    getDate (days) {
      let date = new Date(this.startDate)
      date.setUTCDate(date.getUTCDate() + days)
      return date
    }
  }
}
</script>

<style>

</style>