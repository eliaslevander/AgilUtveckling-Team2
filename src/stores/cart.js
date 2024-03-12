// Store för att hantera carten
// Använder pinia för att definera och exportera en global store
import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', {
    state: () => ({
        // Sätter carten till att vara osynlig från start
        // skapar en array "items" för cartens innehåll, hämtar producterna ifrån localStorage om de existerar eller skapar en tom array om carten är tom
        isCartVisible: false,
        items: JSON.parse(localStorage.getItem('cartItems')) || []
    }),
    actions: {
        // Funktionalitet för att lägga till product i carten.
        // Tar emot product, quantity och colorType som argument
        addToCart(product, quantity, colorType) {
            // Kollar om produkten redan ligger i carten baserat på id och colorType
            const itemIndex = this.items.findIndex(
                (item) =>
                    item.product.id === product.id &&
                    item.colorType === colorType
            )
            // Om produkten redan finns i carten så ökar vi antalet med önskat quantity
            if (itemIndex !== -1) {
                this.items[itemIndex].quantity += quantity
                // Annars lägger vi till den nya produkten i arrayen
            } else {
                this.items.push({ product, quantity, colorType })
            }

            // Sparar den aktuella carten i localStorage
            this.saveCart()
        },

        // Funktionalitet för att ta bort en produkt från carten
        removeFromCart(productId, colorType) {
            // Kollar igenom carten
            const index = this.items.findIndex(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )
            // Om produkten finns i carten så tar vi bort den och sparar den nya carten i localStorage
            if (index !== -1) {
                this.items.splice(index, 1)
                this.saveCart()
            }
        },

        // Funktionalitet för att öka antalet av produkt i carten
        incrementQuantity(productId, colorType) {
            // Kollar igenom carten för att se vad som ligger där
            const item = this.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )
            // Om produkten finns i carten så ökar vi antalet med 1 och sparar den nya carten i localStorage
            if (item) {
                item.quantity += 1
                this.saveCart()
            }
        },

        // Funktionalitet för att minska antal av produkt i carten
        decrementQuantity(productId, colorType) {
            // Kollar återigen igen om carten för att se om produkten finns
            const item = this.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )
            // Om produkten ligger i carten och antalet är större än 1 så minskar vi antalet med 1 och sparar den nya carten i localStorage
            if (item && item.quantity > 1) {
                item.quantity -= 1
                this.saveCart()
            }
        },

        // Funktion för att spara carten i localStorage
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items))
        },

        // Funktion för att visa och dölja carten
        toggleCartVisibility() {
            this.isCartVisible = !this.isCartVisible
        },
        // Funktion för att stänga carten
        closeCart() {
            this.isCartVisible = false
        },
        // Hämtar antalet av en specifik produkt i carten
        getItemQuantity(productId, colorType) {
            const item = this.items.find(
                (item) =>
                    item.product.id === productId &&
                    item.colorType === colorType
            )
            // returnerar produktens antal eller 0 om den inte finns
            return item ? item.quantity : 0
        },
        clearCart() {
    this.items = [];
    this.saveCart();
}
    }
})
