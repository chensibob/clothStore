import VueRouter from 'vue-router'

import Home from './components/home.vue'
import Admin from './components/admin.vue'
import FundBalance from './components/fundBalance.vue'
import Instock from './components/instock.vue'
import Login from './components/login.vue'
import Member from './components/member.vue'
import Outstock from './components/outstock.vue'
import SoldNote from './components/soldNote.vue'
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
    path: '/admin',
    component: Admin
  },
  {
    path: '/fundBalance',
    component: FundBalance
  },
  {
    path: '/instock',
    component: Instock
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
    path: '/outstock',
    component: Outstock
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
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
