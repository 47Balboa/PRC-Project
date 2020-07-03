<template>
	<v-card>
		<v-card-title class="indigo lighten-1 white--text ma-2" dark>
			<span class="headline">Statistics</span>
		</v-card-title>

    <v-tabs v-model="tab" background-color="teal" dark class="pa-2">
		<v-tab>Most Condecorated Athletes [Top 20]</v-tab>
		<v-tab>Most Condecorated Athletes By Sport [Top 10]</v-tab>
		<v-tab>Top 10 Sports with More Teams Represented</v-tab>
		<v-tab>Top 10 Sports with Most Athletes</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
		<v-row>
			<v-col cols="2"/>
            <v-col cols="8">
				<v-data-table class="mytable elevation-1 ma-5" 
					:headers="hMedalhas" 
					:items="top20"
					:items-per-page="20"
					hide-default-footer dense>
					<template v-slot:no-data>
						<v-alert :value="true" color="warning" icon="warning">
							Loading...
						</v-alert>
					</template>
					<template v-slot:item.atleta ="{ item }">
						<td @click="mostraAtleta(item)">{{ item.atleta }}</td>
					</template>
				</v-data-table>
			</v-col>
			</v-row>
		</v-tab-item>
		<v-tab-item>
		<v-row>
			<v-col class="d-flex ma-2" cols="4">
				<v-select v-model="sportSelected" :items="sports" label="Choose sport" dense outlined></v-select>
			</v-col>
			<v-col cols="2">
				<v-btn class="ma-1" color="blue" @click="showTop10()">Go</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="2"/>
            <v-col cols="8">
				<v-data-table v-if="sportSelected != ''" class="mytable elevation-1 ma-5" 
					:headers="hTop10" 
					:items="top10"
					hide-default-footer dense>
					<template v-slot:no-data>
						<v-alert :value="true" color="warning" icon="warning">
							Loading...
						</v-alert>
					</template>
					<template v-slot:item.atleta ="{ item }">
						<td @click="mostraAtleta(item)">{{ item.atleta }}</td>
					</template>
				</v-data-table>
			</v-col>
			</v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;


export default {
  name: "PaginaEstatisticas",


  data: () => ({
	tab: null,
	hMedalhas: [
		{text: "Athlete", align:'center', sortable: false, value: 'atleta', class: 'subtitle-1'},
		{text: "Country", align:'center', sortable: false, value: 'equipa', class: 'subtitle-1'},
		{text: "Sport", align:'center', sortable: false, value: 'desporto', class: 'subtitle-1'},
		{text: "Gold", align:'center', value: 'numOuros', class: 'subtitle-1'},
		{text: "Silver", align:'center', value: 'numPratas', class: 'subtitle-1'},
		{text: "Bronze", align:'center', value: 'numBronzes', class: 'subtitle-1'},
		{text: "Total", align:'center', value: 'numMedals', class: 'subtitle-1'}
	],
	top20: [],
	hTop10: [
		{text: "Athlete", align:'center', sortable: false, value: 'atleta', class: 'subtitle-1'},
		{text: "Country", align:'center', sortable: false, value: 'equipa', class: 'subtitle-1'},
		{text: "Gold", align:'center', value: 'numOuros', class: 'subtitle-1'},
		{text: "Silver", align:'center', value: 'numPratas', class: 'subtitle-1'},
		{text: "Bronze", align:'center', value: 'numBronzes', class: 'subtitle-1'},
		{text: "Total", align:'center', value: 'numMedals', class: 'subtitle-1'}
	],
	top10: [],
	sports: [],
	sportSelected: ""
  }),

  created: async function(){
    try {
		let response = await axios.get(lhost + "/stats/top20");
		this.top20 = response.data
		let response2 = await axios.get(lhost + "/stats/sports")
		this.sports = Object.values(response2.data).map(function(item) { 
			return item['desporto'];});
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraAtleta: function(item){
      this.$router.push("/atletas/" + item.idAtleta);
	},
	showTop10: async function(){
		console.log(this.sportSelected)
		try {
			let response = await axios.get(lhost + "/stats/" + this.sportSelected + "/top10");
			this.top10 = response.data
		} 
		catch (e) {
			return e;
		}
	}
  }
};
</script>

<style>
.mytable {
  padding: 5px;
  width: 100%;
  border: 1px solid black;
}
</style>