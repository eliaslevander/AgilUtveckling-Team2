<script>
import { RouterLink } from "vue-router";
import { useCartStore } from "@/stores/cart";
/* Ikoner */
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiMagnify,
  mdiHeartOutline,
  mdiShoppingOutline,
  mdiMenu,
  mdiClose,
  mdiMenuDown,
  mdiMenuRight,
} from "@mdi/js";
import SearchComponent from "./SearchComponent.vue";
import { useFavoritesStore } from "../stores/favorit";

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
    SearchComponent,
    RouterLink,
  },
  created() {
    window.addEventListener("resize", this.checkIfMobile);
    this.checkIfMobile();
  },
  mounted() {
    /* La till en global event listener så att den fångar upp när användar klickar vart som helst på sidan förutom i dropdown */
    document.addEventListener("click", this.handleClickOutside, true);
  },
  beforeUnmount() {
    /* Tar bort från DOM när det inte längre används så att det inte ska bli några problem senare */
    document.removeEventListener("click", this.handleClickOutside, true);
    window.removeEventListener("resize", this.checkIfMobile);
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
      search: "",
      showDropdownMenu: false,
      showColorsDropdown: false,
      showSearchComponent: false,
      searching: null,
    };
  },
  watch: {
    // Sätter autofokus på sökfält i desktop. Om showSearchComponent = true =>  värdet
    // på this.searching = true.
    // Logiken för autofokus i desktop styrs alltså enbart med denna watch.
    // Värdet på this.searching skickas till sökkomponenten med en prop

    showSearchComponent(newValue) {
      this.searching = newValue;
    },

    // Denna watch krävs för att sökkomponenten ska förstå att
    // this.searching = false om menyn stängs med klick utanför. Logiken
    // för att this.searching = true i mobile view styrs till skillnad
    // från desktop istället med click på sökikonen

    drawer(newValue) {
      if (newValue === false) {
        this.searching = false;
        this.showDropdownMenu = false;
        this.showColorsDropdown = false;
      }
    },
  },
  computed: {
    numberOfFavorites() {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.items.length;
    },
    numberOfItems() {
      const cartStore = useCartStore();
      return cartStore.items.length;
    },
  },
  methods: {
    toggleCartVisibility() {
      const cartStore = useCartStore();
      cartStore.toggleCartVisibility();
    },
    toggleDropdownMenu() {
      /* Växlar ifall dropdown menyn är synlig eller inte om den är false är menyn dåld annars så visas den */
      this.showDropdownMenu = !this.showDropdownMenu;
    },
    toggleColorsDropdown() {
      /* Liknande toggle till den över men hanterar dropdown menyn för undermenyn "Färger" och funkar då på samma sätt */
      this.showColorsDropdown = !this.showColorsDropdown;
    },
    handleSearchComponent() {
      if (!this.isMobile) {
        // Visa desktop sök
        this.showSearchComponent = !this.showSearchComponent;
      } else {
        // Öppna drawer i mobile view och säg åt sökkomponenten att autofokusera inmatningsfältet
        this.drawer = !this.drawer;
        this.searching = true;
      }
    },
    checkIfMobile() {
      let width = window.innerWidth;
      if (width < 600) {
        this.isMobile = true; /* Mobile */
      } else {
        this.isMobile = false; /* Desktop */
      }
    },
    goToFavorites() {
      /* Navigerar användaren till favoriter utan att ladda om hela sidan */
      this.$router.push({ name: "favorites" });
    },
    handleClickOutside(event) {
      /* Kontrollerar ifall det finns en referens till dropdown menyn och om dte man klickar på inte är inom dropdown menyns DOM-träd */
      if (
        this.$refs.dropdownMenu &&
        !this.$refs.dropdownMenu.contains(event.target) &&
        !this.isMobile
      ) {
        //döljer huvud dropdown menyn
        this.showDropdownMenu = false;
        //döljer dropdown för undermenyn Färger
        this.showColorsDropdown = false;
      }
    },
    selectColor(colorType) {
      this.$router.push({
        name: "ColorFiltered",
        params: { colorType: colorType },
      });
    },
  },
};
</script>

<template>
  <!-- v-show="this.showSearchComponent" krävs för att autofokus på sökfältet ska fungera för både mobile och desktop search.
  Utan detta så fungerar endast den för desktop eftersom att den ligger före mobile
  -->

  <!--template desktop-->
  <v-navigation-drawer
    v-show="this.showSearchComponent"
    width="400"
    v-model="showSearchComponent"
    location="right"
    class="desktopSearch"
    temporary
    touchless
  >
    <!-- Propen state säger till sökkomponenten att den är akti.
    Eftersom att SearchComponent för desktop inte ligger i drawer så kan dess egenskaper hanteras
    på ett enkelt sätt med en watch
    -->
    <div id="close-button-container">
      <v-btn
        title="Stäng sökfältet"
        icon
        @click="this.showSearchComponent = false"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </div>
    <v-divider id="search-divider"></v-divider>

    <SearchComponent :isSearching="this.searching" />
  </v-navigation-drawer>

  <!-- drawer för mobile -->
  <v-navigation-drawer
    v-model="drawer"
    touchless
    temporary
    class="d-flex d-sm-none"
  >
    <!-- flat tar bort skuggorna som vuetify la till -->
    <v-toolbar flat>
      <v-toolbar-title>Meny</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="(drawer = !drawer), (this.searching = false)">
        <svg-icon type="mdi" :path="closePath"></svg-icon>
      </v-btn>
    </v-toolbar>
    <!-- Search -->
    <!-- <v-form>
      <v-text-field v-model="search" label="Sök..." hide-details></v-text-field>
    </v-form>. -->

    <!-- SearchComponent för mobile behöver två props, isSearching som gör så att sökfältet får autofokus
    samt drawer för att kunna rensa sökfältet om användaren sätter drawer = true
    -->

    <SearchComponent
      :isSearching="this.searching"
      :drawer="this.drawer"
      :menuClick="this.menuClick"
    />

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
          <!-- La till plain, den tar bort den skumma hover effekt som vuetify la till. Funka dock inte på dropdown menyerna vet inte riktigt hur jag ska ta bort den från dem -->
          <v-list-item plain>
            <router-link to="/colors" class="navigation-link"
              >Alla färger</router-link
            >
          </v-list-item>
          <v-list-item plain @click="selectColor('Röd')">
            <router-link to="/colors/Röd" class="navigation-link"
              >Röd</router-link
            >
          </v-list-item>
          <v-list-item plain @click="selectColor('Blå')">
            <router-link to="/colors/Blå" class="navigation-link"
              >Blå</router-link
            >
          </v-list-item>
          <v-list-item plain @click="selectColor('Grön')">
            <router-link to="/colors/Grön" class="navigation-link"
              >Grön</router-link
            >
          </v-list-item>
          <v-list-item plain @click="selectColor('Gul')">
            <router-link to="/colors/Gul" class="navigation-link"
              >Gul</router-link
            >
          </v-list-item>
          <v-list-item plain @click="selectColor('Vit')">
            <router-link to="" class="navigation-link">Vit</router-link>
          </v-list-item>
        </div>
        <v-list-item plain>
          <router-link to="/accessories" class="navigation-link"
            >Utrustning</router-link
          >
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

  <v-app-bar flat>
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none"
      ><svg-icon size="42" type="mdi" :path="menuPath"></svg-icon
    ></v-app-bar-nav-icon>
    <!-- Brand -->
    <!-- <router-link :to="{ name: 'home' }" id="brand">PRISMA</router-link> -->
    <router-link :to="{ name: 'home' }" id="brand"
      ><div
        style="width: 160px; display: flex; align-items: center"
        id="logo-container"
      >
        <img
          style="width: 100%"
          src="../assets/images/logo_new.png"
          alt=""
        /></div
    ></router-link>
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
    <v-btn icon @click="handleSearchComponent()">
      <v-icon><svg-icon type="mdi" :path="magnifyPath"></svg-icon></v-icon>
    </v-btn>
    <!-- Favorit -->
    <!-- v-badge syns hela tiden så gjorde en if-sats kändes onödigt att ha en badge för att visa 0 -->
    <v-btn icon @click="goToFavorites">
      <template v-if="numberOfFavorites > 0">
        <v-badge :content="numberOfFavorites" color="orange">
          <v-icon><svg-icon type="mdi" :path="heartPath"></svg-icon></v-icon>
        </v-badge>
      </template>
      <template v-else>
        <v-icon><svg-icon type="mdi" :path="heartPath"></svg-icon></v-icon>
      </template>
    </v-btn>
    <!-- Varukorg-->
    <v-btn icon @click="toggleCartVisibility">
      <template v-if="numberOfItems > 0">
        <v-badge :content="numberOfItems" color="orange">
          <v-icon>
            <svg-icon type="mdi" :path="shoppingPath"></svg-icon>
          </v-icon>
        </v-badge>
      </template>
      <template v-else>
        <v-icon>
          <svg-icon type="mdi" :path="shoppingPath"></svg-icon>
        </v-icon>
      </template>
    </v-btn>
  </v-app-bar>

  <!-- Visas när 'showDropdownMenu' är true och i desktopläge (this.isMobile === false) -->
  <div
    v-if="showDropdownMenu && this.isMobile === false"
    class="dropdown-content show-dropdown"
    ref="dropdownMenu"
  >
    <v-list-item @click="toggleColorsDropdown">
      Färger
      <!-- ikon för att göra det tydligt på sidan att det är en dropdown meny och inte en länk som tar användaren någonstans -->
      <v-icon><svg-icon type="mdi" :path="menuRightPath"></svg-icon></v-icon>
    </v-list-item>
    <div
      v-if="showColorsDropdown"
      class="subMenu"
      @click="
        (this.showDropdownMenu = false), (this.showColorsDropdown = false)
      "
    >
      <v-list-item plain>
        <router-link to="/colors" class="navigation-link"
          >Alla färger</router-link
        >
      </v-list-item>
      <v-list-item plain @click="selectColor('Röd')">
        <router-link to="" class="navigation-link">Röd</router-link>
      </v-list-item>
      <v-list-item plain @click="selectColor('Blå')">
        <router-link to="" class="navigation-link">Blå</router-link>
      </v-list-item>
      <v-list-item plain @click="selectColor('Grön')">
        <router-link to="" class="navigation-link">Grön</router-link>
      </v-list-item>
      <v-list-item plain @click="selectColor('Gul')">
        <router-link to="" class="navigation-link">Gul</router-link>
      </v-list-item>
      <v-list-item plain @click="selectColor('Vit')">
        <router-link to="" class="navigation-link">Vit</router-link>
      </v-list-item>
    </div>
    <v-list-item
      plain
      @click="
        (this.showDropdownMenu = false), (this.showColorsDropdown = false)
      "
    >
      <router-link to="/accessories" class="navigation-link"
        >Utrustning</router-link
      >
    </v-list-item>
  </div>
</template>

<style scoped>
.dropdown-content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 64px;
  width: 50vw;
  height: 15rem;
  background-color: #fff;
  z-index: 2;
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
  /* width: 100rem; */
}

.favorites-link {
  color: #000000;
}

.desktopSearch {
  background-color: #f5f5f5;
}

#close-button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

#search-divider {
  margin-bottom: 2vh;
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

  #logo-container img {
    max-width: 115px;
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
