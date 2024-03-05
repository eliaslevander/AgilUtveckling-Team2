<script setup>
import { ref, onMounted } from "vue";
import BlobComponent from "./BlobComponent.vue";

const r = ref(0);
const g = ref(0);
const b = ref(0);
const deg = ref(0);

const setupColorOscillation = (speed) => {
  let phase = 0;

  setInterval(() => {
    const red = Math.round(128 * Math.abs(Math.sin(phase)));
    const green = Math.round(
      255 * Math.abs(Math.sin(phase + (2 * Math.PI) / 3))
    );
    const blue = Math.round(
      128 * Math.abs(Math.sin(phase + (4 * Math.PI) / 3))
    );
    r.value = red;
    g.value = green;
    b.value = blue;
    phase += (2 * Math.PI) / speed;
  }, 500);
};

onMounted(() => {
  setupColorOscillation(100);
});

const setupDegreeOscillation = (degreeRef) => {
  setInterval(() => {
    degreeRef.value = Math.round(64 * Math.sin(Date.now() * 0.001) + 128);
  }, 10);
};

onMounted(() => {
  setupDegreeOscillation(deg);
});

// onMounted(() => {
//   console.log(sine(45, 90, 100));
// });
</script>

<template>
  <div id="HeroImage">
    <!-- <svg id="shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#ffffff"
        fill-opacity="1"
        d="M0,320L720,64L1440,96L1440,320L720,320L0,320Z"
      ></path>
    </svg> -->
    <!-- <div id="container">
      
      <div class="blob-container two">
        <BlobComponent :color="`rgb(${b}, ${r}, ${g})`" />
      </div>
      <div class="blob-container three">
        <BlobComponent :color="`rgb(${r}, ${g}, ${b})`" />
      </div>
    </div> -->
    <div id="left-container">
      <h1 id="hero-title">Mer färg i ditt hem</h1>
      <p id="hero-text">
        Vi på Prisma värdesätter kvalitativa färger och nyanser som en central
        del av vårt arbete. Genom att noggrant välja och kombinera färgnyanser
        strävar vi efter att skapa unika och estetiskt tilltalande produkter.
      </p>
      <div id="button-container">
        <button
          id="read-more"
          :style="{
            background: `linear-gradient(${deg}deg, rgba(${r},${g},${b},1) 0%, rgba(${g},${b},${r},1) 100%)`,
          }"
        >
          LÄS MER<v-icon>mdi-chevron-right</v-icon>
        </button>
      </div>
    </div>
    <div id="right-container">
      <div class="blob-container">
        <BlobComponent :color="`rgb(${g}, ${b}, ${r})`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#HeroImage {
  background-image: url(../assets/images/testroom.jpg);
  background-size: cover;
  background-position: center;
  /* background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)); */
  backdrop-filter: brightness(0%);
  height: 80vh;
  margin-bottom: 3vh;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

#left-container {
  /* width: 50vw; */
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  flex-basis: 0;
}

#right-container {
  /* width: 50vw; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-basis: 0;
}

#button-container {
  display: flex;
  justify-content: center;
}

#hero-title {
  color: #fff;
  font-size: 4rem;

  padding: 8px;
  /* background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px; */
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 16px;
}

#hero-text {
  width: 80%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
  display: inline-block;
  margin-bottom: 16px;
}

#read-more {
  font-size: 1.5rem;
  padding: 0.75rem;
  font-weight: bold;
  border-radius: 16px;
  display: flex;
  align-items: center;
  /* box-shadow: 1px 1px 10px #000; */
  color: #fff;
  /* border: 6px solid #fff; */
  font-weight: bold;
}

#overlay {
  width: 100%;
  height: 100%;
  background-image: url(/src/assets/images/hero-overlay.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100%;
}

#container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  position: relative;
}

.blob-container {
  width: 500px;
}

path {
  bottom: 0;
  width: 50%;
  display: none;
}
#shape {
  bottom: 0;
  position: absolute;
  height: 100%;
}

@media (max-width: 1000px) {
  #hero-image {
    height: 40vh;
    bottom: 20%;
    right: 4%;
    font-size: 1.5rem;
  }
  #HeroImage {
  }
}
</style>
