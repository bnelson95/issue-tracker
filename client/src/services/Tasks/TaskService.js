import Api from '@/services/Api'

export default {
  fetchTasks () {
    return Api().get('task')
  },

  addTask (params) {
    return Api().post('task', params)
  },

  updateTask (params) {
    console.log(params)
    return Api().put('task/' + params._id, params)
  },

  getTask (params) {
    return Api().get('task/' + params._id, params)
  },

  deleteTask (params) {
    console.log(params)
    return Api().delete('task/' + params._id, params)
  }
}
