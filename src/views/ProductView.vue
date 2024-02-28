<template>
  <span id="go-back" @click="router.go(-1)" title="Gå tillbaka ett steg"
    ><v-icon>mdi-chevron-left</v-icon>
    <p>Tillbaka</p>
  </span>
  <div id="container">
    <div id="swiper-container">
      <Swiper
        :modules="[Pagination, Navigation, A11y]"
        navigation
        pagination
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
            <!-- Vissa färger blir lite off här, tror det är pga en v-btn opacity som läggs på  -->
            <BlobComponent :color="product.colorHex" margin="48px" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <v-divider class="vertical-divider" vertical></v-divider>

    <div id="content-container">
      <h2 id="product-name">{{ product.name }}</h2>
      <p id="description">{{ product.description }}</p>
      <v-divider class="divider"></v-divider>
      <p class="select-text">Välj mängd:</p>
      <div id="amount-selector-container">
        <v-btn
          class="btn"
          size="48"
          :ripple="false"
          flat
          icon
          :color="product.colorHex"
          @click="amount -= 1"
          :disabled="amount === 1"
        >
          <v-icon size="30">mdi-minus</v-icon>
        </v-btn>
        <p id="amount">{{ amount }} L</p>
        <v-btn
          class="btn"
          size="48"
          :ripple="false"
          flat
          icon
          :color="product.colorHex"
          @click="amount += 1"
        >
          <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
      </div>
      <p id="total-area-text">
        Räcker till ca {{ amount * 5 }} kvadratmeter efter två lager
      </p>
      <p class="select-text">Välj färgtyp:</p>
      <div id="color-type-selector-container">
        <v-btn-toggle
          light
          rounded="0"
          v-model="toggle"
          mandatory
          :ripple="false"
          color="#eee"
        >
          <v-btn
            :ripple="false"
            flat
            value="helmatt"
            height="48"
            class="color-type-button"
            >Helmatt</v-btn
          >
          <v-btn
            :ripple="false"
            value="halvmatt"
            height="48"
            class="color-type-button"
            >Halvmatt</v-btn
          >
          <v-btn
            :ripple="false"
            value="hogglans"
            height="48"
            class="color-type-button"
            >Högglans</v-btn
          >
        </v-btn-toggle>
      </div>
      <v-divider class="divider"></v-divider>
      <v-btn
        @click="info"
        class="cart-button"
        :color="product.colorHex"
        height="48"
        :disabled="toggle === '' ? true : false"
        >Lägg till i kundvagn</v-btn
      >
    </div>
  </div>
  <!-- <v-btn>Helmatt</v-btn>
  <v-btn>Halvmatt</v-btn>
  <v-btn>Högglans</v-btn> -->
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
const amount = ref(1);
const toggle = ref("");

onMounted(() => {
  product.value = store.products.find(
    //Varför i hela friden fungerar detta endast med == istället för === ?!
    (product) => product.id == route.params.id
  );
});

const info = () => {
  console.log(amount.value, toggle.value, product.value.name);
};
</script>

<style scoped>
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
  padding: 0 16px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 2.5rem;
}

#swiper {
  position: relative;
}

#description {
  font-size: 1.25rem;
}

#content-container {
  padding: 0 16px 16px 16px;
}
.vertical-divider {
  display: none;
}

.select-text {
  font-weight: 500;
  text-align: center;
  font-size: 1.75rem;
  margin: 16px 0;
}

#amount-selector-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ddd;
  border-radius: 50px;
  padding: 0;
  width: 80%;
  margin: auto;
  box-shadow: 5px 5px 6px #afafaf, -5px -5px 6px #ffffff;
  overflow: hidden;
}

.btn {
  touch-action: manipulation;
}

#amount {
  font-size: 1.75rem;
}

#total-area-text {
  text-align: center;
  margin-top: 16px;
}

.divider {
  margin: 16px 0;
}

#color-type-selector-container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.v-btn-group {
  flex-direction: column;
}
.v-btn-group--density-default.v-btn-group {
  height: auto;
}

.color-type-button {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.v-btn-group .v-btn {
  border: 1px solid #000 !important;
}

.cart-button {
  font-size: 1.25rem;
  width: 100%;
}

@media screen and (min-width: 769px) {
  #swiper-container {
    width: 50%;
  }

  #content-container {
    width: 50%;
  }

  #container {
    width: 90vw;
    display: flex;
    margin: auto;
    /* grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr); */
  }

  .vertical-divider {
    margin: 16px;
    display: block;
  }

  #swiper {
    min-width: 0;
    grid-area: swiper;
    margin: 0;
    width: 40vw;
  }

  #product-name {
    padding: 0;
  }
}
</style>
