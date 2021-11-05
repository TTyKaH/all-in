import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "/uno",
    name: "Uno",
    component: () => import("../pages/uno/index.vue"),
  },
  {
    path: "/hat",
    name: "Hat",
    component: () => import("../pages/hat/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
