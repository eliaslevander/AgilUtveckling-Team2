<script setup>
import HeroImage from "../components/HeroImage.vue";
import SearchResults from "../components/SearchComponent.vue";
import About from "../components/AboutText.vue";
import Carousel from "../components/ImgWheel.vue";
</script>

<template>
  <main>
    <SearchBar />
    <TestFetch />
    <SearchResults />
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
  margin-top: 64px;
}
</style>
