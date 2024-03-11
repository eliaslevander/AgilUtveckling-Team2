import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        /* Sparad lista med favoritobjekt från localStorage om den är tom så returnar den en tom lista */
        items: JSON.parse(localStorage.getItem('favorites')) || []
    }),
    actions: {
        /* Lägger till objekt i favoritlistan om objektet inte redan finns */
        addFavorite(item) {
            if (!this.items.find((i) => i.id === item.id)) {
                this.items.push(item)
                this.saveFavorites() //sparar uppdateringar till localstorage
            }
        },
        /* Kollar ifall ett objekt redan är en favorit genom dens id */
        isFavorite(itemId) {
            return this.items.some((i) => i.id === itemId)
        },
        /* tar bort objekt från favoriter genom dens id */
        removeFavorite(itemId) {
            this.items = this.items.filter((i) => i.id !== itemId)
            this.saveFavorites()
        },
        /*Ändrar objekts favoritstatus, om produkten redna finns i favoriter tas den bort annars så läggs den till */
        toggleFavorites(item) {
            const existingIndex = this.items.findIndex((i) => i.id === item.id)

            if (existingIndex !== -1) {
                this.removeFavorite(item.id)
            } else {
                this.addFavorite(item)
            }
        },
        /* Sparar den aktuella favoriter listan till localStorage */
        saveFavorites() {
            localStorage.setItem('favorites', JSON.stringify(this.items))
        }
    }
})
