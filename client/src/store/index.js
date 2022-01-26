import Vue from 'vue'
import Vuex from 'vuex'

import { isPast } from 'date-fns'

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
    },
    icons: {
      completed: { icon: 'fa-check text-success', tooltipText: 'Completed' },
      pastDue: { icon: 'fa-exclamation-triangle text-danger', tooltipText: 'Past due!' },
      nonNegotiable: { icon: 'fa-calendar-times', tooltipText: 'Non-negotiable!' }
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
    },
    getIconsForTask: (state, getters) => (task) => {
      const icons = []
      if (task.status === 'completed') {
        icons.push(state.icons.completed)
        return icons
      }
      if (isPast(new Date(task.dueOn)) && task.status !== 'completed') {
        icons.push(state.icons.pastDue)
      }
      if (task.dueOnIsNegotiable != undefined && !task.dueOnIsNegotiable) {
        icons.push(state.icons.nonNegotiable)
      }
      icons.push({
        icon: getters.getPriorityIcon(task.priority),
        tooltipText: getters.getPriorityText(task.priority)
      })
      return icons
    }
  }
})
