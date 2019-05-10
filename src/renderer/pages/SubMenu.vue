<template>
  <div id="main-menu">
    <base-view>
      <template v-slot:header>
        <button id="sub-menu-header-add" class="app-header-button" v-on:click="onClickBack()">Retour</button>
        <button id="sub-menu-header-add" class="app-header-button" style="float: right;" v-on:click="onClickAdd()">Ajouter</button>
      </template>
      <template v-slot:default>
        <template v-if="$parent.course[$route.params.chapter - 1] != null">
          <span id="sub-menu-main-header" class="app-menu-category-header">{{ $parent.course[$route.params.chapter - 1].title }}</span>
        </template>
        <template v-else>
          <span id="sub-menu-main-header" class="app-menu-category-header"> Catégories </span>
        </template>
        <div id="sub-menu-main-categories">
          <template v-if="$parent.course[$route.params.chapter - 1] != null">
            <base-category v-for="(category, index) in $parent.course[$route.params.chapter - 1].categories" :key="index"/>
          </template>
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
        utils.setCookie("state", this.$parent.state.toString());
        this.$router.push({ path: "/main-menu/" });
      },
      onClickAdd: function () {
        if (this.$parent.course[this.$route.params.chapter - 1].categories.length < 7) {
          this.$parent.course[this.$route.params.chapter - 1].categories.push({ id: this.$parent.course[this.$route.params.chapter - 1].categories.length + 1, title: "Catégorie", content: "" });
          utils.setCookie("course", JSON.stringify(this.$parent.course));
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/submenu.scss";
</style>
