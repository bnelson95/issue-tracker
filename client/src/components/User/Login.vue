<template>
  <b-container fluid>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <h3 class="my-0 text-center">Log in</h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <p class="text-center">Need an account? <router-link v-bind:to="{ name: 'Register' }">Register</router-link></p>
        <b-card class="mt-3 rounded-0" style="max-width: 25rem; margin: 0 auto;">
          <b-form @submit.prevent="login">
            <input-control title="Email" :value="email" :error="errors.email" @input="value => email = value" />
            <input-control type="password" title="Password" :value="password" :error="errors.password" @input="value => password = value" />
            <div class="text-center">
              <b-button block class="rounded-0" variant="primary" id="login-button" type="submit">Log in</b-button>
            </div>
          </b-form>
        </b-card>
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
#login-button {
  align-self: center;
}
.content-footer {
  display: flex;
  justify-content: center;
}
</style>
