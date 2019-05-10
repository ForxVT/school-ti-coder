<template>
  <div>
    <div class="app-menu-category-separator"></div>
    <span class="app-menu-category-id">{{ id }}:</span>
    <span class="app-menu-category-title">{{ title }}</span>
    <button class="app-menu-category-button" style="float: right;" v-on:click="onClickGoTo()">></button>
  </div>
</template>

<script>
  import utils from "@/lib/utils.js";

  export default {
    name: "base-category",
    data: function () {
      return {
        id: 1,
        title: "Sous-menu",
      };
    },
    mounted: function () {
      if (this.$parent.$parent.$parent.state === 0) {
        const category = this.$parent.$parent.$parent.course[this.$parent.$parent.currentCategory];
        this.$parent.$parent.currentCategory += 1;

        this.id = category["id"];
        this.title = category["title"];
      } else {
        const category = this.$parent.$parent.$parent.course[this.$parent.$parent.$route.params.chapter - 1].categories[this.$parent.$parent.currentCategory];
        this.$parent.$parent.currentCategory += 1;

        this.id = category["id"];
        this.title = category["title"];
      }
    },
    methods: {
      onClickGoTo: function () {
        if (this.$parent.$parent.$parent.state === 0) {
          this.$parent.$parent.$parent.state = 1;
          utils.setCookie("state", this.$parent.$parent.$parent.state.toString());
          this.$router.push({ path: `/sub-menu/${this.id}` });
        } else {
          this.$parent.$parent.$parent.state = 2;
          utils.setCookie("state", this.$parent.$parent.$parent.state.toString());
          this.$router.push({ path: `/text-editor/${this.$parent.$parent.$route.params.chapter}/${this.id}` });
        }
      },
    },
  };
</script>
