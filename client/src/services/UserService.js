import Api from '@/services/Api'

export default {
  registerUser (params) {
    return Api().post('/user/register', params)
  },
  loginUser (params) {
    return Api().post('/user/login', params)
  },
  logoutUser () {
    return Api().get('/user/logout', { withCredentials: true })
  },
  getProfile () {
    return Api().get('/user/profile', { withCredentials: true })
  }
}
