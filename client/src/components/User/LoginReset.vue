<template>
  <b-container fluid class="bg-gradient">
    <b-row>
      <b-col style="max-width: 30rem; margin: 0 auto;">
        <div class="bg-light rounded shadow-inset-z p-4 my-4">
          <h3 class="mb-3 text-center">Reset Password</h3>
          <p class="text-center">Enter a new password below.</p>
          <b-form @submit.prevent="savePassword" class="my-3">
            <input-control title="New Password" type="password" :value="newPassword" :error="errors.newPassword" @input="value => newPassword = value" />
            <input-control title="Confirm New Password" type="password" :value="newPassword2" :error="errors.newPassword2" @input="value => newPassword2 = value" />
            <div class="text-center">
              <b-button block variant="primary" id="register-button" type="submit">Save Password</b-button>
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
      newPassword: '',
      newPassword2: '',
      errors: {},
      message: ''
    }
  },
  methods: {
    async savePassword () {
      this.errors = {}
      this.message = ""
      const response = await UserService.resetPassword({
        id: this.$route.params.id,
        newPassword: this.newPassword,
        newPassword2: this.newPassword2
      })
      if (response.data.errors) {
        this.errors = response.data.errors
      }
      if (response.data.message) {
        this.message = response.data.message
      }
      console.log(response)
      //this.$router.push({ name: 'Login' })
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
