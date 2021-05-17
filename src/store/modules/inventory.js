import inventoryService from '@/services/inventory'
import userService from '@/services/user'
import { checkApiSuccess } from '../../utils'
import router from '../../router'
import moment from 'moment'

const namespaced = true
const state = {
  categories: [],
  error: '',
  uploadImagesFailed: false,
  currentFolder: null,
  navTableItems: [
    {
      index: 1,
      text: 'Inventory',
      disabled: false
    }
  ],
  inventoryNavFlag: false,
  exportData: {
    categories: [],
    items: []
  },
  exportConfirm: false
}
const mutations = {
  set(state, { type, val }) {
    state[type] = val
  },
  exportData(state, data) {
    state.exportData = data
  }
}
const actions = {
  async createItem({ dispatch, commit, rootState }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    var inventoryId = curUserData.inventories[0]
    const tmp = {
      inventoryId: inventoryId,
      categoryId: payload.folder ? payload.folder.id : null,
      name: payload.name,
      images: payload.images,
      description: payload.notes,
      quantity: parseInt(payload.quantity),
      price: parseFloat(payload.price),
      customFields: payload.customFields ? payload.customFields : []
    }
    inventoryService.createItem(tmp).then((response) => {
      if (checkApiSuccess(response, 'Create Item', dispatch)) {
        const tmpAlert = rootState.popup.pendingAlertToSave
        if (tmpAlert) {
          tmpAlert.itemId = response.data.data.id
          dispatch('alerts/addAlert', tmpAlert, { root: true })
        }
        router.push({ name: 'Inventory' }).then(() => { })
        return response.data.data
      }
    })
  },
  async cloneItems ({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await inventoryService.cloneItems(payload).then((response) => {
      if (checkApiSuccess(response, 'Clone Items', dispatch)) {
        return response.data.data
      }
    })
  },
  async getItemById({ dispatch, commit }, id) {
    dispatch('startFormSubmit', null, { root: true })
    return await inventoryService.getItemById(id).then((response) => {
      if (checkApiSuccess(response, 'Get Item', dispatch)) {
        return response.data.data
      }
    })
  },
  async getInventory({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    await inventoryService.getInventory().then((response) => {
      if (checkApiSuccess(response, 'Get Inventory', dispatch)) {
      }
    })
  },
  async getAllFolders({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await inventoryService.getAllFolders(payload).then((response) => {
      if (checkApiSuccess(response, 'Get All Folders', dispatch)) {
        return response.data.data
      }
    })
  },
  async getCategory({ dispatch, commit }, id) {
    dispatch('startFormSubmit', null, { root: true })
    const payload = {
      id: id
    }
    return await inventoryService
      .getCategory(payload)
      .then(async (response) => {
        if (checkApiSuccess(response, 'Get Category', dispatch)) {
          var temp = response.data.data
          var tmp = {
            ...temp,
            createdAt: moment.utc(temp.createdAt).local().format('MM/DD/YYYY hh:mma'),
            updatedAt: moment.utc(temp.updateAt).local().format('MM/DD/YYYY hh:mma')
          }
          const categories = await dispatch('objectTimeConvert', tmp.categories)
          const items = await dispatch('objectTimeConvert', tmp.items)
          tmp.categories = categories
          tmp.items = items
          return tmp
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  resetCategoriesState({ commit }) {
    commit('set', { type: 'categories', val: [] })
  },
  async getUserProfileSettings({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.profileSettings().then((response) => {
      if (checkApiSuccess(response, 'Get Settings', dispatch)) {
        return response.data.data
      }
    })
  },
  async objectTimeConvert({ dispatch, commit }, payload) {
    const data = []
    let dateTimeFormat = ''
    await dispatch('getUserProfileSettings').then((res) => {
      dateTimeFormat = res
      console.log('d', dateTimeFormat)
    })
    payload.forEach(doc => {
      const tmp = {
        ...doc,
        createdAt: moment.utc(doc.createdAt).local().format(dateTimeFormat.settings.dateTimeFormat.value),
        updatedAt: moment.utc(doc.updateAt).local().format(dateTimeFormat.settings.dateTimeFormat.value)
      }
      data.push(tmp)
    })
    return data
  },
  async getCategories({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    var inventoryId = curUserData.inventories[0]
    const payload = {
      id: inventoryId
    }
    return await inventoryService
      .getCategories(payload)
      .then((response) => {
        if (checkApiSuccess(response, 'Get Folders', dispatch)) {
          const data = response.data.data.categories
          const categories = dispatch('objectTimeConvert', data)
          commit('set', { type: 'categories', categories })
          return categories
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  async getItems({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    var inventoryId = curUserData.inventories[0]
    const payload = {
      id: inventoryId
    }
    return await inventoryService
      .getCategories(payload)
      .then((response) => {
        if (checkApiSuccess(response, 'Get Items', dispatch)) {
          const items = dispatch('objectTimeConvert', response.data.data.items)
          console.log('ITEMS: ', items)
          return items
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  async createFolder({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    const inventoryId = curUserData.inventories[0]
    const tmpPayload = {
      inventoryId: inventoryId,
      name: payload.name,
      image: payload.images[0] ? payload.images[0] : '',
      description: payload.notes,
      parentId: !payload.folder ? null : payload.folder.id
    }
    return inventoryService.createFolder(tmpPayload).then((response) => {
      if (checkApiSuccess(response, 'Create Folder', dispatch)) {
        router.push({ name: 'Inventory' }).then(() => { })
        return response
      }
    })
  },
  async editFolder({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return inventoryService.editFolder(payload).then((response) => {
      if (checkApiSuccess(response, 'Edit Folder', dispatch)) {
        router.push({ name: 'Inventory' }).then(() => { })
        return response
      }
    })
  },
  async deleteFolder({ dispatch, commit }, id) {
    dispatch('startFormSubmit', null, { root: true })
    const payload = {
      id: id
    }
    return inventoryService.deleteFolder(payload).then((response) => {
      if (checkApiSuccess(response, 'Delete Folder', dispatch)) {
        return response
      }
    })
  },
  async deleteItem({ dispatch, commit }, id) {
    dispatch('startFormSubmit', null, { root: true })
    const payload = {
      id: id
    }
    return inventoryService.deleteItem(payload).then((response) => {
      if (checkApiSuccess(response, 'Delete Item', dispatch)) {
        return response
      }
    })
  },
  async copyFolder({ dispatch, commit }, item) {
    dispatch('startFormSubmit', null, { root: true })
    delete item.id
    delete item.type
    if (item.parentId === null) {
      delete item.parentId
    }
    if (item.image === null) {
      delete item.image
    }
    return await inventoryService.createFolder(item).then((response) => {
      if (checkApiSuccess(response, 'Copy Folder', dispatch)) {
        return response.data
      }
    })
  },
  async copyItem({ dispatch, commit }, item) {
    dispatch('startFormSubmit', null, { root: true })
    const payload = {
      inventoryId: item.inventoryId,
      categoryId: item.categoryId,
      sku: item.sku,
      name: item.name,
      description: item.description,
      barcode: item.barcode,
      barcodeFormat: item.barcodeFormat,
      active: item.active,
      quantity: parseInt(item.price),
      price: parseInt(item.price),
      images: []
    }
    return await inventoryService.createItem(payload).then((response) => {
      if (checkApiSuccess(response, 'Copy Item', dispatch)) {
        console.log('success creating Folder', response)
        return response.data
      }
    })
  },
  async editItem({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return inventoryService.editItem(payload).then((response) => {
      if (checkApiSuccess(response, 'Edit Item', dispatch)) {
        router.push({ name: 'Inventory' }).then(() => { })
        return response
      }
    })
  },
  async deleteImage({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await inventoryService.deleteImage(payload).then((response) => {
      if (!checkApiSuccess(response, 'Delete Image', dispatch)) {
        return 'deleting failed'
      }
    })
  },
  async uploadImage({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await inventoryService.uploadImage(payload).then((response) => {
      if (checkApiSuccess(response, 'Upload Image', dispatch)) {
        if (response.data.data.fail.length !== 0) {
          return 'Uploaidng failed'
        } else {
          return response.data.data.success
        }
      } else {
        return 'Uploaidng failed'
      }
    })
  },
  async uploadImages({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    const temp = []
    var failedFlag = false
    for (var i = 0; i < payload.length; i++) {
      await inventoryService.uploadImage(payload[i]).then((response) => {
        if (checkApiSuccess(response, 'Upload Images', dispatch)) {
          if (response.data.data.fail.length !== 0) {
            commit('set', { type: 'uploadImagesFailed', val: true })
            failedFlag = true
          } else {
            commit('set', { type: 'uploadImagesFailed', val: false })
            temp.push(response.data.data.success[0])
          }
        } else {
          failedFlag = true
        }
      })
    }
    if (!failedFlag) {
      return temp
    } else {
      return 'Uploaidng failed'
    }
  },
  async exportItems({ dispatch, commit }, payload) {
    await inventoryService.exportItems(payload).then((response) => {
      return response
    })
  },
  async importItems({ dispatch, commit }, payload) {
    return await inventoryService.importItems(payload).then((response) => {
      if (checkApiSuccess(response, 'Import from csv', dispatch)) {
        return response.data.data.success
      } else {
        return 'Uploading failed'
      }
    })
  }
}
const getters = {
  categories: (state) => {
    return state.categories
  },
  categoryById: (state) => (id) => {
    return state.categories.find((category) => category.id === id)
  },
  uploadImagesFailed: (state) => {
    return state.uploadImagesFailed
  },
  inventoryNavFlag: (state) => {
    return state.inventoryNavFlag
  },
  exportData: (state) => {
    return state.exportData
  },
  exportConfirm: (state) => {
    return state.exportConfirm
  },
  currentFolder: (state) => {
    return state.currentFolder
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
