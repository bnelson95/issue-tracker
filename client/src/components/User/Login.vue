<template>
  <b-container fluid class="bg-gradient">
    <b-row>
      <b-col style="max-width: 30rem; margin: 0 auto;">
        <div class="bg-light rounded shadow-inset-z p-4 my-4">
          <h3 class="mb-3 text-center">Log in</h3>
          <p class="text-center">Need an account? <router-link v-bind:to="{ name: 'Register' }">Register</router-link></p>
          <b-form @submit.prevent="login" class="mt-3">
            <input-control title="Email" :value="email" :error="errors.email" @input="value => email = value" />
            <input-control type="password" title="Password" :value="password" :error="errors.password" @input="value => password = value" />
            <div class="text-center">
              <b-button block variant="primary" type="submit">Log in</b-button>
            </div>
          </b-form>
          <p class="text-center mt-3">
            <router-link v-bind:to="{ name: 'LoginForgot' }">Forgot your password?</router-link>
          </p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import InputControl from '@/components/controls/InputControl.vue'
import UserService from '@/services/UserService'
export default {
  name: 'Login',
  components: {
    InputControl
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    login () {
      UserService
        .loginUser({
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.data.errors) {
            this.errors = response.data.errors
          } else if (response.data.token) {
            this.$store.commit('setIsLoggedIn', true)
            this.$router.push(this.$route.query.redirect || { name: 'Tasks' })
          }
        })
    }
  }
}
</script>

<style scoped>
.inset-shadow {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
