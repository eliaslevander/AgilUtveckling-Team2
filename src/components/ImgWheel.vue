<script>

// Importering av det som behövs till komponenten
import { computed, onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

// Importering av swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/autoplay";

export default {
  //Registrering av swiperkomponenter
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // Hämtar productStore från pinia (products.js) som hämtar produkterna ifrån localStorage.
    const store = productsStore();

    // Kör fetchData när komponenten mounta
    onMounted(() => {
    // Om det inte finns några produkter i store.products så hämtas produkterna med fetchData som också ligger i products.js
      if (store.products.length === 0) {
        store.fetchData();
      }
    });

    // Skapar en computed property som hämtar produkterna från store.products och skapar en array med objekt som innehåller datan till src, alt och länk till href/router-link
    const images = computed(() =>
    // För varje produkt i store.products så skapas ett objekt med src, alt, url, id, name, colorHex och category som kan nås med images
      store.products.map((product) => ({
        src: product.image,
        alt: product.alt,
        url: product.url,
        id: product.id,
        name: product.name,
        colorHex: product.colorHex,
        category: product.category,
      }))
    );

    // Returnerar images och swiper alla nödvändiheter till karusellen

    return {
      images,
      // Swiper inställningar
      // Modueler som behövs för att karusellen ska fungera
      modules: [Navigation, Pagination, A11y, Autoplay],
      // Autoplay inställningar för att karusellen ska gå per automatik
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      // Hastigheten på karusellen
      speed: 1000,
      // Breakpoints för att karusellen ska vara responsiv
      breakpoints: {
        320: {
          // När skärmen är mindre än 320px så visas 2 slides
          slidesPerView: 2,
          spaceBetween: -20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
        440: {
        // När skärmen är över 440 så visas 4 slides
          slidesPerView: 4,
          spaceBetween: 200,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
      },
    };
  },
  methods: {
    displayName(id) {
      console.log(id);
    },
  },
};
</script>

<template>
<!-- Container för karusellen -->
  <div class="carousel">
  <!-- Swiper komponenten med dynamisk konfig.  -->
    <swiper
      id="swiper"
      :modules="modules"
      :breakpoints="breakpoints"
      :autoplay="autoplay"
      :speed="speed"
      loop
    >
    <!-- SwiperSlide som loopar igenom images och skapar en router-link till varje bild -->
      <SwiperSlide v-for="image in images" :key="image.id" :title="image.name">
        <router-link :to="image.url">
          <div class="swiper-slide-container">
            <img
              @mouseover="displayName(image.id)"
              :src="image.src"
              :alt="image.alt"
            />
            <div class="name-overlay">
              <div class="name-box">
                <p>{{ image.name }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </SwiperSlide>
      <!-- Pagination och navigation för karusellen -->
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </swiper>
  </div>
</template>

<style scoped>
#swiper {
  padding: 1rem 0;
}

img {
  display: block;
  object-fit: cover;
  height: 100%;
  width: 100%;
  box-shadow: 1px 1px 8px rgb(0, 0, 0);
  position: absolute;
}

.swiper-slide-container {
  position: relative;
  height: 50vh;
  width: 25vw;
}

.name-overlay {
  font-size: 2vh;
  color: #fff;
  font-weight: bold;
  width: 100%;
  height: 100%;
  position: relative;
}

.name-box {
  position: absolute;
  right: 0px;
  bottom: 40px;
  border-radius: 16px 0 0 16px;
  background-color: #fff;
}

.name-box p {
  color: #000;
  font-size: 3vh;
  padding: 0.5rem 1rem;
}

.name-overlay:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

@media screen and (max-width: 440px) {
  .carousel {
    height: 40vh;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    box-shadow: 1px 1px 8px rgb(0, 0, 0);
  }

  .swiper-slide {
    height: 40vh;
    width: 40vw;
  }

  .swiper-slide-container {
    height: 100%;
    width: 80%;
  }

  .name-box {
    border-radius: 1vh 0 0 1vh;
  }

  .name-box p {
    font-size: 2vh;
    max-width: 22vw;
    text-align: center;
  }
}

</style>
<!-- <style lang="scss" scoped>
    /* Styling för karusellen */
    /* Container styles */
    .carousel {
        margin: 0 4rem 0rem 4rem;

        /* Image styles */
        img {
            display: block;
            object-fit: cover;
            height: 50vh;
            width: 25vw;
            box-shadow: 1px 1px 8px rgb(0, 0, 0);

            /* Hover effekt */
            &hover {
                opacity: 50%;
            }
        }
    }

    /* Responsiv styling för karusellen */
    @media screen and (max-width: 375px) {
        .carousel {
            margin: 0 2rem 0 2rem;
            height: auto;

            img {
                object-fit: cover;
                height: 30vh;
                width: 40vw;
                box-shadow: 1px 1px 8px rgb(0, 0, 0);
            }
        }
    }
</style> -->



