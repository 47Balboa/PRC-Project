<template>
  <v-card class="ma-2 pb-4">
    <v-card-title class="indigo lighten-1" dark>
       List of Games in the DB
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
        :headers="hjogos"
        :items="jogos"
        :footer-props="footer_props"
        :search="filtrar"
      >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
             Loading list of Olympic Games ...
            </v-alert>
          </template>

          <template v-slot:item.ops="{ item }">
            <v-icon
              @click="mostraJogo(item)"
            >
              {{ verJogo }} 
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
  name: 'ListaJogos',

  data: () => ({
    hjogos: [
      {text: "Designation", sortable: true, value: 'designacao', class: 'subtitle-1'},
      {text: "City", sortable: true, value: 'cidade', class: 'subtitle-1'},
      {text: "Year", sortable: true, value: 'ano', class: 'subtitle-1'},
      {text: "Season", sortable: true, value: 'temporada', class: 'subtitle-1'},
      {text: "Operations", value: 'ops', class: 'subtitle-1'}
    ],
    // o v-data-table ja vem com os footer-props implementados; aqui estamos a redefini-los de acordo com o que queremos
    // para mostrar todos os jogos colocamos -1 na lista, que corresponde a todos e dizemos o nome para esse campo : "Todos"
    footer_props: {
      "items-per-page-text": "Show",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "All"
    }, 

    jogos: [],
    filtrar: "",
    verJogo: mdiEyeOutline  // corresponde ao icon
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/jogos");
      this.jogos = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraJogo: function(item){
      this.$router.push("/jogos/" + item.idJogo);
    }
  }
  
}
</script>