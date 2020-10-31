<template>
  <b-container fluid>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <h3 class="my-0 text-center">Forgot Password</h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col style="max-width: 30rem; margin: 0 auto;">
        <p class="text-center">Enter your email address below and we'll send you a link to reset your password.</p>
        <b-card class="my-3" >
          <b-form @submit.prevent="resetPassword">
            <input-control title="Email" :value="email" :error="errors.email" @input="value => email = value" />
            <div class="text-center">
              <b-button block variant="primary" id="register-button" type="submit">Reset Password</b-button>
            </div>
          </b-form>
        </b-card>
        <p class="text-center">{{ message }}</p>
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
