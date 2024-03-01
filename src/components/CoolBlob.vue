<template>
  <div id="main-container">
    <div id="coolblob-container">
      <BlobComponent @click="clickForColor" :color="`rgb(${r}, ${g}, ${b})`" />
      <!-- <div class="hex-container">
          <p>R {{ r }}</p>
          <p>G {{ g }}</p>
          <p>B {{ b }}</p>
        </div> -->
    </div>
    <div id="blob-container">
      <BlobComponent :color="`rgb(${clickedR}, ${clickedG}, ${clickedB})`" />
      <!-- <div class="hex-container">
          <p>R {{ clickedR }}</p>
          <p>G {{ clickedG }}</p>
          <p>B {{ clickedB }}</p>
        </div> -->
    </div>
  </div>
</template>

<script setup>
import BlobComponent from "./BlobComponent.vue";

import { ref, onMounted } from "vue";

const r = ref(255);
const g = ref(30);
const b = ref(0);

let clickedR = null;
let clickedG = null;
let clickedB = null;

const clickForColor = () => {
  clickedR = r.value;
  clickedG = g.value;
  clickedB = b.value;
  console.log(clickedR, clickedG, clickedB);
};

const setupColorOscillation = (colorRef, speed) => {
  setInterval(() => {
    colorRef.value = Math.round(
      127 * Math.sin((Date.now() / speed) * 0.1) + 128
    );
  }, speed);
};

onMounted(() => {
  setupColorOscillation(r, 100);
  setupColorOscillation(g, 200);
  setupColorOscillation(b, 300);
});
</script>

<style>
#main-container {
  width: 100%;
  padding: 4vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

#coolblob-container {
  width: 40vw;
  display: flex;
  justify-content: center;
}

#blob-container {
  width: 40vw;
  display: flex;
  justify-content: center;
}

.hex-container {
  display: flex;
  justify-content: space-evenly;
  font-size: 1.25rem;
  gap: 10px;
}
</style>
