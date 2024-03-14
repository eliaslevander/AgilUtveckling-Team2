<script setup>
    // Importerar alla nödvändiga funktioner, stores och komponenter
    import { computed, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { productsStore } from '../stores/products.js'
    import { useFavoritesStore } from '../stores/favorit'
    import BlobComponent from '../components/BlobComponent.vue'

    // Använder pinia stores för produkter och favoruter
    const store = productsStore()
    const favoritesStore = useFavoritesStore()

    // Anväder router från vue-router för att kunna gå tillbaka till föregående sida
    const router = useRouter()

    // Här är en ref som ska hålla koll på vilken produkt som hoveras över
    const hover = ref(null)

    // När komponenten mountas så kollar den om det finns några produkter i store.products, om inte så hämtas produkterna med fetchData
    onMounted(async () => {
        if (store.products.length === 0) {
            await store.fetchData()
        }
    })

    // Hämtar alla produkter med kategorin 'color'
    const allColors = computed(() => {
        return store.products.filter((product) => product.category === 'color')
    })

    // En funktion till favoritknappen som dyker upp vid hover. Den kollar om produkten är favorit eller inte och ändrar därefter
    function toggleFavorite(product) {
        favoritesStore.toggleFavorites(product)
    }
</script>

<template>
    <!-- Tillbaka knapp -->
    <span id="go-back" @click="router.go(-1)" title="Gå tillbaka ett steg"
        ><v-icon>mdi-chevron-left</v-icon>
        <p>Tillbaka</p>
    </span>
    <!-- Komponentens container -->
    <div class="color-filtered-view">
        <!-- Namn på färg kategorin -->
        <h2>Alla våra färger</h2>
        <!-- Loopar igenpm varje produkt i allColors (alla med categorin color) -->
        <div class="products">
            <!-- Uppdaterar hover ref vid mouseenter och nollställer vid mouseleave -->
            <div
                v-for="product in allColors"
                :key="product.id"
                class="product"
                @mouseenter="hover = product.id"
                @mouseleave="hover = null"
            >
                <!-- Länk till produktsidan för specifik produkt -->
                <router-link :to="`/product/${product.id}`">
                    <div>
                        <!-- Blob som visas för alla färgtyper och försvinner vid hover -->
                        <BlobComponent
                            v-show="hover !== product.id"
                            id="blob"
                            :color="product.colorHex"
                            :width="'16rem'"
                            :margin="'0 1rem 0 0'"
                        />
                        <!-- Vid hover så visas istället product.image samt "lägg till i favoriter knappen" -->
                        <div v-show="hover === product.id">
                            <img
                                :src="product.image"
                                :alt="product.alt"
                                style="width: 17rem; height: 250px"
                            />
                            <v-btn
                                icon
                                flat
                                @click.stop="toggleFavorite(product)"
                                class="favorite-button"
                                v-show="hover === product.id"
                            >
                                <v-icon>
                                    {{
                                        favoritesStore.isFavorite(product.id)
                                            ? 'mdi-heart'
                                            : 'mdi-heart-outline'
                                    }}
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <!-- Produktnamn och pris -->
                    <div class="product-info">
                        <h3>{{ product.name }}</h3>
                        <h3>fr {{ product.price }} kr</h3>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #go-back {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;

        p {
            text-decoration: underline;
            font-weight: 600;
        }
    }
    .color-filtered-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
        margin: 0 7rem;
        h2 {
            font-size: 2rem;
            margin-bottom: 2rem;
        }
        .products {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            .product {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                a {
                    text-decoration: none;
                    color: black;
                }
                img {
                    object-fit: cover;
                }
                .product-info {
                    width: 100%;
                    display: block;
                    align-items: center;
                    margin-top: 1rem;
                    justify-content: center;
                    h3 {
                        color: black;
                        font-size: 1.2rem;
                        margin: 0;
                        margin-left: 30%;
                    }
                }
                .favorite-button {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    visibility: hidden;
                }

                &:hover .favorite-button {
                    visibility: visible;
                }
            }
        }
    }
</style>
