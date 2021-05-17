import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import inventory from './modules/inventory.js'
import popup from './modules/popup.js'
import form from './modules/form.js'
import payment from './modules/payment.js'
import settings from './modules/settings.js'
import messages from '@/store/modules/messages'
import alerts from './modules/alerts'
import customField from './modules/customField'
import {
  ROUTE_AFTER_LOGIN
} from './constant/mutation-types'
const namespaced = true
Vue.use(Vuex)
export const store = new Vuex.Store({
  namespaced,
  modules: {
    user: user,
    inventory: inventory,
    messages: messages,
    popup: popup,
    form: form,
    payment: payment,
    settings: settings,
    alerts: alerts,
    customField: customField
  },
  state: {
    loading: false,
    routeAfterLogin: null
  },
  mutations: {
    [ROUTE_AFTER_LOGIN](state, route) {
      state.routeAfterLogin = route
    },
    set(state, { type, val }) {
      state[type] = val
    }
  },
  actions: {
    setRouteAfterLogin: {
      root: true,
      handler: ({ dispatch, commit }, route) => {
        commit(ROUTE_AFTER_LOGIN, route)
      }
    },
    setLoading({ commit }, val) {
      commit('set', { type: 'loading', val: val })
    }
  },
  getters: {
    getRouteAfterLogin: (state) => {
      return state.routeAfterLogin
    },
    loading(state) {
      return state.loading
    }
  }
})
