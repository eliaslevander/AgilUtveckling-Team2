<script>
    import { RouterLink } from 'vue-router'
    import { useCartStore } from '@/stores/cart'
    /* Ikoner */
    import SvgIcon from '@jamescoyle/vue-icon'
    import {
        mdiMagnify,
        mdiHeartOutline,
        mdiShoppingOutline,
        mdiMenu,
        mdiClose,
        mdiMenuDown,
        mdiMenuRight
    } from '@mdi/js'
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
            this.checkIfMobile()
        },
        mounted() {
            /* La till en global event listener så att den fångar upp när användar klickar vart som helst på sidan förutom i dropdown */
            document.addEventListener('click', this.handleClickOutside, true)
        },
        beforeUnmount() {
            /* Tar bort från DOM när det inte längre används så att det inte ska bli några problem senare */
            document.removeEventListener('click', this.handleClickOutside, true)
            window.removeEventListener('resize', this.checkIfMobile)
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
                showSearchComponent: false,
                searching: null
            }
        },
        watch: {
            // Sätter autofokus på sökfält i desktop. Om showSearchComponent = true =>  värdet
            // på this.searching = true.
            // Logiken för autofokus i desktop styrs alltså enbart med denna watch.
            // Värdet på this.searching skickas till sökkomponenten med en prop

            showSearchComponent(newValue) {
                this.searching = newValue
            },

            // Denna watch krävs för att sökkomponenten ska förstå att
            // this.searching = false om menyn stängs med klick utanför. Logiken
            // för att this.searching = true i mobile view styrs till skillnad
            // från desktop istället med click på sökikonen

            drawer(newValue) {
                if (newValue === false) {
                    this.searching = false
                }
            }
        },
        methods: {
            toggleCartVisibility() {
                const cartStore = useCartStore()
                cartStore.toggleCartVisibility()
            },
            toggleDropdownMenu() {
                /* Växlar ifall dropdown menyn är synlig eller inte om den är false är menyn dåld annars så visas den */
                this.showDropdownMenu = !this.showDropdownMenu
            },
            toggleColorsDropdown() {
                /* Liknande toggle till den över men hanterar dropdown menyn för undermenyn "Färger" och funkar då på samma sätt */
                this.showColorsDropdown = !this.showColorsDropdown
            },
            handleSearchComponent() {
                if (!this.isMobile) {
                    // Visa desktop sök
                    this.showSearchComponent = !this.showSearchComponent
                } else {
                    // Öppna drawer i mobile view och säg åt sökkomponenten att autofokusera inmatningsfältet
                    this.drawer = !this.drawer
                    this.searching = true
                }
            },
            checkIfMobile() {
                let width = window.innerWidth
                if (width < 600) {
                    this.isMobile = true /* Mobile */
                } else {
                    this.isMobile = false /* Desktop */
                }
            },
            goToFavorites() {
                /* Navigerar användaren till favoriter utan att ladda om hela sidan */
                this.$router.push({ name: 'favorites' })
            },
            handleClickOutside(event) {
                /* Kontrollerar ifall det finns en referens till dropdown menyn och om dte man klickar på inte är inom dropdown menyns DOM-träd */
                if (
                    this.$refs.dropdownMenu &&
                    !this.$refs.dropdownMenu.contains(event.target)
                ) {
                    //döljer huvud dropdown menyn
                    this.showDropdownMenu = false
                    //döljer dropdown för undermenyn Färger
                    this.showColorsDropdown = false
                }
            }
        }
    }
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
            <v-btn icon @click=";(drawer = !drawer), (this.searching = false)">
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
            <v-list-item
                class="navigation-item"
                @click="toggleDropdownMenu"
                ref="dropdownMenu"
            >
                Måla
                <v-icon
                    ><svg-icon type="mdi" :path="menuDownPath"></svg-icon
                ></v-icon>
            </v-list-item>
            <!-- Dold div som visas när 'showDropdownMenu' är true -->
            <div v-if="showDropdownMenu">
                <v-list-item
                    class="navigation-link"
                    @click="toggleColorsDropdown"
                >
                    Färger
                    <v-icon
                        ><svg-icon type="mdi" :path="menuDownPath"></svg-icon
                    ></v-icon>
                </v-list-item>
                <div v-if="showColorsDropdown">
                    <!-- La till plain, den tar bort den skumma hover effekt som vuetify la till. Funka dock inte på dropdown menyerna vet inte riktigt hur jag ska ta bort den från dem -->
                    <v-list-item plain>
                        <router-link to="#" class="navigation-link"
                            >Gråskala</router-link
                        >
                    </v-list-item>
                    <v-list-item plain>
                        <router-link to="#" class="navigation-link"
                            >Röd</router-link
                        >
                    </v-list-item>
                    <v-list-item plain>
                        <router-link to="#" class="navigation-link"
                            >Blå</router-link
                        >
                    </v-list-item>
                    <v-list-item plain>
                        <router-link to="#" class="navigation-link"
                            >Grön</router-link
                        >
                    </v-list-item>
                    <v-list-item plain>
                        <router-link to="#" class="navigation-link"
                            >Gul</router-link
                        >
                    </v-list-item>
                </div>
                <v-list-item plain>
                    <router-link to="#" class="navigation-link"
                        >Utrustning</router-link
                    >
                </v-list-item>
            </div>
            <v-list-item class="navigation-item" plain>
                <router-link to="#" class="navigation-link"
                    >Inspiration</router-link
                >
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
                    src="../assets/images/Logo_NEW.png"
                    alt=""
                /></div
        ></router-link>
        <!-- länkar -->
        <v-spacer></v-spacer>
        <v-list class="navigation-links d-none d-sm-flex">
            <v-list-item class="navigation-item" @click="toggleDropdownMenu">
                Måla
                <v-icon
                    ><svg-icon type="mdi" :path="menuDownPath"></svg-icon
                ></v-icon>
            </v-list-item>
            <v-list-item class="navigation-item" plain>
                <router-link to="#" class="navigation-link"
                    >Inspiration</router-link
                >
            </v-list-item>
            <v-list-item plain>
                <router-link to="#" class="navigation-link">Guide</router-link>
            </v-list-item>
        </v-list>

        <!-- Ikoner -->
        <!-- Sök-->
        <v-spacer></v-spacer>
        <v-btn icon @click="handleSearchComponent()">
            <v-icon
                ><svg-icon type="mdi" :path="magnifyPath"></svg-icon
            ></v-icon>
        </v-btn>
        <!-- Favorit -->
        <v-btn icon @click="goToFavorites">
            <v-icon><svg-icon type="mdi" :path="heartPath"></svg-icon></v-icon>
        </v-btn>
        <!-- Varukorg-->
        <v-btn icon @click="toggleCartVisibility">
            <v-icon
                ><svg-icon type="mdi" :path="shoppingPath"></svg-icon
            ></v-icon>
        </v-btn>
    </v-app-bar>

    <!-- Visas när 'showDropdownMenu' är true -->
    <div
        v-if="showDropdownMenu"
        class="dropdown-content show-dropdown"
        ref="dropdownMenu"
    >
        <v-list-item @click="toggleColorsDropdown">
            Färger
            <!-- ikon för att göra det tydligt på sidan att det är en dropdown meny och inte en länk som tar användaren någonstans -->
            <v-icon
                ><svg-icon type="mdi" :path="menuRightPath"></svg-icon
            ></v-icon>
        </v-list-item>
        <div v-if="showColorsDropdown" class="subMenu">
            <v-list-item plain>
                <router-link to="#" class="navigation-link"
                    >Gråskala</router-link
                >
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
        width: 100rem;
    }

    .favorites-link {
        color: #000000;
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
