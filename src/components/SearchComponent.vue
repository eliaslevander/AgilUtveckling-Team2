npmnnpm
<template>
  <!-- SÖKRUTA -->
  <div id="searchbox">
    <v-text-field
      id="searchbar"
      label="Sök"
      variant="outlined"
      v-model="searchInput"
      placeholder="Sök produkter..."
    ></v-text-field>
    <!------->

    <!-- SÖKKNAPP-->
    <v-btn @click="searchResults"> Show </v-btn>
  </div>
  <!------->

  <!-- SÖKRESULTAT -->
  <span v-if="filteredProducts.length > 0"> </span>
  <v-list class="blobcontainer">
    <v-list-item-group>
      <v-list-item v-for="items in filteredProducts" :key="items.id">
        <RouterLink id="searchLink" to="/">
          <BlobComponent :color="items.colorHex" />
          <p>{{ items.name }}</p>
        </RouterLink>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <!------->
</template>

<script setup>
// Composition api

import { productsStore } from "../stores/products";
import BlobComponent from "./BlobComponent.vue";
import { ref, watch } from "vue";
//  import { computed, ref, watch } from 'vue'
// importera ref
// importera computed (beräkande egenskap)
// importera watch

let searchInput = ref("");
const store = productsStore();
const filteredProducts = ref([]);

watch(searchInput, () => {
  if (searchInput.value !== "") {
    filteredProducts.value = store.products.filter((product) =>
      product.name.toUpperCase().includes(searchInput.value.toUpperCase())
    );
  } else {
    filteredProducts.value = [];
  }
});
function searchResults() {
  filteredProducts.value = store.products.filter((product) =>
    product.name.toUpperCase().includes(searchInput.value.toUpperCase())
  );
}

//  const searchResults = itemName => {
//    router.push({ name: 'product', params: { name: itemName } })
//  }

// value används för att komma år variabler
</script>

<style scoped>
button {
  padding: 1%;
}

#blob {
  width: 4vh;
  padding: 1vh;
  aspect-ratio: 1;
  border-radius: 60% 40% 44% 56% / 55% 43% 57% 45%;
  position: relative;
}

#searchLink {
  text-decoration: none;
  width: 300px;
  margin: auto;
  padding: 2vh;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
p {
  margin: 2vh;
}

#searchbox {
  width: 200px;
  margin: auto;
  margin-top: 5vh;
}
</style>
