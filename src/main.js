import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './register'
import Star from 'components/star/star'
import SupportIcon from 'components/support-icon/support-icon'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.component('star', Star)
Vue.component('support-icon', SupportIcon)

new Vue({
  render: h => h(App)
}).$mount('#app')
