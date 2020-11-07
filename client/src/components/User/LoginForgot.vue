<template>
  <b-container fluid class="bg-gradient">
    <b-row>
      <b-col style="max-width: 30rem; margin: 0 auto;">
        <div class="bg-light rounded shadow-inset-z p-4 my-4">
          <h3 class="mb-3 text-center">Forgot Password</h3>
          <p class="text-center">Enter your email address below and we'll send you a link to reset your password.</p>
          <b-form @submit.prevent="resetPassword" class="my-3">
            <input-control title="Email" :value="email" :error="errors.email" @input="value => email = value" />
            <div class="text-center">
              <b-button block variant="primary" id="register-button" type="submit">Reset Password</b-button>
            </div>
          </b-form>
          <p class="text-center">{{ message }}</p>
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
      email: '',
      errors: {},
      message: ''
    }
  },
  methods: {
    async resetPassword () {
      const response = await UserService.forgotPassword({ email: this.email })
      if (response.data.errors) {
        this.errors = response.data.errors
      }
      if (response.data.message) {
        this.message = response.data.message
      }
      console.log(response)
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
