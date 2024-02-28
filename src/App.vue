<script setup>
    import { RouterView } from 'vue-router'
    import { onMounted } from 'vue'
    import { productsStore } from './stores/products.js'
    import NavbarComponent from './components/navbarComponent.vue'
    import CartComponent from './components/CartComponent.vue'
    import FooterComponent from './components/FooterComponent.vue'

    const store = productsStore()

    onMounted(async () => {
        await store.fetchData()
    })
</script>

<template>
    <v-app>
        <div>
            <NavbarComponent />
            <CartComponent />
        </div>
        <RouterView />
        <FooterComponent />
    </v-app>
</template>

<style scoped></style>
