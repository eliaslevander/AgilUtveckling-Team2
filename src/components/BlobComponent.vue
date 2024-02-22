<template>
  <div
    id="blob"
    :style="{ backgroundColor: props.color, width: props.size }"
  ></div>
</template>

<script setup>
const props = defineProps({
  color: String,
  size: String,
});
</script>

<style scoped>
#blob {
  width: 100px;
  aspect-ratio: 1;
  border-radius: 60% 40% 44% 56% / 55% 43% 57% 45%;
  box-shadow: inset 5px -5px 10px rgba(0, 0, 0, 0.2);
  filter: drop-shadow(-6px 10px 5px rgba(0, 0, 0, 0.5));
  position: relative;
}

#blob::before {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  width: 10%;
  height: 35%;
  top: 5%;
  right: 12.5%;
  transform: rotate(-38deg);
  border-radius: 50%;
}

#blob::after {
  content: "";
  position: absolute;
  width: 7.5%;
  height: 7.5%;
  right: 40%;
  top: 5%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}
</style>
