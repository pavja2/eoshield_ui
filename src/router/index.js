import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Operator from '@/components/Operator'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
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
