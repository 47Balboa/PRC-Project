<template>
  <v-carousel hide-delimiters cycle height="725px">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>




export default {
  name: 'PaginaPrincipal',


 data () {
      return {
        items: [

          {
            src: require('@/assets/swim.png'),
          },
          {
            src: require('@/assets/sprint.jpg'),
          },
          {
            src: require('@/assets/esqui.jpg'),
          },
           {
            src: require('@/assets/rings.jpg'),
          },
        
          {
            src: require('@/assets/high-jump.jpg'),
          },
          {
            src: require('@/assets/patinagem.jpg'),
          },
          {
            src: require('@/assets/gymnastics.jpg'),
          },
          {
            src: require('@/assets/weightlifting.jpg'),
          },
        ],
      }
    }, 

  
}
</script>

<style>
#inspire {
  height: 100vh;
}
</style>