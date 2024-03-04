<template>
  <!-- SÖKRUTA -->
  <div id="searchbox">
    <v-text-field
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
  <div>
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
  // Composition api

  import { productsStore } from '../stores/products'
  import BlobComponent from './BlobComponent.vue'
  import router from '@/router'
  import { ref, watch } from 'vue'
  //  import { computed, ref, watch } from 'vue'

  let searchInput = ref('')
  const store = productsStore()
  const filteredProducts = ref([])

  watch(searchInput, () => {
    if (searchInput.value !== '') {
      filteredProducts.value = store.products.filter(
        product =>
          product.name
            .toUpperCase()
            .includes(searchInput.value.toUpperCase()) ||
          product.colorType
            .toUpperCase()
            .includes(searchInput.value.toUpperCase())
      )
    } else {
      filteredProducts.value = []
    }
  })

  function searchResults() {
    filteredProducts.value = store.products.filter(product =>
      product.name.toUpperCase().includes(searchInput.value.toUpperCase())
    )
  }

  const goToProduct = id => {
    router.push({ name: 'product', params: { id: id } })
  }
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

  .searchResultsButton {
    box-shadow: none;
    font-size: 20px;
    letter-spacing: 0.1rem;
    width: 382px;
    margin: 10px auto;
    padding: 8px auto;
    margin-left: 8px;
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
    transition: none !important; /* Förhindrar hover-effekt */
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
