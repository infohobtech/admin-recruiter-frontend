import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import adminRoutes from "./adminRoutes";
const AdminPage = () => import("../pages/Admin.vue");

const routes = [
  { path: "/", component: Login },
  { path: "/admin", component: AdminPage, children: adminRoutes }
];

const router = createRouter({
  routes,
  history: createWebHistory(""),
  scrollBehavior() {
    document.body?.scrollTo(0, 0);
  }
});

export default router;
