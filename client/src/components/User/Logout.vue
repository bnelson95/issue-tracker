<template>
  <b-container>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <h3 class="my-0 text-center">Log out</h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
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
