<script setup>
  import HeroImage from '../components/HeroImage.vue'
  import About from '../components/AboutText.vue'
</script>

<template>
  <main>
    <HeroImage />
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
