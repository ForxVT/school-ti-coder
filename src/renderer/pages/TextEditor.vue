<template>
  <div id="text-editor">
    <base-view>
      <template v-slot:header>
        <button id="text-editor-header-add" class="app-header-button" v-on:click="onClickBack()">Retour</button>
      </template>
      <template v-slot:default>
        <div id="text-editor-content">
          <div id="text-editor-editor">
            <textarea ref="editor" id="text-editor-area" v-on:keypress="onTextChanged"></textarea>
          </div>
        </div>
      </template>
    </base-view>
  </div>
</template>

<script>
  import BaseView from "@/components/BaseView.vue";
  import utils from "@/lib/utils.js";
  
  export default {
    name: "text-editor",
    components: {
      BaseView,
    },
    methods: {
      onClickBack: function () {
        this.$parent.state = 1;
        utils.setCookie("state", this.$parent.state.toString());
        this.$router.push({ path: `/sub-menu/${this.$route.params.chapter}` });
      },
      onTextChanged: function (e) {
        //console.log(this.$refs.editor.value);
        e.stopPropagation();
        e.preventDefault();

        const lines = this.$refs.editor.value.replace(/\r/g, '').split('\n');

        console.log(String.fromCharCode(e.which));
        console.log(lines[0]);
      },
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/texteditor.scss";
</style>
