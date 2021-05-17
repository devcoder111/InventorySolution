import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib'
import './plugins/vuetify-money.js'
import Toasted from 'vue-toasted'
import VueMeta from 'vue-meta'
import 'animate.css'
import Eagle, { Slide, Transition } from 'eagle.js'
import './quasar'
import '@/styles/main.scss'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

Vue.use(Eagle)
Vue.component('Slide', Slide)
Vue.component(Transition.name, Transition)

Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueTelInputVuetify, {
  vuetify
})
Vue.use(VueMeta)

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 3000
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
