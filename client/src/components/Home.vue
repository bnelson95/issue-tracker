<template>
  <b-container fluid>
    <b-row class="py-5 bg-gradient-computer h-500px" align-v="center">
      <b-col class="text-center text-white">
        <h1 class="display-4 text-white"><b>Keep track of everything</b></h1>
        <h5 class="m-3">Create tasks, categorize them in groups, and manage their status and priority.</h5>
        <h5 class="m-3">Get more done with Briskar.</h5>
        <b-button class="m-3 px-5" size="lg" variant="primary" href="/user/register">Get Started</b-button>
      </b-col>
    </b-row>
    <b-row class="py-5 text-center" align-v="center">
      <b-col cols="12">
        <h1 class="">Tasks</h1>
      </b-col>
      <b-col md="4" class="my-3" align-self="end">
        <h5 class="m-0">Capture Ideas into Tasks</h5>
        <b-img src="../assets/edit-task.png" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col md="4" class="my-3" align-self="end">
        <h5 class="m-0">Organize your Tasks into Groups</h5>
        <b-img src="../assets/task-groups.png" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col md="4" class="my-3" align-self="end">
        <h5 class="m-0">Keep Track of your Progress</h5>
        <b-img src="../assets/tasks.png" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col cols="12">
              <b-button class="m-3 px-5" size="lg" variant="primary" href="/user/register">Get Started</b-button>
      </b-col>
    </b-row>
    <custom-footer />
  </b-container>
</template>

<script>
import CustomFooter from '@/components/CustomFooter'
export default {
  components: {
    CustomFooter
  }
}
</script>