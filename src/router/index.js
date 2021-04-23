import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "PageHome" */  '../views/PageHome.vue')
  },
  {
    path: '/cripto/:name',
    name: 'Cripto',
    props: true,
    component: () => import(/* webpackChunkName: "PageCripto" */ '../views/PageCripto.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import(/* webpackChunkName: '404'*/ '../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
