import commonService from './CommonService'

export default {
  getHistoryData(payload) {
    return commonService.post('history', payload).then(res => {
      return res?.data?.data
    })
  },
  exportHistoryPDF(payload) {
    return commonService.post('history/pdf', payload, 'blob').then(res => {
      return res
    })
  },
  exportHistoryCSV(payload) {
    return commonService.post('history/csv', payload, 'blob').then(res => {
      return res
    })
  }
}
