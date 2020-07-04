<template>
  <v-row v-if="lista.length !=0">
    <v-col cols="2">
      <div class="info-label">Athletes By Team</div>
    </v-col>
    <v-col>
      <div>
        <div class="text-center d-flex pb-2">
          <v-btn class="ma-1" color="blue darken-1" @click="all">all</v-btn>
          <v-btn class="ma-1" color="blue darken-1" @click="none">none</v-btn>
        </div>

        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(item,e) in getTeams(lista)" :key="e">
            <v-expansion-panel-header><b>{{ item }}</b></v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul v-for="atleta in splitAtletas(item)" :key="atleta">
                <li @click="mostraAtleta(atleta.id)">{{atleta.nome}}</li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Atletas",
  props: ["lista"],

  data() {
    return {
      panel: []
    };
  },

  methods : {
    mostraAtleta: function(a){
      this.$router.push('/atletas/' + a)
    },
    splitAtletas: function(eq){
      var atls = []
      var idString = ""
      var nomeString = ""
      this.lista.forEach(l => {
        if (l.equipa === eq){
          idString = l.ids
          nomeString = l.nomes
        }
      });
      nomeString = nomeString.split(';')
      idString = idString.split(';')
      for (let i = 0; i < nomeString.length; i++) {
        var at = {
          id : idString[i],
          nome : nomeString[i] 
        }
        atls.push(at)
      }
      return atls
    },

    all() {
      this.panel = [...this.lista.keys()].map((k, i) => i);
    },
    // Reset the panel
    none() {
      this.panel = [];
    },

    getTeams: function(list) {
      var eqs = [];
      list.forEach(element => {
        eqs.push(element.equipa);
      });
      return eqs;
    }
  }
};
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