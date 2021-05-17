import {
  SET_ARCHIVE_ALERT_POPUP_SHOW,
  SET_PENDING_ALERT_TO_SAVE,
  SET_ADD_EDIT_ALERT_POPUP_SHOW,
  SET_ADD_NEW_ALERT_POPUP_SHOW,
  SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_SHOW,
  SET_UPGRADE_SUBSCRIPTION_PLAN_SUCCESS_POPUP_SHOW,
  SET_UPGRADE_SUBSCRIPTION_PLAN_FAILED_POPUP_SHOW,
  SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_TITLE,
  SET_UNSAVED_CHANGES_POPUP_SHOW,
  SET_SUBMIT_FORM_ERROR_POPUP_SHOW,
  SET_SUBMIT_FORM_ERROR_POPUP_TITLE,
  SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE,
  SET_CONFIRM_POPUP_SHOW,
  SET_CONFIRM_POPUP_TITLE,
  SET_CONFIRM_POPUP_MESSAGE,
  SET_EXPORT_CONFIRM_POPUP_SHOW,
  SET_EXPORT_CONFIRM_POPUP_TITLE,
  SET_EXPORT_CONFIRM_POPUP_MESSAGE,
  SET_EXPORT_CONFIRM,
  SET_IMPORT_CONFIRM_POPUP_SHOW,
  SET_IMPORT_CONFIRM_POPUP_TITLE,
  SET_IMPORT_CONFIRM_POPUP_MESSAGE,
  SET_IMPORT_CONFIRM,
  SET_IMPORT_FILE,
  SET_DELETE_ALERT_POPUP_SHOW,
  SET_CUSTOM_FIELD_POPUP_SHOW
} from '../constant/mutation-types'

const namespaced = true
const state = {
  showChooseCustomFieldPopup: false,
  showArchiveAlertsDialog: false,
  pendingAlertToSave: null,
  showAddEditAlertPopup: false,
  showAddNewAlertPopup: false,
  showUpgradeSubscriptionPlanPopup: false,
  showUpgradeSubscriptionPlanSuccessPopup: false,
  showUpgradeSubscriptionPlanFailedPopup: false,
  upgradeSubscriptionPlanPopupTitle: '',
  showUnsavedChangesPopup: false,
  showErrorSubmitFormPopup: false,
  showConfirmPopup: false,
  showDeleteAlertPopup: false,
  errorSubmitFormData: {
    title: '',
    message: ''
  },
  confirmPopupData: {
    title: '',
    message: ''
  },
  showExportConfirmPopup: false,
  showImportConfirmPopup: false,
  exportConfirm: false,
  importConfirm: false,
  exportConfirmPopupData: {
    title: '',
    message: ''
  },
  importConfirmPopupData: {
    title: '',
    message: ''
  },
  importFile: null
}
const mutations = {
  [SET_CUSTOM_FIELD_POPUP_SHOW](state, show) {
    state.showChooseCustomFieldPopup = show
  },
  [SET_ARCHIVE_ALERT_POPUP_SHOW](state, show) {
    state.showArchiveAlertsDialog = show
  },
  [SET_PENDING_ALERT_TO_SAVE](state, alert) {
    state.pendingAlertToSave = alert
  },
  [SET_ADD_EDIT_ALERT_POPUP_SHOW](state, show) {
    state.showAddEditAlertPopup = show
  },
  [SET_ADD_NEW_ALERT_POPUP_SHOW](state, show) {
    state.showAddNewAlertPopup = show
  },
  [SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_SHOW](state, show) {
    state.showUpgradeSubscriptionPlanPopup = show
  },
  [SET_UPGRADE_SUBSCRIPTION_PLAN_SUCCESS_POPUP_SHOW](state, show) {
    state.showUpgradeSubscriptionPlanSuccessPopup = show
  },
  [SET_UPGRADE_SUBSCRIPTION_PLAN_FAILED_POPUP_SHOW](state, show) {
    state.showUpgradeSubscriptionPlanFailedPopup = show
  },
  [SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_TITLE](state, title) {
    state.upgradeSubscriptionPlanPopupTitle = title
  },
  [SET_UNSAVED_CHANGES_POPUP_SHOW](state, show) {
    state.showUnsavedChangesPopup = show
  },
  [SET_SUBMIT_FORM_ERROR_POPUP_SHOW](state, show) {
    state.showErrorSubmitFormPopup = show
  },
  [SET_SUBMIT_FORM_ERROR_POPUP_TITLE](state, title) {
    state.errorSubmitFormData.title = title
  },
  [SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE](state, message) {
    state.errorSubmitFormData.message = message
  },
  [SET_CONFIRM_POPUP_SHOW](state, show) {
    state.showConfirmPopup = show
  },
  [SET_CONFIRM_POPUP_TITLE](state, title) {
    state.confirmPopupData.title = title
  },
  [SET_CONFIRM_POPUP_MESSAGE](state, message) {
    state.confirmPopupData.message = message
  },
  [SET_EXPORT_CONFIRM_POPUP_SHOW](state, show) {
    state.showExportConfirmPopup = show
  },
  [SET_EXPORT_CONFIRM_POPUP_TITLE](state, title) {
    state.exportConfirmPopupData.title = title
  },
  [SET_EXPORT_CONFIRM_POPUP_MESSAGE](state, message) {
    state.exportConfirmPopupData.message = message
  },
  [SET_EXPORT_CONFIRM](state, send) {
    state.exportConfirm = send
  },
  [SET_IMPORT_CONFIRM_POPUP_SHOW](state, show) {
    state.showImportConfirmPopup = show
  },
  [SET_IMPORT_CONFIRM_POPUP_TITLE](state, title) {
    state.importConfirmPopupData.title = title
  },
  [SET_IMPORT_CONFIRM_POPUP_MESSAGE](state, message) {
    state.importConfirmPopupData.message = message
  },
  [SET_IMPORT_CONFIRM](state, send) {
    state.importConfirm = send
  },
  [SET_IMPORT_FILE](state, file) {
    state.importFile = file
  },
  [SET_DELETE_ALERT_POPUP_SHOW](state, show) {
    state.showDeleteAlertPopup = show
  }
}
const getters = {
  showChooseCustomFieldPopup: (state) => {
    return state.showChooseCustomFieldPopup
  },
  showArchiveAlertsDialog: (state) => {
    return state.showArchiveAlertsDialog
  },
  alertPendingToSave: (state) => {
    return state.pendingAlertToSave
  },
  showAddEditAlertPopup: (state) => {
    return state.showAddEditAlertPopup
  },
  showAddNewAlertPopup: (state) => {
    return state.showAddNewAlertPopup
  },
  showDeleteAlertPopup: (state) => {
    return state.showDeleteAlertPopup
  },
  showUpgradeSubscriptionPlanPopup: (state) => {
    return state.showUpgradeSubscriptionPlanPopup
  },
  showUpgradeSubscriptionPlanSuccessPopup: (state) => {
    return state.showUpgradeSubscriptionPlanSuccessPopup
  },
  showUpgradeSubscriptionPlanFailedPopup: (state) => {
    return state.showUpgradeSubscriptionPlanFailedPopup
  },
  getUpgradeSubscriptionPlanPopupTitle: (state) => {
    return state.upgradeSubscriptionPlanPopupTitle
  },
  showUnsavedChangesPopup: (state) => {
    return state.showUnsavedChangesPopup
  },
  showErrorSubmitFormPopup: (state) => {
    return state.showErrorSubmitFormPopup
  },
  getErrorSubmitFormData: (state) => {
    return state.errorSubmitFormData
  },
  getConfirmPopupData: (state) => {
    return state.confirmPopupData
  },
  showConfirmPopup: (state) => {
    return state.showConfirmPopup
  },
  getExportConfirmPopupData: (state) => {
    return state.exportConfirmPopupData
  },
  showExportConfirmPopup: (state) => {
    return state.showExportConfirmPopup
  },
  exportConfirm: (state) => {
    return state.exportConfirm
  },
  showImportConfirmPopup: (state) => {
    return state.showImportConfirmPopup
  },
  getImportConfirmPopupData: (state) => {
    return state.importConfirmPopupData
  },
  importConfirm: (state) => {
    return state.importConfirm
  },
  importFile: (state) => {
    return state.importFile
  }
}
const actions = {
  showUpgradeSubscriptionPlanPopup: {
    root: true,
    handler: ({ dispatch, commit }, { title }) => {
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_SHOW, true)
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_TITLE, title)
    }
  },
  closeUpgradeSubscriptionPlanPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_POPUP_SHOW, false)
    }
  },
  showUpgradeSubscriptionPlanSuccessPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_SUCCESS_POPUP_SHOW, true)
    }
  },
  closeUpgradeSubscriptionPlanSuccessPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_SUCCESS_POPUP_SHOW, false)
    }
  },
  showUpgradeSubscriptionPlanFailedPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_FAILED_POPUP_SHOW, true)
    }
  },
  closeUpgradeSubscriptionPlanFailedPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_UPGRADE_SUBSCRIPTION_PLAN_FAILED_POPUP_SHOW, false)
    }
  },
  showSubmitFormErrorPopup: {
    root: true,
    handler: ({ dispatch, commit }, { title, message }) => {
      commit(SET_SUBMIT_FORM_ERROR_POPUP_SHOW, true)
      commit(SET_SUBMIT_FORM_ERROR_POPUP_TITLE, title)
      commit(SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE, message)
    }
  },
  closeSubmitFormErrorPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_SUBMIT_FORM_ERROR_POPUP_SHOW, false)
      commit(SET_SUBMIT_FORM_ERROR_POPUP_TITLE, '')
      commit(SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE, '')
    }
  },
  showConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }, { title, message }) => {
      commit(SET_CONFIRM_POPUP_SHOW, true)
      commit(SET_CONFIRM_POPUP_TITLE, title)
      commit(SET_CONFIRM_POPUP_MESSAGE, message)
    }
  },
  closeConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_CONFIRM_POPUP_SHOW, false)
      commit(SET_CONFIRM_POPUP_TITLE, '')
      commit(SET_CONFIRM_POPUP_MESSAGE, '')
    }
  },
  showExportConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }, { title, message }) => {
      commit(SET_EXPORT_CONFIRM_POPUP_SHOW, true)
      commit(SET_EXPORT_CONFIRM_POPUP_TITLE, title)
      commit(SET_EXPORT_CONFIRM_POPUP_MESSAGE, message)
    }
  },
  cancelExportConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_EXPORT_CONFIRM, false)
      commit(SET_EXPORT_CONFIRM_POPUP_SHOW, false)
      commit(SET_EXPORT_CONFIRM_POPUP_TITLE, '')
      commit(SET_EXPORT_CONFIRM_POPUP_MESSAGE, '')
    }
  },
  confirmExportConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_EXPORT_CONFIRM, true)
      commit(SET_EXPORT_CONFIRM_POPUP_SHOW, false)
      commit(SET_EXPORT_CONFIRM_POPUP_TITLE, '')
      commit(SET_EXPORT_CONFIRM_POPUP_MESSAGE, '')
    }
  },
  showImportConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }, { title, message }) => {
      commit(SET_IMPORT_CONFIRM_POPUP_SHOW, true)
      commit(SET_IMPORT_CONFIRM_POPUP_TITLE, title)
      commit(SET_IMPORT_CONFIRM_POPUP_MESSAGE, message)
    }
  },
  cancelImportConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_IMPORT_FILE, null)
      commit(SET_IMPORT_CONFIRM, false)
      commit(SET_IMPORT_CONFIRM_POPUP_SHOW, false)
      commit(SET_IMPORT_CONFIRM_POPUP_TITLE, '')
      commit(SET_IMPORT_CONFIRM_POPUP_MESSAGE, '')
    }
  },
  confirmImportConfirmPopup: {
    root: true,
    handler: ({ dispatch, commit }) => {
      commit(SET_IMPORT_CONFIRM, true)
      commit(SET_IMPORT_CONFIRM_POPUP_SHOW, false)
      commit(SET_IMPORT_CONFIRM_POPUP_TITLE, '')
      commit(SET_IMPORT_CONFIRM_POPUP_MESSAGE, '')
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
