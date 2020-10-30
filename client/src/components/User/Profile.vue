<template>
  <b-container fluid>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <h3 class="my-0 text-center">Profile</h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <h3>{{profile.name}}</h3>
        <p>{{profile.email}}</p>
        <br>
        <p>More profile features coming soon...</p>
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
