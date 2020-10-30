<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <h1 class="text-center">Register</h1>
        <p class="text-center">Already have an account? <router-link v-bind:to="{ name: 'Login' }">Log in</router-link></p>
        <b-card class="mt-3" style="max-width: 25rem; margin: 0 auto;">
          <b-form @submit.prevent="register">
            <div>
              <label class="mb-0" for="register-name">Name</label>
              <b-input type="text" placeholder="Blake Nelson" v-model="name" id="register-name" />
              <p class="error">{{ errors.name }}</p>
            </div>
            <div class="mt-3">
              <label class="mb-0" for="register-email">Email</label>
              <b-input type="email" placeholder="hello@email.com" v-model="email" id="register-email" />
              <p class="error">{{ errors.email }}</p>
            </div>
            <div class="mt-3">
              <label class="mb-0" for="register-password">Password</label>
              <b-input type="password" placeholder="Password1!" v-model="password" id="register-password" />
              <p class="error">{{ errors.password }}</p>
            </div>
            <div class="mt-3">
              <label class="mb-0" for="register-password2">Confirm Password</label>
              <b-input type="password" placeholder="Password1!" v-model="password2" id="register-password2" />
              <p class="error">{{ errors.password2 }}</p>
            </div>
            <div class="mt-3 text-center">
              <b-button variant="primary" id="register-button" type="submit">Register</b-button>
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
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  },
  methods: {
    async register () {
      const response = await UserService.registerUser({
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2
      })
      if (response.data.errors) {
        this.errors = response.data.errors
      } else if (response.data.user) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: crimson;
  font-size: 0.8rem;
}
</style>
