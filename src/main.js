
import App from './App.vue'
import Vue from 'vue';
import VueKonva from 'vue-konva'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(VueKonva)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
