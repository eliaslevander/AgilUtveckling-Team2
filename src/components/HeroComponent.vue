<script setup>
import { useRouter } from "vue-router";
import { productsStore } from "@/stores/products";
import { ref, onMounted } from "vue";

const store = productsStore();
const router = useRouter();

const r = ref(0);
const g = ref(0);
const b = ref(0);
const deg = ref(0);

// isLoadiing sätts initialt till false
const isLoading = ref(false);

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

// Funktion som navigerar till en slumpmässig produkt i kategorin "color"
const navigateToRandomColorProduct = () => {
    // Om det finns produkter i store.products så filtreras produkterna så att endast produkter i kategorin "color" finns kvar
  if (store.products.length > 0) {
    const colorProducts = store.products.filter(product => product.category === "color");
    // Om det inte finns några produkter i kategorin "color" så loggas ett felmeddelande
    if (colorProducts.length === 0) {
      console.error("Inga produkter i kategorin 'color' finns tillgängliga");
      return;
    }
    // En slumpmässig produkt väljs från colorProducts
    const randomProduct = colorProducts[Math.floor(Math.random() * colorProducts.length)];

    // Sätter till true så att loading overlay visas
    isLoading.value = true;

    // Timeout för att det ska verka som att våran super funktion måste ladda.
    setTimeout(() => {
      isLoading.value = false;
      router.push(`/product/${randomProduct.id}`);
    }, 2000);
  } else {
    console.error("Inga produkter tillgängliga");
  }
};


onMounted(() => {
  setupColorOscillation(100);
  // Om det inte finns några produkter i store.products så hämtas produkterna med fetchData som också ligger i products.js
  if (store.products.length === 0) {
        store.fetchData();
      }
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
    <div v-if="isLoading" class="loading-overlay">
      <p>Hittar din perfekta färg...</p>
      <div class="spinner">
      </div>
    </div>
    <div id="hero-image-container"></div>
    <div id="overlay">
      <div id="hero-overlay-inner">
        <div id="hero-overlay-inner-container">
          <h1 id="hero-title">Mer färg i ditt hem</h1>
          <p id="hero-text">
            Vår färggenerator hjälper dig att hitta den exakta kulören du vill
            ha till ditt hem
          </p>
          <div id="button-container">
            <button
                @click="navigateToRandomColorProduct"
              id="read-more"
              :style="{
                background: `linear-gradient(${deg}deg, rgba(${r},${g},${b},1) 0%, rgba(${g},${b},${r},1) 100%)`,
              }"
            >
              TESTA HÄR<v-icon>mdi-chevron-right</v-icon>
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
  background-size: cover;
  background-position: center;
  height: 80vh;
  margin-bottom: 3vh;
  width: 100%;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  margin-top: 1rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid #050505;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#overlay {
  width: 100%;
  height: 100%;
  background-image: url(/src/assets/images/hero-overlay.png);
  background-repeat: no-repeat;
  background-size: 100% 101%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
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
    background-position: left;
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
