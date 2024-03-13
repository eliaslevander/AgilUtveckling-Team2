<script setup>
    // Importerar allt som behövs
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { productsStore } from '../stores/products.js'
    import { useFavoritesStore } from '../stores/favorit'

    // Använder useRouter för att kunna använda router.go(-1) för att gå tillbaka ett steg
    const router = useRouter()

    // Pinia stores för alla produkter samt favoriter
    const store = productsStore()
    const favoritesStore = useFavoritesStore()

    // Hover ref för att hålla koll på hover
    const hover = ref(null)

    // När komponenten mountas så kollar den om det finns några produkter i store.products, om inte så hämtas produkterna med fetchData
    onMounted(async () => {
        if (store.products.length === 0) {
            await store.fetchData()
        }
    })

    // Hämtar alla produkter med kategorin 'accessories'
    const allGear = ref(
        store.products.filter((product) => product.category === 'accessories')
    )

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
    <!-- Komponent container -->
    <div class="gear-view">
        <!-- Namn på kategorin -->
        <h2>All Utrustning</h2>
        <!-- Loopar igenom varje produkt i allGear (alla med kategorin accessories) -->
        <div class="products">
            <!-- Uppdaterar hover ref vid mouseenter och nollställer vid mouseleave -->
            <div
                v-for="gear in allGear"
                :key="gear.id"
                class="product"
                @mouseenter="hover = gear.id"
                @mouseleave="hover = null"
            >
                <!-- Länk till produktsidan för specifik produkt -->
                <router-link :to="`/product/${gear.id}`">
                    <div>
                        <!-- Bild och vid hover så visas även en favorit knapp -->
                        <img
                            :src="gear.image"
                            :alt="gear.alt"
                            style="width: 17rem; height: 17rem"
                        />
                        <v-btn
                            icon
                            flat
                            @click.stop="toggleFavorite(gear)"
                            class="favorite-button"
                            v-show="hover === gear.id"
                        >
                            <v-icon>
                                {{
                                    favoritesStore.isFavorite(gear.id)
                                        ? 'mdi-heart'
                                        : 'mdi-heart-outline'
                                }}
                            </v-icon>
                        </v-btn>
                    </div>
                    <!-- namn och pris -->
                    <div class="product-info">
                        <h3>{{ gear.name }}</h3>
                        <p>{{ gear.price }} kr</p>
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
    .gear-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
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
                    display: flex;
                    align-items: center;
                    margin-top: 1rem;
                    justify-content: space-between;
                    h3 {
                        color: black;
                        font-size: 1.2rem;
                        margin: 0;
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
