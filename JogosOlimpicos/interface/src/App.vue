<template>
  <v-app>
    <v-content>
      <v-card color="white " flat height="200px" tile  >
        <v-app-bar class="dark " dark dense fixed app >
          
           <v-toolbar-side-icon>
         
        <v-img :src="require('@/assets/logo.png') " height="25px" width="50px" class="ma-3" @click="$router.push('/')"/>
        
           </v-toolbar-side-icon>
            
          <v-toolbar-title class="ma-3" @click="$router.push('/')" >Olympic Games</v-toolbar-title>
          
          <v-spacer></v-spacer>
          
          <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>{{icon}}</v-icon>   About
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="mostra(item)"
          
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      
          <v-btn text color= "white" class=" ma-2" @click="$router.push('/jogos/')" light>Games</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/eventos/')" light>Events</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/equipas/')" light>Teams</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/atletas/')" light>Athletes</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/statistics/')" light>Statistics</v-btn>
        </v-app-bar>
        <router-view></router-view>
      </v-card>

    </v-content>

     <v-card >
      
    <v-footer
      
      class="grey darken-4" fixed padless 
    >
      <v-col
        class="py-2 white--text "
        cols="12"
        color="white"
      >
        PRC {{ new Date().getFullYear() }} — Made by Filipa Pereira & Shahzod Yusupov
      </v-col>
    </v-footer> 
  </v-card>
  </v-app>
</template>


<script>
import { mdiChevronDown } from '@mdi/js';

  export default {
    data: () => ({
      items: [
        { title: 'History' },
        { title: 'Rings' },
       
      ],
      icon:  mdiChevronDown
    }),

    methods: {
    mostra: function(item){
      this.$router.push("/" + item.title);
    }
  }
  }
</script>