import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import store from './store'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'

import router from './router'

import './permission' // permission control

Vue.use(Element)
Element.Dialog.props.closeOnClickModal.default = false // 弹出层点击modal不会关闭

Element.Select.props.clearable.default = true


Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
