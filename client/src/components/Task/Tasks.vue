<template>
  <b-container fluid>
    <b-sidebar id="sidebar-1" title="Groups" shadow backdrop right>
      <b-button-group class="d-flex m-2 bg-white">
        <b-button @click="newTaskGroup()" variant="outline-secondary" class="m-0">
          <i class="mr-1 fas fa-plus"></i> <b>New Group</b>
        </b-button>
        <b-button v-b-modal.modal-1 variant="outline-secondary" :class="{'disabled':selectedGroup === ''}">
          <i class="mr-1 fas fa-edit"></i> <b>Edit</b>
        </b-button>
        <b-button @click="deleteTaskGroup()" variant="outline-secondary" :class="{'disabled':selectedGroup === ''}">
          <i class="fas fa-trash"></i>
        </b-button>
        <b-modal title="Edit Group" id="modal-1" @ok="updateTaskGroup">
          <b-form-input type="text" v-model="newTaskGroupTitle"></b-form-input>
        </b-modal>
      </b-button-group>
      <b-list-group class="mx-2">
        <b-list-group-item button
          :class="{ 'active':!selectedGroup, 'px-3 py-2':true }"
          @click="selectGroup('')"
          variant="light">
          All Tasks
        </b-list-group-item>
        <b-list-group-item button v-for="group in groups" v-bind:key="group._id"
          :class="{ 'active': selectedGroup._id === group._id, 'px-3 py-2':true }"
          @click="selectGroup(group)"
          variant="light">
          {{ group.title }}
          <span class="float-right">
            <b-badge v-if="getCount(group, 'notstarted')" variant="primary" class="border">{{ getCount(group, 'notstarted') }}</b-badge>
            <b-badge v-if="getCount(group, 'inprogress')" variant="info" class="border">{{ getCount(group, 'inprogress') }}</b-badge>
            <b-badge v-if="getCount(group, 'completed')" variant="success" class="border">{{ getCount(group, 'completed') }}</b-badge>
          </span>
        </b-list-group-item>
      </b-list-group>
    </b-sidebar>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <b-button @click="newTask()" variant="outline-primary">
          <i class="mr-1 fas fa-plus"></i> <b>New Task</b>
        </b-button>
      </b-col>
      <b-col>
        <b-button v-b-toggle.sidebar-1 class="float-right" variant="outline-secondary">
          <i class="mr-1 fas fa-layer-group"></i> <b>Groups</b>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center">
        <h3 class="text-center mt-3 mb-0">{{ selectedGroup.title || "All Tasks" }}</h3>
        <p v-if="tasks.length === 0" class="my-3">Looks like you don't have any tasks yet.</p>
        <p v-if="tasksForGroup.length === 0" class="my-3">Create a new task to get started!</p>
      </b-col>
    </b-row>
    <b-row v-if="tasksForGroup.length > 0">
      <b-col sm="12" md="4" lg="4" xl="4">
        <task-group title="Not Started"
          class="mt-3"
          icon="fa-hourglass-start"
          :tasks="notStartedTasks"
          cardBorderVariant="primary">
          <template v-slot:action-buttons="slotProps">
            <b-button variant="outline-danger" @click="deleteTask(slotProps.task)">
              <i class="mr-1 fas fa-trash"></i> Delete
            </b-button>
            <b-button variant="outline-secondary" @click="editTask(slotProps.task)">
              <i class="mr-1 fas fa-edit"></i> Edit
            </b-button>
            <b-button variant="outline-info" @click="startTask(slotProps.task)">
              <i class="mr-1 fas fa-hourglass-half"></i> Start
            </b-button>
          </template>
        </task-group>
      </b-col>
      <b-col sm="12" md="4" lg="4" xl="4">
        <task-group title="In Progress"
          class="mt-3"
          icon="fa-hourglass-half"
          :tasks="inProgressTasks"
          cardBorderVariant="info">
          <template v-slot:action-buttons="slotProps">
            <b-button variant="outline-primary" @click="revertTask(slotProps.task)">
              <i class="mr-1 fas fa-hourglass-start"></i> Revert
            </b-button>
            <b-button variant="outline-secondary" @click="editTask(slotProps.task)">
              <i class="mr-1 fas fa-edit"></i> Edit
            </b-button>
            <b-button variant="outline-success" @click="completeTask(slotProps.task)">
              <i class="mr-1 fas fa-hourglass-end"></i> Done
            </b-button>
          </template>
        </task-group>
      </b-col>
      <b-col sm="12" md="4" lg="4" xl="4">
        <task-group title="Completed"
          class="mt-3"
          icon="fa-hourglass-end"
          :tasks="completedTasks"
          cardBorderVariant="success">
          <template v-slot:action-buttons="slotProps">
            <b-button variant="outline-info" @click="startTask(slotProps.task)">
              <i class="mr-1 fas fa-hourglass-half"></i> Revert
            </b-button>
            <b-button variant="outline-secondary" @click="editTask(slotProps.task)">
              <i class="mr-1 fas fa-edit"></i> Edit
            </b-button>
            <b-button variant="outline-secondary" disabled>
            </b-button>
          </template>
        </task-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TaskService from '@/services/Tasks/TaskService'
import TaskGroupService from '@/services/Tasks/TaskGroupService'
//import SplitSideContainer from '../SplitSideContainer.vue'
import TaskGroup from './TaskGroup.vue'
export default {
  name: 'Tasks',
  components: {
    //SplitSideContainer,
    TaskGroup
  },
  data () {
    return {
      groups: [],
      selectedGroup: '',
      tasks: [],
      newTaskGroupTitle: '',
      newTaskGroupColor: ''
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
    }
  },
  async mounted () {
    await this.getTaskGroups()
    await this.getTasks()
    const group = this.groups.find(x => x._id === localStorage.getItem('selected-group'))
    this.selectGroup(group || '')
  },
  methods: {
    selectGroup (group) {
      if (group !== '') {
        localStorage.setItem('selected-group', group._id)
        this.selectedGroup = group
        this.newTaskGroupTitle = group.title
        this.newTaskGroupColor = group.color
      } else {
        localStorage.setItem('selected-group', '')
        this.selectedGroup = ''
        this.newTaskGroupTitle = ''
        this.newTaskGroupColor = ''
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
    },
    async newTaskGroup () {
      await TaskGroupService.addTaskGroup({
        title: 'New Group'
      })
      await this.getTaskGroups()
    },
    async updateTaskGroup () {
      await TaskGroupService.updateTaskGroup({
        ...this.selectedGroup,
        title: this.newTaskGroupTitle,
        color: this.newTaskGroupColor
      })
      await this.getTaskGroups()
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
