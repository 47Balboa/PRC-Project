<template>
  <v-row v-if="lista.length !=0">
    <v-col cols="2">
      <div class="info-label">Events:</div>
    </v-col>
    <v-col>
      <div>
        <div class="text-center d-flex pb-4">
          <v-btn color="blue" @click="all">all</v-btn>
          <v-btn color="blue" @click="none">none</v-btn>
        </div>

        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(item,d) in getSports(lista)" :key="d">
            <v-expansion-panel-header><b>{{ item }}</b></v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul v-for="evento in splitEventos(item)" :key="evento">
                <li @click="mostraEvento(evento.id)">{{evento.designacao}}</li>
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
  name: "Eventos",
  props: ["lista"],

  data() {
    return {
      panel: []
    };
  },

  methods: {
    mostraEvento: function(e) {
      this.$router.push('/eventos/' + e)
    },
    splitEventos: function(desp){
      var evs = []
      var idString = ""
      var desString = ""
      this.lista.forEach(l => {
        if (l.desporto === desp){
          idString = l.ids
          desString = l.designacoes
        }
      });
      desString = desString.split(';')
      idString = idString.split(';')
      for (let i = 0; i < desString.length; i++) {
        var ev = {
          id : idString[i],
          designacao : desString[i] 
        }
        evs.push(ev)
      }
      return evs
    },

    all() {
      this.panel = [...this.lista.keys()].map((k, i) => i);
    },
    // Reset the panel
    none() {
      this.panel = [];
    },

    getSports: function(list) {
      var dps = [];
      list.forEach(element => {
        dps.push(element.desporto);
      });
      return dps;
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