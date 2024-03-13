<template>
    <div class="gear-view">
        <h2>All Utrustning</h2>
        <div class="products">
            <div
                v-for="gear in allGear"
                :key="gear.id"
                class="product"
                @mouseenter="hover = gear.id"
                @mouseleave="hover = null"
            >
                <router-link :to="`/product/${gear.id}`">
                    <div>
                        <img
                            :src="gear.image"
                            :alt="gear.alt"
                            style="width: 14rem; height: 14rem"
                        />
                    </div>
                    <div class="product-info">
                        <h3>{{ gear.name }}</h3>
                        <p>{{ gear.price }} kr</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { productsStore } from '../stores/products.js'

    const store = productsStore()
    const hover = ref(null)

    onMounted(async () => {
        if (store.products.length === 0) {
            await store.fetchData()
        }
    })

    const allGear = ref(
        store.products.filter((product) => product.category === 'accessories')
    )
</script>

<style lang="scss" scoped>
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
            }
        }
    }
</style>
