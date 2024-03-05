<template>
  <div
    ref="blob"
    id="blob"
    :style="{
      backgroundColor: props.color,
      width: props.width,
      margin: props.margin,
      // Detta gör skuggorna responsiva, istället för pixelvärde så utgår den från bredden på parent.
      boxShadow: `
      ${parentWidth * -0.03}px 
      ${parentWidth * 0.02}px 
      ${parentWidth * 0.04}px 
      rgba(0, 0, 0, 0.5), 
      inset 
      ${parentWidth * 0.04}px 
      ${parentWidth * -0.04}px 
      ${parentWidth * 0.08}px  
      rgba(0, 0, 0, 0.2)`,
    }"
  ></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  color: String,
  width: String,
  margin: String,
});

const blob = ref(null);
// Detta gör skuggorna responsiva, istället för pixelvärde så utgår den från bredden på parent.
const parentWidth = ref(null);

onMounted(() => {
  const el = blob.value;
  const computedStyle = window.getComputedStyle(el);
  parentWidth.value = parseFloat(computedStyle.getPropertyValue("width"));
});
//-------------------------------------------------------------------------------------------------
</script>

<style scoped>
#blob {
  cursor: pointer;
  width: inherit;
  aspect-ratio: 1;
  border-radius: 60% 40% 44% 56% / 55% 43% 57% 45%;
  /* box-shadow: calc(var(--default) * -0.04) calc(var(--default) * 0.03)
      calc(var(--default) * 0.05) rgba(0, 0, 0, 0.5),
    inset calc(var(--default) * 0.05) calc(var(--default) * -0.05)
      calc(var(--default) * 0.1) rgba(0, 0, 0, 0.2); */
  /* box-shadow: -4px 3px 5px rgba(0, 0, 0, 0.5),
    inset 5px -5px 10px rgba(0, 0, 0, 0.2); */
  /* box-shadow: -4px 3px 5px rgba(0, 0, 0, 0.5),
    inset 5px -5px 10px rgba(0, 0, 0, 0.2); */
  position: relative;
}

#blob::before {
  content: "";
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: inset -10px -0px 20px #fff;
  /* opacity: 0.5; */
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
