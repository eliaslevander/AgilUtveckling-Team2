<template>
  <div id="grid">
    <div class="item" v-for="items in data" :key="items.id">
      <div>
        <h1>{{ items.name }}</h1>
        <p>{{ items.description }}</p>
        <h3>{{ items.price }}</h3>
        <h4>{{ items.category }}</h4>
        <h4>{{ items.colorType }}</h4>
      </div>
      <BlobComponent :color="items.colorHex" size="150px" />
      <div class="container">
        <img :src="items.image" alt="" />
        <div :style="{ backgroundColor: items.colorHex }" class="square"></div>
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
#grid {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  flex-direction: column;
  width: 300px;
}

img {
  height: 100px;
}
.square {
  width: 100px;
  height: 100px;
}

.container {
  display: flex;
}
</style>
