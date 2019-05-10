<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import utils from "@/lib/utils.js";

  export default {
    name: 'ti-coder',
    data: function () {
      return {
        state: 0,
        course: [],
      };
    },
    mounted: function () {
      utils.getCookie("state", (result) => {
        if (result) {
          console.log(result);
          this.state = parseInt(result.value, 10);
        }
      });
      utils.getCookie("course", (result) => {
        if (result) {
          this.course = JSON.parse(result.value);
        }
      });
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/app.scss";
</style>
