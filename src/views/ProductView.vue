<template>
  <div id="container">
    <span id="go-back" @click="router.go(-1)" title="Gå tillbaka ett steg"
      ><v-icon>mdi-chevron-left</v-icon>
      <p>Tillbaka</p>
    </span>

    <Swiper
      :modules="[Pagination, Navigation, A11y]"
      :navigation="true"
      :pagination="true"
      :loop="true"
      id="swiper"
    >
      <SwiperSlide>
        <div id="image-container">
          <img
            :src="product.image"
            :alt="`Ett rum med färgen ${product.name}`"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div id="blob-container">
          <BlobComponent :color="product.colorHex" margin="48px" />
        </div>
      </SwiperSlide>
    </Swiper>
    <h2 id="product-name">{{ product.name }}</h2>
    <p id="description">{{ product.description }}</p>
  </div>
  <v-btn>Helmatt</v-btn>
  <v-btn>Halvmatt</v-btn>
  <v-btn>Högglans</v-btn>
  <v-btn>Lägg till i kundvagn</v-btn>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { productsStore } from "../stores/products.js";
import { useRoute, useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BlobComponent from "@/components/BlobComponent.vue";

const route = useRoute();
const router = useRouter();
const store = productsStore();

const product = ref({});

onMounted(() => {
  product.value = store.products.find(
    //Varför i hela friden fungerar detta endast med == istället för === ?!
    (product) => product.id == route.params.id
  );
});
</script>

<style scoped>
#container {
  /* Quick fix, problem med navbar height */
  margin-top: 64px;
}

#go-back {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

#go-back p {
  text-decoration: underline;
  font-weight: 600;
}

#image-container {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#blob-container {
  width: 100%;
  height: auto;
  display: flex;
  margin: auto;
  padding: 0px;
}

#product-name {
  padding: 16px;
  text-align: center;
  font-size: 2rem;
}

#description {
  padding: 16px;
}

#swiper {
  position: relative;
  max-width: 600px;
}
</style>
