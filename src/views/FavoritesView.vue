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
                <img
                    :src="item.image"
                    :alt="`Ett rum med färgen ${item.name}`"
                />
                <v-btn
                    icon
                    flat
                    @click="toggleFavoriteItem(item)"
                    class="favorite-button"
                >
                    <v-icon @click="alert('Item deleted')">
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

    const router = useRouter()
    const {
        items: favorites,
        toggleFavorites,
        isFavorite,
        saveFavorites
    } = useFavoritesStore()

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
        width: 30vw;
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
</style>
