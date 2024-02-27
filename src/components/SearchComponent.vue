<template>
    <!-- SÖKRUTA -->
    <div id="searchbox">
        <v-text-field id="searchbar" label="Sök" 
        variant="outlined" 
        v-model="searchInput" 
        placeholder="Sök produkter...">
        </v-text-field>
      <div
        v-for="items in store.products"
        :key="items.id"
        :title="items.name">
        <ul>
        <li> {{ items.image }} {{ items.name }}</li>
      </ul>
       </div>
       <!-- SÖKKNAPP-->
        <v-btn @click="searchResults"> 
            Show
        </v-btn>
    </div>
    
  </template>
   
  <script setup>
      // Composition api
   
      import { productsStore } from '../stores/products'
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
   

<style scoped>
#searchbox {
  width: 500px;
  margin: auto;
  margin-top: 5vh;
}
</style>