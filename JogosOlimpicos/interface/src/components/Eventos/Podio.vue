<template>
  <v-row v-if="ouro !='' && prata !='' && bronze !=''">
    <v-col cols="2">
      <div class="info-label">Podium:</div>
    </v-col>
    <v-col cols="3" v-if="splitAtletas(ouro).length != 0"> 
        <div class="info-content" style="background-color:gold">
            <ul v-for="atleta in splitAtletas(ouro)" :key="atleta">
                <li>
                    {{atleta}}
                </li>
            </ul>
        </div>
    </v-col>
    <v-col cols="3" v-if="splitAtletas(prata).length != 0"> 
        <div class="info-content" style="background-color:silver">
            <ul v-for="atleta in splitAtletas(prata)" :key="atleta">
                <li>
                    {{atleta}}
                </li>
            </ul>
        </div>
    </v-col>
    <v-col cols="3" v-if="splitAtletas(bronze).length != 0"> 
        <div class="info-content" style="background-color:peru">
            <ul v-for="atleta in splitAtletas(bronze)" :key="atleta">
                <li>
                    {{atleta}}
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
    splitAtletas(str) {
      var arr = str.split(';')
      return arr
    },
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