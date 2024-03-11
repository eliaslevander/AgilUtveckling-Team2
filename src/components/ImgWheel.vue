<script>
import { computed, onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import BlobComponent from "./BlobComponent.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/autoplay";

export default {
  components: {
    Swiper,
    SwiperSlide,
    BlobComponent,
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
          spaceBetween: 10,
        },

        376: {
          slidesPerView: 4,
          spaceBetween: 250,
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
      :modules="modules"
      :breakpoints="breakpoints"
      :autoplay="autoplay"
      :speed="speed"
      loop
    >
      <SwiperSlide v-for="image in images" :key="image.id">
        <router-link :to="image.url">
          <div class="swiper-slide-container">
            <img
              @mouseover="displayName(image.id)"
              :src="image.src"
              :alt="image.alt"
            />
            <div class="name-overlay">
              <div
                class="name-box"
                :style="
                  image.category === 'color'
                    ? { backgroundColor: '#FFF' }
                    : { backgroundColor: image.colorHex }
                "
              >
                <!-- :color="product.category === 'color' ? product.colorHex : 'orange'" -->
                <p>{{ image.name }}</p>
                <div v-if="image.category === 'color'" class="blob-container">
                  <BlobComponent :color="image.colorHex" />
                </div>
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
.carousel {
  margin: 0 4rem 0rem 4rem;
}

img {
  display: block;
  object-fit: cover;
  height: 100%;
  width: 100%;
  /* box-shadow: 1px 1px 8px rgb(0, 0, 0); */
  position: absolute;
}

.swiper-slide-container {
  position: relative;
  height: 50vh;
  width: 25vw;
}

.name-overlay {
  /* display: flex;
        justify-content: center;
        align-items: center; */
  font-size: 2vh;
  color: #fff;
  font-weight: bold;
  width: 100%;
  height: 100%;
  position: relative;
}

.name-box {
  position: absolute;
  right: 0;
  bottom: 40px;
  border-radius: 16px 0 0 16px;
  display: flex;
  flex-direction: row;
}

.name-box p {
  color: #000;
  font-size: 2rem;
  padding: 0.5rem 1rem;
}

.blob-container {
  width: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}

/* .name-overlay p {
        opacity: 0;
    } */

.name-overlay:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

/* .name-overlay p:hover {
        opacity: 100%;
    } */

@media screen and (max-width: 375px) {
  .carousel {
    margin: 0 2rem 0 2rem;
    height: auto;
  }

  img {
    object-fit: cover;
    height: 30vh;
    width: 40vw;
    box-shadow: 1px 1px 8px rgb(0, 0, 0);
  }
}
</style>
