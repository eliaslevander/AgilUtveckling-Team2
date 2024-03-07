<template>
    <div class="product-grid">
      <div
        class="card"
        v-for="items in store.products"
        :key="items.id"
        :title="items.name"
        @click="goToProduct(items.id)"
      >
        <div class="blob-container" v-if="items.category === 'color'">
          <BlobComponent :color="items.colorHex" />
        </div>
        <div class="image-container" v-else>
          <img class="product-image" :src="items.image" :alt="items.alt" />
        </div>
        <div class="name-container">
          <h2 class="name">{{ items.name }}</h2>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { productsStore } from "../stores/products";
  import BlobComponent from "@/components/BlobComponent.vue";
  import router from "@/router";
  
  const store = productsStore();
  
  const goToProduct = (id) => {
    router.push({ name: "product", params: { id: id } });
  };
  </script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 8px;
  padding: 8px;
}
.card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
}
.image-container {
  width: 100%;
  aspect-ratio: 1;
  padding: 16px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  text-transform: uppercase;
  display: block;
  text-align: center;
  max-width: 85%;
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.name-container {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
