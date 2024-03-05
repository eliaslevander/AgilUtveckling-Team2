<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useCartStore } from '@/stores/cart'

    const cartStore = useCartStore()

    const icons = ref([])
    const cryptoIcons = ref([])
    const paymentMethods = ref([])
    const otherIcons = ref([])
    const selectedPaymentOption = ref('credit-card')
    const selectedShippingOption = ref('same-address')

    const address = ref('')
    const postalCode = ref('')
    const city = ref('')

    const isAddressComplete = computed(() => {
    return address.value.trim() && postalCode.value.trim() && city.value.trim()
    })

    const userVoucher = ref('')
    const voucherCode = 'PRISMA2023'
    const discountPercentage = 20
    const isDiscountApplied = ref(false)
    const voucherMessage = ref('')


    async function fetchIcons() {
        try {
            const response = await fetch('./checkout.json')
            if (!response.ok) {
                throw new Error(`Kunde inte hämta data: ${response.status}`)
            }
            const data = await response.json()
            icons.value = data.checkoutPage.logoIcons
            paymentMethods.value = data.checkoutPage.paymentMethods
            cryptoIcons.value = data.checkoutPage.paymentMethods[2].cryptoIcons
            otherIcons.value = data.checkoutPage.otherIcons
            console.log(icons.value)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const totalSumWithoutDiscount = computed(() => {
    let sum = cartStore.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )
    return sum > 499 ? sum : sum + 49
    })

    const discountAmount = computed(() => {
    if (isDiscountApplied.value && userVoucher.value.toUpperCase() === voucherCode) {
        return totalSumWithoutDiscount.value * (discountPercentage / 100)
    }
    return 0
    })

    const totalSum = computed(() => {
    return totalSumWithoutDiscount.value - discountAmount.value
    })

    const shippingCost = computed(() => {
        return totalSum.value > 499 ? 0 : 49
    })

    function applyVoucher() {
    if (userVoucher.value.toUpperCase() === voucherCode) {
        isDiscountApplied.value = true
        voucherMessage.value = `En rabatt på ${discountPercentage}% har tillämpats!`
    } else {
        isDiscountApplied.value = false
        voucherMessage.value = 'Ogiltig rabattkod.'
    }
    }

    onMounted(() => {
        fetchIcons()
    })
</script>

<template>
    <div class="checkout-view">

        <!-- Vänster/botten vy -->
        <div class="checkout-container">
            <!-- Kontakt -->
            <div id="contact-section">
                <h3>Kontakt</h3>
                <input
                    type="text"
                    placeholder="E-post eller telefonnummer"
                    required
                />
                <div id="sub-check">
                    <input type="checkbox" name="subscribe-check" id="" />
                    <label for="subscribe-check"
                        >Skicka mail med erbjudanden</label
                    >
                </div>
            </div>
            <!-- Leverans -->
            <div id="delivery-section">
                <h3>Leverans</h3>
                <div id="name-section">
                    <input type="text" placeholder="Förnamn" required />
                    <input type="text" placeholder="Efternamn" required />
                </div>
                <input type="text" v-model="address" placeholder="Adress" required />
                <div id="address-section">
                    <input type="text" v-model="postalCode" placeholder="Postnummer" required />
                    <input type="text" v-model="city" placeholder="Stad" required />
                </div>
            </div>
            <!-- Frakt -->
            <div id="shipping-section">
                <h3>Frakt</h3>
                <div v-if="!isAddressComplete">
                    <p>Ange adress för att se tillängliga alternativ</p>
                </div>
                <div id="postnord-option" v-else>
                    <input type="radio" name="post-nord" id="">
                    <img id="postnord-logo" v-if="otherIcons.length > 0" :src="otherIcons[2].img" alt="">
                    <label for="post-nord">| Hämta på närmaste utlämningställe</label>
                </div>
            </div>
            <!-- Betalning -->
            <div id="payment-section">
                <h3>Betalning</h3>
                <p>Alla transaktioner är säkra och krypterade</p>
                <!-- Kortbetalning -->
                <div id="payment-container">
                    <div class="payment-option" id="credit-card-option">
                        <div>
                            <input type="radio" name="payment-option" id="credit-card" value="credit-card" v-model="selectedPaymentOption" />
                            <label for="credit-card">Kredit kort</label>
                        </div>
                        <ul>
                            <li v-for="icon in icons" :key="icon.id">
                                <img typeof="svg" :src="icon.img" :alt="icon.alt">
                            </li>
                        </ul>
                    </div>
                    <!-- OM kortbetalning -->
                    <div class="payment-option" id="if-credit-card" v-if="selectedPaymentOption === 'credit-card'">
                        <div class="card-details" id="row-1">
                            <input id="card-number-input" for="cardNumber" placeholder="Kort nummer" type="text" required>
                            <img v-if="otherIcons.length > 0" :src="otherIcons[0].img" alt="">
                        </div>
                        <div class="card-details" id="row-2">
                            <input for="expDate" placeholder="Datum (MM / YY)" type="text" required>
                            <div id="row-2-cvv">
                                <input for="securityCode" placeholder="CVV" type="text" required>
                                <img v-if="otherIcons.length > 0" :src="otherIcons[1].img" alt="">
                            </div>
                        </div>
                        <div class="card-details" id="row-3">
                            <input for="cardName" placeholder="Namn på kortet" type="text" >
                        </div>
                    </div>
                    <!-- Applepay -->
                    <div class="payment-option" id="applepay-option">
                        <div id="applepay-div">
                            <input type="radio" name="payment-option" id="apple-pay" value="apple-pay" v-model="selectedPaymentOption">
                            <img class="payment-logo" v-if="paymentMethods.length > 0" :src="paymentMethods[0].img" :alt="paymentMethods[0].alt">
                            <label for="apple-pay"> | Betala direkt</label>
                        </div>
                    </div>
                    <!-- OM applepay -->
                    <div v-if="selectedPaymentOption === 'apple-pay'">
                        <div>
                            <h3>Detta ska bara synas om applepay är valt</h3>
                        </div>
                    </div>
                    <!-- Klarna -->
                    <div class="payment-option" id="klarna-option">
                        <div id="klarna-div">
                            <input type="radio" name="payment-option" id="klarna" value="klarna" v-model="selectedPaymentOption">
                            <img class="payment-logo" v-if="paymentMethods.length > 0" :src="paymentMethods[1].img" :alt="paymentMethods[1].alt">
                            <label for="klarna-pay"> | Betala direkt</label>
                        </div>
                    </div>
                    <!-- OM klarna -->
                    <div v-if="selectedPaymentOption === 'klarna'">
                        <div>
                            <h3>Detta ska bara synas om klarna är valt</h3>
                        </div>
                    </div>
                    <!-- Crypto betalning -->
                    <div class="payment-option" id="crypto-option" >
                        <div>
                            <input type="radio" name="payment-option" id="credit-card" value="coinbase" v-model="selectedPaymentOption">
                            <label for="credit-card">Coinbase</label>
                        </div>
                        <ul>
                            <li v-for="crypto in cryptoIcons" :key="crypto.id">
                                <div id="crypto-container">
                                    <img
                                        id="crypto-img"
                                        typeof="svg"
                                        :src="crypto.img"
                                        :alt="crypto.alt"
                                    >
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- OM crypto -->
                    <div v-if="selectedPaymentOption === 'coinbase'">
                        <div>
                            <h3>Detta ska bara synas om coinbase är valt</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Faktura adress -->
            <div id="billing-address-section">
                <h3>Faktureringsadress</h3>
                    <div class="payment-option" id="same-address">
                        <input v-model="selectedShippingOption" type="radio" value="same-address" id="" />
                        <label for="credit-card">Samma som leverans</label>
                    </div>
                    <div class="payment-option" id="new-address">
                        <input v-model="selectedShippingOption" type="radio" value="new-address" id="" />
                        <label for="credit-card">Annan adress</label>
                    </div>
                    <div id="if-new-address" v-if="selectedShippingOption === 'new-address'">
                            <div id="name-section">
                                <input type="text" for="newName" placeholder="Förnamn" required />
                                <input type="text" for="newLastname" placeholder="Efternamn" required />
                            </div>
                            <input type="text" for="newAdress" placeholder="Adress" required />
                            <div id="address-section">
                                <input type="text" for="newPostal" placeholder="Postnummer" required />
                                <input type="text" for="newCity" placeholder="Stad" required />
                            </div>
                    </div>

            </div>
            <div>
                <button id="submit-checkout">SLUTFÖR BETALNING</button>
            </div>
        </div>

        <!-- Höger/Top(Produktvy) -->
        <div class="checkout-item-container">
            <!-- Bild och styckpris -->
            <div
                id="checkout-item-header"
                v-for="(item, index) in cartStore.items"
                :key="index"
            >
                <div id="photo-title">
                    <img :src="item.product.image" alt="" />
                    <h5>{{ item.product.name }}</h5>
                </div>
                <p>{{ item.product.price }} kr / st</p>
            </div>
            <!-- Rabattkod -->
            <div id="checkout-item-mid">
                <input v-model="userVoucher" type="text" placeholder="Rabattkod" />
                <button @click="applyVoucher">Lägg till</button>
            </div>
            <p>{{ voucherMessage }}</p>
            <!-- Kostnader -->
            <div id="checkout-item-foot">
                <div id="shipping-cost">
                    <h3>Frakt</h3>
                    <p>{{ shippingCost }} kr</p>
                </div>
                <div id="subtotal-cost">
                    <h3>Subtotal:</h3>
                    <p>{{ totalSum - shippingCost }} kr</p>
                </div>
                <div id="discount-amount" v-if="discountAmount > 0">
                    <h3>Rabatt</h3>
                    <p>-{{ discountAmount }} kr</p>
                </div>
                <div id="total-cost">
                    <h3>Total:</h3>
                    <p>{{ totalSum }} kr</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    /* Bas style */
    input {
        /* border: 0.5px solid black; */
        background-color: rgb(236, 236, 236);
        border-radius: 3px;
        padding: .4rem;
    }

    input:focus {
        outline: none;
        background-color: rgb(209, 209, 209);
    }

    .checkout-view {
        display: flex;
        overflow: visible;
    }

    /* Höger/Övre */
    .checkout-item-container {
        margin-top: 3rem;
        width: 50%;
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
    }

    #checkout-item-mid {
        display: flex;
        width: 100%;
        margin-top: .5rem;
        gap: 1rem;
    }

    #checkout-item-mid input{
        width: 70%;
    }

    #checkout-item-mid button{
        width: 30%;
        padding: .5rem 2rem;
        border: .5px solid black;
    }

    #checkout-item-mid button:hover{
        background-color: rgb(236, 236, 236);
    }

    #checkout-item-foot {
        margin-top: 1rem;
        padding: .1rem;

    }

    #discount-amount {
        display: flex;
        justify-content: space-between;
    }

    #checkout-item-foot #shipping-cost{
        display: flex;
        justify-content: space-between;
    }

    #checkout-item-foot #subtotal-cost{
        display: flex;
        justify-content: space-between;
    }

    #checkout-item-foot #total-cost{
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
    }

    /* Västra/undre */
    .checkout-container {
        /* border: 0.5px solid black; */
        width: 50%;
        margin-left: 5rem;
        padding: 1rem;
    }

    .checkout-container h3#above-input {
        margin: .5rem 0 .1rem 0;
    }

    #shipping-section{
        margin: 1rem 0;
    }

    #shipping-section #postnord-option {
        border: .5px solid black;
        display: flex;
        align-items: center;
        padding-left: .5rem;
        height: 36px;
    }

    #shipping-section #postnord-option label {
        margin-left: .5rem;
    }

    #postnord-option #postnord-logo{
        width: 4rem;
        height: 2rem;
        margin-left: .5rem;
    }

    #name-section {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: .7rem;
    }

    #name-section input {
        width: 100%;
    }

    #address-section {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: .7rem;
    }

    #address-section input {
        width: 100%;
    }


    #contact-section {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    #contact-section #sub-check {
        display: flex;
        margin-top: .3rem;
        margin-left: .1rem;
        gap: .5rem;
    }

    #delivery-section {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        gap: .7rem;
    }

    #delivery-section h3 {
       margin: 0;
    }

    /* Betalnings style */

    #payment-section {
        margin: 1rem 0;
    }

    .payment-option {
        border: .5px solid black;
        display: flex;
        align-items: center;
        padding-left: .5rem;
    }

    .payment-option#credit-card-option {
        height: 36px;
        justify-content: space-between;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;

    }

    #credit-card-option label {
        margin-left: .5rem;
    }

    .payment-option#crypto-option {
        height: 36px;
        justify-content: space-between;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    #crypto-option label {
        margin-left: .5rem;
    }

    .payment-option#if-credit-card {
        display: flex;
        gap: .5rem;
        flex-direction: column;
        padding: .5rem;
    }

    .card-details#row-1{
        /* border: .5px solid black; */
        background-color: rgb(236, 236, 236);
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .card-details#row-1 img {
        width: 1rem;
        height: 1rem;
        margin-right: .5rem;
    }

    .card-details#row-1 input {
        border: none;
        outline: none;
    }


    .card-details#row-1 input {
        width: 100%;
        border: none;
    }

    .payment-option#if-credit-card .card-details#row-2 {

        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: .5rem;
    }

    .payment-option#if-credit-card #row-2 input {
        width: 100%;
    }

    #row-2-cvv {
        background-color: rgb(236, 236, 236);
        /* border: .5px solid black; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    #row-2-cvv input{
        border: none;
        outline: none;
    }

    #row-2-cvv img{
        width: 1rem;
        height: 1rem;
        margin-right: .5rem;
    }

    .card-details#row-3{
        width: 100%;
    }

    .card-details#row-3 input{
        width: 100%;
    }

    div#applepay-div {
        height: 35px;
        display: flex;
        align-items: center;
    }

    div#klarna-div {
        height: 35px;
        display: flex;
        align-items: center;
    }

    #payment-section ul {
        display: flex;
        margin-right: .5rem;
    }

    #payment-section ul li {
        display: flex;
        width: 2.5rem;
    }

    #payment-section ul li img {
        width: 4.2rem;
        height: 2.2rem;
    }

    .payment-logo {
        width: 3.8rem;
        height: 2.0rem;
        padding: .4rem;
    }

    #applepay-div img{
        width: 3.5rem;
        height: 1.8rem;
    }

    #crypto-container {
        background-color: whitesmoke;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.2rem;
        border-radius: 4px;
        margin: .4rem 0;
        box-shadow: 1px 1px 1px 1px rgba(73, 73, 73, 0.051);
    }

    div#crypto-container img#crypto-img {
        margin: .2rem 0;
        width: 1rem;
        height: 1rem;
    }

    #billing-address-section{
        display: flex;
        margin: 1rem 0;
        flex-direction: column;
    }

    #billing-address-section h3 {
        margin: .5rem 0;
    }

    #billing-address-section label {
        margin-left: .5rem;
    }

    #billing-address-section #same-address {
        height: 36px;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
    }

    #billing-address-section #new-address {
        height: 36px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    #if-new-address {
        border: .5px solid black;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: .5rem;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
    }


    button#submit-checkout{
        /* background-color: rgb(236, 236, 236); */
        box-shadow: 0px 0px 0px 2px rgba(73, 73, 73, 0.024);
        border: .5px solid black;
        padding: .5rem 2rem;
        width: 100%;
    }

    button#submit-checkout:hover{
        background-color: rgb(236, 236, 236);
    }


    @media screen and (max-width: 975px){
    .checkout-view {
        flex-direction: column-reverse;
        margin: 0 2rem;
    }

    .checkout-container{
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .checkout-item-container{
        width: 100%;
        padding: 0;
        margin-bottom: 2rem;
    }
}

</style>