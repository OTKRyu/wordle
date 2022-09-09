import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Wordle from "@/views/Wordle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wordle",
    name: "Wordle",
    component: Wordle,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
