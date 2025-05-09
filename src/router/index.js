import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '@/components/FormView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import SeperateView from '@/views/SeperateView.vue'
import LandingPage from '@/views/LandingPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'land',
    component: LandingPage
  },
    {
      path: '/checkStatus',
      name: 'home',
      component: HomeView,
    },{
      path: '/register',
      name: 'register',
      component: RegisterView,
    },{
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/results/:id',
      name: 'results',
      component: SeperateView,
    },
    {
      path: '/postURL',
      name: 'postURL',
      component: FormView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})


export default router
