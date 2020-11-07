<template>
  <div class="shadow-z mb-3 p-1 rounded bg-white">
    <div class="bg-white rounded-top mx-2">
      <span class="title">{{ title }}</span>
      <span class="float-right"><i v-if="icon" :class="'fas ' + icon"></i></span>
    </div>
    <div class="">
      <slot name="control-content"></slot>
    </div>
    <div v-if="error">
      <span class="error mx-2">{{ error }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ControlWrapper',
  props: {
    title: { type: String },
    error: { type: String },
    icon: { type: String }
  }
}
</script>

<style>
.title {
  font-size: 0.9rem;
  font-weight: bold;
}
.error {
  font-size: 0.8rem;
  color: crimson;
}
</style>
