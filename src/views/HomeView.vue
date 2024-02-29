<script setup>
import HeroImage from "../components/HeroImage.vue";
import SearchResults from "../components/SearchComponent.vue";
import About from "../components/AboutText.vue";
import Carousel from "../components/ImgWheel.vue";
import TestFetch from "../components/TestFetch.vue";
import CoolBlob from "@/components/CoolBlob.vue";
</script>

<template>
  <main>
    <CoolBlob />
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
}
</style>
