<template>
  <div>
      <v-alert type="warning" v-if="!jogoCarregado">
          A carregar informação...
      </v-alert>

      <v-card v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Olympic Games: "{{ jogo.info.designacao }}" ({{idJogo}})</span>
        </v-card-title>

        <v-card-text>
            <v-row>
              <v-col cols="2">
                <div class="info-label">City:</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ jogo.info.cidade}}</div>
              </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Year:</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogo.info.ano }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Season:</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogo.info.temporada }}</div>
                  </v-col>
                </v-row>

               
                <TabelaMedalhas :lista="contagem" />
                <Eventos :lista="jogo.eventos" />
                <Atletas :lista="jogo.atletas" />
                
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

import Eventos from "@/components/Jogos/Eventos.vue"
import Atletas from "@/components/Jogos/Atletas.vue"
import TabelaMedalhas from "@/components/Jogos/TabelaMedalhas.vue"


export default {
  name: 'ConsultaJogo',

  components: {
      Eventos,
      Atletas,
      TabelaMedalhas
  },

  props: ["idJogo"],

  data: () => ({
    jogo: {},
    jogoCarregado: false,
    contagem: {}
  }),
  

  created: async function(){
    try {
      let response = await axios.get(lhost + "/jogos/" + this.idJogo);
      let response2 = await axios.get(lhost + "/jogos/" + this.idJogo + "/contagem")
      this.jogo = response.data;
      this.jogo.atletas.sort((a,b) => a.nome > b.nome ? 1 : -1);
      this.contagem = response2.data;
      console.log(this.contagem)
      this.jogoCarregado = true;
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