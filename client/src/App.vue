<template>
  <div>
    <b-navbar sticky type="dark" variant="dark">
      <b-navbar-brand :to="$store.state.isLoggedIn ? '/task' : '/'">Task Organizer</b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="$store.state.isLoggedIn" right no-caret>
            <template #button-content>
              <i class="fas fa-th"></i>
            </template>
            <b-dropdown-item to="/task">Tasks</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="$store.state.isLoggedIn" right no-caret>
            <template #button-content>
              <i class="fas fa-user"></i>
            </template>
            <b-dropdown-item to="/user/profile">Account</b-dropdown-item>
            <b-dropdown-item to="/user/logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav v-else>
            <b-nav-item to="/user/login" active-class="active">Login</b-nav-item>
            <b-nav-item to="/user/register" active-class="active">Register</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  async mounted() {
    try {
      const response = await UserService.getProfile()
      this.$store.commit('setIsLoggedIn', response.data.profile ? true : false)
    } catch {
      this.$store.commit('setIsLoggedIn', false)
    }
  }
}
</script>

<style>
body {
  font-family: 'Quicksand', sans-serif !important;
}
p {
  margin: 0
}
[contenteditable] {
  outline: none;
}
[contenteditable]:hover {
  cursor: text;
}
.editor[contenteditable]:hover, .editor[contenteditable]:focus {
  background-color: white;
}
.card, .card-header, button {
  border-radius: 0 !important;
}
button:hover {
  outline: none;
}
button:focus {
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none !important;
}
.b-form-tags {
  box-shadow: none !important;
  border: none;
}
.fixed-col-120 {
  flex: 0 0 120px;
}
.fixed-col-175 {
  flex: 0 0 175px;
}
</style>
