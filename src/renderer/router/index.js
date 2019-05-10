import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/main-menu",
    },
    {
      path: "/main-menu",
      name: "main-menu",
      component: require("@/pages/MainMenu.vue").default,
    },
    {
      path: "/sub-menu/:chapter",
      name: "sub-menu",
      component: require("@/pages/SubMenu.vue").default,
    },
    {
      path: "/text-editor/:chapter/:category",
      name: "text-editor",
      component: require("@/pages/TextEditor.vue").default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
