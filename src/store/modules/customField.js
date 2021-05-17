import customFieldService from '@/services/customField'
import { checkApiSuccess } from '../../utils'

const namespaced = true
const state = {
  customFields: [],
  currentCustomField: null
}
const mutations = {
  set(state, { type, val }) {
    state[type].push(val)
    console.log('ss', state[type])
  }
}
const actions = {
  async getCustomFieldsList({ dispatch, commit, rootState }, payload) {
    return await customFieldService.getCustomFieldsList(payload).then((response) => {
      if (checkApiSuccess(response, 'Get Custom Field List', dispatch)) {
        commit('set', { type: 'customFields', val: response.data.data })
        return response.data.data
      }
    })
  },
  async getCustomField({ dispatch, commit, rootState }, payload) {
    return await customFieldService.getCustomField(payload).then((response) => {
      if (checkApiSuccess(response, 'Get Custom Fields', dispatch)) {
        console.log('ee', response.data.data)
        commit('set', { type: 'customFields', val: response.data.data })
        return response.data.data
      }
    })
  },
  async addCustomField({ dispatch, commit, rootState }, payload) {
    return await customFieldService.addCustomField(payload).then((response) => {
      if (checkApiSuccess(response, 'Add Custom Field', dispatch)) {
        console.log('RESPONSE ADDING CUSTOM FIELD', response.data.data)
        // commit('set', { type: 'customFields', val: response.data.data })
        return response.data.data
      }
    })
  }

}
const getters = {
  customFields: (state) => {
    return state.customFields
  },
  currentCustomField: (state) => {
    return state.currentCustomField
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
