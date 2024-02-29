import { defineStore } from "pinia";

export const productsStore = defineStore("products", {
  state: () => ({
    products: JSON.parse(localStorage.getItem("products")) || [],
    // products: [],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await fetch("./db.json");
        if (!response.ok) {
          throw new Error(`Kunde inte hämta data: ${response.status}`);
        }
        this.products = await response.json();
        localStorage.setItem("products", JSON.stringify(this.products));
      } catch (error) {
        console.error("Fel:", error);
      }
    },
  },
});
