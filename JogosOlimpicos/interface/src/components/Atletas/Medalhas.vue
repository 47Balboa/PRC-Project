<template>
  <v-row v-if="ouros !='' && pratas !='' && bronzes !=''">
    <v-col cols="2">
      <div class="info-label">Medals:</div>
    </v-col>
    <v-col cols="3" v-if="splitMedals(ouros).length != 0"> 
        <div class="info-content" style="background-color:gold">
            <ul v-for="medalha in splitMedals(ouros)" :key="medalha">
                <li @click="mostraEvento(medalha)">
                    {{medalha}} [{{medalha.substring(0,10)}}]
                </li>
            </ul>
        </div>
    </v-col>
    <v-col cols="3" v-if="splitMedals(pratas).length != 0"> 
        <div class="info-content" style="background-color:silver">
            <ul v-for="medalha in splitMedals(pratas)" :key="medalha">
                <li @click="mostraEvento(medalha)">
                    {{medalha}} [{{medalha.substring(0,10)}}] 
                </li>
            </ul>
        </div>
    </v-col>
    <v-col cols="3" v-if="splitMedals(bronzes).length != 0"> 
        <div class="info-content" style="background-color:peru">
            <ul v-for="medalha in splitMedals(bronzes)" :key="medalha">
                <li @click="mostraEvento(medalha)">
                    {{medalha}} [{{medalha.substring(0,10)}}]
                </li>
            </ul>
        </div>
    </v-col>
  </v-row>
</template>



<script>
export default {
  name: "Medalhas",
  props: ["ouros", "pratas", "bronzes"],

  methods: {
    splitMedals(str) {
      //trazer designacoes tbm, alterar query do podio
      var arr = str.split(';')
      return arr
    },
    mostraEvento: function(e){
      this.$router.push('/eventos/' + e)
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