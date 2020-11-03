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
  margin: 0
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
.editor[contenteditable]:hover, .editor[contenteditable]:focus {
  background-color: white;
  border: 1px solid #dee2e6;
}
button, .btn {

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
.brand {
  font-weight: bold;
  letter-spacing: 4px;
  color: goldenrod !important;
}
.bar {
  border-bottom: 2px solid;
  border-image-source: linear-gradient(90deg, goldenrod, skyblue);
  border-image-slice: 1;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
}
.nav-link {
    color: skyblue !important;
}
.dropdown-item, .dropdown-item:hover {
  color: goldenrod;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.dropdown-menu {
  top: 46px;
  border: 2px solid lightgray;
  border-top: none;
  padding: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
