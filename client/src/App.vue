<template>
  <div>
    <b-navbar sticky type="white" variant="white" class="bar">
      <b-navbar-brand :to="$store.state.isLoggedIn ? '/task' : '/'" class="brand">
        BRISKAR
      </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="$store.state.isLoggedIn" right no-caret>
            <template #button-content>
              <i class="fas fa-bars"></i>
            </template>
            <b-dropdown-item to="/item"><i class="fas mr-3 fa-lightbulb"></i>Thoughts</b-dropdown-item>
            <b-dropdown-item to="/task"><i class="fas mr-3 fa-check-double"></i>Tasks</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="$store.state.isLoggedIn" right no-caret>
            <template #button-content>
              <i class="fas fa-user"></i>
            </template>
            <b-dropdown-item to="/user/profile"><i class="fas mr-3 fa-user-cog"></i>Account</b-dropdown-item>
            <b-dropdown-item to="/user/logout"><i class="fas mr-3 fa-sign-out-alt"></i>Logout</b-dropdown-item>
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
  margin: 0;
}
a {
  color: skyblue;
}
[contenteditable] {
  outline: none;
}
[contenteditable]:hover {
  cursor: text;
}
h3[contenteditable] {
    border: 1px solid transparent;
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
.brand {
  font-weight: bold;
  letter-spacing: 4px;
  color: goldenrod !important;
}
.bar {
  border: 0;
  border-bottom: 3px solid;
  border-image-source: linear-gradient(90deg, goldenrod, skyblue);
  border-image-slice: 1;
}
.nav-link {
    color: skyblue !important;
}
.dropdown-item {
  border-radius: 4px;
  padding-left: 1rem;
}
.b-nav-dropdown .dropdown-item,
.b-nav-dropdown .dropdown-item:hover {
  color: goldenrod;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.dropdown-menu {
  padding: 0;
}
.shadow-inset-z {
  box-shadow: inset 0 -0.2rem 0.9rem rgba(0, 0, 0, 0.1) !important;
}
.fixed-col-150 {
  flex: 0 0 150px;
}
.fixed-col-200 {
  flex: 0 0 200px;
}
.bg-gradient {
  background-image: linear-gradient(45deg, goldenrod, skyblue);
  top: 57px;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: auto;
  height: auto;
}
.bg-gradient-computer {
  background-image: linear-gradient(45deg, rgba(255, 195, 43, 0.8), rgba(120, 184, 209, 0.85)), url('./assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg');
  background-size: cover;
}
.modal-content, .modal-header, .modal-footer {
  border: 0;
}
.h-500px {
  min-height: 500px;
}
</style>
