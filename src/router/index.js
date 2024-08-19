import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteView from '../views/estudiante/EstudianteView.vue'
import TutorView from '../views/tutor/TutorView.vue'
import TrabajoView from '../views/trabajo/TrabajoView.vue'
import RevisionView from '../views/revision/RevisionView.vue'

import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView
  },
  {
    path: '/trabajo',
    name: 'trabajo',
    component: TrabajoView
  },
  {
    path: '/tutor',
    name: 'tutor',
    component: TutorView
  },
  {
    path: '/revision',
    name: 'revision',
    component: RevisionView
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
