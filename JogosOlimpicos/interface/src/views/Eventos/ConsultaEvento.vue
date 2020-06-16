<template>
  <ConsultaEvento :idEvento="$route.params.id"/>
</template>

<script>
import ConsultaEvento from '@/components/Eventos/ConsultaEvento.vue'

export default {
  name: 'Consulta de um Evento',
  components: {
    ConsultaEvento
  }
}
</script>
