const state = {
  message: {
    error: '',
    success: ''
  }
}
const mutations = {
  setMessage(state, { type, text }) {
    state.message[type] = text
    type === 'success'
      ? (state.message.error = '')
      : (state.message.success = '')
    setTimeout(function () {
      state.message.error = ''
      state.message.success = ''
    }, 5000)
  }
}
const actions = {
  setMessage({ commit }, message) {
    commit('setMessage', { type: message.type, text: message.text })
  }
}
const getters = {
  successMessage(state) {
    return state.message.success
  },
  errorMessage(state) {
    return state.message.error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
