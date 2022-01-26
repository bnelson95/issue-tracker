<template>
  <b-card-group >
    <task-day
      v-for="(day, i) in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']"
      v-bind:key="i"
      :title="day"
      :date="getDate(i)"
      :tasks="tasksForDay(i)"
    />
  </b-card-group>
</template>

<script>
import { addDays } from 'date-fns'
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
      let date = this.getDate(days)
      return this.tasks
        .filter(x => this.dateEquals(new Date(x.dueOn), date) && x.status !== 'completed')
    },
    getDate (days) {
      let date = new Date(this.startDate)
      date = addDays(date, days)
      date = new Date(date.setHours(0,0,0,0))
      return date
    },
    dateEquals(date1, date2) {
      return date1.getUTCFullYear() === date2.getUTCFullYear()
          && date1.getUTCMonth() === date2.getUTCMonth()
          && date1.getUTCDate() === date2.getUTCDate()
    }
  }
}
</script>

<style>

</style>