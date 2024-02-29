<template>
  <div id="main-container">
    <div id="blobs">
      <div id="coolblob-container">
        <BlobComponent
          width="300px"
          @click="clickForColor"
          :color="`rgb(${r}, ${g}, ${b})`"
        />
        <div class="hex-container">
          <p>R {{ r }}</p>
          <p>G {{ g }}</p>
          <p>B {{ b }}</p>
        </div>
      </div>
      <div id="blob-container">
        <BlobComponent
          width="300px"
          :color="`rgb(${clickedR}, ${clickedG}, ${clickedB})`"
        />
        <div class="hex-container">
          <p>R {{ clickedR }}</p>
          <p>G {{ clickedG }}</p>
          <p>B {{ clickedB }}</p>
        </div>
      </div>
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
  // Set up color oscillations with different speeds
  setupColorOscillation(r, 100); // Adjust the speed as needed
  setupColorOscillation(g, 500);
  setupColorOscillation(b, 200);
});
</script>

<style>
#main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#coolblob-container {
  width: 400px;
}

#blob-container {
  width: 400px;
}

#blobs {
  display: flex;
}

.hex-container {
  display: flex;
  justify-content: space-evenly;
  font-size: 1.25rem;
  gap: 10px;
}
</style>
