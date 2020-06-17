<template>
  <v-row v-if="lista.length !=0">
    <v-col cols="2">
      <div class="info-label"> Athletes:</div>
    </v-col>
    <v-col> 
      <div class="info-content">
        <ul v-for="atleta in lista" :key="atleta">
          <li @click="mostraAtleta(atleta)">
            {{atleta.nome}}
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Atletas",
  props: ["lista"],

  methods : {
    mostraAtleta: function(a){
      this.$router.push('/atletas/' + a.idAtleta)
    }
  }
  
};
</script>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>