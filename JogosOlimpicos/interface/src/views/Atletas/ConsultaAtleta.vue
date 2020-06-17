<template>
  <ConsultaAtleta :idAtleta="$route.params.id"/>
</template>

<script>
import ConsultaAtleta from '@/components/Atletas/ConsultaAtleta.vue'

export default {
  name: 'Consulta-Atleta',
  components: {
    ConsultaAtleta
  }
}
</script>
