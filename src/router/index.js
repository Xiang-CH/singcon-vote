import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/vote/:user_key',
    name: 'vote',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/VotePage.vue')
  },
  {
    path: '/ticket',
    name: 'ticket',
    query: { k: '' },
    component: () => import('../views/TicketPage.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminPage.vue')
  },
  {
    path: '/wechat',
    name: 'wechat',
    query: {code: ''},
    component: () => import('../views/WechatPage.vue')
  },
  {
    path: '/realtime',
    name: 'realtime',
    component: () => import('../views/RealtimePage.vue')
  },
  {
    path: '/phone/:token',
    name: 'phone',
    component: () => import('../views/PhonePage.vue')
  },
  {
    path: '/gun/:token',
    name: 'gun',
    component: () => import('../views/GunPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/',
  routes
})

export default router
