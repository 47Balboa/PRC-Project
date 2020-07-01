<template>
  <v-row v-if="lista.length !=0">
    <v-col cols="2">
      <div class="info-label">Medal Count:</div>
    </v-col>
    <v-col cols="1">
    </v-col>
    <v-col cols="6">
      <v-data-table class="info-content"
        :headers="hMedalhas"
        :items="Object.values(lista)"
        items-per-page="5"
      >
      
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
             Loading medal count ...
            </v-alert>
          </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TabelaMedalhas",
  props: ["lista"],

  data: () => ({
    hMedalhas: [
      {text: "Country", align:'center', sortable: false ,value: 'designacao', class: 'subtitle-1'},
      {text: "Gold", align:'center', value: 'ouros', class: 'subtitle-1'},
      {text: "Silver", align:'center', value: 'pratas', class: 'subtitle-1'},
      {text: "Bronze", align:'center', value: 'bronzes', class: 'subtitle-1'},
      {text: "Total", align:'center', value: 'total', class: 'subtitle-1'}
    ]
  }),

  methods: {
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