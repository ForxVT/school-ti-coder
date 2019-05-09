<template>
  <div id="ti-index">
    <img id="ti-background" src="~@/assets/ti83.png"/>
    <template v-for="(menu, index) in menus">
      <Menu v-if="index === menus.length - 1" :key="menu.id" :isSubmenu="menu.isSubmenu"/>
    </template>
  </div>
</template>

<script>
  import Menu from "./menu/Menu.vue";

  export default {
    name: "index",
    components: {
      Menu,
    },
    data: function () {
      return {
        menus: [
          { id: 0, isSubmenu: false },
        ],
        course: [

        ],
      };
    },
    methods: {
      changeMenu: function () {
        this.menus.push({ id: 1, isSubmenu: true });
      },
    },
  };
</script>

<style lang="scss">
  @import "~@/styles/index.scss";
</style>
