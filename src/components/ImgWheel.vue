<script>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
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
            const images = ref([])

            onMounted(async () => {
                const response = await axios.get('carousel.json')
                images.value = [...response.data, ...response.data]
            })

            return {
                images,
                modules: [Navigation, Pagination, A11y, Autoplay],
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
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
                <img :src="image.src" :alt="image.alt" />
            </SwiperSlide>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </swiper>
    </div>
</template>

<style scoped>
    .carousel {
        height: 30rem;
        margin: 0 4rem 7rem 4rem;
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
