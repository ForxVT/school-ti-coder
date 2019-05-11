<template>
  <div>
    <div class="app-menu-category-separator"></div>
    <span class="app-menu-category-id">{{ id }}:</span>
    <span class="app-menu-category-title" ref="title" v-on:dblclick="onClickTitle">{{ title }}</span>
    <input class="app-menu-category-input" ref="input" style="display: none;" :value="title" maxlength="26"/>
    <button class="app-menu-category-button" style="float: right;" v-on:click="onClickGoTo">></button>
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
      const input = this.$refs.input;
      const title = this.$refs.title;
      const id = this.id;
      const element = this;
      const app = this.$parent.$parent.$parent;
      const route = this.$parent.$parent.$route;
      input.onkeydown = function (e) {
        if (e.keyCode === 13) {
          input.onblur(e);
        }
      };

      input.onblur = function (e) {
        title.style.display = "initial";
        input.style.display = "none";
        const result = input.value.trim();
        if (result !== "") {
          if (app.state === 0) {
            app.course[id - 1].title = result;
            element.title = result;
            utils.setCookie("course", JSON.stringify(app.course));
          } else {
            app.course[route.params.chapter - 1].categories[id - 1].title = result;
            element.title = result;
            utils.setCookie("course", JSON.stringify(app.course));
          }
        } else {
          input.value = element.title;
        }
      };
    },
    methods: {
      onClickTitle: function () {
        this.$refs.title.style.display = "none";
        this.$refs.input.style.display = "initial";

        this.$refs.input.focus();
      },
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
