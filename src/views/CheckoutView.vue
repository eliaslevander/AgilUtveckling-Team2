    <script setup>
    import { useCartStore } from "@/stores/cart";

    const cartStore = useCartStore();
    </script>

    <template>
        <div class="checkout-view">
            <div class="checkout-container">
                <div id="contact-section">
                    <h3>Kontakt</h3>
                    <input type="text" placeholder="E-post eller telefonnummer" required>
                    <div id="sub-check">
                        <input type="checkbox" name="subscribe-check" id="">
                        <label for="subscribe-check">Skicka mail med erbjudanden</label>
                    </div>
                </div>
                <div id="delivery-section">
                    <h3>Leverans</h3>
                    <div id="name-section">
                        <input type="text" placeholder="Förnamn" required>
                        <input type="text" placeholder="Efternamn" required>
                    </div>
                    <input type="text" placeholder="Adress" required>
                    <div id="adress-section">
                        <input type="text" placeholder="Postnummer" required>
                        <input type="text" placeholder="Stad" required>
                    </div>
                </div>
                <div id="shipping-section">
                    <h3>Frakt</h3>
                    <p>Ange adress för att se tillängliga alternativ</p>
                </div>
                <div id="payment-section">
                    <h3>Betalning</h3>
                </div>
            </div>
            <div class="checkout-item-container">
                <div id="checkout-item-header" v-for="(item, index) in cartStore.items" :key="index">
                    <div id="photo-title">
                        <img :src="item.product.image" alt="">
                        <h5>{{ item.product.name }}</h5>
                    </div>
                    <p>{{ item.product.price }} kr</p>
                </div>
                <div>
                    <input type="text" placeholder="Rabattkod">
                </div>
            </div>
        </div>
    </template>

<style>
.checkout-view {
    display: flex;
}

.checkout-item-container {
    width: 45%;
    margin-right: 1rem;
}

#checkout-item-header {
    padding: 1rem;
    margin-left: 1rem;
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
    margin-right: 1rem;
}

.checkout-container {
    width: 55%;
    margin-left: 1rem;
    padding: 1rem
}

.checkout-container h3 {
    margin: 0
}

#contact-section {
    display: flex;
    flex-direction: column;
}

#contact-section #sub-check {
    display: flex;

}

#delivery-section {
    display: flex;
    flex-direction: column;
}
</style>
