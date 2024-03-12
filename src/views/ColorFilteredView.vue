<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productsStore } from "../stores/products.js";

const route = useRoute();

const store = productsStore();

const colorType = computed(() => route.params.colorType);

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await store.fetchData();
  }
});

const filteredProducts = computed(() => {
  const colorType = route.params.colorType;
  return store.products.filter(product => product.colorType === colorType);
});
</script>

<template>
 <div class="color-filtered-view">
    <h1>{{ colorType }} Färger</h1>
    <div class="products">
      <div v-for="product in filteredProducts" :key="product.id" class="product">
        <img :src="product.image" :alt="product.alt" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>{{ product.price }} kr</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
