import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  
    {
      path: '/',
      name: 'Página Principal',
      component: () => import( '../views/PaginaPrincipal.vue')
    
    },
    {
      path: '/History',
      name: 'About - history',
      component: () => import( '../views/About/History.vue')
    
    },
    {
      path: '/Rings',
      name: 'About - rings',
      component: () => import( '../views/About/Rings.vue')
    
    },
  {
    path: '/jogos',
    name: 'Página dos Jogos Olimpicos',
    component: () => import( '../views/Jogos/Jogos.vue')
  
  },
  {
    path: '/jogos/:id',
    name: 'Consulta Jogo',
    component: () => import( '../views/Jogos/ConsultaJogo.vue')
  },
  {
    path: '/eventos',
    name: 'Página dos Eventos',
    component: () => import( '../views/Eventos/Eventos.vue')
  
  },
  {
    path: '/eventos/:id',
    name: 'Consulta Evento',
    component: () => import( '../views/Eventos/ConsultaEvento.vue')
  },
  {
    path: '/equipas',
    name: 'Página das Equipas',
    component: () => import( '../views/Equipas/Equipas.vue')
  
  },
  {
    path: '/equipas/:id',
    name: 'Consulta Equipa',
    component: () => import( '../views/Equipas/ConsultaEquipa.vue')
  },
  {
    path: '/atletas',
    name: 'Página dos Atletas',
    component: () => import( '../views/Atletas/Atletas.vue')
  
  },
  {
    path: '/atletas/:id',
    name: 'Consulta Atleta',
    component: () => import( '../views/Atletas/ConsultaAtleta.vue')
  },
  {
    path: '/statistics',
    name: 'Estatiticas',
    component: () => import( '../views/Statistics.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
