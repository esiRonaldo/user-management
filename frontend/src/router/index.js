import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/NotFound.vue'
import UsersList from '../pages/users/UsersList.vue'

// lazy loading
const UserForm = () => import('../pages/users/UserForm.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/users' },
    {
      path: '/users',
      component: UsersList,
    },
    {
      path: '/users/new',
      component: UserForm,
    },
    {
      path: '/users/:id/edit',
      component: UserForm,
      props: true,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
})

export default router