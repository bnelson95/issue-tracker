<template>
  <b-container>
    <b-row class="mt-4 mb-3">
      <b-col cols="8">
        <b-button-group>
          <b-button @click="$router.push({ name: 'Tasks' })" variant="dark">
            <i class="mr-1 fas fa-chevron-left"></i> Tasks
          </b-button>
          <b-button variant="primary" @click="updateTask">Save</b-button>
        </b-button-group>
      </b-col>
      <b-col cols="4">
        <b-button v-b-modal.delete-confirm variant="danger" class="float-right">Delete</b-button>
        <b-modal id="delete-confirm" title="Delete Task">
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <template #modal-footer="{ cancel }">
            <b-button @click="cancel">Cancel</b-button>
            <b-button @click="deleteTask" variant="danger">Delete</b-button>
          </template>
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="7" lg="8">
        <h3 class="editor mb-3 p-2 rounded border bg-white" contenteditable placeholder="Title" v-text="task.title" @blur="onTitleEdit"></h3>
        <editor-control title="Description" :value="task.description" :input="value => task.description = value" />
      </b-col>
      <b-col sm="12" md="5" lg="4">
        <single-select-control title="Group" :value="task.group" :source="groups" @input="value => task.group = value" allowEmpty>
          <template v-slot:button-content>{{ groupText || "No group" }}</template>
          <template v-slot:item-content="slotProps">{{ slotProps.item.title }}</template>
        </single-select-control>
        <status-control :task="task" :input="value => task.status = value" />
        <priority-control :task="task" :input="value => task.priority = value" />
        <date-control title="Due Date" :value="task.dueOn" @input="value => task.dueOn = value" />
        <tag-control title="Tags" :value="task.tags" @input="value => task.tags = value" />
        <links-control title="Links" :links="task.links" @input="value => task.links = value" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TaskService from '@/services/Tasks/TaskService'
import TaskGroupService from '@/services/Tasks/TaskGroupService'
import TagControl from '@/components/controls/TagControl.vue'
import LinksControl from '@/components/controls/LinksControl.vue'
//import InputControl from '@/components/controls/InputControl.vue'
import SingleSelectControl from '@/components/controls/SingleSelectControl.vue'
import EditorControl from '@/components/controls/EditorControl.vue'
import StatusControl from '@/components/Task/controls/StatusControl.vue'
import PriorityControl from '@/components/Task/controls/PriorityControl.vue'
import DateControl from '@/components/controls/DateControl.vue'
export default {
  name: 'EditTask',
  components: {
    TagControl,
    LinksControl,
    //InputControl,
    SingleSelectControl,
    StatusControl,
    PriorityControl,
    EditorControl,
    DateControl
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
