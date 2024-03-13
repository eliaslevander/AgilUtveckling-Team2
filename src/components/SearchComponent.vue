<template>
  <!-- SÖKRUTA -->
  <div id="searchbox">
    <v-text-field
      ref="searchField"
      rounded="100"
      id="searchbar"
      label="Sök"
      variant="outlined"
      v-model="searchInput"
      placeholder="Sök produkter..."
    ></v-text-field>
    <!------->
  </div>
  <!-- CLOSE Search-->
  <!-- <button @click="closeSearch">X</button> -->
  <!-- SÖKKNAPP-->
  <!-- SÖKIKON-->
  <div id="search-button-container">
    <v-btn class="searchResultsButton" @click="searchResults">
      Sök

      <v-icon size="large" right>mdi-magnify</v-icon>
    </v-btn>
  </div>
  <!------->

  <!-- SÖKRESULTAT -->
  <v-list v-if="filteredProducts">
    <v-list-item-group>
      <v-list-item
        v-for="items in filteredProducts"
        :key="items.id"
        @click="goToProduct(items.id), router.go"
      >
        <div class="list-item-container">
          <div v-if="items.category === 'color'" class="blob-container">
            <BlobComponent :color="items.colorHex" />
          </div>
          <div v-else class="image-container">
            <img class="product-image" :src="items.image" />
          </div>
          <p class="list-item-text">{{ items.name }}</p>
        </div>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <v-divider></v-divider>
  <!------->
</template>

<script setup>
import { productsStore } from "../stores/products";
import BlobComponent from "./BlobComponent.vue";
import router from "@/router";
import { ref, watch } from "vue";

const searchInput = ref("");
const store = productsStore();
const filteredProducts = ref([]);

watch(searchInput, () => {
  if (searchInput.value !== "") {
    filteredProducts.value = store.products.filter(
      (product) =>
        product.name.toUpperCase().includes(searchInput.value.toUpperCase()) ||
        product.colorType
          .toUpperCase()
          .includes(searchInput.value.toUpperCase())
    );
  } else {
    filteredProducts.value = [];
  }
});

function searchResults() {
  // Koden för sök är tillfälligt utkommenterad, osäker om den ska användas senare

  // filteredProducts.value = store.products.filter((product) =>
  //   product.name.toUpperCase().includes(searchInput.value.toUpperCase())
  // );
  alert(
    `Vidarebefordra användaren till SearchView med "${searchInput.value}" `
  );
  // Töm sökfält vid sökning
  searchInput.value = "";
}

const goToProduct = (id) => {
  router.push({ name: "product", params: { id: id } });
};

//För att kunna sätta autofokus på sökfältet vid klick på sökikonen så måste sökkomponenten ta emot en prop:en isSearching.

const props = defineProps({
  isSearching: Boolean,
  drawer: Boolean,
});

// Ge en ref till v-text-field, ref="searchField" för att kunna ge den fokus med watch nedan.
const searchField = ref(null);

//Använder watch för att kolla efter värdeändring på prop:en isSearching

watch(
  () => props.isSearching,
  (newValue) => {
    if (newValue === true) {
      // Om användaren har klickat på sökikon så sätts autofokus på inmatningsfältet
      searchField.value.focus();
    } else {
      //.blur() tar bort fokus, utan detta så är tangentbordet
      //fortfarande synligt vid t.ex click utanför menyn
      searchField.value.blur();
      // Detta tömmer sökfältet i desktop view
      searchInput.value = "";
    }
  }
);

// En separat watch krävs för att tömma sökfältet i mobile view då sökfältet i mobile view ligger i drawer

watch(
  () => props.drawer,
  (newValue) => {
    if (newValue === false) {
      // Detta tömmer sökfältet i mobile view
      searchInput.value = "";
    }
  }
);
</script>

<style scoped>
.blob-container {
  width: 35px;
}

.image-container {
  width: 35px;
  aspect-ratio: 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-item-text {
  font-weight: 500;
}

.list-item-container {
  text-decoration: none;
  width: 100%;
  margin: auto;
  padding: 1vh;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
}
p {
  margin: 2vh;
}

#searchbox {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: auto;
  position: relative;
}

/* .searchResultsButton {
  margin-left: 0.5rem;
  box-shadow: none;
  border: 1px solid #aaa;
} */

#search-button {
  position: absolute;
  right: 12px;
  border: 1px solid #aaa;
}

:deep(.v-input__details) {
  display: none;
}

.blob-container {
  width: 35px;
}

.image-container {
  width: 35px;
  aspect-ratio: 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-item-text {
  font-weight: 500;
}

.list-item-container {
  text-decoration: none;
  width: 100%;
  margin: auto;
  padding: 1vh;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
}
p {
  margin: 2vh;
}

#searchbox {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: auto;
  position: relative;
}

#search-button-container {
  width: 100%;
  padding: 0 8px;
}

.searchResultsButton {
  box-shadow: none;
  font-size: 20px;
  letter-spacing: 0.1rem;
  width: 100%;
  margin: 10px auto;
  padding: 8px auto;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 1px;
  border: 1px solid #aaa;
}

.searchResultsButton:hover {
  text-shadow: none;
}

.searchResultsButton {
  box-shadow: none !important; /* Tar bort skuggan */
  background-color: #fff; /* Anger bakgrundsfärg på knapp*/
}

:deep(.v-input__details) {
  display: none;
}

@media (max-width: 380px) {
  .searchResultsButton {
    width: 240px;
  }
}
</style>
