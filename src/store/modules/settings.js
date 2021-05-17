import {
  SET_SETTINGS_PAGE_SECTION,
  SET_GENERAL_SETTINGS
} from '../constant/mutation-types'
import {
  SETTINGS_PAGE_USER_PROFILE
} from '../../constant'

const namespaced = true
const state = {
  settingsPageSection: localStorage.getItem('settingsPageSection') || SETTINGS_PAGE_USER_PROFILE,
  generalSettings: null
}
const mutations = {
  [SET_GENERAL_SETTINGS](state, generalSettings) {
    localStorage.setItem('generalSettings', generalSettings)
    state.generalSettings = generalSettings
  },
  [SET_SETTINGS_PAGE_SECTION](state, settingsPageSection) {
    localStorage.setItem('settingsPageSection', settingsPageSection)
    state.settingsPageSection = settingsPageSection
  }
}
const getters = {
  getSettingsPageSection: (state) => {
    return state.settingsPageSection
  },
  getGeneralSettings: (state) => {
    return state.generalSettings
  }
}

const actions = {
  setSettingsPageSection: {
    root: true,
    handler: ({ dispatch, commit }, settingsPageSection) => {
      commit(SET_SETTINGS_PAGE_SECTION, settingsPageSection)
    }
  },
  loadGeneralSettings: {
    root: true,
    handler: ({ dispatch, commit }) => {
      dispatch('user/profileSettings').then((res) => {
        commit(SET_GENERAL_SETTINGS, res.data.data.settings)
      })
    }
  },
  getGeneralSettings: {
    root: true,
    handler: ({ dispatch, getters, commit }) => {
      if (getters.getGeneralSettings) {
        return getters.getGeneralSettings
      }
      return dispatch('user/profileSettings', null, { root: true }).then((res) => {
        commit(SET_GENERAL_SETTINGS, res.data.data.settings)
        return getters.getGeneralSettings
      })
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
