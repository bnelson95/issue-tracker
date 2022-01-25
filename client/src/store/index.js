import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    profile: {},
    priorities: {
      urgent: { text: 'Urgent', icon: 'fa-exclamation text-danger', rank: 0 },
      high: { text: 'High', icon: 'fa-angle-double-up text-danger', rank: 1 },
      normal: { text: 'Normal', icon: 'fa-equals text-warning', rank: 2 },
      low: { text: 'Low', icon: 'fa-angle-down text-success', rank: 3 }
    }
  },
  mutations: {
    setIsLoggedIn (state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    setProfile (state, profile) {
      state.profile = profile
    }
  },
  getters: {
    getPriorityText: (state) => (key) => {
      return state.priorities[key].text
    },
    getPriorityIcon: (state) => (key) => {
      return state.priorities[key].icon
    },
    getPriorityRank: (state) => (key) => {
      return state.priorities[key].rank
    }
  }
})
