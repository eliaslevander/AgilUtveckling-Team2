import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        isCartVisible: false,
        items: [], // Lägg till detta för att hålla produkterna
      }),
      actions: {
        toggleCartVisibility() {
          this.isCartVisible = !this.isCartVisible;
        },
        closeCart() {
          this.isCartVisible = false;
        },
        addToCart(product, quantity, colorType) {
          const item = this.items.find(item => item.product.id === product.id && item.colorType === colorType);
          if (item) {
            item.quantity += quantity;
          } else {
            this.items.push({ product, quantity, colorType });
          }
        },
        removeFromCart(productId, colorType) {
          const index = this.items.findIndex(item => item.product.id === productId && item.colorType === colorType);
          if (index !== -1) {
            this.items.splice(index, 1);
          }
        },
      },

    });
