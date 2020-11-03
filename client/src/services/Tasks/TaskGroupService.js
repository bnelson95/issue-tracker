import Api from '@/services/Api'

export default {
  fetchTaskGroups () {
    return Api().get('task-group')
  },
  addTaskGroup (params) {
    return Api().post('task-group', params)
  },
  updateTaskGroup (params) {
    return Api().put('task-group/' + params._id, params)
  },
  getTaskGroup (params) {
    return Api().get('task-group/' + params._id, params)
  },
  deleteTaskGroup (params) {
    return Api().delete('task-group/' + params._id, params)
  }
}
