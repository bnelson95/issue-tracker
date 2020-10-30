<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <h1>Profile</h1>
        <h3>Hello, {{profile.name}}!</h3>
        <p>{{profile.email}}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'profile',
  data () {
    return {
      profile: {}
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const response = await UserService.getProfile()
      this.profile = response.data.profile
    }
  }
}
</script>

<style scoped>

</style>
