<script setup>
import HeroImage from "../components/HeroImage.vue";
import About from "../components/AboutText.vue";
import Testfetch from "../components/TestFetch.vue"
import Carousel from "../components/ImgWheel.vue";
import SearchBar from "../components/SearchComponent.vue"
</script>

<template>
  <main>
<Testfetch />
    <SearchBar />
    <HeroImage />
    <Carousel />
    <About />
  </main>
</template>

<style scoped>
main {
  padding: 0%;
  margin: 0%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
