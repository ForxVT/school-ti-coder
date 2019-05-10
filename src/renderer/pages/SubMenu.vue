<template>
  <div id="main-menu">
    <base-view>
      <template v-slot:header>
        <button id="sub-menu-header-add" class="app-header-button" v-on:click="onClickBack()">Retour</button>
        <button id="sub-menu-header-add" class="app-header-button" style="float: right;" v-on:click="onClickAdd()">Ajouter</button>
      </template>
      <template v-slot:default>
        <span id="sub-menu-main-header" class="app-menu-category-header">Menu</span>
        <div id="sub-menu-main-categories">
          <base-category v-for="(category, index) in $parent.course[$route.params.chapter - 1].categories" :key="index"/>
        </div>
      </template>
    </base-view>
  </div>
</template>

<script>
  import BaseView from "@/components/BaseView.vue";
  import BaseCategory from "@/components/menu/BaseCategory.vue";

  export default {
    name: "sub-menu",
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
      onClickBack: function () {
        this.$parent.state = 0;
        this.$router.push({ path: "/main-menu/" });
      },
      onClickAdd: function () {
        if (this.$parent.course[this.$route.params.chapter - 1].categories.length < 7) {
          this.$parent.course[this.$route.params.chapter - 1].categories.push({ id: this.$parent.course[this.$route.params.chapter - 1].categories.length + 1, title: "Catégorie", content: "" });
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/submenu.scss";
</style>
