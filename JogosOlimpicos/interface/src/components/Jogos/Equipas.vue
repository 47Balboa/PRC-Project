<template>
  <v-row v-if="lista.length !=0">
    <v-col cols="2">
      <div class="info-label">Teams:</div>
    </v-col>
    <v-col>
      <div class="info-content">
        <ul v-for="equipa in lista" :key="equipa">
          <li @click="mostraEquipa(equipa)">
            {{equipa.designacao}} <!-- por a contagem de medalhas para cada equipa maybe  -->
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Equipas",
  props: ["lista"],
  methods : {
    mostraEquipa: function(e){
      this.$router.push('/equipas/' + e.idEquipa)
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