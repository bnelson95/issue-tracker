<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <h1 class="text-center">Register</h1>
        <p class="text-center">Already have an account? <router-link v-bind:to="{ name: 'Login' }">Log in</router-link></p>
        <b-card class="rounded-0 mt-3" style="max-width: 25rem; margin: 0 auto;">
          <b-form @submit.prevent="register">
            <input-control title="Name" :value="name" :error="errors.name" @input="value => name = value" />
            <input-control title="Email" :value="email" :error="errors.email" @input="value => email = value" />
            <input-control title="Password" :value="password" :error="errors.password" @input="value => password = value" />
            <input-control title="Confirm Password" :value="password2" :error="errors.password2" @input="value => password2 = value" />
            <div class="text-center">
              <b-button class="rounded-0" variant="primary" id="register-button" type="submit">Register</b-button>
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
  name: 'Register',
  components: {
    InputControl
  },
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
