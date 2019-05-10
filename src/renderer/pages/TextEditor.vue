<template>
  <div id="text-editor">
    <base-view>
      <template v-slot:header>
        <button id="text-editor-header-add" class="app-header-button" v-on:click="onClickBack()">Retour</button>
      </template>
      <template v-slot:default>
        <div id="text-editor-content">
                  <template v-if="$parent.course[$route.params.chapter - 1] != null">
          <span id="text-editor-main-header" class="app-menu-category-header">{{ $parent.course[$route.params.chapter - 1].title + " - " + $parent.course[$route.params.chapter - 1].categories[$route.params.category - 1].title }}</span>
        </template>
        <template v-else>
          <span id="text-editor-main-header" class="app-menu-category-header"> Chapitre - Catégorie </span>
        </template>
          <div id="text-editor-editor">
            <template v-if="$parent.course[$route.params.chapter - 1] != null">
              <textarea ref="editor" id="text-editor-area" wrap="off" v-on:keypress="onTextChanged" v-model="$parent.course[$route.params.chapter - 1].categories[$route.params.category - 1].content"></textarea>
            </template>
            <template v-else>
              <textarea ref="editor" id="text-editor-area" wrap="off" v-on:keypress="onTextChanged"></textarea>
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
    methods: {
      onClickBack: function () {
        this.$parent.state = 1;
        utils.setCookie("state", this.$parent.state.toString());
        this.$router.push({ path: `/sub-menu/${this.$route.params.chapter}` });
      },
      onTextChanged: function (e) {
        const currentLine = this.$refs.editor.value.substr(0, this.$refs.editor.selectionStart).split("\n").length;
        const lines = this.$refs.editor.value.replace(/\r/g, '').split('\n');
        
        if ((e.keyCode !== 13 && lines[currentLine - 1].length > 30) ||
            (e.keyCode === 13 && lines.length > 10)) {
          e.stopPropagation();
          e.preventDefault();
        } else {
          this.$parent.course[this.$route.params.chapter - 1].categories[this.$route.params.category - 1].content = this.$refs.editor.value;
          utils.setCookie("course", JSON.stringify(this.$parent.course));
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/pages/texteditor.scss";
</style>
