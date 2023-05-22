import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index',
    name: 'chat',
    meta: { title: '首页' },
    children: [
      {
        component: () => import('@/views/chat/index.vue'),
        path: 'index',
        name: 'chat',
        meta: { title: '首页' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: routes,
})
