<script setup>
import { ref, onMounted } from "vue";

const r = ref(0);
const g = ref(0);
const b = ref(0);
const deg = ref(0);

const setupColorOscillation = (speed) => {
  let phase = 0;

  setInterval(() => {
    const red = Math.round(255 * Math.abs(Math.sin(phase)));
    const green = Math.round(
      255 * Math.abs(Math.sin(phase + (2 * Math.PI) / 3))
    );
    const blue = Math.round(
      255 * Math.abs(Math.sin(phase + (4 * Math.PI) / 3))
    );
    r.value = red;
    g.value = green;
    b.value = blue;
    phase += (2 * Math.PI) / speed;
  }, 50);
};

onMounted(() => {
  setupColorOscillation(100);
});

const setupDegreeOscillation = (degreeRef) => {
  setInterval(() => {
    degreeRef.value = Math.round(127 * Math.sin(Date.now() * 0.0005) + 128);
  }, 10);
};

onMounted(() => {
  setupDegreeOscillation(deg);
});
</script>

<template>
  <div id="HeroImage">
    <div id="hero-image-container"></div>
    <div id="overlay">
      <div id="hero-overlay-inner">
        <div id="hero-overlay-inner-container">
          <h1 id="hero-title">Mer färg i ditt hem</h1>
        <p id="hero-text">
          Vår färggenerator hjälper dig att hitta den exakta kulören du vill ha till ditt hem
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
      </div>
    </div>
  </div>
</template>

<style scoped>
#HeroImage {
  background-image: url(../assets/images/hero-image-vertical.jpg);
  background-size: 66%;
  background-position: left;
  height: 80vh;
  margin-bottom: 3vh;
  width: 100%; 
}

#overlay {
  width: 100%;
  height: 100%;
  background-image: url(/src/assets/images/hero-overlay-mobile.png);
  background-repeat: no-repeat;
  background-size: 100% 101%;
  min-height: 100%;
  position: relative;
}

#hero-overlay-inner {
  width: 50vw;
  height: 100%;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hero-overlay-inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#hero-title {
  width: 80%;
  text-align: center;
  color: #000;
  font-size: 4rem;
  margin-bottom: 3vh;
}

#hero-text {
  text-align: center;
  width: 80%;
  font-size: 1.75rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 3vh;
}

#read-more {
  font-size: 2rem;
  padding: 0.75rem;
  font-weight: bold;
  border-radius: 1vh;
  display: flex;
  align-items: center;
  color: #fff;
  border: 3px solid #bbb;
}

#read-more:hover {
  box-shadow: 1px 5px 10px #000;
}

@media (max-width: 1000px) {
  #HeroImage {
    background-image: url(/src/assets/images/Prisma_HeroImage.jpg);
    background-size: cover;
    height: 60vh;
  }

  #hero-overlay-inner {
    width: 60%;
  }

  #overlay {
    height: 100.1%;
  }

  #hero-title {
    font-size: 4vh;
    width: 80%;
  }

  #hero-text {
    font-size: 2vh;
    width: 80%;
    font-weight: normal;
    text-align: center;
  }

  #read-more {
    font-size: 5vw;
    padding: 1vh;
    border-radius: 2vw;
  }

}
</style>
