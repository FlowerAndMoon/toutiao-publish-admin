import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginIndex from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
