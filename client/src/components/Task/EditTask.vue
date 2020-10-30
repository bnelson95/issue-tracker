<template>
  <b-container fluid>
    <b-row class="bg-light py-3 border-bottom" align-v="center">
      <b-col class="fixed-col-120">
        <b-button @click="$router.push({ name: 'Tasks' })" variant="secondary" class="m-0">
            <i class="mr-1 fas fa-chevron-left"></i> Tasks
          </b-button>
      </b-col>
      <b-col>
        <h3 class="editor my-0 text-center" contenteditable placeholder="Title" v-text="task.title" @blur="onTitleEdit"></h3>
      </b-col>
      <b-col class="fixed-col-120">
        <b-button-group class="float-right">
          <b-button variant="primary" @click="updateTask">Save</b-button>
          <b-button variant="danger" @click="deleteTask">Delete</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col sm="12" lg="8" class="overflow-auto">
        <div>
          <editor-control title="Description" :value="task.description" :input="value => task.description = value" />
        </div>
      </b-col>
      <b-col sm="12" lg="4">
        <status-control :task="task" :input="value => task.status = value" />
        <priority-control :task="task" :input="value => task.priority = value" />
        <tag-control title="Tags" :value="task.tags" @input="value => task.tags = value" />
        <single-select-control title="Group" :value="task.group" :source="groups" @input="value => task.group = value">
          <template v-slot:button-content>{{ groupText }}</template>
          <template v-slot:item-content="slotProps">{{ slotProps.item.title }}</template>
        </single-select-control>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TaskService from '@/services/Tasks/TaskService'
import TaskGroupService from '@/services/Tasks/TaskGroupService'
import TagControl from '@/components/controls/TagControl.vue'
//import InputControl from '@/components/controls/InputControl.vue'
import SingleSelectControl from '@/components/controls/SingleSelectControl.vue'
import EditorControl from '@/components/controls/EditorControl.vue'
import StatusControl from '@/components/Task/controls/StatusControl.vue'
import PriorityControl from '@/components/Task/controls/PriorityControl.vue'
export default {
  name: 'EditTask',
  components: {
    TagControl,
    //InputControl,
    SingleSelectControl,
    StatusControl,
    PriorityControl,
    EditorControl
  },
  data () {
    return {
      task: { },
      groups: null,
      tempNewTag: ''
    }
  },
  computed: {
    groupText: function () {
      return this.task && this.task.group && this.groups
        ? this.groups[this.task.group].title
        : ''
    }
  },
  mounted () {
    this.getTask()
    this.getTaskGroups()
  },
  methods: {
    onTitleEdit (evt) {
      this.task.title = evt.target.innerText
    },
    onDescriptionEdit (evt) {
      this.task.description = evt.target.innerText
    },
    async getTask () {
      const response = await TaskService.getTask({
        _id: this.$route.params.id
      })
      this.task = response.data.task
    },
    async updateTask () {
      await TaskService.updateTask(this.task)
      this.$router.push({ name: 'Tasks' }) // TODO just go back?
    },
    async deleteTask () {
      await TaskService.deleteNote({
        _id: this.$route.params.id
      })
      this.$router.push({ name: 'Tasks' }) // TODO just go back?
    },
    async getTaskGroups () {
      const response = await TaskGroupService.fetchTaskGroups()
      var result = response.data.groups.reduce(function (map, obj) {
        map[obj._id] = obj
        return map
      }, {})
      this.groups = result
    }
  }
}
</script>

<style scoped>
[placeholder]:empty::before {
    content: attr(placeholder);
    color: #777;
}
.form-control-lg {
  line-height: 1;
}
</style>
