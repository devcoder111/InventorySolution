import a from 'axios'
import config from './../config'
// const token = config.token
const token = localStorage.getItem('token')
a.defaults.headers.common = { Authorization: `Bearer ${token}` }
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
const prefixEndpoint = config.apiBaseUrl

export default {
  getToken() {
    const token = localStorage.getItem('token')
    a.defaults.headers.common = { Authorization: `Bearer ${token}` }
  },
  getCustomFieldsList(payload) {
    return a.post(prefixEndpoint + 'custom-field/list', payload, headers)
  },
  getCustomField(payload) {
    return a.post(prefixEndpoint + 'custom-field', payload, headers)
  },
  addCustomField(payload) {
    return a.post(prefixEndpoint + 'custom-field/add', payload, headers)
  },
  deleteCustomField(payload) {
    return a.post(prefixEndpoint + 'custom-field/delete', payload, headers)
  },
  deleteCustomFieldFromItem(payload) {
    return a.post(prefixEndpoint + 'custom-field/value/delete', payload, headers)
  },
  changeCustomField(payload) {
    return a.post(prefixEndpoint + 'custom-field/update', payload, headers)
  }
}
