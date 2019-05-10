<template>
  <div id="text-editor">
    <base-view>
      <template v-slot:header>
        <button id="sub-menu-header-add" class="app-header-button" v-on:click="onClickBack()">Retour</button>
      </template>
      <template v-slot:default>
        
      </template>
    </base-view>
  </div>
</template>

<script>
  import BaseView from "@/components/BaseView.vue";

  export default {
    name: "text-editor",
    components: {
      BaseView,
    },
    methods: {
      onClickBack: function () {
        this.$parent.state = 0;
        this.$router.push({ path: "/main-menu/" }); // TODO: Change
      },
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/texteditor.scss";
</style>
