<template>
  <b-container fluid class="bg-gradient">
    <b-row>
      <b-col style="max-width: 30rem; margin: 0 auto;">
        <div class="bg-light rounded shadow-inset-z p-4 my-4">
          <h3 class="mb-3 text-center">Register</h3>
          <p class="text-center">Already have an account? <router-link v-bind:to="{ name: 'Login' }">Log in</router-link></p>
          <b-form @submit.prevent="register" class="mt-3">
            <input-control title="Name" :value="name" :error="errors.name" @input="value => name = value" />
            <input-control title="Email" :value="email" :error="errors.email" @input="value => email = value" />
            <input-control title="Password" type="password" :value="password" :error="errors.password" @input="value => password = value" />
            <input-control title="Confirm Password" type="password" :value="password2" :error="errors.password2" @input="value => password2 = value" />
            <div class="text-center">
              <b-button block variant="primary" id="register-button" type="submit">Register</b-button>
            </div>
          </b-form>
        </div>
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
