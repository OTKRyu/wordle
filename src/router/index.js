import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Wordle from "@/views/Wordle.vue";
import error_404 from "@/views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wordle/:key",
    name: "Wordle",
    component: Wordle,
  },
  {
    path: "/404",
    name: "404",
    component: error_404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
