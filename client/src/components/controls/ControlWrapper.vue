<template>
  <div class="border mb-3 rounded">
    <div class="bg-light rounded-top border-bottom py-1">
      <span class="title mx-2">{{ title }}</span>
      <span class="mx-2 float-right"><i v-if="icon" :class="'fas ' + icon"></i></span>
    </div>
    <div class="">
      <slot name="control-content"></slot>
    </div>
    <div v-if="error" class="bg-light border-top">
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
