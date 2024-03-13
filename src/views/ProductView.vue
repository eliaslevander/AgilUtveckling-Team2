<template>
  <span id="go-back" @click="router.go(-1)" title="Gå tillbaka ett steg"
    ><v-icon>mdi-chevron-left</v-icon>
    <p>Tillbaka</p>
  </span>
  <div id="container">
    <div id="swiper-container">
      <!-- Swiper, npm paket ger tillgång till enkel implementation av swipning.

      :modules importerar moduler som ska användas
      :loop gör så att den är "oändlig", du kan fortsätta scrolla hur mycket som helst

      -->
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
            <v-btn icon flat @click="toggleFavorite" class="favorite-button">
              <v-icon>
                <!-- Ändrar ikon baserat på ifall det är sparat eller inte i favoriter -->
                {{
                  favoritesStore.isFavorite(product.id)
                    ? "mdi-heart"
                    : "mdi-heart-outline"
                }}
              </v-icon>
            </v-btn>
          </div>
        </SwiperSlide>
        <SwiperSlide v-if="isColor">
          <div id="blob-container">
            <!-- Vissa färger blir lite off här, tror det är pga en v-btn opacity som läggs på  -->
            <BlobComponent :color="product.colorHex" margin="48px" />
            <v-btn
              icon
              flat
              @click="toggleFavorite"
              class="favorite-button"
              color="#d7d6d6"
            >
              <v-icon>
                <!-- Ändrar ikon baserat på ifall det är sparat eller inte i favoriter -->
                {{
                  favoritesStore.isFavorite(product.id)
                    ? "mdi-heart"
                    : "mdi-heart-outline"
                }}
              </v-icon>
            </v-btn>
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
          :color="isColor ? product.colorHex : 'orange'"
          @click="amount -= 1"
          :disabled="amount === 1"
        >
          <v-icon size="30">mdi-minus</v-icon>
        </v-btn>
        <p id="amount">{{ amount }} {{ product.value }}</p>
        <v-btn
          class="btn"
          size="48"
          :ripple="false"
          flat
          icon
          :color="isColor ? product.colorHex : 'orange'"
          @click="amount += 1"
        >
          <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
      </div>
      <p v-if="isColor" id="total-area-text">
        Räcker till ca {{ amount * 5 }} kvadratmeter efter två lager
      </p>
      <p v-if="isColor" class="select-text">Välj färgtyp:</p>
      <div v-if="isColor" id="color-type-selector-container">
        <v-btn-toggle
          light
          rounded="0"
          v-model="toggle"
          mandatory
          :ripple="false"
          :color="product.category === 'color' ? product.colorHex : 'orange'"
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
            value="högglans"
            height="48"
            class="color-type-button"
            >Högglans</v-btn
          >
        </v-btn-toggle>
      </div>
      <v-divider class="divider"></v-divider>
      <p id="total-sum">
        Totalsumma:
        <strong v-if="isColor">
          {{
            (product.price * colorTypePrice * amount)
              .toFixed(0)
              .replace(/\.00$/, "")
          }}</strong
        >
        <strong v-else> {{ product.price * amount }}</strong
        >:-
      </p>
      <div id="cart-button-container">
        <v-btn
          @click="addToCartHandler"
          id="cart-button"
          :color="product.category === 'color' ? product.colorHex : 'orange'"
          height="48"
          :disabled="toggle === '' && isColor ? true : false"
          >Lägg till i kundvagn
        </v-btn>
      </div>
    </div>
  </div>
  <!-- <v-btn>Helmatt</v-btn>
  <v-btn>Halvmatt</v-btn>
  <v-btn>Högglans</v-btn> -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { productsStore } from "../stores/products.js";
import { useCartStore } from "../stores/cart";
import { useFavoritesStore } from "../stores/favorit";
import { useRoute, useRouter } from "vue-router";
/* För att kunna använda Swiper så måste dom även importeras här  */
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
/* -------------------------------------------------------------- */
import BlobComponent from "@/components/BlobComponent.vue";

const route = useRoute();
const router = useRouter();
const store = productsStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const product = ref({});
const amount = ref(1);
const toggle = ref("");
const isColor = ref(null);

onMounted(() => {
  // Här letar funktionen efter den första produkten med det id som är == route.params.id

  product.value = store.products.find(
    //Varför i hela friden fungerar detta endast med == istället för === ?!
    (product) => product.id == route.params.id
  );

  isColor.value = product.value.category === "color" ? true : false;
});

// Använder computed för att ge de olika färgtyperna olika priser. colorTypeValue används
// som multiplikator i totalsumman. helmatt = standard, halvmatt + 10%, högglans + 20%

const colorTypePrice = computed(() => {
  let colorTypeValue = toggle.value;
  switch (colorTypeValue) {
    case "helmatt":
      colorTypeValue = 1;
      break;
    case "halvmatt":
      colorTypeValue = 1.1;
      break;
    case "högglans":
      colorTypeValue = 1.2;
      break;
  }
  return colorTypeValue;
});

const addToCartHandler = () => {
  cartStore.addToCart(product.value, amount.value, toggle.value);
  productAdded.value = true; // Uppdatera när produkt läggs till
  setTimeout(() => (productAdded.value = false), 3000);
  //   alert(
  //     `${product.value.name} (Färgtyp: ${toggle.value}, Antal: ${amount.value}L) har lagts till i din kundvagn.`
  //   );
};

function toggleFavorite() {
  /* Funktionen anropas när en användare lägger till eller tar bort en produkt från favoriter */
  favoritesStore.toggleFavorites(product.value);
}
</script>

<style scoped>
#go-back {
  display: inline-flex;
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
  margin-bottom: 16px;
  text-align: center;
  font-size: 2.5rem;
}

#swiper {
  position: relative;
}

#swiper-container {
  margin-bottom: 16px;
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
  max-width: 400px;
  width: 80%;
  margin: 0 auto 32px;
  box-shadow: 5px 5px 6px #afafaf, -5px -5px 6px #ffffff;
  overflow: hidden;
}

.btn {
  touch-action: manipulation;
}

#amount {
  font-size: 1.75rem;
  width: 80px;
  text-align: center;
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

#total-sum {
  font-size: 2rem;
  margin-bottom: 16px;
  text-align: center;
}

#cart-button-container {
  display: flex;
  justify-content: center;
}

#cart-button {
  font-size: 1.25rem;
  width: 80%;
  margin: auto;
}

.favorite-button {
  position: absolute;
  top: 16px;
  right: 16px;
}

@media screen and (min-width: 991px) {
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
    margin: 0 auto;
    width: 40vw;
  }

  #product-name {
    padding: 0;
  }
}
</style>
