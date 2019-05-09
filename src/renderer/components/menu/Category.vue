<template>
  <div class="ti-category">
    <div class="ti-category-separator"></div>
    <span class="ti-category-text-secondary">{{ this.chapterID }}:</span>
    <span class="ti-category-text" v-on:dblclick="changeTitleEvent($event)">{{ this.chapterTitle }}</span>
    <button class="ti-category-button" v-on:click="goToEvent($event)">></button>
    <br class="ti-category-breakline"/>
  </div>
</template>

<script>
  export default {
    name: "category",
    data: function () {
      return {
        chapterID: 1,
        chapterTitle: "Sous-menu",
      };
    },
    methods: {
      setTitle: function (element, title) {
        this.chapterTitle = title;
        element.innerHTML = title;
        this.$parent.course[this.chapterID - 1]["title"] = title;
      },
      goToEvent: function (event) {
        if (!this.$parent.isSubmenu) {
          this.$parent.$parent.changeMenu();
        }
      },
      changeTitleEvent: function (event) {
        const element = event.target;
        const elementCopy = element.cloneNode();
        const elementParent = element.parentNode;
        const elementName = element.innerHTML;
        const parent = this.$parent.$parent;
        const chapterID = this.chapterID;
        elementCopy.addEventListener('dblclick', this.onClickText);

        const brElement = document.createElement("br");
        const inputElement = document.createElement("input");
        inputElement.placeholder = elementName;
        inputElement.className = "ti-menu-input";
        inputElement.maxLength = 26;

        elementParent.removeChild(element);
        elementParent.removeChild(elementParent.lastChild);

        elementParent.append(inputElement);
        elementParent.append(brElement);

        inputElement.focus();

        inputElement.onkeydown = function (e) {
          if (e.keyCode === 13) {
            inputElement.onblur(e);
          }
        };

        inputElement.onblur = function (e) {
          if (inputElement.value.trim() !== "") {
            this.chapterTitle = inputElement.value.trim();
            elementCopy.innerHTML = inputElement.value.trim();
            parent.course[chapterID - 1]["title"] = inputElement.value.trim();
          } else {
            this.chapterTitle = elementName;
            elementCopy.innerHTML = elementName;
            parent.course[chapterID - 1]["title"] = elementName;
          }

          elementParent.removeChild(inputElement);
          elementParent.removeChild(brElement);

          elementParent.append(elementCopy);
          elementParent.append(brElement);
        };
      },
    },
  };
</script>