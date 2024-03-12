import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import ThanksAlot from "../views/ThanksAlot.vue";
import ColorFilteredView from "@/views/ColorFilteredView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product/:id",
      name: "product",
      component: ProductView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/ThanksAlot",
      name: "ThanksAlot",
      component: ThanksAlot,
    },
    {
        path: "/color/:color",
        name: "filteredColor",
        component: ColorFilteredView,
    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
