import alertsService from '@/services/alerts'
import { checkApiSuccess } from '../../utils'
import { SET_PENDING_ALERT_TO_SAVE } from '../constant/mutation-types'

const namespaced = true
const state = {
  alerts: [],
  tmpAlertActivity: false
}
const mutations = {
  set(state, { type, val }) {
    state[type] = val
  },
  tmpAlertActivity(state, val) {
    state.tmpAlertActivity = val
  }
}
const actions = {
  async addAlert({ dispatch, commit, rootState }, payload) {
    return await alertsService.addAlert(payload).then((response) => {
      if (checkApiSuccess(response, 'Add Alert', dispatch)) {
        const tmpAlert = rootState.popup.pendingAlertToSave
        if (tmpAlert) {
          commit(`popup/${SET_PENDING_ALERT_TO_SAVE}`, null, { root: true })
        }
        return response
      }
    })
  },
  async updateAlert({ dispatch, commit, rootState }, payload) {
    return await alertsService.updateAlert(payload).then((response) => {
      if (checkApiSuccess(response, 'Update Alert', dispatch)) {
        const tmpAlert = rootState.popup.pendingAlertToSave
        if (tmpAlert) {
          commit(`popup/${SET_PENDING_ALERT_TO_SAVE}`, null, { root: true })
        }
        return response
      }
    })
  },
  async updateNotification({ dispatch, commit }, payload) {
    return await alertsService.updateNotification(payload).then((response) => {
      if (checkApiSuccess(response, 'Update Notification', dispatch)) {
        if (response.data.data.result === true) {
          state.alerts.forEach((element, index) => {
            if (element.id === payload.id) {
              state.alerts[index].isRead = payload.isRead
              state.alerts[index].archived = payload.archived
            }
          })
        }
      }
    })
  },
  async getAlerts({ dispatch, commit }, payload) {
    return await alertsService
      .getAlerts(payload)
      .then(async (response) => {
        if (checkApiSuccess(response, 'Get Alets', dispatch)) {
          const alertData = await dispatch('inventory/objectTimeConvert', response.data.data.data, { root: true })
          commit('set', {
            type: 'alerts',
            val: alertData
          })
          return alertData
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  async deleteAlert({ dispatch, commit, rootState }, payload) {
    return await alertsService
      .deleteAlert(payload)
      .then(async (response) => {
        if (checkApiSuccess(response, 'Delete Alert', dispatch)) {
          const tmpAlert = rootState.popup.pendingAlertToSave
          if (tmpAlert) {
            commit(`popup/${SET_PENDING_ALERT_TO_SAVE}`, null, { root: true })
          }
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}
const getters = {
  alerts: (state) => {
    return state.alerts
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
