import Vue from 'vue'
import Akaibara from './Akaibara.vue'
import router from './router'
//import Vuex from 'vuex'
//bootstrap vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//fortawesome
import { library } from '@fortawesome/fontawesome-svg-core'

import { faSearch, faCamera, faCreditCard, faTrashAlt, faEnvelope, faUser, faCog, faShoppingCart, faAngleLeft, faAngleRight, faCheck, faTimesCircle, faMoneyBillAlt, faReceipt, faEdit, faFastForward, faEraser, faPlus, faMinus, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faWhatsapp, faCcMastercard } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import store from './store'

library.add(faCcMastercard, faClipboardCheck, faPlus, faMinus, faCheck, faEraser, faEdit, faFastForward, faTimesCircle, faMoneyBillAlt, faReceipt, faSearch, faCamera, faCreditCard, faTrashAlt, faEnvelope, faUser, faCog, faShoppingCart, faAngleLeft, faAngleRight, faFacebook, faInstagram, faWhatsapp)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

//Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Akaibara)
}).$mount('#akaibara')
