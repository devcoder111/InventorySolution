import Vue from 'vue'
import Vuetify from 'vuetify/dist/vuetify.min'
require('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
})
