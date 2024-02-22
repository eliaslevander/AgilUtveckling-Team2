<template>
  <v-app-bar>
    <!-- Brand -->
    <router-link :to="{ name: 'home' }" id="brand">PRISMA</router-link>

    <!-- länkar -->
    <v-spacer></v-spacer>
    <v-list class="navigation-links">
      <v-list-item-group class="d-flex">
        <v-list-item>
          <v-list-item-content>
            <router-link :to="{ name: '' }" class="navigation-link"
              >Måla</router-link
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <router-link :to="{ name: '' }" class="navigation-link"
              >Inspiration</router-link
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <router-link :to="{ name: '' }" class="navigation-link"
              >Guide</router-link
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- Ikoner -->
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon><svg-icon type="mdi" :path="magnifyPath"></svg-icon></v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon><svg-icon type="mdi" :path="heartPath"></svg-icon></v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon><svg-icon type="mdi" :path="shoppingPath"></svg-icon></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
  #brand {
    color: #000000;
    text-decoration: none;
    font-size: 2rem;
    margin-left: 2rem;
  }
  .navigation-link {
    text-decoration: none;
    color: #000000;
  }
  .navigation-link:hover {
    text-decoration: underline;
  }
</style>

<script>
  import { RouterLink } from 'vue-router'

  /* Ikoner */
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiMagnify } from '@mdi/js'
  import { mdiHeartOutline } from '@mdi/js'
  import { mdiShoppingOutline } from '@mdi/js'

  export default {
    name: 'my-component',
    components: {
      SvgIcon
    },
    data() {
      return {
        magnifyPath: mdiMagnify,
        heartPath: mdiHeartOutline,
        shoppingPath: mdiShoppingOutline
      }
    }
  }
</script>
