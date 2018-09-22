// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ICountUp from 'vue-countup-v2'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Eos from 'eosjs'

Vue.config.productionTip = false
<<<<<<< HEAD
Vue.use(BootstrapVue)
Vue.component(ICountUp.name, ICountUp);
=======
Vue.use(BootstrapVue);


let eos = Eos({
  keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
  httpEndpoint: 'http://127.0.0.1:8888',
  chain: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
});

Vue.prototype.$eos = eos;
>>>>>>> c53a1392f9597039e60d6cad4f6f1e6ee105fa57

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
