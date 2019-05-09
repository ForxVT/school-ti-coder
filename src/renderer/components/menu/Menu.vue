<template>
  <div id="ti-screen">
    <div id="ti-top-border"/>
    <div id="ti-top">
      <div id="ti-top-content">
        <button class="ti-top-button" v-on:click="addCategory">Ajouter</button>
        <span v-if="isSubmenu" class="ti-top-separator">|</span>
        <button v-if="isSubmenu" class="ti-top-button" v-on:click="goBack">Retour</button>
        <button class="ti-top-button" style="float: right; margin-right: 4px;" v-on:click="saveToFile">Sauvegarder</button>
      </div>
    </div>
    <div id="ti-main">
      <div id="ti-main-content">
        <div class="ti-menu">
          <span class="ti-menu-header">{{ this.isSubmenu ? "Catégories" : "Chapitres" }}</span><br/>
          <template v-for="(category, index) in categories">
              <Category :key="index" :ref="'category' + index"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Category from "./Category.vue";
  const fs = require('fs');
  const { dialog } = require('electron').remote;

  export default {
    name: "ti-menu",
    props: {
      isSubmenu: {
        type: Boolean,
        default: true,
      },
    },
    data: function () {
      return {
        categories: [],
      };
    },
    components: {
      Category,
    },
    methods: {
      goBack: function () {
        this.$parent.menus.pop();
      },
      addCategory: function () {
        if (!this.isSubmenu) {
          if (this.categories.length < 8) {
            this.$parent.course.push({ id: this.categories.length + 1 });
            this.categories.push({ id: this.categories.length + 1, title: "Chapitre" });
            console.log(this.$refs);
          }
        } else if (this.categories.length < 7) {
          if (this.$parent.course[this.$parent.course.length - 1]["categories"] == null) {
            this.$parent.course[this.$parent.course.length - 1]["categories"]
              = [];
          }
          this.$parent.course[this.$parent.course.length - 1]["categories"]
            .push({ id: this.categories.length + 1, title: "Catégorie" });
          this.categories.push({ id: this.categories.length + 1, title: "Catégorie" });
        }
      },
      load: function () {
        if (!this.isSubmenu) {
          this.$parent.course.forEach((item) => {
            this.categories.push({ id: item.id, title: item.title });
          });
        }
      },
      saveToFile: function () {
        const path = dialog.showSaveDialog({
          properties: ['openFile', 'openDirectory'],
          filters: [
            { name: 'JSON', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] },
          ],
        });
        fs.writeFileSync(path, JSON.stringify(this.$parent.course, null, 4));
      },
    },
    created: function () {
      this.load();
    },
  };
</script>

<style lang="scss">
  @import "~@/styles/menu/menu.scss";
</style>
