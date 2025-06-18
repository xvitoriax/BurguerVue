import { createRouter, createWebHistory } from 'vue-router'

// carregamento sob demanda (code‑split)
const Home = () => import('@/views/TheHome.vue')
const Pedidos = () => import('@/views/TheOrder.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/pedidos', name: 'pedidos', component: Pedidos },
  ],
})

export default router
