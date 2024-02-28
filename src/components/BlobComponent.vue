<template>
  <div
    id="blob"
    :style="{
      backgroundColor: props.color,
      width: props.width,
      margin: props.margin,
    }"
  ></div>
</template>

<script setup>
const props = defineProps({
  color: String,
  width: String,
  margin: String,
});
</script>

<style scoped>
#blob {
  /*https://stackoverflow.com/questions/14061104/css3-box-shadow-size-percent-units*/
  width: inherit;
  aspect-ratio: 1;
  border-radius: 60% 40% 44% 56% / 55% 43% 57% 45%;
  /* box-shadow: ; */
  box-shadow: -4px 3px 5px rgba(0, 0, 0, 0.5),
    inset 5px -5px 10px rgba(0, 0, 0, 0.2);
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
