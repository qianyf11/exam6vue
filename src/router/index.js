import { createRouter, createWebHistory } from 'vue-router'
import list from '../views/list.vue'
import add from '../views/add.vue'
import update from '../views/update.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: list
  },
  {
    path: '/add',
    name: 'add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/add.vue')
  },
  {
    path: '/update',
    name: 'update',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/update.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
