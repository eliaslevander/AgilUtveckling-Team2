<script setup>
import HeroImage from "../components/HeroImage.vue";
<<<<<<< HEAD
=======
import SearchResults from "../components/SearchComponent.vue";
>>>>>>> 94491e478101979f2325ea02451ab2c748433cbd
import About from "../components/AboutText.vue";
import Testfetch from "../components/TestFetch.vue"
import Carousel from "../components/ImgWheel.vue";
import TestFetch from "../components/TestFetch.vue";
</script>

<template>
  <main>
<<<<<<< HEAD
<Testfetch />
    <SearchBar />
=======
    <TestFetch />
    <SearchResults />
>>>>>>> 94491e478101979f2325ea02451ab2c748433cbd
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
