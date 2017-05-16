// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'

import iView from 'iview'
import 'iview/dist/styles/iview.css'  

Vue.config.productionTip = false
Vue.config.debug = true

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
