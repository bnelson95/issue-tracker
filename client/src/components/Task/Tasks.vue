<template>
  <b-container fluid="xl">
    <b-sidebar id="sidebar-1" title="Groups" shadow backdrop right>
      <b-button-group class="d-flex rounded m-3 bg-white">
        <b-button @click="newTaskGroup()" variant="outline-secondary" class="m-0">
          <i class="mr-1 fas fa-plus"></i> <b>New Group</b>
        </b-button>
        <b-button v-b-modal.modal-1 variant="outline-secondary" :class="{'disabled':selectedGroup === '' || $store.state.profile._id !== selectedGroup.createdBy}">
          <i class="mr-1 fas fa-edit"></i> <b>Edit</b>
        </b-button>
        <b-button v-b-modal.delete-group-confirm variant="outline-secondary" :class="{'disabled':selectedGroup === '' || $store.state.profile._id !== selectedGroup.createdBy}">
          <i class="fas fa-trash"></i>
        </b-button>
        <b-modal id="delete-group-confirm" title="Delete Task">
          <p>Are you sure you want to delete this group? This action cannot be undone.</p>
          <template #modal-footer="{ cancel, hide }">
            <b-button @click="cancel">Cancel</b-button>
            <b-button @click="{ deleteTaskGroup(); hide(); }" variant="danger">Delete</b-button>
          </template>
        </b-modal>
        <b-modal title="Edit Group" id="modal-1" @ok="updateTaskGroup">
          <input-control title="Title" :value="newTaskGroupTitle" @input="value => newTaskGroupTitle = value" />
          <tag-control title="Share With" placeholder="User email" :value="newTaskSharedWith" @input="value => newTaskSharedWith = value" />
        </b-modal>
      </b-button-group>
      <b-list-group class="m-3">
        <b-list-group-item button
          :class="{ 'active':!selectedGroup, 'px-3 py-2':true }"
          @click="selectGroup('')"
          variant="light">
          All Tasks
        </b-list-group-item>
        <p v-if="sharedGroups && sharedGroups.length > 0" class="mx-3 my-1"><b>My Groups</b></p>
        <b-list-group-item button v-for="group in myGroups" v-bind:key="group._id"
          :class="{ 'active': selectedGroup._id === group._id, 'px-3 py-2':true }"
          @click="selectGroup(group)"
          variant="light">
          <i v-if="group.sharedWith && group.sharedWith.length > 0" class="mr-1 fas fa-users"></i>
          {{ group.title }}
          <span class="float-right">
            <b-badge v-if="getCount(group, 'notstarted')" variant="primary" class="border">{{ getCount(group, 'notstarted') }}</b-badge>
            <b-badge v-if="getCount(group, 'inprogress')" variant="info" class="border">{{ getCount(group, 'inprogress') }}</b-badge>
          </span>
        </b-list-group-item>
        <span v-if="sharedGroups && sharedGroups.length > 0" class="mx-3 my-1"><b>Shared With Me</b></span>
        <b-list-group-item button v-for="group in sharedGroups" v-bind:key="group._id"
          :class="{ 'active': selectedGroup._id === group._id, 'px-3 py-2':true }"
          @click="selectGroup(group)"
          variant="light">
          <i v-if="group.sharedWith && group.sharedWith.length > 0" class="mr-1 fas fa-users"></i>
          {{ group.title }}
          <span class="float-right">
            <b-badge v-if="getCount(group, 'notstarted')" variant="primary" class="border">{{ getCount(group, 'notstarted') }}</b-badge>
            <b-badge v-if="getCount(group, 'inprogress')" variant="info" class="border">{{ getCount(group, 'inprogress') }}</b-badge>
          </span>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    <b-row class="mt-4 my-3 align-items-center">
      <b-col class="col-auto">
        <b-form-radio-group
          id="btn-radios-1"
          v-model="selected"
          :options="options"
          name="radios-btn-default"
          buttons
          button-variant="dark">
        </b-form-radio-group>
      </b-col>
      <b-col class="text-truncate">
        <h4 class="mx-1 my-0 text-center">{{ selectedGroup.title || "All Tasks" }}</h4>
      </b-col>
      <b-col class="col-auto">
        <b-button v-b-toggle.sidebar-1 class="" variant="dark">
          <i class="mx-1 fas fa-layer-group"></i> Groups
        </b-button>
      </b-col>
    </b-row>
    <b-container v-if="selected === 'columns'" fluid class="m-0 p-0">
      <b-row class="m-0 mb-3">
        <b-col class="p-0">
          <b-button class="" @click="newTask()" variant="primary">
            <i class="mr-1 fas fa-plus"></i> New Task
          </b-button>
        </b-col>
      </b-row>
      <b-row v-if="tasks.length === 0 || tasksForGroup.length === 0">
        <b-col class="text-center mb-3">
          <p v-if="tasks.length === 0" class="my-3">Looks like you don't have any tasks yet.</p>
          <p v-if="tasksForGroup.length === 0" class="my-3">Create a new task to get started!</p>
        </b-col>
      </b-row>
      <b-row v-if="tasksForGroup.length > 0">
        <b-col sm="12" md="4" lg="4" xl="4">
          <task-group title="Not Started"
            class="mb-3"
            icon="fa-hourglass-start"
            :tasks="notStartedTasks"
            cardBorderVariant="primary"
            rightButtonVariant="info"
            rightButtonText="Start"
            rightButtonIcon="fa-hourglass-half"
            :rightButtonClick="(task) => startTask(task)" />
        </b-col>
        <b-col sm="12" md="4" lg="4" xl="4">
          <task-group title="In Progress"
            class="mb-3"
            icon="fa-hourglass-half"
            :tasks="inProgressTasks"
            cardBorderVariant="info"
            leftButtonVariant="primary"
            leftButtonText="Revert"
            leftButtonIcon="fa-hourglass-start"
            :leftButtonClick="(task) => revertTask(task)"
            rightButtonVariant="success"
            rightButtonText="Done"
            rightButtonIcon="fa-hourglass-end"
            :rightButtonClick="(task) => completeTask(task)" />
        </b-col>
        <b-col sm="12" md="4" lg="4" xl="4">
          <task-group title="Completed"
            class="mb-3"
            icon="fa-hourglass-end"
            :tasks="completedTasks"
            cardBorderVariant="success"
            leftButtonVariant="info"
            leftButtonText="Revert"
            leftButtonIcon="fa-hourglass-half"
            :leftButtonClick="(task) => startTask(task)" />
        </b-col>
      </b-row>
    </b-container>
    <b-container v-if="selected === 'weekly'" fluid class="m-0 p-0">
      <h6 class="mx-2">Due This Week</h6>
      <task-week
        :tasks="tasksForGroup"
        :startDate="getPreviousMonday()" />
      <h6 class="mx-2 mt-3">Due Next Week</h6>
      <task-week
        :tasks="tasksForGroup"
        :startDate="getNextMonday()" />
    </b-container>
  </b-container>
</template>

<script>
import TaskService from '@/services/Tasks/TaskService'
import TaskGroupService from '@/services/Tasks/TaskGroupService'
import InputControl from '@/components/controls/InputControl.vue'
import TagControl from '@/components/controls/TagControl.vue'
import TaskGroup from './TaskGroup.vue'
import TaskWeek from './TaskWeek.vue'
export default {
  name: 'Tasks',
  components: {
    InputControl,
    TagControl,
    TaskGroup,
    TaskWeek
  },
  data () {
    return {
      groups: [],
      selectedGroup: '',
      tasks: [],
      newTaskGroupTitle: '',
      newTaskGroupColor: '',
      shareWith: '',
      newTaskSharedWith: [],
      selected: 'columns',
      options: [
        { html: '<i class="fas fa-columns">', value: 'columns' },
        { html: '<i class="fas fa-grip-horizontal">', value: 'weekly' }
      ]
    }
  },
  computed: {
    tasksForGroup: function () {
      return this.selectedGroup !== ''
        ? this.tasks.filter(x => x.group === this.selectedGroup._id)
        : this.tasks
    },
    notStartedTasks: function () {
      return this.tasksForGroup.filter(x => x.status === 'notstarted')
    },
    inProgressTasks: function () {
      return this.tasksForGroup.filter(x => x.status === 'inprogress')
    },
    completedTasks: function () {
      return this.tasksForGroup.filter(x => x.status === 'completed')
    },
    archivedTasks: function () {
      return this.tasksForGroup.filter(x => x.status === 'archived')
    },
    myGroups: function () {
      return this.groups.filter(x => x.createdBy === this.$store.state.profile._id)
    },
    sharedGroups: function () {
      return this.groups.filter(x => x.createdBy !== this.$store.state.profile._id)
    }
  },
  async mounted () {
    await this.getTaskGroups()
    await this.getTasks()
    const group = this.groups.find(x => x._id === localStorage.getItem('selected-group'))
    this.selectGroup(group || '')
  },
  methods: {
    getPreviousMonday () {
      let target = 1 // Monday
      let date = new Date(Date.now())
      let daysPastMonday = date.getDay() == target ? 0 : 8 - target
      date.setDate(date.getDate() - daysPastMonday)
      return date.toString()
    },
    getNextMonday () {
      let prevMonday = new Date(this.getPreviousMonday())
      prevMonday.setDate(prevMonday.getDate() + 7)
      return prevMonday
    },
    selectGroup (group) {
      if (group !== '') {
        localStorage.setItem('selected-group', group._id)
        this.selectedGroup = group
        this.newTaskGroupTitle = group.title
        this.newTaskGroupColor = group.color
        this.newTaskSharedWith = group.sharedWith

      } else {
        localStorage.setItem('selected-group', '')
        this.selectedGroup = ''
        this.newTaskGroupTitle = ''
        this.newTaskGroupColor = ''
        this.shareWith = ''
        this.newTaskSharedWith = []
      }
    },
    getCount (group, status) {
      return this.tasks.filter(x => x.group === group._id && x.status === status).length
    },
    async getTaskGroups () {
      const response = await TaskGroupService.fetchTaskGroups()
      this.groups = response.data.groups
    },
    async deleteTaskGroup () {
      await TaskGroupService.deleteTaskGroup({ _id: this.selectedGroup._id })
      await this.getTaskGroups()
      this.selectGroup('')
    },
    async newTaskGroup () {
      const response = await TaskGroupService.addTaskGroup({
        title: 'New Group'
      })
      await this.getTaskGroups()
      if (response.data.group) {
        this.selectGroup(response.data.group)
      }
    },
    async updateTaskGroup () {
      const response = await TaskGroupService.updateTaskGroup({
        ...this.selectedGroup,
        title: this.newTaskGroupTitle,
        color: this.newTaskGroupColor,
        sharedWith: this.newTaskSharedWith
      })
      await this.getTaskGroups()
      if (response.data.group) {
        this.selectGroup(response.data.group)
      }
    },
    addShareWith () {
      this.newTaskSharedWith.push(this.shareWith)
    },
    async getTasks () {
      const response = await TaskService.fetchTasks()
      this.tasks = response.data.tasks
    },
    async deleteTask (task) {
      await TaskService.deleteTask({ _id: task._id })
      await this.getTasks()
    },
    async newTask () {
      const res = await TaskService.addTask({
        title: '',
        description: '',
        group: this.selectedGroup._id
      })
      this.editTask(res.data.task)
    },
    editTask (task) {
      this.$router.push({ name: 'EditTask', params: { id: task._id } })
    },
    async updateStatus (task, status) {
      await TaskService.updateTask({ ...task, status })
      await this.getTasks()
    },
    async revertTask (task) {
      await this.updateStatus(task, 'notstarted')
    },
    async startTask (task) {
      await this.updateStatus(task, 'inprogress')
    },
    async completeTask (task) {
      await this.updateStatus(task, 'completed')
    },
    async archiveTask (task) {
      await this.updateStatus(task, 'archived')
    }
  }
}
</script>

<style scoped>
.test {
  flex: 1 1 auto;
}
</style>
