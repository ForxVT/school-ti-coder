<template>
  <div id="main-menu">
    <base-view>
      <template v-slot:header>
        <button id="main-menu-header-add" class="app-header-button" style="float: right;" v-on:click="onClickAdd()">Ajouter</button>
      </template>
      <template v-slot:default>
        <span id="main-menu-main-header" class="app-menu-category-header">Programme</span>
        <div id="main-menu-main-categories">
          <base-category v-for="(category, index) in $parent.course" :key="index"/>
        </div>
      </template>
    </base-view>
  </div>
</template>

<script>
  import BaseView from "@/components/BaseView.vue";
  import BaseCategory from "@/components/menu/BaseCategory.vue";
  import utils from "@/lib/utils.js";

  export default {
    name: "main-menu",
    components: {
      BaseView,
      BaseCategory,
    },
    data: function () {
      return {
        currentCategory: 0,
      };
    },
    methods: {
      onClickAdd: function () {
        if (this.$parent.course.length < 8) {
          this.$parent.course.push({ id: this.$parent.course.length + 1, title: "Chapitre", categories: [] });
          utils.setCookie("course", JSON.stringify(this.$parent.course));
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/mainmenu.scss";
</style>
