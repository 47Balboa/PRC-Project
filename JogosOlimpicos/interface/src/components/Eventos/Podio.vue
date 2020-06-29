<template>
  <v-row v-if="ouro.length > 0 || prata.length > 0 || bronze.length > 0">
    <v-col cols="2">
      <div class="info-label">Podium:</div>
    </v-col>
    <v-col cols="3" v-if="ouro.length != 0"> 
        <div class="info-content" style="background-color:gold">
            <ul v-for="atleta in ouro" :key="atleta">
                <li @click="mostraAtleta(atleta.id)">
                    {{atleta.nome}}
                </li>
            </ul>
        </div>
    </v-col>
    <v-col cols="3" v-if="prata.length != 0"> 
        <div class="info-content" style="background-color:silver">
            <ul v-for="atleta in prata" :key="atleta">
                <li @click="mostraAtleta(atleta.id)">
                    {{atleta.nome}}
                </li>
            </ul>
        </div>
    </v-col>
    <v-col cols="3" v-if="bronze.length != 0"> 
        <div class="info-content" style="background-color:peru">
            <ul v-for="atleta in bronze" :key="atleta">
                <li @click="mostraAtleta(atleta.id)">
                    {{atleta.nome}}
                </li>
            </ul>
        </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Podio",
  props: ["ouro","prata","bronze"],
  methods: {
    mostraAtleta: function(a){
      this.$router.push('/atletas/' + a)
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