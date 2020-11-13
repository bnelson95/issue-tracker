import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    profile: {}
  },
  mutations: {
    setIsLoggedIn (state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    setProfile (state, profile) {
      state.profile = profile
    }
  }
})
