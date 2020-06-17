<template>
  <div>
      <v-alert type="warning" v-if="!equipaCarregada">
          Loading information...
      </v-alert>

      <v-card v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Team: "{{ equipa.info.designacao }}" ({{idEquipa}}) <country-flag style="float:right; margin-left:15px" :country="idEquipa.toLowerCase()" size="big"/></span>
        </v-card-title>

        <v-card-text>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Name:</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ equipa.info.designacao }}</div>
              </v-col>
            </v-row>

            <Jogos :lista="equipa.jogos" />
            <Atletas :lista="equipa.atletas" />
            <!-- em vez de por tds os eventos que são bues pomos tipo um top10 dos desportos em que a 
            equipa tem mais participações
            
            por seque tbm uma contagem das medalhas totais da equipa-->

               
            </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="$router.go(-1)">Back</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

import Atletas from "@/components/Equipas/Atletas.vue"
import Jogos from "@/components/Equipas/Jogos.vue"
import CountryFlag from 'vue-country-flag'


export default {
  name: 'ConsultaEquipa',

  components: {
      Atletas,
      Jogos, 
      CountryFlag   
  },

  props: ["idEquipa"],

  data: () => ({
    equipa: {},
    equipaCarregada: false,
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/equipas/" + this.idEquipa);
      this.equipa = response.data;
      this.equipa.atletas.sort((a,b) => a.nome > b.nome ? 1 : -1);
      this.equipaCarregada = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
  }
  
}
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