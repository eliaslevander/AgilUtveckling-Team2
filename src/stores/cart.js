import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        isCartVisible: false,
        items: JSON.parse(localStorage.getItem('cartItems')) || []
    }),
    actions: {
        addToCart(product, quantity, colorType) {
            const itemIndex = this.items.findIndex(
                (item) =>
                    item.product.id === product.id &&
                    item.colorType === colorType
            )

            if (itemIndex !== -1) {
                this.items[itemIndex].quantity += quantity
            } else {
                this.items.push({ product, quantity, colorType })
            }

            this.saveCart()
        },
        removeFromCart(productId, colorType) {
            const index = this.items.findIndex(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )

            if (index !== -1) {
                this.items.splice(index, 1)
                this.saveCart()
            }
        },
        incrementQuantity(productId, colorType) {
            const item = this.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )

            if (item) {
                item.quantity += 1
                this.saveCart()
            }
        },
        decrementQuantity(productId, colorType) {
            const item = this.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )

            if (item && item.quantity > 1) {
                item.quantity -= 1
                this.saveCart()
            }
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items))
        },
        toggleCartVisibility() {
            this.isCartVisible = !this.isCartVisible
        },
        closeCart() {
            this.isCartVisible = false
        },
        getItemQuantity(productId, colorType) {
            const item = this.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )
            return item ? item.quantity : 0
        }
    }
})
