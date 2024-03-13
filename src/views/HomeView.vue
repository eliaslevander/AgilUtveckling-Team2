<script setup>
import HeroComponent from "../components/HeroComponent.vue";
import About from "../components/AboutText.vue";
import Carousel from "../components/ImgWheel.vue";
</script>

<template>
  <main>
    <HeroComponent />
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
