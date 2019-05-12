<template>
  <div id="text-editor">
    <base-view>
      <template v-slot:header>
        <button id="text-editor-header-add" class="app-header-button" v-on:click="onClickBack()">Retour</button>
      </template>
      <template v-slot:default>
        <div id="text-editor-content">
        <template v-if="$parent.course[$route.params.chapter - 1] != null">
          <span id="text-editor-main-header" class="app-menu-category-header">{{ ($parent.course[$route.params.chapter - 1].title.length > 10 ? $parent.course[$route.params.chapter - 1].title.substring(0, 10).trimRight() + "..." : $parent.course[$route.params.chapter - 1].title) + " - " + ($parent.course[$route.params.chapter - 1].categories[$route.params.category - 1].title.length > 10 ? $parent.course[$route.params.chapter - 1].categories[$route.params.category - 1].title.substring(0, 10).trimRight() + "..." : $parent.course[$route.params.chapter - 1].categories[$route.params.category - 1].title) }}</span>
        </template>
        <template v-else>
          <span id="text-editor-main-header" class="app-menu-category-header"> Chapitre - Catégorie </span>
        </template>
          <div id="text-editor-editor">
            <template v-if="$parent.course[$route.params.chapter - 1] != null">
              <textarea ref="editor" id="text-editor-area" wrap="off" v-on:click="checkLine" v-on:focus="onFocus" v-on:keypress="onTextChanged" v-on:keyup="onTextChangedUp" v-on:paste="onPaste" v-model="$parent.course[$route.params.chapter - 1].categories[$route.params.category - 1].content"></textarea>
            </template>
            <template v-else>
              <textarea ref="editor" id="text-editor-area" wrap="off" v-on:click="checkLine" v-on:focus="onFocus" v-on:keypress="onTextChanged" v-on:keyup="onTextChangedUp" v-on:paste="onPaste"></textarea>
            </template>
            <template v-if="$parent.course[$route.params.chapter - 1] != null && checkLine()">
              <span id="text-editor-page-indicator">Page {{ currentPage }}/{{ maxPages }}</span>
            </template>
            <template v-else>
              <span id="text-editor-page-indicator">Page {{ currentPage }}/{{ maxPages }}</span>
            </template>
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
    data: function () {
      return {
        maxPages: 1,
        currentPage: 1,
        initialCheck: false,
        initialFocus: false,
      };
    },
    methods: {
      checkLine: function () {
        if (this.initialCheck) {
          const lines = this.$refs.editor.value.split("\n").length;

          this.maxPages = Math.floor(lines / 12) + 1;
          if (this.initialFocus) {
            const line = this.$refs.editor.value.substr(0, this.$refs.editor.selectionStart).split("\n").length;
            this.currentPage = Math.floor(line / 12) + 1;
          }
        } else {
          const lines = this.$parent.course[this.$route.params.chapter - 1].categories[this.$route.params.category - 1].content.split("\n").length;
          
          this.maxPages = Math.floor(lines / 12) + 1;
          this.currentPage = 1;
          this.initialCheck = true;
        }
      },
      onFocus: function () {
        this.initialFocus = true;
        this.checkLine();
      },
      onClickBack: function () {
        this.$parent.state = 1;
        utils.setCookie("state", this.$parent.state.toString());
        this.$router.push({ path: `/sub-menu/${this.$route.params.chapter}` });
      },
      onPaste: function (e) {
        e.stopPropagation();
        e.preventDefault();
      },
      onTextChanged: function (e) {
        const currentLine = this.$refs.editor.value.substr(0, this.$refs.editor.selectionStart).split("\n").length;
        const lines = this.$refs.editor.value.replace(/\r/g, '').split('\n');
        
        if (e.keyCode !== 13 && lines[currentLine - 1].length >= 30) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      onTextChangedUp: function (e) {
        this.$parent.course[this.$route.params.chapter - 1].categories[this.$route.params.category - 1].content = this.$refs.editor.value;
        utils.setCookie("course", JSON.stringify(this.$parent.course));
        this.checkLine();
      },
    },
    created: function () {
      this.$parent.currentCategory = 0;
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/texteditor.scss";
</style>
