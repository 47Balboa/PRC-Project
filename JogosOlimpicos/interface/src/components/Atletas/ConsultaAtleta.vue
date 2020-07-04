<template>
  <div class="ma-2 pb-6">
      <v-alert type="warning" v-if="!atletaCarregado">
          Loading information...
      </v-alert>

      <v-card v-else>
        <v-card-title class="indigo lighten-1 white--text" dark>
            <span class="headline">Athlete: "{{ atleta.info.nome }}" </span>
        </v-card-title>

        <v-card-text>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Name</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ atleta.info.nome }}</div>
              </v-col>
            </v-row>
            <v-row v-if="atleta.info.idade">
              <v-col cols="2">
                <div class="info-label">Age</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ atleta.info.idade }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Gender</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ atleta.info.sexo }}</div>
              </v-col>
            </v-row>
            <v-row v-if="atleta.info.altura">
                <v-col cols="2">
                    <div class="info-label">Height</div>
                </v-col>
                <v-col>
                    <div class="info-content">{{ atleta.info.altura }} cm</div>
                </v-col>
            </v-row>
            <v-row v-if="atleta.info.peso">
                <v-col cols="2">
                    <div class="info-label">Weight </div>
                </v-col>
                <v-col>
                    <div class="info-content">{{ atleta.info.peso }} Kg</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                    <div class="info-label">Team</div>
                </v-col>
                <v-col cols="1">
                    <country-flag @click="mostraEquipa(atleta.info.idEquipa)" style="margin-top:-8px" :country="atleta.info.flagCode" /> 
                </v-col>
                <v-col cols="2">
                    <div style="margin-top:5px;margin-left:-60px" @click="mostraEquipa(atleta.info.idEquipa)" class="content">{{ atleta.info.equipa }}</div> 
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                    <div class="info-label">Sports</div>
                </v-col>
                <v-col>
                    <div class="info-content">
                    {{this.getSports(atleta.desportos)}}
                    </div>
                </v-col>
            </v-row> 

            <Medalhas :ouros="atleta.medalhas.ouro" :pratas="atleta.medalhas.prata" :bronzes="atleta.medalhas.bronze"/>
            <Eventos :lista="atleta.eventos" /> 
               
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

import Medalhas from "@/components/Atletas/Medalhas.vue"
import Eventos from "@/components/Atletas/Eventos.vue"
import CountryFlag from 'vue-country-flag'

export default {
  name: 'ConsultaAtleta',

  components: {
      CountryFlag,
      Medalhas,
      Eventos
  },

  props: ["idAtleta"],

  data: () => ({
    atleta: {},
    atletaCarregado: false,
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atletas/" + this.idAtleta);
      this.atleta = response.data;
      this.atletaCarregado = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraEquipa: function(e) {
      this.$router.push("/equipas/" + e);
    },
    getSports: function(arr) {
      var sports = []
      arr.forEach(element => {
        sports.push(' '+element.desporto)
      });
      return sports.toString()
    }
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