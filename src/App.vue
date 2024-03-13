<script setup>
  import { RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import { productsStore } from './stores/products.js'
  import { useRoute } from 'vue-router'
  import NavbarComponent from './components/navbarComponent.vue'
  import CartComponent from './components/CartComponent.vue'
  import FooterComponent from './components/FooterComponent.vue'

  const store = productsStore()

  // :key="route.fullPath" fixar problemet med att den nya produkten inte laddas när product view är öppen

  const route = useRoute()

  onMounted(async () => {
    await store.fetchData()
  })
</script>

<template>
  <v-app>
    <h1>Nu då!</h1>
    <NavbarComponent />
    <CartComponent />
    <div class="content" style="margin-top: 64px">
      <RouterView :key="route.fullPath" />
    </div>
    <FooterComponent />
  </v-app>
</template>

<style scoped></style>
