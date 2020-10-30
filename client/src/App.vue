<template>
  <b-container fluid class="d-flex flex-column vh-100 overflow-hidden">
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <b-row>
      <b-col class="p-0">
        <b-navbar sticky type="dark" variant="dark">
          <b-navbar-brand to="/">MEVN Template</b-navbar-brand>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown v-if="$store.state.isLoggedIn" right no-caret>
                <template #button-content>
                  <i class="fas fa-th"></i>
                </template>
                <b-dropdown-item to="/item">Items</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown v-if="$store.state.isLoggedIn" right no-caret>
                <template #button-content>
                  <i class="fas fa-user"></i>
                </template>
                <b-dropdown-item to="/user/profile">Profile</b-dropdown-item>
                <b-dropdown-item to="/user/logout">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-navbar-nav v-else>
                <b-nav-item to="/user/login" active-class="active">Login</b-nav-item>
                <b-nav-item to="/user/register" active-class="active">Register</b-nav-item>
              </b-navbar-nav>
            </b-navbar-nav>
        </b-navbar>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
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
</style>
