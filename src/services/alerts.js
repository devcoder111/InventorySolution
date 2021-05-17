import commonService from './CommonService'

export default {
  getAlerts(payload) {
    return commonService.post('alert/notification/list', payload).then(res => {
      return res
    })
  },
  updateNotification(payload) {
    return commonService.post('alert/notification/update', payload).then(res => {
      return res
    })
  },
  addAlert(payload) {
    return commonService.post('alert/add', payload).then(res => {
      return res
    })
  },
  updateAlert(payload) {
    return commonService.post('alert/update', payload).then(res => {
      return res
    })
  },
  deleteAlert(payload) {
    return commonService.post('alert/delete', payload).then(res => {
      return res
    })
  }
}
