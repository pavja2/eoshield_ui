import Vue from 'vue'
import Router from 'vue-router'
import Operator from '@/components/Operator'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Operator',
      name: 'Operator',
      component: Operator,
    },
    {
      path: '/User',
      name: 'User',
      component: User,
    },
  ]
})
