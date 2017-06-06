import VueRouter from 'vue-router'

import Home from './components/home.vue'
import User from './components/user.vue'
import Login from './components/login.vue'
import Member from './components/member.vue'
import SoldNote from './components/soldNote.vue'
import CashNote from './components/cashNote.vue'
import Spot from './components/spot.vue'  
import Stock from './components/stock.vue'


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/cashNote',
    component: CashNote
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/member',
    component: Member
  },
  {
    path: '/soldNote',
    component: SoldNote
  },
  {
    path: '/spot',
    component: Spot
  },
  {
    path: '/stock',
    component: Stock
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
