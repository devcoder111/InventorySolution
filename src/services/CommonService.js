import axios from 'axios'
import config from './../config'

const HTTP_REQUEST_METHOD_GET = 'get'
const HTTP_REQUEST_METHOD_POST = 'post'

const doRequest = (endpoint, method, payload, responseType) => {
  const cfg = {
    baseURL: config.apiBaseUrl,
    url: `${config.apiBaseUrl}${endpoint}`,
    method: method,
    responseType: responseType || 'json',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }
  if (method === HTTP_REQUEST_METHOD_GET) {
    cfg.params = payload
  } else {
    cfg.data = payload
  }
  const instance = axios.create()
  return instance.request(cfg).then(res => {
    return res
  })
}

export default {
  post: function(endpoint, payload, responseType) {
    return doRequest(endpoint, HTTP_REQUEST_METHOD_POST, payload, responseType)
  },
  get: function(endpoint, payload, responseType) {
    return doRequest(endpoint, HTTP_REQUEST_METHOD_GET, payload, responseType)
  }
}
