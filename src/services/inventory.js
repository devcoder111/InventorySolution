import a from 'axios'
import config from './../config'
const token = localStorage.getItem('token')
a.defaults.headers.common = { Authorization: `Bearer ${token}` }
const headers = {
  'Content-Type': 'application/json'
}
const prefixEndpoint = config.apiBaseUrl
export default {
  getToken() {
    const token = localStorage.getItem('token')
    a.defaults.headers.common = { Authorization: `Bearer ${token}` }
  },
  createItem(payload) {
    console.log('payload item: ', payload)
    return a.post(prefixEndpoint + 'item/add', payload, headers)
  },
  createFolder(payload) {
    return a.post(prefixEndpoint + 'category/add', payload, headers)
  },
  editFolder(payload) {
    console.log('editfolder-service', payload)
    return a.post(prefixEndpoint + 'category/update', payload, headers)
  },
  editItem(payload) {
    return a.post(prefixEndpoint + 'item/update', payload, headers)
  },
  deleteFolder(payload) {
    console.log('delserveic', payload)
    return a.post(prefixEndpoint + 'category/delete', payload, headers)
  },
  deleteItem(payload) {
    return a.post(prefixEndpoint + 'item/delete', payload, headers)
  },
  cloneItems(payload) {
    console.log('PAYLOAD CLONE: ', JSON.stringify(payload))
    return a.post(prefixEndpoint + 'category/clone', payload, headers)
  },
  getInventory(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'profile', headers)
  },
  getCategories(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'inventory', payload, headers)
  },
  getAllFolders(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'category/all', payload, headers)
  },
  getCategory(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'category', payload, headers)
  },
  getItemById(id) {
    this.getToken()
    const payload = { id: id }
    return a.post(prefixEndpoint + 'item', payload, headers)
  },
  deleteImage(payload) {
    const headers1 = {
      'Content-Type': 'multipart/form-data'
    }
    return a.post(prefixEndpoint + 'image/delete', payload, headers1)
  },
  uploadImage(payload) {
    const headers1 = {
      'Content-Type': 'multipart/form-data'
    }
    return a.post(prefixEndpoint + 'image/upload', payload, headers1)
  },
  exportItems(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'category/export', payload, { responseType: 'blob' }).then((response) => {
      const url = URL.createObjectURL(new Blob([response.data], {
        type: 'application/zip'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'export.zip')
      document.body.appendChild(link)
      link.click()
    })
  },
  importItems(payload) {
    return a.post(prefixEndpoint + 'category/import', payload)
  }

}
