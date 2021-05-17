import {
  SET_FORM_DATA_ORIGIN,
  SET_FORM_DATA_NEW,
  SET_NEED_CHECK_FORM_ON,
  SET_NEED_CHECK_FORM_OFF,
  SET_SUBMIT_FORM_ERROR,
  SET_SUBMIT_FORM_ERROR_DATA
} from '../constant/mutation-types'

const namespaced = true
const state = {
  formDataOrigin: null,
  formDataNew: null,
  isFormChanged: false,
  isNeedCheckForm: true,
  submitError: false,
  submitErrorMessageData: null
}
const mutations = {
  [SET_NEED_CHECK_FORM_ON](state) {
    state.isNeedCheckForm = true
  },
  [SET_NEED_CHECK_FORM_OFF](state) {
    state.isNeedCheckForm = false
  },
  [SET_FORM_DATA_ORIGIN](state, data) {
    state.formDataOrigin = JSON.parse(JSON.stringify(data))
    state.isFormChanged = false
    state.isNeedCheckForm = true
  },
  [SET_FORM_DATA_NEW](state, data) {
    if (!state.formDataOrigin) {
      state.formDataOrigin = JSON.parse(JSON.stringify(data))
      state.isFormChanged = false
      state.isNeedCheckForm = true
    }
    state.formDataNew = JSON.parse(JSON.stringify(data))
    const changedKeys = Object.keys(state.formDataOrigin).filter(key => {
      return typeof state.formDataOrigin[key] !== 'object' &&
        state.formDataOrigin[key] !== state.formDataNew[key]
    })
    state.isFormChanged = changedKeys.length > 0
  },
  [SET_SUBMIT_FORM_ERROR](state, fl) {
    state.submitError = fl
  },
  [SET_SUBMIT_FORM_ERROR_DATA](state, message) {
    state.submitErrorMessage = message
  }
}
const getters = {
  isFormDataChanged: (state) => {
    return state.isFormChanged
  },
  isNeedCheckForm: (state) => {
    return state.isNeedCheckForm
  }
}
const actions = {
  startFormSubmit: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_SUBMIT_FORM_ERROR, false)
      commit(SET_SUBMIT_FORM_ERROR_DATA, { title: '', message: '' })
    }
  },
  setSubmitFormError: {
    root: true,
    handler: ({ dispatch, commit }, { title, message }) => {
      commit(SET_SUBMIT_FORM_ERROR, true)
      commit(SET_SUBMIT_FORM_ERROR_DATA, { title: title, message: message })
      dispatch('showSubmitFormErrorPopup', { title, message }, { root: true })
    }
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
