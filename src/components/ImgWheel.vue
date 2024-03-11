<script>
import { computed, onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/autoplay";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = productsStore();

    onMounted(() => {
      if (store.products.length === 0) {
        store.fetchData();
      }
    });

    const images = computed(() =>
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

    return {
      images,
      modules: [Navigation, Pagination, A11y, Autoplay],
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 1000,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: -20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        },
        440: {
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
  <div class="carousel">
    <swiper
      id="swiper"
      :modules="modules"
      :breakpoints="breakpoints"
      :autoplay="autoplay"
      :speed="speed"
      loop
    >
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
