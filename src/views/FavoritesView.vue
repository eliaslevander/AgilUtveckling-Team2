<template>
    <span id="go-back" @click="router.go(-1)" title="Gå tillbaka"
        ><v-icon>mdi-chevron-left</v-icon>
        <p>Tillbaka</p>
    </span>
    <div class="favorites-container">
        <h1>Dina Favoriter</h1>
        <p>
            Här samlar vi dina favoritfärger och tillbehör, för att du enkelt
            ska kunna återvända till de nyanser och verktyg som inspirerar dig
            mest för ditt nästa målningsprojekt.
        </p>
        <div v-if="favorites.length > 0">
            <div v-for="item in favorites" :key="item.id" class="favorite-item">
                <h3>{{ item.name }}</h3>
                <blob-component
                    :color="item.color"
                    width="100px"
                    margin="10px"
                    @click="goToProduct(item.id)"
                />
                <v-btn
                    icon
                    flat
                    @click="toggleFavoriteItem(item)"
                    class="favorite-button"
                >
                    <v-icon>
                        {{ 'mdi-delete-empty' }}
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <div v-else>
            <p>Du har inte sparat något än</p>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { useFavoritesStore } from '../stores/favorit'
    import BlobComponent from '../components/BlobComponent.vue'

    const router = useRouter()
    const {
        items: favorites,
        toggleFavorites,
        saveFavorites
    } = useFavoritesStore()
    const goToProduct = (id) => {
        router.push({ name: 'product', params: { id } })
    }
    const toggleFavoriteItem = (item) => {
        toggleFavorites(item)
        saveFavorites()
    }
</script>

<style scoped>
    #go-back {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
    }
    #go-back p {
        text-decoration: underline;
        font-weight: 600;
    }
    .favorite-item {
        position: relative;
        display: inline-block;
        margin: 10px;
    }
    .favorite-item img {
        width: auto;
        height: 40vh;
    }
    .favorites-container {
        text-align: center;
    }
    .favorites-container p {
        width: 25rem;
        margin: 0 auto;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .favorite-button {
        position: absolute;
        top: 3rem;
        right: 1rem;
        z-index: 10;
    }

    @media (max-width: 380px) {
        .favorite-item img {
            width: 80vw;
            height: auto;
        }
    }
</style>
