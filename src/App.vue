<script setup>
  import { RouterView } from 'vue-router'
  import NavbarComponent from './components/navbarComponent.vue'
  import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <v-app>
    <div>
      <NavbarComponent />
    </div>
    <RouterView />
    <FooterComponent />
  </v-app>
</template>

<style scoped></style>
