import a from 'axios'
import config from './../config'
const token = localStorage.getItem('token')
a.defaults.headers.common = { Authorization: `Bearer ${token}` }
const headers = {
  'Content-Type': 'application/json'
}

const prefixEndpoint = config.apiBaseUrl

export default {
  getToken() {
    const token = localStorage.getItem('token')
    a.defaults.headers.common = { Authorization: `Bearer ${token}` }
  },
  login(payload) {
    return a.post(prefixEndpoint + 'login', payload, headers)
  },
  register(payload) {
    return a.post(prefixEndpoint + 'register', payload)
  },
  update(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'profile/edit', payload)
  },
  reset(email) {
    return a.get(prefixEndpoint + 'password/recovery', email)
  },
  inviteUser(payload) {
    return a.post(prefixEndpoint + 'invite/add', payload, headers)
  },
  getInvitedUsers() {
    this.getToken()
    return a.post(prefixEndpoint + 'invite/list', headers)
  },
  editInvitedUser(payload) {
    return a.post(prefixEndpoint + 'invite/edit', payload, headers)
  },
  delInvitedUser(userId) {
    var payload = {
      userId: userId
    }
    return a.post(prefixEndpoint + 'invite/delete', payload, headers)
  },
  resetPwdReq(email) {
    return a.get(prefixEndpoint + 'password/recovery?email=' + email, headers)
  },
  tokenConfirm(payload) {
    return a.post(prefixEndpoint + 'password/recovery', payload, headers)
  },
  resetPassword(payload) {
    return a.post(prefixEndpoint + 'password/set', payload)
  },
  changePassword(payload) {
    return a.post(prefixEndpoint + 'password/change', payload)
  },
  getAllPlans() {
    return a.get(prefixEndpoint + 'subscription/plans')
  },
  profileSettings() {
    this.getToken()
    return a.post(prefixEndpoint + 'profile/settings')
  },
  curUserProfile(token = null) {
    if (token) {
      a.defaults.headers.common = { Authorization: `Bearer ${token}` }
    }
    return a.post(prefixEndpoint + 'profile')
  },
  dateTimeFormatUpdate(payload) {
    return a.post(prefixEndpoint + 'profile/settings/update', payload)
  },
  checkoutsession(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'subscription/checkoutsession', payload, headers)
  },
  saveSubscription(payload) {
    this.getToken()
    return a.post(prefixEndpoint + 'subscription/save', payload, headers)
  }
}
