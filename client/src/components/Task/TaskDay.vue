<template>
  <b-card no-body header-bg-variant="white" header-class="py-2 px-3">
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
      <b-list-group-item class="py-2 px-3" v-for="(task) in tasks" v-bind:key="task._id">
        <h6 class="m-0">{{ task.title || 'Untitled' }}</h6>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'TaskDay',
  props: {
    title: { type: String },
    number: { type: Number },
    tasks: { type: Array }
  }
}
</script>

<style>
.priority-col {
  flex: 0 0 30px;
}
</style>