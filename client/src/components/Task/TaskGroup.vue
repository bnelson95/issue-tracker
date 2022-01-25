<template>
  <b-card no-body
    header-bg-variant="white"
    :header-text-variant="cardBorderVariant">
    <template v-slot:header>
      <p class="m-0">
        <i :class="'mr-2 fas ' + icon"></i>
        <b>{{ title }}</b>
      </p>
    </template>
    <b-list-group flush>
      <b-list-group-item :class="{'task':true, 'p-0':true }" v-for="(task) in orderedTasks"
        v-bind:key="task._id"
        v-b-toggle="'accordian-' + task._id">
        <b-row no-gutters class="align-items-center">
          <b-col class="ml-3 my-2 text-nowrap overflow-hidden">
            <h6 class="m-0">{{ task.title || 'Untitled' }}</h6>
          </b-col> 
          <b-col class="priority-col text-center">
            <i :class="'fas ' + getPriorityIcon(task)"></i>
          </b-col>
        </b-row>
          <b-collapse :id="'accordian-' + task._id" accordion="my-accordion">
            <div v-if="task.tags" class="mx-3 my-0">
              <div class="mb-2">
              <b-badge v-for="tag in task.tags" v-bind:key="tag" class="mr-1">
                {{ tag }}
              </b-badge>
              </div>
            </div>
            <b-row class="m-1" align-h="center">
              <b-col class="p-0">
                <b-button v-if="leftButtonClick" block :variant="leftButtonVariant" @click="leftButtonClick(task)">
                  <i :class="'mr-1 fas '+leftButtonIcon"></i> {{ leftButtonText }}
                </b-button>
              </b-col>
              <b-col class="mx-1 px-0">
                <b-button block variant="outline-secondary" @click="$router.push({ name: 'EditTask', params: { id: task._id } })">
                  <i class="mr-1 fas fa-edit"></i> Edit
                </b-button>
              </b-col>
              <b-col class="p-0">
                <b-button v-if="rightButtonClick" block class="" :variant="rightButtonVariant" @click="rightButtonClick(task)">
                  <i :class="'mr-1 fas '+rightButtonIcon"></i> {{ rightButtonText }}
                </b-button>
              </b-col>
            </b-row>
            <!--</b-button-group>-->
          </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    cardBorderVariant: { type: String },
    title: { type: String },
    icon: { type: String },
    tasks: { type: Array },
    completeTask: { type: Function },
    leftButtonVariant: { type: String },
    leftButtonText: { type: String },
    leftButtonIcon: { type: String },
    leftButtonClick: { type: Function },
    rightButtonVariant: { type: String },
    rightButtonText: { type: String },
    rightButtonIcon: { type: String },
    rightButtonClick: { type: Function }
  },
  computed: {
    orderedTasks: function () {
      return _.orderBy(this.tasks, (task) => this.getPriorityRank(task))
    }
  },
  methods: {
    getPriorityIcon (task) {
      return this.$store.getters.getPriorityIcon(task.priority)
    },
    getPriorityRank (task) {
      return this.$store.getters.getPriorityRank(task.priority)
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
.card-header {
  padding: 0.5rem 1rem;
}
</style>
