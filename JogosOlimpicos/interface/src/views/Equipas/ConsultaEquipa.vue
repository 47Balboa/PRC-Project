<template>
  <ConsultaEquipa :idEquipa="$route.params.id"/>
</template>

<script>
import ConsultaEquipa from '@/components/Equipas/ConsultaEquipa.vue'

export default {
  name: 'Consulta-Equipa',
  components: {
    ConsultaEquipa
  }
}
</script>
