import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import POTD from '../views/POTD.vue'
import ProblemsList from '../views/ProblemsList.vue'
import ProblemView from '../views/ProblemView.vue'
import GlobalScoreboard from '@/views/GlobalScoreboard'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/problem',
    name: 'problem',
    props:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ProblemView
  },
  {
    path: '/today',
    name: 'POTD',
    component: POTD
  },
  {
    path: '/list',
    name: 'Old Problems',
    component: ProblemsList
  },
  {
    path: '/score',
    name: 'scoreboard',
    component: GlobalScoreboard,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
