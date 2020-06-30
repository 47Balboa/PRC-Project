<template>
  <v-card class="ma-2">
    <v-card-title class="indigo lighten-1" dark>
      List of the Teams in the DB
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filtrar"
        label="Filtrar"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hequipas"
        :items="equipas"
        :footer-props="footer_props"
        :search="filtrar"
      >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Loading the list of Teams ...
            </v-alert>
          </template>

          <template v-slot:item.ops="{ item }">
            <v-icon
              @click="mostraEquipa(item)"
            >
              {{ verEquipa }} 
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
  name: 'ListaEquipas',

  data: () => ({
    hequipas: [
      {text: "Team", sortable: true, value: 'idEquipa', class: 'subtitle-1'},
      {text: "Designation", sortable: true, value: 'designacao', class: 'subtitle-1'},
      {text: "Operations", value: 'ops', class: 'subtitle-1'}
    ],
    // o v-data-table ja vem com os footer-props implementados; aqui estamos a redefini-los de acordo com o que queremos
    // para mostrar todos os equipas colocamos -1 na lista, que corresponde a todos e dizemos o nome para esse campo : "Todos"
    footer_props: {
      "items-per-page-text": "Show",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "All"
    }, 

    equipas: [],
    filtrar: "",
    verEquipa: mdiEyeOutline  // corresponde ao icon
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/equipas");
      this.equipas = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraEquipa: function(item){
      this.$router.push("/equipas/" + item.idEquipa);
    }
  }
  
}
</script>