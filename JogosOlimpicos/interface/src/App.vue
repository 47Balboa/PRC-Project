<template>
  <v-app>
    <v-content>
      <v-card color="grey lighten-4" flat height="200px" tile>
        <v-toolbar class="black ma-1" dense dark>
          <v-toolbar-title>Olympic Games</v-toolbar-title>
          <v-icon class="pa-2" @click="$router.push('/')">mdi-home</v-icon>
          <v-spacer></v-spacer>

          <v-btn class="ma-2" @click="$router.push('/jogos/')" light>Games</v-btn>
          <v-btn class="ma-2" @click="$router.push('/eventos/')" light>Events</v-btn>
          <v-btn class="ma-2" @click="$router.push('/equipas/')" light>Teams</v-btn>
          <v-btn class="ma-2" @click="$router.push('/atletas/')" light>Athletes</v-btn>
          <v-btn class="ma-2" light>Statistics</v-btn>
        </v-toolbar>
        <router-view></router-view>
      </v-card>
    </v-content>
  </v-app>
</template>



