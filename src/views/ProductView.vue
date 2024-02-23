<template>
  <h1>work in progress</h1>
  <p v-for="items in store.products" :key="items.id">{{ items.name }}</p>
</template>

<script setup>
import { productsStore } from "../stores/products.js";

const store = productsStore();
</script>

<style scoped>
h1 {
  margin-top: 64px;
}
</style>
