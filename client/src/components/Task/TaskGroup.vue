<template>
  <b-card no-body
    class="border-bottom-0"
    :header-bg-variant="cardBorderVariant"
    header-text-variant="white">
    <template v-slot:header>
      <h5 class="mb-0">
        <i :class="'mr-2 fas ' + icon"></i>
        <b>{{ title }}</b>
        <b-badge variant="light" class="m-auto float-right">{{ tasks.length }}</b-badge>
      </h5>
    </template>
    <b-list-group flush class="rounded-0">
      <b-list-group-item :class="{'task':true, 'p-0':true, 'border-bottom':i==orderedTasks.length-1}" v-for="(task, i) in orderedTasks"
        v-bind:key="task._id"
        v-b-toggle="'accordian-' + task._id">
        <b-row no-gutters class="align-items-center">
          <b-col class="ml-3 my-2 text-nowrap overflow-hidden">
            {{ task.title || 'Untitled' }}
          </b-col>
          <b-col class="priority-col text-center">
            <i :class="'fas ' + getPriorityIcon(task)"></i>
          </b-col>
        </b-row>
          <b-collapse :id="'accordian-' + task._id" accordion="my-accordion">
            <div v-if="task.tags" class="mx-3 mb-2">
              <b-badge v-for="tag in task.tags" v-bind:key="tag" class="mr-1">
                {{ tag }}
              </b-badge>
            </div>
            <div v-if="task.description" class="mx-3 mb-2"><span v-html="task.description"></span></div>
            <b-button-group class="d-flex border-top">
              <slot name="action-buttons" :task="task"></slot>
            </b-button-group>
          </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      priorities: { // TODO translate
        'urgent': { text: 'Urgent', icon: 'fa-exclamation text-danger', rank: 0 },
        'high': { text: 'High', icon: 'fa-angle-double-up text-warning', rank: 1 },
        'normal': { text: 'Normal', icon: '', rank: 2 },
        'low': { text: 'Low', icon: 'fa-angle-down text-success', rank: 3 }
      }
    }
  },
  props: {
    cardBorderVariant: { type: String },
    title: { type: String },
    icon: { type: String },
    tasks: { type: Array },
    completeTask: { type: Function }
  },
  computed: {
    orderedTasks: function () {
      return _.orderBy(this.tasks, (task) => this.getPriorityRank(task))
    }
  },
  methods: {
    getPriorityIcon (task) {
      return this.priorities[task.priority].icon
    },
    getPriorityRank (task) {
      return this.priorities[task.priority].rank
    }
  }
}
</script>

<style scoped lang="scss">
// Import Bootstrap and BootstrapVue source SCSS files
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
@import '../../../node_modules/bootstrap-vue/src/index.scss';

.task {
  outline: none;
}
.priority-col {
  flex: 0 0 40px;
}
</style>
