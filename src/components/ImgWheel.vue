<script>
    import { computed, onMounted } from 'vue'
    import { productsStore } from '@/stores/products'
    import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
    import { Swiper, SwiperSlide } from 'swiper/vue'

    import 'swiper/css'
    import 'swiper/css/navigation'
    import 'swiper/css/pagination'
    import 'swiper/css/a11y'
    import 'swiper/css/autoplay'

    export default {
        components: {
            Swiper,
            SwiperSlide
        },
        setup() {
            const store = productsStore()

            onMounted(() => {
                if (store.products.length === 0) {
                    store.fetchData()
                }
            })

            const images = computed(() =>
                store.products.map((product) => ({
                    src: product.image,
                    alt: product.alt,
                    url: product.url
                }))
            )

            return {
                images,
                modules: [Navigation, Pagination, A11y, Autoplay],
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                speed: 1000,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },

                    376: {
                        slidesPerView: 4,
                        spaceBetween: 250,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }
                    }
                }
            }
        }
    }
</script>

<template>
    <div class="carousel">
        <swiper
            :modules="modules"
            :breakpoints="breakpoints"
            :autoplay="autoplay"
            :speed="speed"
            loop
        >
            <SwiperSlide v-for="image in images" :key="image.id">
                <router-link :to="image.url">
                    <img :src="image.src" :alt="image.alt" />
                </router-link>
            </SwiperSlide>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </swiper>
    </div>
</template>

<style scoped>
    .carousel {
        margin: 0 4rem 0rem 4rem;
    }

    img {
        display: block;
        object-fit: cover;
        height: 50vh;
        width: 25vw;
        box-shadow: 1px 1px 8px rgb(0, 0, 0);
    }
    img:hover {
        opacity: 50%;
    }

    @media screen and (max-width: 375px) {
        .carousel {
            margin: 0 2rem 0 2rem;
            height: auto;
        }

        img {
            object-fit: cover;
            height: 30vh;
            width: 40vw;
            box-shadow: 1px 1px 8px rgb(0, 0, 0);
        }
    }
</style>
