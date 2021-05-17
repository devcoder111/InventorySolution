import Router from 'vue-router'

export default () => {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/static',
        component: () => import('./pages/index.vue')
      }
    ]
  })

  return {
    router
  }
}
