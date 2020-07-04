<template>

<div>
<v-row>
    <v-col cols="12"> 
    <v-card color="blue darken-2"  height="70px">
 <v-card-title class="headline"  aling="center">The Olympic Rings</v-card-title>
    </v-card >
    </v-col>
    </v-row>
        <v-row>
            <v-col cols="8"> 
                
              <v-img :src="require('@/assets/logo.png') "  width="600px" class="ma-3" />
               
               </v-col>
        </v-row>
        <v-row>
            <v-col cols="7" class="ml-6">
          <h4>  THE OLYMPIC SYMBOL – WIDELY KNOWN THROUGHOUT THE WORLD AS THE OLYMPIC RINGS – IS THE VISUAL AMBASSADOR OF OLYMPISM FOR BILLIONS OF PEOPLE. </h4>
            </v-col>
            <v-col cols="7" class="ml-6">
       <h4> BASED ON A DESIGN FIRST CREATED BY PIERRE DE COUBERTIN, THE OLYMPIC RINGS REMAIN A GLOBAL REPRESENTATION OF THE OLYMPIC MOVEMENT AND ITS ACTIVITY.</h4>
       </v-col>
       <v-col cols="7" class="ml-6">
           <h4>DEFINITION</h4>
       </v-col>
      
       <v-col cols="7" class="ml-6" >

       <p>“The Olympic symbol consists of five interlaced rings of equal dimensions (the Olympic rings), used alone, in one or in five different colours. When used in its five-colour version, these colours shall be, from left to right, blue, yellow, black, green and red. The rings are interlaced from left to right; the blue, black and red rings are situated at the top, the yellow and green rings at the bottom in accordance with the following graphic reproduction.” (Olympic Charter, Rule 8)</p>
       </v-col>

        <v-col cols="7" class="ml-6">
           <h4> MEANING</h4>
       </v-col>

        <v-col cols="7" class="ml-6">
           <p> “The Olympic symbol expresses the activity of the Olympic Movement and represents the union of the five continents and the meeting of athletes from throughout the world at the Olympic Games.” (Olympic Charter, Rule 8)</p>
       </v-col>

      
         <v-row>
            <v-col cols="12" class="mb-4"> 
                <v-card color="blue darken-2"  align="center" class="md-3">
                <v-card-text class="headline " >
               " THESE FIVE RINGS REPRESENT THE FIVE PARTS OF THE WORLD NOW WON OVER TO THE CAUSE OF OLYMPISM AND READY TO ACCEPT ITS FECUND RIVALRIES. WHAT IS MORE, THE SIX COLORS THUS COMBINED REPRODUCE THOSE OF ALL NATIONS WITHOUT EXCEPTION."
             

                </v-card-text>
                <v-card-text class="font-weight-black" >
                    Pierre de Coubertin, Founder of the Olympic Movement

                </v-card-text>

                </v-card>
               
               </v-col>
        </v-row>
        <v-row>
             <v-col cols="7" class="ml-6">
           <h4>THE OFFICIAL VERSION</h4>
       </v-col>
      
       <v-col cols="7" class="ml-6" >

         <p>Today, there are seven official versions of the Olympic rings.</p>
         <p>The full-colour version on its white background is the preferred version of the Olympic rings. Indeed, the full-colour Olympic rings are the embodiment of Pierre de Coubertin’s original vision; “full-colour” refers to the six Olympic colours – blue, yellow, black, green and red on a white background – which symbolise Olympism’s universality.</p>
         <p>The monochrome Olympic rings provide an alternative to the full-colour Olympic rings. The Olympic rings may appear in any of the six official Olympic colours when necessary.</p>
       </v-col>
      
        </v-row>
         <v-row>
           <v-col cols="2" class="ma-2">
        <v-img :src="require('@/assets/ring/black.png') "  width="1000px" class="ma-3"/>
           </v-col>
            <v-col cols="2" class="ma-2">
        <v-img :src="require('@/assets/ring/blue.png') "  width="1000px" class="ma-3"/>
           </v-col>
            <v-col cols="2" class="ma-2">
        <v-img :src="require('@/assets/ring/yellow.png') "  width="1000px" class="ma-3"/>
           </v-col>
            <v-col cols="2" class="ma-2">
        <v-img :src="require('@/assets/ring/green.png') " height="200px" width="1000px" class="ma-3"/>
           </v-col>
            <v-col cols="2" class="ma-2">
        <v-img :src="require('@/assets/ring/bwhite.jpg') "  width="1000px" class="ma-3"/>
           </v-col>

       </v-row>
        </v-row>
</div>
</template>