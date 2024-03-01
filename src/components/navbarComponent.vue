<script>
  import { RouterLink } from 'vue-router'
  import { useCartStore } from '@/stores/cart'
  /* Ikoner */
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiMagnify } from '@mdi/js'
  import { mdiHeartOutline } from '@mdi/js'
  import { mdiShoppingOutline } from '@mdi/js'
  import { mdiMenu } from '@mdi/js'
  import { mdiClose } from '@mdi/js'
  import { mdiMenuDown } from '@mdi/js'
  import { mdiMenuRight } from '@mdi/js'
  import SearchComponent from './SearchComponent.vue'

  //----------Funktionalitet för sök mobile/desktop--------------

  // OBS, reload av sidan krävs för att den ska kunna kolla mobile/dekstop

  // Hur vet den om den ska öppna mobil sök eller desktop sök?
  // checkIfMobile kollar om bredden är under 769 px bred, om den är under så sätts
  // this.isMobile till true, annars sätts den till false. Den körs när nav skapas under created.

  // Funktionen handleSearchComponent triggas vid click på sökikonen, den kollar värdet på isMobile.
  // Om false (desktopläge) så aktiveras "toggle" funktionalitet på this.showSearchComponent. Annars
  // så aktiveras den mobila menyns "toggle" funktionalitet.

  export default {
    components: {
      SvgIcon,
      SearchComponent
    },
    created() {
      window.addEventListener('resize', this.checkIfMobile)
    },
    data() {
      return {
        magnifyPath: mdiMagnify,
        heartPath: mdiHeartOutline,
        shoppingPath: mdiShoppingOutline,
        menuPath: mdiMenu,
        closePath: mdiClose,
        menuDownPath: mdiMenuDown,
        menuRightPath: mdiMenuRight,
        drawer: null,
        isMobile: null,
        search: '',
        showDropdownMenu: false,
        showColorsDropdown: false,
        showSearchComponent: false
      }
    },
    methods: {
      toggleCartVisibility() {
        const cartStore = useCartStore()
        cartStore.toggleCartVisibility()
      },
      toggleDropdownMenu() {
        this.showDropdownMenu = !this.showDropdownMenu
      },
      toggleColorsDropdown() {
        this.showColorsDropdown = !this.showColorsDropdown
      },
      handleSearchComponent() {
        if (!this.isMobile) {
          this.showSearchComponent = !this.showSearchComponent
          console.log('Är mobil?', this.isMobile)
          console.log('Öppna/stäng sök', this.showSearchComponent)
        } else {
          this.drawer = !this.drawer
          console.log(this.drawer)
        }
      },
      checkIfMobile() {
        let width = window.innerWidth
        if (width < 600) {
          this.isMobile = true /* Mobile */
        } else {
          this.isMobile = false /* Desktop */
        }
      }
    }
  }
</script>

<template>
  <!--template desktop-->
  <v-navigation-drawer
    width="400"
    v-model="showSearchComponent"
    location="right"
    class="desktopSearch"
    temporary
    touchless
  >
    <SearchComponent />
  </v-navigation-drawer>

  <!-- drawer för mobile -->
  <v-navigation-drawer
    v-model="drawer"
    touchless
    temporary
    class="d-flex d-sm-none"
  >
    <v-toolbar flat>
      <v-toolbar-title>Meny</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="drawer = !drawer">
        <svg-icon type="mdi" :path="closePath"></svg-icon>
      </v-btn>
    </v-toolbar>
    <!-- Search -->
    <!-- <v-form>
      <v-text-field v-model="search" label="Sök..." hide-details></v-text-field>
    </v-form> -->

    <SearchComponent />

    <!-- Rendera länkarna -->
    <v-list class="navigation-list">
      <v-list-item class="navigation-item" @click="toggleDropdownMenu">
        Måla
        <v-icon><svg-icon type="mdi" :path="menuDownPath"></svg-icon></v-icon>
      </v-list-item>
      <!-- Dold div som visas när 'showDropdownMenu' är true -->
      <div v-if="showDropdownMenu">
        <v-list-item class="navigation-link" @click="toggleColorsDropdown">
          Färger
          <v-icon><svg-icon type="mdi" :path="menuDownPath"></svg-icon></v-icon>
        </v-list-item>
        <div v-if="showColorsDropdown">
          <v-list-item plain>
            <router-link to="#" class="navigation-link">Gråskala</router-link>
          </v-list-item>
          <v-list-item plain>
            <router-link to="#" class="navigation-link">Röd</router-link>
          </v-list-item>
          <v-list-item plain>
            <router-link to="#" class="navigation-link">Blå</router-link>
          </v-list-item>
          <v-list-item plain>
            <router-link to="#" class="navigation-link">Grön</router-link>
          </v-list-item>
          <v-list-item plain>
            <router-link to="#" class="navigation-link">Gul</router-link>
          </v-list-item>
        </div>
        <v-list-item plain>
          <router-link to="#" class="navigation-link">Utrustning</router-link>
        </v-list-item>
      </div>
      <v-list-item class="navigation-item" plain>
        <router-link to="#" class="navigation-link">Inspiration</router-link>
      </v-list-item>
      <v-list-item class="navigation-item" plain>
        <router-link to="#" class="navigation-link">Guide</router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none"
      ><svg-icon size="42" type="mdi" :path="menuPath"></svg-icon
    ></v-app-bar-nav-icon>
    <!-- Brand -->
    <router-link :to="{ name: 'home' }" id="brand">PRISMA</router-link>

    <!-- länkar -->
    <v-spacer></v-spacer>
    <v-list class="navigation-links d-none d-sm-flex">
      <v-list-item class="navigation-item" @click="toggleDropdownMenu">
        Måla
        <v-icon><svg-icon type="mdi" :path="menuDownPath"></svg-icon></v-icon>
      </v-list-item>
      <v-list-item class="navigation-item" plain>
        <router-link to="#" class="navigation-link">Inspiration</router-link>
      </v-list-item>
      <v-list-item plain>
        <router-link to="#" class="navigation-link">Guide</router-link>
      </v-list-item>
    </v-list>

    <!-- Ikoner -->
    <!-- Sök-->
    <v-spacer></v-spacer>
    <v-btn icon @click="handleSearchComponent">
      <v-icon><svg-icon type="mdi" :path="magnifyPath"></svg-icon></v-icon>
    </v-btn>
    <v-btn icon>
      <!-- Varukorg-->
      <v-icon><svg-icon type="mdi" :path="heartPath"></svg-icon></v-icon>
    </v-btn>
    <v-btn icon @click="toggleCartVisibility">
      <v-icon><svg-icon type="mdi" :path="shoppingPath"></svg-icon></v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Visas när 'showDropdownMenu' är true -->
  <div v-if="showDropdownMenu" class="dropdown-content show-dropdown">
    <v-list-item class="navigation-link" @click="toggleColorsDropdown">
      Färger
      <v-icon><svg-icon type="mdi" :path="menuRightPath"></svg-icon></v-icon>
    </v-list-item>
    <div v-if="showColorsDropdown" class="subMenu">
      <v-list-item plain>
        <router-link to="#" class="navigation-link">Gråskala</router-link>
      </v-list-item>
      <v-list-item plain>
        <router-link to="#" class="navigation-link">Röd</router-link>
      </v-list-item>
      <v-list-item plain>
        <router-link to="#" class="navigation-link">Blå</router-link>
      </v-list-item>
      <v-list-item plain>
        <router-link to="#" class="navigation-link">Grön</router-link>
      </v-list-item>
      <v-list-item plain>
        <router-link to="#" class="navigation-link">Gul</router-link>
      </v-list-item>
    </div>
    <v-list-item plain>
      <router-link to="#" class="navigation-link">Utrustning</router-link>
    </v-list-item>
  </div>
</template>

<style scoped>
  .dropdown-content {
    position: absolute;
    margin-top: 64px;
    width: 100vw;
    height: 13rem;
    background-color: #ffffff;
    z-index: 1;
  }
  #brand {
    color: #000000;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 500;
    margin-left: 2rem;
  }
  .navigation-link {
    text-decoration: none;
    color: #000000;
  }
  .navigation-link:hover {
    text-decoration: underline;
  }
  .navigation-item {
    text-decoration: none;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .subMenu {
    position: absolute;
    margin-left: 15rem;
    margin-top: -43px;
    background-color: #ffffff;
    z-index: 1;
    width: 10rem;
  }

  .desktopSearch {
    background-color: #f5f5f5;
  }

  @media (max-width: 601px) {
    #brand {
      font-size: 1.75rem;
      margin-left: 10px;
    }
    .navigation-link {
      text-decoration: none;
      color: #000000;
    }
    .navigation-link:hover {
      text-decoration: underline;
    }
    .navigation-item {
      text-decoration: none;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .subMenu {
      position: absolute;
      margin-left: 15rem;
      margin-top: -43px;
      background-color: #ffffff;
      z-index: 1;
      width: 10rem;
    }

    .desktopSearch {
      background-color: #f5f5f5;
    }
  }

  @media (max-width: 380px) {
    #brand {
      font-size: 1.5rem;
    }
    .dropdown-content {
      display: none;
    }
  }
</style>
