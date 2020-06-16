<template>
  <v-card class="ma-2">
    <v-card-title class="indigo lighten-1" dark>
       List of Events in the DB
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
        :headers="heventos"
        :items="eventos"
        :footer-props="footer_props"
        :search="filtrar"
      >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possível apresentar uma lista dos Eventos...
            </v-alert>
          </template>

          <template v-slot:item.ops="{ item }">
            <v-icon
              @click="mostraEvento(item)"
            >
              {{ verEvento }} 
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
  name: 'ListaEventos',

  data: () => ({
    heventos: [
      {text: "Designation", sortable: true, value: 'designacao', class: 'subtitle-1'},
      {text: "Sport", sortable: true, value: 'desporto', class: 'subtitle-1'},
      {text: "Belongs", sortable: true, value: 'jogosOlimpicos', class: 'subtitle-1'},
      {text: "Operations", value: 'ops', class: 'subtitle-1'}
    ],
    // o v-data-table ja vem com os footer-props implementados; aqui estamos a redefini-los de acordo com o que queremos
    // para mostrar todos os eventos colocamos -1 na lista, que corresponde a todos e dizemos o nome para esse campo : "Todos"
    footer_props: {
      "items-per-page-text": "Show",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "All"
    }, 

    eventos: [],
    filtrar: "",
    verEvento: mdiEyeOutline  // corresponde ao icon
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/eventos");
      this.eventos = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraEvento: function(item){
      alert('Clicked Event: ' + JSON.stringify(item))
      this.$router.push("/eventos/" + item.idEvento);
    }
  }
  
}
</script>