<script>

</script>

<template>
  <v-container id="wheel">
<v-card id="card"
  elevation="16">
  <img src="../assets/images/White/White_Interior_01.jpg" alt="white Room">
  </v-card>
  <v-card id="card"
  elevation="16">
    <img src="../assets/images/Carousel/blueroom2.jpg" alt="blue room">
  </v-card>
  <v-card id="card"
  elevation="16">
    <img src="../assets/images/Carousel/galleryroom.jpg" alt="beige room">
  </v-card>
  <v-card id="card"
  elevation="16">
    <img src="../assets/images/Carousel/yellowwall.jpg" alt="yellow room">
  </v-card>
  <v-card id="card"
  elevation="16">
    <img src="../assets/images/Green/Green_Interior_03_.jpg" alt="">
  </v-card>
</v-container>
</template>

<style scoped>
#wheel {

  overflow:auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
#card {margin: 1vh;
}

img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding:1vh;
  object-fit: contain;
  height: 100%;
  width: 100%;
  min-height: 240px;
  max-height: 600px;
  min-height: 240px;
  max-width: 750px;
}
img:hover {
  opacity: 50%;
}
</style>

