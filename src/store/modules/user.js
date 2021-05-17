import userService from '@/services/user'
import { checkApiSuccess } from '../../utils'
import router from '../../router'
import axios from 'axios'
import moment from 'moment'
import {
  SET_DATE_TIME_FORMAT
} from '../constant/mutation-types'

const namespaced = true

const state = {
  user: {},
  status: '',
  error: '',
  invitedUsers: [
  ],
  curUserData: null,
  dateTimeFormat: 0
}

const mutations = {
  set(state, { type, val }) {
    state[type] = val
  },
  inviteUser(state, payload) {
    var temp = {
      name: payload.firstName + ' ' + payload.lastName,
      email: payload.email,
      role: payload.role
    }
    state.invitedUsers.push(temp)
  },
  [SET_DATE_TIME_FORMAT](state, payload) {
    state.dateTimeFormat = payload
  }
}
const actions = {
  async login({ dispatch, commit, getters, rootGetters }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService
      .login(payload)
      .then((response) => {
        if (checkApiSuccess(response)) {
          const token = response.data.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'curUserData', val: response.data.data })
          axios.defaults.headers.common.Authorization = token
          const routeAfterLogin = rootGetters.getRouteAfterLogin || { name: 'Inventory' }
          router.push(routeAfterLogin).then(() => {})
        } else {
          if (response.data.error.type !== 200) {
            commit('set', { type: 'error', val: response.data.error.message })
          }
        }
        return response
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
  },
  async register({ dispatch, commit, getters, rootGetters }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService
      .register(payload)
      .then((response) => {
        if (checkApiSuccess(response)) {
          var token = response.data.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'curUserData', val: response.data.data })
          axios.defaults.headers.common.Authorization = token
          const routeAfterLogin = rootGetters.getRouteAfterLogin || { name: 'Inventory' }
          router.push(routeAfterLogin).then(() => {})
        }
        return response
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
  },
  getInvitedUsers({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    userService
      .getInvitedUsers()
      .then((response) => {
        if (checkApiSuccess(response, 'Get Invite users', dispatch)) {
          dispatch('resToPayload', response)
        }
      })
      .catch(() => {})
  },
  update({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    userService
      .update(payload)
      .then((response) => {
        if (checkApiSuccess(response, 'Edit User', dispatch)) {
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'curUserData', val: response.data.data })
          router.push({ name: 'Inventory' }).then(() => { })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async resToPayload({ dispatch, commit }, response) {
    dispatch('startFormSubmit', null, { root: true })
    const payload = []
    let dateTimeFormat = ''
    await dispatch('profileSettings').then((res) => {
      dateTimeFormat = res.data.data
    })
    response.data.data.forEach(doc => {
      const tmp = {
        id: doc.id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        role: doc.role,
        phone: doc.phone,
        dateAdded: doc.created == null ? '-' : moment(doc.created).format(dateTimeFormat.settings.dateTimeFormat.value),
        lastActive: doc.lastVisit == null ? '-' : moment(doc.lastvisit).format(dateTimeFormat.settings.dateTimeFormat.value),
        inviteStatus: doc.inviteStatus
      }
      payload.push(tmp)
    })
    commit('set', { type: 'invitedUsers', val: payload })
  },
  async inviteUser({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.inviteUser(payload).then((response) => {
      if (checkApiSuccess(response, 'Invite User', dispatch)) {
        dispatch('resToPayload', response)
        router.push({ name: 'Users' }).then(() => {})
      }
      return response
    })
  },
  async updateUser({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.editInvitedUser(payload).then((response) => {
      if (checkApiSuccess(response, 'Edit User', dispatch)) {
        dispatch('resToPayload', response)
        router.push({ name: 'Users' }).then(() => {})
      }
      return response
    })
  },
  async delInvitedUser({ dispatch, commit }, id) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.delInvitedUser(id).then((response) => {
      if (checkApiSuccess(response, 'Delete User', dispatch)) {
        dispatch('resToPayload', response)
        return response
      }
    })
  },
  async logout({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token')
      localStorage.removeItem('curUserData')
      commit('set', { type: 'curUserData', val: null })
      delete axios.defaults.headers.common.Authorization
      resolve()
    })
  },
  async resetPwdReq({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.resetPwdReq(payload.email).then((response) => {
      if (checkApiSuccess(response, 'Reset Password', dispatch)) {
        return response
      }
    })
  },
  async tokenConfirm({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.tokenConfirm(payload).then((response) => {
      if (checkApiSuccess(response)) {
        return response
      }
    })
  },
  async resetPassword({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.resetPassword(payload).then((response) => {
      if (checkApiSuccess(response, 'Reset Password', dispatch)) {
        return response
      }
    })
  },
  async changePassword({ dispatch, commit }, payload) {
    return await userService.changePassword(payload).then((response) => {
      return response
    })
  },
  async profileSettings({ commit }) {
    const resp = await userService.profileSettings()
    const respDateSettings = resp.data.data
    commit(SET_DATE_TIME_FORMAT, respDateSettings.settings.dateTimeFormat.value)
    return resp
  },
  async curUserProfile({ dispatch, commit }) {
    return await userService.curUserProfile().then((response) => {
      return response
    })
  },
  async getUserByToken({ dispatch, commit }, token) {
    return await userService
      .curUserProfile(token)
      .then((response) => {
        if (checkApiSuccess(response)) {
          const token = response.data.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('curUserData', JSON.stringify(response.data.data))
          commit('set', { type: 'user', val: response.data.data })
          axios.defaults.headers.common.Authorization = token
        } else {
          if (response.data.error.type !== 200) {
            commit('set', { type: 'error', val: response.data.error.message })
          }
        }
        return response
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async dateTimeFormatUpdate({ dispatch, commit }, payload) {
    console.log(payload)
    return await userService.dateTimeFormatUpdate({ dateTimeFormat: payload.dateTimeFormat }).then((response) => {
      if (response.data.error.type === 200) {
        commit(SET_DATE_TIME_FORMAT, payload.value)
      }
      return response
    })
  },
  async getAllPlans({ dispatch, commit }) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.getAllPlans().then((response) => {
      if (checkApiSuccess(response, 'Get Subscription Plans', dispatch)) {
        return response
      }
    })
  },
  async checkoutsession({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.checkoutsession(payload).then((response) => {
      if (checkApiSuccess(response, 'Create Subscription', dispatch)) {
        return response.data.data
      }
    })
  },
  async saveSubscription({ dispatch, commit }, payload) {
    dispatch('startFormSubmit', null, { root: true })
    return await userService.saveSubscription(payload).then((response) => {
      if (checkApiSuccess(response, 'Create Subscription', dispatch)) {
        return response.data.data
      }
    })
  },
  removeErrors({ dispatch, commit }) {
    commit('set', { type: 'error', val: '' })
  }
}

const getters = {
  user(state) {
    return state.curUserData
  },
  selectedInvitedUser() {
    return state.curUserData
  },
  selectedInviteUser(state) {
    return state.user
  },
  invitedUsers: state => {
    return state.invitedUsers
  },
  usersInventories: state => state.curUserData.inventories,
  error(state) {
    return state.error
  },
  getDateTimeFormat: state => state.dateTimeFormat
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
