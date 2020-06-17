<template>
  <v-row v-if="lista.length !=0">
    <v-col cols="2">
      <div class="info-label">Participated In:</div>
    </v-col>
    <v-col> 
      <div class="info-content">
        <ul v-for="jogo in lista" :key="jogo">
          <li @click="mostraJogo(jogo)">
            {{jogo.idJogo}}
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Jogos",
  props: ["lista"],

  methods : {
    mostraJogo: function(j){
      this.$router.push('/jogos/' + j.idJogo)
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