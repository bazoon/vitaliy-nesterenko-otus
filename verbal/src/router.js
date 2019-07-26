import Vue from "vue";
import Router from "vue-router";
import FirstPage from "./components/FirstPage.vue";
import SecondPage from "./components/SecondPage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: FirstPage
    },
    {
      path: "/play",
      name: "play",
      component: SecondPage
    }
  ]
});
