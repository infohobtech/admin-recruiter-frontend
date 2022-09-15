import { createRouter, createWebHistory } from "vue-router";
// import ayolookRoutes from "./ayolook";
// import ayovueRoutes from "./ayovue";

import Login from "../pages/Login.vue";

const routes = [
  { path: "/", component: Login }
  //   {
  //     path: "/ayolook",
  //     component: AyoLook,
  //     children: ayolookRoutes
  //   }
];

const router = createRouter({
  routes,
  history: createWebHistory(""),
  scrollBehavior() {
    document.body?.scrollTo(0, 0);
  }
});

export default router;
