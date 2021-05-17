const domainUrl = window.location.origin
console.log('location', domainUrl)
var apiBaseUrl = ''
if (domainUrl === 'http://localhost:8080') {
  apiBaseUrl = process.env.VUE_APP_API_BASE_URL
} else {
  apiBaseUrl = domainUrl + '/api/'
}

export default {
  node: process.env.NODE_ENV || 'development',
  isTest: process.env.NODE_ENV === 'test',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvcmsuZ3JvdXA4MzExQGdtYWlsLmNvbSIsImlkIjo4MywiZXhwIjoxNjExMzkxMjAwLCJpYXQiOjE2MDYyMDcyMDB9.QlB7u-a4Qz9WnCWVYrbhhB7VXE_EAYsARu64SFV1nWM',
  apiBaseUrl: apiBaseUrl
}
