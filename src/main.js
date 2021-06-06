// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './styles/index.scss';
import './allocation';
import Element from 'element-ui';
import commonComponents from './components';
import * as filters from './filters' // global filters
import vcolorpicker from 'vcolorpicker'

import '@/directive';
import store from './store';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(vcolorpicker)
commonComponents(Vue);
Vue.use(Element, {
  size: 'medium', // set element-ui default size
})

Vue.config.productionTip = false
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
