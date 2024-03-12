<script setup>
    import { computed, ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { productsStore } from '../stores/products.js'
    import BlobComponent from '../components/BlobComponent.vue'

    const route = useRoute()
    const store = productsStore()

    const hover = ref(null)

    const colorType = computed(() => route.params.colorType)

    onMounted(async () => {
        if (productsStore.products.length === 0) {
            await store.fetchData()
        }
    })

    const filteredProducts = computed(() => {
        const colorType = route.params.colorType
        return store.products.filter(
            (product) => product.colorType === colorType
        )
    })
</script>

<template>
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
                                :width="'14rem'"
                                :margin="'0 1rem 0 0'"
                            />
                            <img
                            v-show="hover === product.id"
                            :src="product.image"
                            :alt="product.alt"
                            style="width: 15rem;
                            height: 218px;"
                        />
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
            position: relative; // Lägg till positionering här
            a {
                text-decoration: none;
                color: black;
            }
            .image-container {
                width: 14rem;
                height: 14rem;
                margin: 0 1rem 0 0;
                position: relative;
                overflow: hidden; // Håller allt inom denna container
                border-radius: 10px;
                img, .blob-component {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 14rem;
                    height: 14rem;
                    transition: opacity 0.5s ease; // Lägg till övergångseffekt
                }
                img {
                    opacity: 0; // Bilden är ursprungligen dold
                    &:hover {
                        opacity: 1; // Visa bilden vid hover
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
        }
    }
}
</style>
