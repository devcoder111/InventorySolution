import Vue from 'vue'
import VueRouter from 'vue-router'
import mainRoutes from './mainRoutes'
import VueMeta from 'vue-meta'
import a from 'axios'
import config from './../config'
import { store } from '@/store/index'
import { MODULE_USER } from '../store/constant/mutation-types'
const prefixEndpoint = config.apiBaseUrl
const headers = {
  'Content-Type': 'application/json'
}
Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [].concat(mainRoutes)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.onReady(() => {
  store.dispatch('user/profileSettings')
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(p => p.meta.requiresAuth) && !token) {
    const routeAfterLogin = to.name === 'Subscription' ? to : null
    store.dispatch(
      'setRouteAfterLogin',
      routeAfterLogin, { root: true })
    next({ name: 'Login' })
    return
  }

  if (token && !store.getters[`${MODULE_USER}/user`]) {
    const curUserData = localStorage.getItem('curUserData')
    store.commit(`${MODULE_USER}/set`, { type: 'curUserData', val: JSON.parse(curUserData) })
  }

  if ((to.path === '/mobile/pricing' || to.path === '/login') && !token && to.query.token) {
    localStorage.setItem('querytoken', to.query.token)
  }

  if (token && (to.path === '/login' || to.path === '/register')) {
    const routeAfterLogin = store.getters.getRouteAfterLogin
    next({ name: routeAfterLogin ? routeAfterLogin.name : 'Inventory' })
  }

  if (to.path === '/forgotPassword') {
    const payload = {
      email: to.query.email,
      token: to.query.token
    }
    a.post(prefixEndpoint + 'password/recovery', payload, headers)
      .then((res) => {
        if (res.data.error.type === 200) {
          localStorage.setItem('verificationData', JSON.stringify(payload))
          next({ name: 'passwordForgot' })
        } else {
          next({ name: 'Login' })
        }
      })
  }

  if (to.path === '/invite/accept') {
    const payload = {
      email: to.query.email,
      token: to.query.token
    }
    a.post(prefixEndpoint + 'invite/accept', payload, headers)
      .then((res) => {
        if (res.data.error.type === 200) {
          localStorage.setItem('verificationData1', JSON.stringify(payload))
          next({ name: 'SetPassword' })
        } else {
          next({ name: 'Login' })
        }
      })
  }
  next()
})

export default router
