<template>
  <v-card class="ma-2 pb-4">
    <v-card-title class="indigo lighten-1" dark>
      List of Athletes in the DB
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filtrar"
        label="Search"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hatletas"
        :items="atletas"
        :footer-props="footer_props"
        :search="filtrar"
      >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Loading the list of Athletes ...
            </v-alert>
          </template>

          <template v-slot:item.ops="{ item }">
            <v-icon
              @click="mostraAtleta(item)"
            >
              {{ verAtleta }} 
            </v-icon>
           </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

import { mdiEyeOutline } from '@mdi/js';

export default {
  name: 'ListaAtletas',

  data: () => ({
    hatletas: [
      {text: "Name", sortable: true, value: 'nome', class: 'subtitle-1'},
      {text: "Age", sortable: true, value: 'idade', class: 'subtitle-1'},
      {text: "Height", sortable: true, value: 'altura', class: 'subtitle-1'},
      {text: "Weight", sortable: true, value: 'peso', class: 'subtitle-1'},
      {text: "Gender", sortable: true, value: 'sexo', class: 'subtitle-1'},
      {text: "Team", sortable: true, value: 'equipa', class: 'subtitle-1'},
      {text: "Operations", value: 'ops', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Show",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "All"
    }, 
    atletas: [],
    filtrar: "",
    verAtleta: mdiEyeOutline  // corresponde ao icon
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atletas");
      this.atletas = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraAtleta: function(item){
      this.$router.push("/atletas/" + item.idAtleta);
    }
  }
  
}
</script>