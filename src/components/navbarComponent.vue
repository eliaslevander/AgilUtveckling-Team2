<template>
    <!-- drawer för mobile -->
    <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        class="d-flex d-sm-none"
    >
        <v-toolbar>
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

        <!-- rendera länkarna -->
        <v-list class="navigation-list">
            <v-list-item-group>
                <v-list-item
                    v-for="item in menuItems"
                    :key="item.title"
                    link
                    class="navigation-item"
                >
                    <v-list-item-content class="text-center">
                        <router-link :to="item.link" class="navigation-link">{{
                            item.title
                        }}</router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #000000;
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

    export default {
        name: 'my-component',
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
                drawer: false,
                search: '',
                menuItems: [
                    { title: 'Måla', link: '/' },
                    { title: 'Inspiration', link: '/' },
                    { title: 'Guide', link: '/' }
                ]
            }
        }
    }
</script>
