<template>
  <div>
    <b-row class="m-0">
      <b-col v-for="(day) in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" 
        v-bind:key="day"
        class="p-2">
        <b class="ml-1">{{ day }}</b>
      </b-col>
    </b-row>
    <div class="rounded bg-white border">
      <b-row v-for="week in getWeeks()" v-bind:key="week" class="m-0 border-bottom">
        <b-col v-for="day in week" v-bind:key="day" 
          class="border-right p-2 min-h-100"
          :class="{'text-secondary font-italic bg-light':day.getUTCMonth() !== month}">
          <b-row>
            <b-col class="text-nowrap overflow-hidden font-weight-bold">
              <span class="ml-1">
                <span v-if="day.getUTCDate() === 1 && day.getUTCMonth() !== month">{{ day.toLocaleDateString('en-US', { month: 'short' }) }} </span>
                <span>{{ day.getUTCDate() }}</span>
              </span>
            </b-col>
            <b-col class="text-center col-auto">
              <!-- <b-button class="p-0 px-1 d-block" variant="primary">
                <i class="fas fa-plus"></i>
              </b-button> -->
            </b-col>
          </b-row>
          <div class="items">
          <div v-for="task in getDueTasksForDay(day)" v-bind:key="task.id" class="mx-1">
            {{ task.title || 'Untitled' }}
          </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  nextMonday,
  isMonday,
  addDays,
  previousFriday,
  lastDayOfMonth,
  nextFriday,
  isWeekend,
  previousMonday,
  isFriday
} from 'date-fns'
export default {
  name: 'TaskMonth',
  props: {
    tasks: { type: Array },
    month: { type: Number },
    year: { type: Number },
  },
  methods: {
    getFirstMonday () {
      const firstDayOfMonth = new Date(this.year, this.month, 1)
      if (isMonday(firstDayOfMonth)) {
        return firstDayOfMonth
      }
      if (isWeekend(firstDayOfMonth)) {
        return nextMonday(firstDayOfMonth)
      }
      return previousMonday(firstDayOfMonth)
    },
    getLastFriday () {
      const lastDayofMonth = lastDayOfMonth(new Date(this.year, this.month, 1))
      if (isFriday(lastDayofMonth)) {
        return lastDayofMonth
      }
      if (isWeekend(lastDayofMonth)) {
        return previousFriday(lastDayofMonth)
      }
      return nextFriday(lastDayofMonth)
    },
    getWeeks () {
      const firstMonday = this.getFirstMonday()
      const lastFriday = this.getLastFriday()
      let weeks = []
      for (var day = firstMonday; day <= lastFriday; day = addDays(day, 1)) {
        if (isWeekend(day)) {
          continue;
        }
        if (isMonday(day)) {
          weeks.push([])
        }
        weeks[weeks.length-1].push(day)
      }
      return weeks
    },
    getDueTasksForDay (day) {
      return this.tasks.filter(x => {
        return this.dateEquals(new Date(day), new Date(x.dueOn))
      })
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
div.items {
  min-height: 50px;
}
</style>