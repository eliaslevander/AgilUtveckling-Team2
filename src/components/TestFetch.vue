<template>
  <div id="grid">
    <div class="item" v-for="items in data" :key="items.id">
      <div>
        <h1>{{ items.name }}</h1>
        <h2>{{ items.description }}</h2>
        <h3>{{ items.price }}</h3>
        <h4>{{ items.category.name }}</h4>
      </div>
      <div>
        <img :src="items.image" alt="" />
        <div :style="{ backgroundColor: items.colorHex }" class="square"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

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
  width: 400px;
}

img {
  width: 200px;
}
.square {
  width: 100px;
  height: 100px;
}
</style>
