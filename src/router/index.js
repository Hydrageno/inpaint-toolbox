import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tradition-inpaint',
    name: 'tradition-inpaint',
    component: () => import('@/views/TraditionInpaintView.vue')
  },
  {
    path: '/super-resolution',
    name: 'super-resolution',
    component: () => import('@/views/SuperResolutionView.vue')
  },
  {
    path: '/removal-inpaint',
    name: 'removal-inpaint',
    component: () => import('@/views/RemovalInpaintView.vue')
  },
  {
    path: '/saliency-edge-inpaint',
    name: 'saliency-edge-inpaint',
    component: () => import('@/views/SaliencyEdgeInpaintView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
