<script setup>
import HeroImage from "../components/HeroImage.vue";
import TestFetch from "@/components/TestFetch.vue";
import About from "../components/AboutText.vue";
import Carousel from "../components/ImgWheel.vue"
</script>

<template>
  <main>
    <TestFetch />
    <HeroImage />
    <Carousel />
    <About />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
