<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <h1 class="text-center">Log in</h1>
        <p class="text-center">Need an account? <router-link v-bind:to="{ name: 'Register' }">Register</router-link></p>
        <b-card class="mt-3" style="max-width: 25rem; margin: 0 auto;">
          <b-form @submit.prevent="login">
            <div>
              <label class="mb-0" for="login-email">Email</label>
              <b-input type="email" placeholder="hello@email.com" v-model="email" id="login-email" />
              <p class="error">{{ errors.email }}</p>
            </div>
            <div class="mt-3">
              <label class="mb-0" for="login-password">Password</label>
              <b-input type="password" placeholder="Password1!" v-model="password" id="login-password" />
              <p class="error">{{ errors.password }}</p>
            </div>
            <div class="mt-3 text-center">
              <b-button variant="primary" id="login-button" type="submit">Log in</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'Login',
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
            this.$router.push(this.$route.query.redirect || { name: 'Profile' })
          }
        })
    }
  }
}
</script>

<style scoped>
.error {
  color: crimson;
  font-size: 0.8rem;
}
#login-button {
  align-self: center;
}
.content-footer {
  display: flex;
  justify-content: center;
}
</style>
