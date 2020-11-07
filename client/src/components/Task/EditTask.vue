<template>
  <b-container fluid>
    <b-row>
      <b-col class="m-3 shadow-z rounded">
        <b-row class="bg-white rounded">
        <b-col cols="8" class="p-1">
          <b-button @click="$router.push({ name: 'Tasks' })" variant="secondary" class="m-0">
            <i class="mr-1 fas fa-chevron-left"></i> Tasks
          </b-button>
          <b-button class="mx-1" variant="primary" @click="updateTask">Save</b-button>
        </b-col>
        <b-col cols="4" class="p-1">
          <b-button-group class="float-right">
            <b-button variant="danger" @click="deleteTask">Delete</b-button>
          </b-button-group>
        </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="7" lg="8">
        <h3 class="editor mb-3 p-2 rounded bg-white shadow-z" contenteditable placeholder="Title" v-text="task.title" @blur="onTitleEdit"></h3>
        <editor-control title="Description" :value="task.description" :input="value => task.description = value" />
      </b-col>
      <b-col sm="12" md="5" lg="4">
        <single-select-control title="Group" :value="task.group" :source="groups" @input="value => task.group = value" allowEmpty>
          <template v-slot:button-content>{{ groupText || "No group" }}</template>
          <template v-slot:item-content="slotProps">{{ slotProps.item.title }}</template>
        </single-select-control>
        <status-control :task="task" :input="value => task.status = value" />
        <priority-control :task="task" :input="value => task.priority = value" />
        <tag-control title="Tags" :value="task.tags" @input="value => task.tags = value" />
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
      return this.task && this.task.group && this.groups && this.groups[this.task.group]
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
      await TaskService.deleteTask({
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
