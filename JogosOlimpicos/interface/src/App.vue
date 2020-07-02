<template>
  <v-app>
    <v-content>
      <v-card color="grey lighten-4" flat height="200px" tile>
        <v-app-bar class="dark " dense dark>
          
           <v-toolbar-side-icon>
         
        <v-img :src="require('@/assets/logo.png') " height="25px" width="50px"/>
        
           </v-toolbar-side-icon>
            
          <v-toolbar-title class="ma-3" @click="$router.push('/')" >Olympic Games</v-toolbar-title>
          
          <v-spacer></v-spacer>
          <v-btn text color= "white" class=" ma-2" light>About</v-btn>
          <v-btn text color= "white" class=" ma-2" @click="$router.push('/jogos/')" light>Games</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/eventos/')" light>Events</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/equipas/')" light>Teams</v-btn>
          <v-btn text color= "white" class="ma-2" @click="$router.push('/atletas/')" light>Athletes</v-btn>
          <v-btn text color= "white" class="ma-2" light>Statistics</v-btn>
        </v-app-bar>
        <router-view></router-view>
      </v-card>
    </v-content>
  </v-app>
</template>


<script>
 


export default {
}
</script>