<script setup>
    import { productsStore } from '../stores/products'
    import router from '@/router'
    import { computed } from 'vue'
    import { useCartStore } from '../stores/cart'
    import { ref, onMounted } from 'vue'
    import BlobComponent from '@/components/BlobComponent.vue'

    //Order från varukorg
    const cartStore = useCartStore()
    const orderData = ref(null)

    onMounted(() => {
        const orderDataString = sessionStorage.getItem('orderData');
    if (orderDataString) {
        orderData.value = JSON.parse(orderDataString);
        // Använd orderData.items för att visa upp produkterna
    }
    })

    //Accessories från JSON
    const store = productsStore()
    const goToProduct = (id) => {
        router.push({ name: 'product', params: { id: id } })
    }
    const filteredProducts = computed(() => {
        return store.products.filter(
            (product) => product.category === 'accessories'
        )
    })
</script>

<script>
    //Countdown 60 min
    export default {
        data() {
            return {
                countDown: 60
            }
        },
        methods: {
            countDownTimer() {
                if (this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 60000)
                }
            }
        },
        created() {
            this.countDownTimer()
        }
    }
</script>

<template>
    <div>
        <v-card class="Thanks">
            <h1>Tack för att du handlar hos PRISMA</h1>
            <h3>Ditt ordernummer är: {{ orderData?.orderId }}</h3>
            <h4>
                Vi är otroligt tacksamma för att du har valt att handla hos oss.
            </h4>
            <h4>
                Din beställning har nu behandlats och är på väg att bli packad
                med omsorg för att snart nå fram till dig.
            </h4>
        </v-card>
        <div class="checkout-item-container">
            <!-- Bild och styckpris -->
            <h2>Din order:</h2>
            <div
                id="checkout-item-header"
                v-for="(item, index) in orderData?.items"
                :key="index"
            >
                <div id="photo-title">
                    <div v-if="item.product.category === 'color'">
                        <BlobComponent
                            id="blob"
                            :color="item.product.colorHex"
                            :width="'6rem'"
                            :margin="'0 1rem 0 0'"
                        />
                    </div>
                    <div v-else>
                        <img
                            id="else-img"
                            :src="item.product.image"
                            :alt="item.product.alt"
                            width="96"
                        />
                    </div>
                    <h5>{{ item.product.name }} ({{ item.quantity }} st)</h5>
                </div>
                <div id ="checkout-item-info">
                <p id="price-paragraph">{{ item.product.price }} kr</p>
                <p>{{ item.product.category !== 'color' ? 'Utrustning' : item.colorType }}</p>
                <p>{{ cartStore.quantity }}</p>
              </div>
            </div>
            <div id="total-cost">
                <div id="shipping">
                    <h4>Frakt</h4>
                    <p>{{ orderData?.shippingCost }} kr</p>
                </div>
                <p id="discount" v-if="orderData?.discountAmount > 0">
                    Rabatt: -{{ orderData?.discountAmount }}kr
                </p>
                <div id="total">
                    <h3>Totalsumma:</h3>
                    <h4>{{ orderData?.totalSum }} kr</h4>
                </div>
            </div>
        </div>
        <v-card class="info">
            <v-list>
                <v-list-item>
                    <v-list-item-title id="infotitle">
                        Leveransinformation:
                    </v-list-item-title>
                    Förväntad leveranstid är 2024-02-04. Du kommer att få ett
                    bekräftelsemeddelande med spårningsinformation så snart din
                    beställning har skickats.
                </v-list-item>
                <v-list-item>
                    <v-list-item-title id="infotitle">
                        Erbjudande till dig:
                    </v-list-item-title>
                    För att visa vår uppskattning, ge dig en 20% rabatt på din
                    nästa beställning med koden "PRISMA2023". Använd den vid
                    utcheckningen för att ta del av erbjudandet. Gäller fram
                    till [2024-06-04].
                </v-list-item>
                <v-list-item>
                    <v-list-item-title id="infotitle">
                        Följ oss för uppdateringar:
                    </v-list-item-title>
                    Håll dig uppdaterad om våra senaste produkter, kampanjer och
                    nyheter genom att följa oss på @prismastore eller
                    prenumerera på vårt nyhetsbrev.
                </v-list-item>
                <v-list-item>
                    <v-list-item-title id="infotitle">
                        Ditt åsikter är värdefulla:
                    </v-list-item-title>
                    Vi uppmuntrar dig att lämna feedback eller recensioner. Dina
                    åsikter hjälper oss att förbättra och ger andra kunder
                    insikt i din upplevelse. Tack igen för att du har valt
                    PRISMA. Vi ser fram emot att ha dig som kund och hoppas att
                    du kommer att njuta av dina nya produkter!
                </v-list-item>
            </v-list>
        </v-card>
    </div>
    <div id="dontForget">
        <h2>Har du glömt något?</h2>
        <h4>Det är inte försent!</h4>
        <h4>
            Gör en till beställning inom {{ countDown }} min för att lägga till
            det i samma order
        </h4>
        <h5>(De flesta glömmer verktygen)</h5>
    </div>
    <div class="product-grid">
        <div
            class="card"
            v-for="item in filteredProducts"
            :key="item.id"
            :title="item.name"
            @click="goToProduct(item.id)"
        >
            <div class="image-container">
                <img class="product-image" :src="item.image" :alt="item.alt" />
            </div>
            <div class="name-container">
                <h2 class="name">{{ item.name }}</h2>
            </div>
        </div>
    </div>

    <v-card
        class="contactlist"
        text="Om du har frågor eller funderingar kring din beställning, tveka inte att höra av dig till oss på:"
    >
        <v-list>
            <v-list-item
                class="contact"
                prepend-icon="mdi-phone"
                title="(+46) 555-6789"
                center
            ></v-list-item>

            <v-divider inset></v-divider>

            <v-list-item
                class="contact"
                prepend-icon="mdi-email"
                title="prisma@example.com"
            ></v-list-item>
            <v-divider inset></v-divider>
        </v-list>
    </v-card>
</template>

<style scoped>
    .Thanks {
        width: 100%;
        padding-top: 5vh;
        padding-bottom: 3vh;
        padding-left: 1vh;
        padding-right: 1vh;
        margin: auto;
        text-align: center;
        border-bottom: solid 1px;
    }
    .info {
        padding-left: 4vh;
        padding-top: 4vh;
        padding-bottom: 5vh;
    }
    .contactlist {
        text-align: center;
        margin: auto;
        margin-bottom: 2vh;
        margin-top: 4vh;
        padding: 2vh;
        width: 80%;
    }
    .checkout-item-container {
        margin-top: 3vh;
        width: 100%;
        margin-right: 5rem;
        padding: 1rem 4rem;
        height: auto;
        overflow-y: auto;
    }

    #checkout-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
    }
    #checkout-item-info {
      display: block;
      align-items: center;
    }
    #checkout-item-header #photo-title {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    #checkout-item-header #photo-title img {
        width: 6rem;
        height: 6rem;
        margin-bottom: 1rem;
        object-fit: cover;
        margin-right: 1.2rem;
    }

    #else-img {
        border-radius: 30%;
    }


    #total-cost #shipping {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    #total-cost #total {
        display: flex;
        justify-content: space-between;
    }

    #total-cost #discount {
        margin-top: 1rem;
    }

    #infotitle {
        font-weight: 800;
    }
    #dontForget {
        text-align: center;
        margin: 1vh;
        padding-bottom: 5vh;
    }
    .product-grid {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        padding: 8px;
    }
    .card {
        width: 30%;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        cursor: pointer;
    }

    .image-container {
        width: 100%;
        aspect-ratio: 1;
        padding: 16px;
        overflow: hidden;
    }

    .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .name {
        text-transform: uppercase;
        display: block;
        text-align: center;
        max-width: 85%;
        font-size: 1.125rem;
        margin-bottom: 16px;
    }

    .name-container {
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #price-paragraph {
      text-align: bottom;
      margin:2vh;
      padding-right: 1vh;
      width: 85%;
    }
</style>
