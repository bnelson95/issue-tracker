<template>
  <b-container fluid>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <h3 class="my-0 text-center">Reset Password</h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col style="max-width: 30rem; margin: 0 auto;">
        <p class="text-center">Enter a new password below.</p>
        <b-card class="my-3" >
          <b-form @submit.prevent="savePassword">
            <input-control title="New Password" type="password" :value="newPassword" :error="errors.newPassword" @input="value => newPassword = value" />
            <input-control title="Confirm New Password" type="password" :value="newPassword2" :error="errors.newPassword2" @input="value => newPassword2 = value" />
            <div class="text-center">
              <b-button block variant="primary" id="register-button" type="submit">Save Password</b-button>
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
