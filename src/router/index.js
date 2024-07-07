import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: () => import('../views/Post.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/pages/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/pages/RegisterPage.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../components/pages/DashboardPage.vue')
    },
    {
      path: '/content',
      name: 'Content',
      component: () => import('../components/pages/ContentPage.vue')
    },
    {
      path: '/createContent',
      name: 'Create Content',
      component: () => import('../components/pages/FormContent.vue')
    },
    {
      path: '/getContent/:id',
      name: 'Get Content',
      component: () => import('../components/pages/FormEditContent.vue')
    },
    {
      path: '/detailContent/:id',
      name: 'Detail Content',
      component: () => import('../components/pages/DetailContent.vue')
    }
  ]
})

export default router
