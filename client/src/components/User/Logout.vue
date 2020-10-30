<template>
  <b-container>
  <b-row class="mt-3">
    <h1>Log out</h1>
    <p>{{ helpText }}</p>
  </b-row>
  </b-container>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'Login',
  data () {
    return {
      helpText: 'Logging out...'
    }
  },
  mounted () {
    this.logout()
  },
  methods: {
    logout () {
      UserService.logoutUser()
      this.$store.commit('setIsLoggedIn', false)
      this.helpText = 'You have been logged out'
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
