<script setup>
    // Importerar allt som behövs
    import { computed, ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { productsStore } from '../stores/products.js'
    import { useFavoritesStore } from '../stores/favorit'
    import BlobComponent from '../components/BlobComponent.vue'

    // useRoute för att hämta parametrar från url
    const route = useRoute()
    // Pinia stores för alla produkter samt favoriter
    const store = productsStore()
    const favoritesStore = useFavoritesStore()

    // Hover ref för att hålla koll på hove
    const hover = ref(null)

    //Hämtar rätt färgtyp ifrån url parametrar
    const colorType = computed(() => route.params.colorType)

    // När komponenten mountas så kollar den om det finns några produkter i store.products, om inte så hämtas produkterna med fetchData
    onMounted(async () => {
        if (productsStore.products.length === 0) {
            await store.fetchData()
        }
    })

    // Hämtar alla produkter med rätt färgtyp
    const filteredProducts = computed(() => {
        const colorType = route.params.colorType
        return store.products.filter(
            (product) => product.colorType === colorType
        )
    })

    // En funktion till favoritknappen som dyker upp vid hover. Den kollar om produkten är favorit eller inte och ändrar därefter
    function toggleFavorite(product) {
        favoritesStore.toggleFavorites(product)
    }
</script>

<template>
    <span id="go-back" @click="router.go(-1)" title="Gå tillbaka ett steg"
        ><v-icon>mdi-chevron-left</v-icon>
        <p>Tillbaka</p>
    </span>
    <div class="color-filtered-view">
        <h2>{{ colorType }} Färg</h2>
        <div class="products">
            <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="product"
                @mouseenter="hover = product.id"
                @mouseleave="hover = null"
            >
                <router-link :to="`/product/${product.id}`">
                    <div>
                        <BlobComponent
                            v-show="hover !== product.id"
                            id="blob"
                            :color="product.colorHex"
                            :width="'16rem'"
                            :margin="'0 1rem 0 0'"
                        />
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
                    <div class="product-info">
                        <h3>{{ product.name }}</h3>
                        <h3>{{ product.price }} kr / L</h3>
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
                .image-container {
                    width: 14rem;
                    height: 14rem;
                    margin: 0 1rem 0 0;
                    position: relative;
                    overflow: hidden;
                    border-radius: 10px;
                    img,
                    .blob-component {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 14rem;
                        height: 14rem;
                        transition: opacity 0.5s ease;
                    }
                    img {
                        opacity: 0;
                        &:hover {
                            opacity: 1;
                        }
                    }
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
