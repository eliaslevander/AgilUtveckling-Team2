<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import { RouterLink } from "vue-router";

const cartStore = useCartStore();

function increment(productId, colorType) {
  cartStore.incrementQuantity(productId, colorType);
}

function decrement(productId, colorType) {
  let quantity = cartStore.getItemQuantity(productId, colorType);
  if (quantity > 1) {
    cartStore.decrementQuantity(productId, colorType);
  } else {
    removeFromCart(productId, colorType);
  }
}

function removeFromCart(productId, colorType) {
  if (
    window.confirm(
      "Är du säker på att du vill ta bort produkten från din kundvagn?"
    )
  ) {
    cartStore.removeFromCart(productId, colorType);
  }
}

const totalSum = computed(() => {
  let sum = cartStore.items.reduce((sum, item) => {
    let price = item.product.price;

    // Adjust price based on colorType
    switch (item.colorType) {
      case "helmatt":
        price *= 1; // No change
        break;
      case "halvmatt":
        price *= 1.1; // Increase by 10%
        break;
      case "hogglans":
        price *= 1.2; // Increase by 20%
        break;
      default:
        price *= 1; // No change
        break;
    }

    return sum + price * item.quantity;
  }, 0);

  sum = sum > 499 ? sum : sum + 49;

  return Math.round(sum); // Round to nearest integer
});

const shippingCost = computed(() => {
  return totalSum.value > 499 ? 0 : 49;
});
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
            <div class="cart-main" v-if="cartStore.items.length > 0">
                <ul
                    v-for="(item, index) in cartStore.items"
                    :key="index"
                    class="cart-item"
                >
                    <hr />
                    <li>
                        <div id="item-header">
                            <h4>
                                {{ item.product.name }} {{ item.colorType }}
                            </h4>
                            <button
                                @click="
                                    removeFromCart(
                                        item.product.id,
                                        item.colorType
                                    )
                                "
                            >
                                X
                            </button>
                        </div>
                        <div id="cart-content">
                            <img :src="item.product.image" alt="" />
                            <div id="price-and-quantity">
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
                                        <input
                                            :value="item.quantity"
                                            readonly
                                        />
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
                                </div>
                                <p id="item-price">
                                    {{ item.product.price }}kr / {{ item.product.value }}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
                <hr id="total-line" />
                <p id="shipping-note">Fri frakt över 499 kr</p>
                <div id="cart-shipping">
                    <h3>Frakt</h3>
                    <p>{{ shippingCost }} kr</p>
                </div>
                <div id="cart-total">
                    <h3>Totalsumma</h3>
                    <div id="total-price">
                        <h3>{{ totalSum }} kr</h3>
                        <p>ink. moms</p>
                    </div>
                </div>
                <div id="cart-checkout">
                    <router-link to="/checkout"
                        ><button id="to-checkout-btn" @click="cartStore.closeCart">
                            TILL KASSAN
                        </button></router-link
                    >
                </div>
                <hr />
            </div>
            <div v-else class="empty-cart">
                <p>Här var det tomt..</p>
                <button id="to-checkout-btn" @click="cartStore.closeCart">
                    Fortsätt shoppa
                </button>
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

.empty-cart {
  margin-top: -2rem;
  padding: 1rem;
}

.empty-cart p {
  margin-bottom: 2rem;
}

.cart-container {
  display: flex;
  justify-content: flex-end;
  z-index: 109;
}
.cart-modal {
  margin-right: 0rem;
  width: 25rem;
  height: 93vh;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  position: fixed;
  top: 4rem;
  right: 0rem;
  z-index: 1050;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  overflow: scroll;
  padding: 1rem;
}

.cart-main ul {
  list-style: none;
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

#price-and-quantity {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
}

.cart-modal .cart-header a {
  text-decoration: none;
  color: black;
}

#item-header {
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#quantity-container {
  /* margin-top: 2rem; */
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
  /* margin-left: 6rem; */
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

#item-price {
  /* margin-left: 6rem; */
  padding: 0;
}

#cart-content {
  display: flex;
  align-items: center;
  padding: 1rem;
}

#preview-photo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#cart-content img {
  width: 6rem;
  height: 6rem;
}

#cart-total {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-top: -1.5rem;
}

#total-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#shipping-note {
  padding: 1rem;
}

#cart-shipping {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-top: -1rem;
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
  margin-bottom: 1rem;
  margin-top: -1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0);
  color: black;
  border: 1px solid black;
}

@media screen and (max-width: 375px) {
  .cart-modal {
    width: 20rem;
  }

  #cart-content img {
    width: 5rem;
    height: 5rem;
  }
}
</style>
