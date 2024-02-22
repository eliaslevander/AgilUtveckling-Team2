<script setup>
    import { RouterView } from 'vue-router'
    import NavbarComponent from './components/navbarComponent.vue'
</script>

<template>
    <v-app>
        <div>
            <NavbarComponent />
        </div>
        <RouterView />
    </v-app>
</template>

<style scoped></style>
gi
