<script>
    // Importering av det som behövs till komponenten
    import { computed, onMounted } from 'vue'
    import { productsStore } from '@/stores/products'
    import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
    import { Swiper, SwiperSlide } from 'swiper/vue'

    // Importering av swiper styles
    import 'swiper/css'
    import 'swiper/css/navigation'
    import 'swiper/css/pagination'
    import 'swiper/css/a11y'
    import 'swiper/css/autoplay'

    export default {
        //Registrering av swiperkomponenter
        components: {
            Swiper,
            SwiperSlide
        },
        setup() {
            // Hämtar productStore från pinia (products.js) som hämtar produkterna ifrån localStorage.
            const store = productsStore()

            // Kör fetchData när komponenten mounta
            onMounted(() => {
                // Om det inte finns några produkter i store.products så hämtas produkterna med fetchData som också ligger i products.js
                if (store.products.length === 0) {
                    store.fetchData()
                }
            })

            // Skapar en computed property som hämtar produkterna från store.products och skapar en array med objekt som innehåller datan till src, alt och länk till href/router-link
            const images = computed(() =>
                // För varje produkt i store.products så skapas ett objekt med src, alt och url som kan nås med images
                store.products.map((product) => ({
                    src: product.image,
                    alt: product.alt,
                    url: product.url
                }))

            )

            // Returnerar images och swiper alla nödvändiheter till karusellen
            return {
                images,
                // Swiper inställningar
                // Modueler som behövs för att karusellen ska fungera
                modules: [Navigation, Pagination, A11y, Autoplay],
                // Autoplay inställningar för att karusellen ska gå per automatik
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                // Hastigheten på karusellen
                speed: 1000,
                // Breakpoints för att karusellen ska vara responsiv
                breakpoints: {
                    // När skärmen är mindre än 320px så visas 2 slides
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    // När skärmen är över 376 så visas 4 slides
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
    <!-- Container för karusellen -->
    <div class="carousel">
        <!-- Swiper komponenten med dynamisk konfig.  -->
        <swiper
            :modules="modules"
            :breakpoints="breakpoints"
            :autoplay="autoplay"
            :speed="speed"
            loop
        >
            <!-- SwiperSlide som loopar igenom images och skapar en router-link till varje bild -->
            <SwiperSlide v-for="image in images" :key="image.id">
                <router-link :to="image.url">
                    <img :src="image.src" :alt="image.alt" />
                </router-link>
            </SwiperSlide>
            <!-- Pagination och navigation för karusellen -->
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </swiper>
    </div>
</template>

<style lang="scss" scoped>
    /* Styling för karusellen */
    /* Container styles */
    .carousel {
        margin: 0 4rem 0rem 4rem;

        /* Image styles */
        img {
            display: block;
            object-fit: cover;
            height: 50vh;
            width: 25vw;
            box-shadow: 1px 1px 8px rgb(0, 0, 0);

            /* Hover effekt */
            &hover {
                opacity: 50%;
            }
        }
    }

    /* Responsiv styling för karusellen */
    @media screen and (max-width: 375px) {
        .carousel {
            margin: 0 2rem 0 2rem;
            height: auto;

            img {
                object-fit: cover;
                height: 30vh;
                width: 40vw;
                box-shadow: 1px 1px 8px rgb(0, 0, 0);
            }
        }
    }
</style>
