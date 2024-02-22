<template>
  <div class="product-grid">
    <div class="card" v-for="items in data" :key="items.id" :title="items.name">
      <div class="blob-container">
        <BlobComponent :color="items.colorHex" />
      </div>
      <div class="name-container">
        <h2 class="name">{{ items.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BlobComponent from "./BlobComponent.vue";

const data = ref(null);

const fetchData = () => {
  fetch("./db.json")
    .then((response) => response.json())
    .then((result) => (data.value = result));
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
}
.card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
}

.blob-container {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.name {
  text-transform: uppercase;
  display: block;
  text-align: center;
  max-width: 85%;
  font-size: 1.125rem;
}

.name-container {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
