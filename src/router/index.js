import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('@/views/Main/index.vue'),
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('@/views/Home/index.vue'),
          meta: { requiresAuth: false },
          children: [
            {
              path: 'login',
              name: 'LoginPage',
              meta: { requiresAuth: false },
              component: () => import('@/views/Auth/Login.vue'),
            }
          ]
        },
        {
          path: 'admin',
          name: 'AdminPage',
          component: () => import('@/views/Admin/index.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: 'create',
              name: 'CreatePage',
              meta: { requiresAuth: true },
              component: () => import('@/views/Admin/create.vue')
            }
          ]
        },
        {
          path: 'liked-post',
          name: 'LikedPostPage',
          meta: { requiresAuth: false },
          component: () => import('@/views/Favorite/index.vue')
        },
        {
          path: 'post',
          name: 'PostPage',
          meta: { requiresAuth: false },
          component: () => import('@/views/Post/index.vue'),
          children: [
            {
              path: ':id',
              meta: { requiresAuth: false },
              name: 'PostDetail',
              component: () => import('@/views/Post/Detail.vue')
            },
            {
              path: ':id/edit',
              name: 'PostEdit',
              meta: { requiresAuth: true },
              component: () => import('@/views/Post/Edit.vue')
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('userMyPost') !== null ? true : false
  if (to.meta.requiresAuth && isAuthenticated === false) next({name: 'LoginPage'})
  else if (to.fullPath === '/login' && isAuthenticated) next({name: 'AdminPage'})
  else next()
})

export default router
