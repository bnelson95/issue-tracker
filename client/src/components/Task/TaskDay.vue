<template>
  <b-card no-body 
    header-class="py-2 pr-3 pl-2"
    :header-bg-variant="isToday ? 'primary' : ''"
    :header-text-variant="isToday ? 'white' : ''">
    <template v-slot:header>
      <b-row no-gutters >
        <b-col class="text-nowrap overflow-hidden">
          <h6 class="m-0"><b>{{ title }}</b></h6>
        </b-col>
        <b-col class="priority-col text-center">
          <h6><b class="float-right">{{ number }}</b></h6>
        </b-col>
      </b-row>
    </template>
    <b-list-group flush>
      <b-list-group-item v-for="(task) in tasks" v-bind:key="task._id"
        button
        class="p-2"
        @click="selectTaskForEdit(task)">
        <h6 class="m-0">{{ task.title || 'Untitled' }}</h6>
      </b-list-group-item>
    </b-list-group>
    <b-modal v-model="modalShow" title="Edit Task" @ok="saveTask" @cancel="clearAddTaskValues" @hide="clearAddTaskValues">
      <input-control readonly v-if="selectedTask" title="Title" :value="selectedTask.title" />
      <status-control :value="newTaskStatus" :input="value => newTaskStatus = value" />
    </b-modal>
  </b-card>
</template>

<script>
import TaskService from '@/services/Tasks/TaskService'
import InputControl from '@/components/controls/InputControl.vue'
import StatusControl from '@/components/Task/controls/StatusControl.vue'
export default {
  name: 'TaskDay',
  components: {
    InputControl,
    StatusControl
  },
  props: {
    title: { type: String },
    date: { type: Date },
    tasks: { type: Array }
  },
  data () {
    return {
      modalShow: false,
      selectedTask: undefined,
      newTaskStatus: ''
    }
  },
  computed: {
    number: function () {
      return this.date.getDate()
    },
    isToday: function () {
      const today = new Date()
      const isToday = this.date.getDate() == today.getDate() &&
        this.date.getMonth() == today.getMonth() &&
        this.date.getFullYear() == today.getFullYear()
      return isToday
    }
  },
  methods: {
    selectTaskForEdit (task) {
      this.modalShow = true
      this.selectedTask = task
      this.newTaskStatus = this.selectedTask.status
    },
    async saveTask () {
      this.selectedTask.status = this.newTaskStatus
      const res = await TaskService.updateTask(this.selectedTask)
      if (res.status === 200) {
        let index = this.tasks.findIndex((task => task._id == res.data.task._id));
        this.tasks.splice(index, 1)
        this.tasks.push(res.data.task)
      }
      this.clearAddTaskValues()
    },
    clearAddTaskValues () {
      this.selectedTask = undefined
      this.newTaskStatus = ''
    }
  }
}
</script>

<style>
.priority-col {
  flex: 0 0 30px;
}
</style>