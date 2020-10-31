import Api from '@/services/Api'

export default {
  registerUser (params) {
    return Api().post('/user/register', params)
  },
  loginUser (params) {
    return Api().post('/user/login', params)
  },
  logoutUser () {
    return Api().get('/user/logout')
  },
  getProfile () {
    return Api().get('/user/profile')
  },
  updateProfile (params) {
    return Api().post('/user/profile', params)
  },
  updatePassword (params) {
    return Api().post('/user/password', params)
  },
  forgotPassword (params) {
    return Api().post('/user/login/forgot', params)
  },
  resetPassword (params) {
    return Api().post('/user/login/reset/' + params.id, params)
  }
}
