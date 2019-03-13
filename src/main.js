import Vue from 'vue'
import VueX from 'vuex'
import router from './router'
import App from './App.vue'
import Buefy from 'buefy'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import fr from 'vee-validate/dist/locale/fr'
import VeeValidate, { Validator } from 'vee-validate'
import 'buefy/dist/buefy.css'
import VueGraph from 'vue-graph'
import GraphBar from 'vue-graph/src/components/bar'

Vue.use(VueX)
Vue.use(Buefy)
Vue.use(VeeValidate)
Vue.use(VueGraph)

Validator.localize('fr', fr)

Vue.config.productionTip = false

Vue.component(GraphBar.name, GraphBar);
Vue.component('VueSlider', VueSlider)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
