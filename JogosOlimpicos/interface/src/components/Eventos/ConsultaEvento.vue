<template>
  <div>
      <v-alert type="warning" v-if="!eventoCarregado">
          Loading information...
      </v-alert>

      <v-card v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Event: "{{ evento.info.designacao }}" ({{idEvento}})</span>
        </v-card-title>

        <v-card-text>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Sport:</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ evento.info.desporto }}</div>
              </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Belongs:</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ evento.info.jogo }}</div>
                  </v-col>
                </v-row>
                

                <Atletas :lista="evento.atletas" />
                <Podio :ouro="evento.podio.ouro" :prata="evento.podio.prata" :bronze="evento.podio.bronze"/>
               
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

import Atletas from "@/components/Eventos/Atletas.vue"
import Podio from "@/components/Eventos/Podio.vue"


export default {
  name: 'ConsultaEvento',

  components: {
      Atletas,
      Podio,
      
  },

  props: ["idEvento"],

  data: () => ({
    evento: {},
    eventoCarregado: false,
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/eventos/" + this.idEvento);
      this.evento = response.data;
      this.evento.info.jogo = this.evento.info.jogo.split('#')[1]
      this.evento.atletas.sort((a,b) => a.nome > b.nome ? 1 : -1);
      this.eventoCarregado = true;
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