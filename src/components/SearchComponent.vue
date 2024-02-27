<template>
  <!-- SÖKRUTA -->
<<<<<<< HEAD
    <div id="searchbox">
        <v-text-field id="searchbar" label="Sök" 
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
        <v-list-item 
          v-for="items in filteredProducts"
        :key="items.id">
        <RouterLink id="searchLink" to="/">
        <BlobComponent :color="items.colorHex" />
        {{ items.name }} 
      </RouterLink>
      </v-list-item>
      </v-list-item-group>
    </v-list>
  <!------->  
      </template>
   



  <script setup>
      // Composition api
   
      import { productsStore } from '../stores/products'
      import BlobComponent from "./BlobComponent.vue";
      import { ref, watch } from 'vue'
      //  import { computed, ref, watch } from 'vue'
      // importera ref
      // importera computed (beräkande egenskap)
      // importera watch
   
   
    let searchInput = ref('');
    const store = productsStore()
    const filteredProducts = ref([]);

    watch(searchInput, () => {
    filteredProducts.value = store.products.filter((product) =>
    product.name.toUpperCase().includes(searchInput.value.toUpperCase())
  );
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
   
=======
  <div id="searchbox">
    <v-text-field
      id="searchbar"
      label="Sök"
      variant="outlined"
      v-model="searchInput"
      placeholder="Sök produkter..."
    >
    </v-text-field>
    <div v-for="items in store.products" :key="items.id" :title="items.name">
      <ul>
        <li>{{ items.image }} {{ items.name }}</li>
      </ul>
    </div>
    <!-- SÖKKNAPP-->
    <v-btn @click="searchResults"> Show </v-btn>
  </div>
</template>

<script setup>
// Composition api

import { productsStore } from "../stores/products";
import { ref, watch } from "vue";
//  import { computed, ref, watch } from 'vue'
// importera ref
// importera computed (beräkande egenskap)
// importera watch

let searchInput = ref("");
const store = productsStore();

const filteredProducts = ref([]);

watch(searchInput, () => {
  filteredProducts.value = store.products.filter((product) =>
    product.name.toUpperCase().includes(searchInput.value.toUpperCase())
  );
});

function searchResults() {
  store.products = filteredProducts.value;
}

// Definiera variabler

// watch() =<{
//Inom watch/paranteserna tar man in det man lyssnar på för att sen returnera

// }

//  const searchResults = itemName => {
//    router.push({ name: 'product', params: { name: itemName } })
//  }

// value används för att komma år variabler
</script>
>>>>>>> 94491e478101979f2325ea02451ab2c748433cbd

<style scoped>


#blob {
  width: 5vh;
  padding: 1vh;
  aspect-ratio: 1;
  border-radius: 60% 40% 44% 56% / 55% 43% 57% 45%;

  position: relative;
}

#searchLink{
  text-decoration: none;
  margin: auto;
  padding: 2vh;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

#searchbox {
  width: 200px;
  margin: auto;
  margin-top: 5vh;
}
</style>
