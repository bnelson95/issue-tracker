<template>
  <div>
    <b-modal title="Add Task" id="add-task-modal" @ok="addTask" @cancel="clearAddTaskValues" @hide="clearAddTaskValues">
      <input-control title="Title" :value="newTaskTitle" @input="value => newTaskTitle = value" />
      <date-control title="Due Date" :value="newTaskDueOn" @input="value => newTaskDueOn = value" />
    </b-modal>
    <b-modal title="Edit Task" id="edit-task-modal" @ok="saveTask" @cancel="clearAddTaskValues" @hide="clearAddTaskValues">
      <input-control title="Title" :value="newTaskTitle" @input="value => newTaskTitle = value" />
      <date-control title="Due Date" :value="newTaskDueOn" @input="value => newTaskDueOn = value" />
    </b-modal>
    <b-row class="m-0">
      <b-col v-for="(day) in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" 
        v-bind:key="day"
        class="p-2">
        <b class="ml-1">{{ day }}</b>
      </b-col>
    </b-row>
    <div class="rounded bg-white border">
      <b-row v-for="week in getWeeks()" v-bind:key="week[0].getTime()" class="m-0 border-bottom">
        <b-col v-for="day in week" v-bind:key="day.getTime()" class="border-right p-0"
          :class="{'text-secondary font-italic bg-light':day.getUTCMonth() !== month}">
          <b-row class="p-2">
            <b-col class="text-nowrap overflow-hidden font-weight-bold">
              <span class="ml-1">
                <span v-if="day.getUTCDate() === 1 && day.getUTCMonth() !== month">{{ day.toLocaleDateString('en-US', { month: 'short' }) }} </span>
                <span>{{ day.getUTCDate() }}</span>
              </span>
            </b-col>
            <b-col class="text-center col-auto">
              <b-button @click="newTaskDueOn = new Date(day)" v-b-modal.add-task-modal class="p-0 px-1 d-block" variant="primary">
                <i class="fas fa-plus"></i>
              </b-button>
            </b-col>
          </b-row>
          <b-list-group flush class="items">
            <b-list-group-item button v-for="task in getDueTasksForDay(day)" v-bind:key="task.id" 
              class="p-2"
              v-b-modal.edit-task-modal
              @click="selectTaskForEdit(task)">
              {{ task.title || 'Untitled' }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import InputControl from '@/components/controls/InputControl.vue'
import DateControl from '@/components/controls/DateControl.vue'
import TaskService from '@/services/Tasks/TaskService'
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
  components: {
    InputControl,
    DateControl,
  },
  data () {
    return {
      newTaskTitle: '',
      newTaskGroup: '',
      newTaskDueOn: undefined,
      selectedTask: undefined
    }
  },
  props: {
    tasks: { type: Array },
    month: { type: Number },
    year: { type: Number },
  },
  methods: {
    async addTask () {
      const task = {
        title: this.newTaskTitle,
        dueOn: this.newTaskDueOn,
        description: '',
      }
      const res = await TaskService.addTask(task)
      if (res.status === 200) {
        this.tasks.push(res.data.task)
      }
      this.clearAddTaskValues()
    },
    selectTaskForEdit (task) {
      this.selectedTask = task
      this.newTaskTitle = this.selectedTask.title
      this.newTaskDueOn = new Date(this.selectedTask.dueOn)
    },
    async saveTask () {
      this.selectedTask.title = this.newTaskTitle
      this.selectedTask.dueOn = this.newTaskDueOn
      const res = await TaskService.updateTask(this.selectedTask)
      if (res.status === 200) {
        let index = this.tasks.findIndex((task => task._id == this.selectedTask._id));
        this.task[index] = res.data.newTask
      }
      this.clearAddTaskValues()
    },
    clearAddTaskValues () {
      this.newTaskTitle = ''
      this.newTaskDueOn = undefined
    },
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