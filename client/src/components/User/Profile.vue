<template>
  <b-container fluid>
    <b-row class="bg-light border-bottom py-3" align-v="center">
      <b-col>
        <h3 class="my-0 text-center">Account</h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col sm="0" md="1" lg="2" xl="2"></b-col>
      <b-col sm="6" md="5" lg="4" xl="4">
        <h5>Profile</h5>
        <p>Your email address is your identity on Task Organizer and is used to log in.</p>
        <br>
      </b-col>
      <b-col sm="6" md="5" lg="4" xl="4">
        <input-control title="Email" type="email" :value="newEmail" :error="profileErrors.email" @input="value => newEmail = value" />
        <input-control title="Name" :value="newName" :error="profileErrors.name" @input="value => newName = value" />
        <b-button-group class="d-flex">
          <b-button class="mr-3" variant="primary" :disabled="!canSaveProfile" @click="updateProfile">Save Profile</b-button>
          <b-button variant="secondary" :disabled="!canCancelSaveProfile" @click="cancelProfileChange">Cancel</b-button>
        </b-button-group>
      </b-col>
      <b-col sm="0" md="1" lg="2" xl="2"></b-col>
    </b-row>
    <hr>
    <b-row class="mt-3">
      <b-col sm="0" md="1" lg="2" xl="2"></b-col>
      <b-col sm="6" md="5" lg="4" xl="4">
        <h5>Password</h5>
        <p>Changing your password will require you to log in again.</p>
        <br>
      </b-col>
      <b-col sm="6" md="5" lg="4" xl="4">
        <input-control title="Current Password" type="password" :value="currentPassword" :error="passwordErrors.currentPassword" @input="value => currentPassword = value" />
        <input-control title="New Password" type="password" :value="newPassword" :error="passwordErrors.newPassword" @input="value => newPassword = value" />
        <input-control title="Confirm New Password" type="password" :value="newPassword2" :error="passwordErrors.newPassword2" @input="value => newPassword2 = value" />
        <b-button-group class="d-flex">
          <b-button class="mr-3" variant="primary" :disabled="!canChangePassword" @click="updatePassword">Update Password</b-button>
          <b-button variant="secondary" :disabled="!canCancelChangePassword" @click="cancelPasswordChange">Cancel</b-button>
        </b-button-group>
      </b-col>
      <b-col sm="0" md="1" lg="2" xl="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import InputControl from '@/components/controls/InputControl.vue'
import UserService from '@/services/UserService'
export default {
  name: 'profile',
  components: {
    InputControl
  },
  data () {
    return {
      profile: {},
      profileErrors: {},
      passwordErrors: {},
      newName: '',
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const response = await UserService.getProfile()
      this.profile = response.data.profile
      this.newName = this.profile.name
      this.newEmail = this.profile.email
    },
    async updateProfile () {
      const response = await UserService.updateProfile({
        name: this.newName,
        email: this.newEmail
      })
      if (response.data.errors) {
        this.profileErrors = response.data.errors
      } else if (response.data.profile) {
        this.profileErrors = {}
        this.profile = response.data.profile
        this.newName = this.profile.name
        this.newEmail = this.profile.email
      }
    },
    async updatePassword () {
      const response = await UserService.updatePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        newPassword2: this.newPassword2
      })
      if (response.data.errors) {
        this.passwordErrors = response.data.errors
      } else if (response.data.user) {
        this.passwordErrors = {}
        this.cancelPasswordChange()
      }
    },
    cancelProfileChange () {
      this.profileErrors = {}
      this.newName = this.profile.name
      this.newEmail = this.profile.email
    },
    cancelPasswordChange () {
      this.currentPassword = ''
      this.newPassword = ''
      this.newPassword2 = ''
    }
  },
  computed: {
    canSaveProfile: function () {
      return this.newEmail && this.profile && (this.profile.email !== this.newEmail || this.profile.name !== this.newName)
    },
    canCancelSaveProfile: function () {
      return this.profile && (this.profile.email !== this.newEmail || this.profile.name !== this.newName)
    },
    canChangePassword: function () {
      return this.currentPassword && this.newPassword && this.newPassword2
    },
    canCancelChangePassword: function () {
      return this.currentPassword || this.newPassword || this.newPassword2
    }
  },
}
</script>

<style scoped>

</style>
