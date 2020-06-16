<template>
  <ConsultaJogo :idJogo="$route.params.id"/>
</template>

<script>
import ConsultaJogo from '@/components/Jogos/ConsultaJogo.vue'

export default {
  name: 'Consulta de um Jogo Olimpico',
  components: {
    ConsultaJogo
  }
}
</script>
