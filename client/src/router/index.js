import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Items from '@/components/Items'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Logout from '@/components/User/Logout'
import Profile from '@/components/User/Profile'
import UserService from '@/services/UserService'
import { store } from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/item',
      name: 'Items',
      component: Items,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    try {
      const response = await UserService.getProfile()
      store.commit('setIsLoggedIn', response.data.profile ? true : false)
    } catch {
      store.commit('setIsLoggedIn', false)
    }

    if (!store.state.isLoggedIn) {
      next({
        path: '/user/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
