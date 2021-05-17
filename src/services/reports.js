import commonService from './CommonService'

export default {
  getReportStockBalancesDate(payload) {
    return commonService.post('report/balance', payload).then(res => {
      return res?.data?.data
    })
  },
  exportReportStockBalancesDate(payload) {
    return commonService.post('report/balance/pdf', payload, 'blob').then(res => {
      return res
    })
  },
  getReportStockBalancesRange(payload) {
    return commonService.post('report/balance_range', payload).then(res => {
      return res?.data?.data
    })
  },
  exportReportStockBalancesRange(payload) {
    return commonService.post('report/balance_range/pdf', payload, 'blob').then(res => {
      return res
    })
  }
}
