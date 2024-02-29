<template>
  <BlobComponent :color="`rgb(${r}, ${g}, ${b})`" />
</template>

<script setup>
import BlobComponent from "./BlobComponent.vue";

import { ref, onMounted } from "vue";

const r = ref(205);
const g = ref(134);
const b = ref(13);
const setupColorOscillation = (colorRef, speed) => {
  setInterval(() => {
    colorRef.value = Math.round(
      127 * Math.sin((Date.now() / speed) * 0.001) + 128
    );
  }, speed);
};

onMounted(() => {
  // Set up color oscillations with different speeds
  setupColorOscillation(r, 1000); // Adjust the speed as needed
  setupColorOscillation(g, 500);
  setupColorOscillation(b, 200);
});
</script>

<style></style>
