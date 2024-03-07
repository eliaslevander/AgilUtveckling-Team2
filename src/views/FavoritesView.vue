<template>
  <span id="go-back" @click="router.go(-1)" title="Gå tillbaka"
    ><v-icon>mdi-chevron-left</v-icon>
    <p>Tillbaka</p>
  </span>
  <div class="favorites-container">
    <h1>Dina Favoriter</h1>
    <p>
      Här samlar vi dina favoritfärger och tillbehör, för att du enkelt ska
      kunna återvända till de nyanser och verktyg som inspirerar dig mest för
      ditt nästa målningsprojekt.
    </p>
    <div v-if="favorites.length > 0" class="product-grid">
      <div
        v-for="item in favorites"
        :key="item.id"
        class="card"
        @click="goToProduct(item.id)"
      >
        <div class="blob-container" v-if="item.colorHex">
          <blob-component :color="item.colorHex" />
        </div>
        <div class="equipment-container" v-else-if="item.image">
          <img :src="item.image" alt="item.name" class="product-image" />
        </div>
        <div class="card-content">
          <h3 class="product-name">{{ item.name }}</h3>
        </div>

        <v-btn
          icon
          flat
          @click.stop="toggleFavoriteItem(item)"
          class="favorite-button"
        >
          <v-icon class="icon">
            {{ isFavorite(item.id) ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div v-else>
      <p>Du har inte sparat något än</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorit";
import BlobComponent from "../components/BlobComponent.vue";

const router = useRouter();
const {
  items: favorites,
  toggleFavorites,
  saveFavorites,
  isFavorite,
} = useFavoritesStore();
const goToProduct = (id) => {
  router.push({ name: "product", params: { id } });
};
const toggleFavoriteItem = (item) => {
  toggleFavorites(item);
  saveFavorites();
};
</script>

<style scoped>
#go-back {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}
#go-back p {
  text-decoration: underline;
  font-weight: 600;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 8px;
  padding: 8px;
  justify-content: center;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
}
.image-container {
  width: 100%;
  padding: 16px;
  overflow: hidden;
}
.blob-container {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
.product-image {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 5px;
}
.name {
  text-transform: uppercase;
  display: block;
  text-align: center;
  max-width: 85%;
  font-size: 1.125rem;
  margin-bottom: 16px;
}
.name-container {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-content {
  padding: 1rem;
}
.product-name {
  margin-top: 1rem;
}
.favorites-container {
  text-align: center;
  margin: auto;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.favorites-container p {
  width: 25rem;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.favorite-button {
  position: absolute;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
}
@media (max-width: 380px) {
  .favorites-container p {
    width: 20rem;
  }
}
</style>
