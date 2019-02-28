import Vue from 'vue'
import VueX from 'vuex'
import router from './router'
import App from './App.vue'
import Buefy from 'buefy'
import fr from 'vee-validate/dist/locale/fr';
import VeeValidate, { Validator } from 'vee-validate'
import 'buefy/dist/buefy.css'

Vue.use(VueX)
Vue.use(Buefy)
Vue.use(VeeValidate)

Validator.localize('fr', fr)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
