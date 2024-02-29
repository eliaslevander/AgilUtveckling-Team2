<script setup>
    import { computed } from 'vue'
    import { useCartStore } from '../stores/cart'

    const cartStore = useCartStore()

    function increment(productId, colorType) {
        cartStore.incrementQuantity(productId, colorType)
    }

    function decrement(productId, colorType) {
        if (cartStore.getItemQuantity(productId, colorType) > 1) {
            cartStore.decrementQuantity(productId, colorType)
        }
    }

    function removeFromCart(productId, colorType) {
        cartStore.removeFromCart(productId, colorType)
    }

    const totalSum = computed(() => {
        return cartStore.items.reduce((sum, item) => {
            return sum + item.product.price * item.quantity
        }, 0)
    })
</script>

<template>
    <div
        class="backdrop"
        v-show="cartStore.isCartVisible"
        @click="cartStore.closeCart"
    ></div>
    <div class="cart-container">
        <div
            class="cart-modal"
            :class="{ 'cart-visible': cartStore.isCartVisible }"
        >
            <div class="cart-header">
                <h3>Din Kundvagn</h3>
                <button @click="cartStore.closeCart">X</button>
            </div>
            <hr />
            <div class="cart-main">
                <ul
                    v-for="(item, index) in cartStore.items"
                    :key="index"
                    class="cart-item"
                >
                    <li>
                        <div id="title-quantity-price">
                            <div id="preview-header">
                                <h4>{{ item.product.name }}</h4>
                                <h4>{{ item.colorType }}</h4>
                            </div>
                            <h4>Quantity:</h4>
                            <h4>Price:</h4>
                        </div>
                        <div id="cart-content">
                            <img :src="item.product.image" alt="" />
                            <div id="quantity-container">
                                <div class="quantity-selector">
                                    <button
                                        @click="
                                            decrement(
                                                item.product.id,
                                                item.colorType
                                            )
                                        "
                                    >
                                        -
                                    </button>
                                    <input :value="item.quantity" readonly />
                                    <button
                                        @click="
                                            increment(
                                                item.product.id,
                                                item.colorType
                                            )
                                        "
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    @click="
                                        removeFromCart(
                                            item.product.id,
                                            item.colorType
                                        )
                                    "
                                >
                                    Ta bort
                                </button>
                            </div>
                            '
                            <p>{{ item.product.price }}kr</p>
                        </div>
                    </li>
                </ul>
                <hr id="total-line" />
                <div id="cart-total">
                    <h3>Summa</h3>
                    <div id="total-price">
                        <h3>{{ totalSum }}kr</h3>
                        <p>ink. moms</p>
                    </div>
                </div>
                <div id="cart-checkout">
                    <button id="to-checkout-btn">TILL KASSAN</button>
                </div>
                <hr />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .cart-container {
        display: flex;
        justify-content: flex-end;
        z-index: 109;
    }
    .cart-modal {
        margin-right: 0rem;
        width: 30rem;
        height: 93vh;
        background-color: rgb(255, 255, 255);
        border: 1px solid black;
        position: fixed;
        top: 4rem;
        right: 0rem;
        z-index: 1050;
        transition: transform 0.3s ease-in-out;
        transform: translateX(100%);
    }

    .cart-modal h3 {
        font-weight: bold;
    }

    .cart-modal h4 {
        padding: 0;
        margin: 0;
        font-weight: bold;
    }

    .cart-visible {
        transform: translateX(0);
    }

    hr {
        width: 93%;
        margin: auto;
        opacity: 0.3;
    }

    #title-quantity-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }

    .cart-modal .cart-header a {
        text-decoration: none;
        color: black;
    }

    #preview-header {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    #quantity-container {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }

    .quantity-selector {
        background-color: whitesmoke;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .quantity-selector button {
        background-color: rgb(176, 176, 176);
        width: 2rem;
        margin: 0;
        /* border: .5px solid black; */
    }

    .quantity-selector input {
        margin: 0;
        width: 2rem;
        text-align: center;
    }

    #cart-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }

    #cart-content img {
        width: 6rem;
        height: 6rem;
    }

    #cart-total {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
    }

    #total-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    #cart-checkout {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }

    #to-checkout-btn {
        font-size: 20px;
        letter-spacing: 0.1rem;
        width: 100%;
        margin: auto;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0);
        color: black;
        border: 1px solid black;
    }

    @media screen and (max-width: 375px) {
        .cart-modal {
            width: 20rem;
        }
    }
</style>
