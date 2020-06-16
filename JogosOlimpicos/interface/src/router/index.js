import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  
  {
    path: '/jogos',
    name: 'Página dos Jogos Olimpicos',
    component: () => import( '../views/Jogos/Jogos.vue')
  
  },
  {
    path: '/eventos',
    name: 'Página dos Eventos',
    component: () => import( '../views/Eventos/Eventos.vue')
  
  },
  {
    path: '/equipas',
    name: 'Página das Equipas',
    component: () => import( '../views/Equipas/Equipas.vue')
  
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
