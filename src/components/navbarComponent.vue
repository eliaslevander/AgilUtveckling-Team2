<template>
    <!-- drawer för mobile -->
    <v-navigation-drawer v-model="drawer" temporary class="d-flex d-sm-none">
        <v-toolbar flat>
            <v-toolbar-title>Meny</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="drawer = false">
                <svg-icon type="mdi" :path="closePath"></svg-icon>
            </v-btn>
        </v-toolbar>

        <!-- Search -->
        <v-form>
            <v-text-field
                v-model="search"
                label="Sök..."
                hide-details
            ></v-text-field>
        </v-form>

        <!-- Rendera länkarna -->
        <v-list class="navigation-list">
            <v-list-item class="navigation-item" @click="toggleDropdownMenu">
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
                    <v-list-item link>
                        <router-link to="#" class="navigation-link"
                            >Gråskala</router-link
                        >
                    </v-list-item>
                    <v-list-item link>
                        <router-link to="#" class="navigation-link"
                            >Röd</router-link
                        >
                    </v-list-item>
                    <v-list-item link>
                        <router-link to="#" class="navigation-link"
                            >Blå</router-link
                        >
                    </v-list-item>
                    <v-list-item link>
                        <router-link to="#" class="navigation-link"
                            >Grön</router-link
                        >
                    </v-list-item>
                    <v-list-item link>
                        <router-link to="#" class="navigation-link"
                            >Gul</router-link
                        >
                    </v-list-item>
                </div>
                <v-list-item link>
                    <router-link to="#" class="navigation-link"
                        >Utrustning</router-link
                    >
                </v-list-item>
            </div>
            <v-list-item class="navigation-item" link>
                <router-link to="#" class="navigation-link"
                    >Inspiration</router-link
                >
            </v-list-item>
            <v-list-item class="navigation-item" link>
                <router-link to="#" class="navigation-link">Guide</router-link>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"
            ><svg-icon type="mdi" :path="menuPath"></svg-icon
        ></v-app-bar-nav-icon>
        <!-- Brand -->
        <router-link :to="{ name: 'home' }" id="brand">PRISMA</router-link>

        <!-- länkar -->
        <v-spacer></v-spacer>
        <v-list class="navigation-links d-none d-sm-flex">
            <v-list-item link>
                <router-link to="#" class="navigation-link">Måla</router-link>
            </v-list-item>
            <v-list-item link>
                <router-link to="#" class="navigation-link"
                    >Inspiration</router-link
                >
            </v-list-item>
            <v-list-item link>
                <router-link to="#" class="navigation-link">Guide</router-link>
            </v-list-item>
        </v-list>

        <!-- Ikoner -->
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon
                ><svg-icon type="mdi" :path="magnifyPath"></svg-icon
            ></v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon><svg-icon type="mdi" :path="heartPath"></svg-icon></v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon
                ><svg-icon type="mdi" :path="shoppingPath"></svg-icon
            ></v-icon>
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
    .navigation-item {
        text-decoration: none;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 380px) {
        #brand {
            font-size: 1rem;
        }
    }
</style>

<script>
    import { RouterLink } from 'vue-router'
    /* Ikoner */
    import SvgIcon from '@jamescoyle/vue-icon'
    import { mdiMagnify } from '@mdi/js'
    import { mdiHeartOutline } from '@mdi/js'
    import { mdiShoppingOutline } from '@mdi/js'
    import { mdiMenu } from '@mdi/js'
    import { mdiClose } from '@mdi/js'
    import { mdiMenuDown } from '@mdi/js'

    export default {
        components: {
            SvgIcon
        },
        data() {
            return {
                magnifyPath: mdiMagnify,
                heartPath: mdiHeartOutline,
                shoppingPath: mdiShoppingOutline,
                menuPath: mdiMenu,
                closePath: mdiClose,
                menuDownPath: mdiMenuDown,
                drawer: false,
                search: '',
                showDropdownMenu: false,
                showColorsDropdown: false
            }
        },
        methods: {
            toggleDropdownMenu() {
                this.showDropdownMenu = !this.showDropdownMenu
            },
            toggleColorsDropdown() {
                this.showColorsDropdown = !this.showColorsDropdown
            }
        }
    }
</script>
