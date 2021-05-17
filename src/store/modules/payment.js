import {
  SET_NEED_UPGRADE_SUBSCRIPTION_PLAN
} from '../constant/mutation-types'

const namespaced = true
const state = {
  isNeedUpgradeSubscriptionPlan: false
}
const mutations = {
  [SET_NEED_UPGRADE_SUBSCRIPTION_PLAN](state, needUpgrade) {
    state.isNeedUpgradeSubscriptionPlan = needUpgrade
  }
}
const getters = {
  isNeedUpgradeSubscriptionPlan: (state) => {
    return state.isNeedUpgradeSubscriptionPlan
  }
}
const actions = {
  needUpgradeSubscriptionPlan: {
    root: true,
    handler: ({ dispatch, commit }, { title }) => {
      commit(SET_NEED_UPGRADE_SUBSCRIPTION_PLAN, true)
      dispatch('showUpgradeSubscriptionPlanPopup', { title }, { root: true })
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
