<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ti-coder',
    data: function () {
      return {
        state: 0,
        course: [],
      };
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/app.scss";
</style>
