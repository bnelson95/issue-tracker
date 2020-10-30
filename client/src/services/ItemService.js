import Api from '@/services/Api'

export default {
  getItems () {
    return Api().get('item')
  },
  addItem (params) {
    return Api().post('item', params)
  },
  updateItem (params) {
    return Api().put('item/' + params.id, params)
  },
  getItem (params) {
    return Api().get('item/' + params.id, params)
  },
  deleteItem (params) {
    return Api().delete('item/' + params.id, params)
  }
}
