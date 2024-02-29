import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('favorites')) || []
    }),
    actions: {
        addFavorite(item) {
            if (!this.items.find((i) => i.id === item.id)) {
                this.items.push(item)
                this.saveFavorites()
            }
        },
        isFavorite(itemId) {
            return this.items.some((i) => i.id === itemId)
        },
        removeFavorite(itemId) {
            this.items = this.items.filter((i) => i.id !== itemId)
            this.saveFavorites()
        },
        //Om produkten redna finns i favoriter tas den bort annars så läggs den till
        toggleFavorites(item) {
            const existingIndex = this.items.findIndex((i) => i.id === item.id)

            if (existingIndex !== -1) {
                this.removeFavorite(item.id)
            } else {
                this.addFavorite(item)
            }
        },
        saveFavorites() {
            localStorage.setItem('favorites', JSON.stringify(this.items))
        }
    }
})
