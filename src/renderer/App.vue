<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import utils from "@/lib/utils.js";
  const fs = require('fs');
  const { ipcRenderer } = require('electron'); 
  const { dialog } = require('electron').remote;

  export default {
    name: 'ti-coder',
    data: function () {
      return {
        state: 0,
        currentCategory: 0,
        course: [],
        savePath: "",
      };
    },
    methods: {
      new: function () {
        this.course = [];
        this.currentCategory = 0;
        this.state = 0;
        utils.setCookie("state", "0");
        utils.setCookie("currentCategory", "0");
        utils.setCookie("course", "[]");
        utils.setCookie("savePath", "");
        this.$router.push({ path: "/main-menu" });
      },
      open: function () {
        const path = dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [
            { name: 'JSON', extensions: ['json'] },
            { name: 'Tous les fichier', extensions: ['*'] },
          ],
        });
        
        if (path != null) {
          if (path[0] !== "") {
            fs.readFile(path[0], "utf-8", (error, data) => {
              if (error) {
                console.log(error);
              } else {
                const dataJSON = JSON.parse(data);
                this.course = dataJSON;
                utils.setCookie("course", JSON.stringify(dataJSON));
              }
            });
          }
        }
      },
      save: function () {
        if (this.savePath !== "") {
          fs.writeFileSync(this.savePath, JSON.stringify(this.course, null, 4));
        } else {
          this.saveAs();
        }
      },
      saveAs: function () {
        const path = dialog.showSaveDialog({
          filters: [
            { name: 'JSON', extensions: ['json'] },
            { name: 'Tous les fichiers', extensions: ['*'] },
          ],
        });

        if (path != null) {
          if (path !== "") {
            this.savePath = path;
            utils.setCookie("savePath", path);
            fs.writeFileSync(path, JSON.stringify(this.course, null, 4));
          }
        }
      },
      export: function () {
        let code = `AxesOff`;
        const course = JSON.parse(JSON.stringify(this.course));
        let chapterArrays = [course];
        const chapterIndexes = [];

        if (course.length > 8) {
          chapterArrays = utils.chunkify(course, 7);
        }

        let index = 0;
        let isFirstChapter = true;

        chapterArrays.forEach((chapterArray, chapterArrayIndex) => {
          chapterIndexes.push(index++);
          
          if (isFirstChapter) {
            index = 2;
          }

          let mainMenuChapter = `\nMenu("Programme`;
          if (chapterArrays.length > 1) {
            mainMenuChapter += ` (Page ${chapterArrayIndex + 1}/${chapterArrays.length})`;
          }
          mainMenuChapter += `"`;
          let codeChapter = "";

          chapterArray.forEach((chapter, chapterIndex) => {
            chapter.id = index++;

            mainMenuChapter += `,"${chapter.title}",${chapter.id}`;

            let categoriesArrays = [chapter.categories];
            const categoriesIndexes = [];

            if (chapter.categories.length > 7) {
              categoriesArrays = utils.chunkify(chapter.categories, 6);
            }

            let isFirstCategory = true;
            let firstCategoryIndex = 0;

            categoriesArrays.forEach((categoriesArray, categoriesArrayIndex) => {
              categoriesIndexes.push(index++);

              if (isFirstCategory) {
                firstCategoryIndex = categoriesIndexes[categoriesArrayIndex];
              }

              let mainMenuChapter = `\nMenu("${chapter.title}`;
              if (categoriesArrays.length > 1) {
                mainMenuChapter += ` (Page ${categoriesArrayIndex + 1}/${categoriesArrays.length})`;
              }
              mainMenuChapter += `"`;
              let codeCategory = "";

              categoriesArray.forEach((category, categoryIndex) => {
                category.id = index++;

                const lines = category.content.split("\n");
                let textArrays = [lines];
                
                if (lines.length > 12) {
                  textArrays = utils.chunkify(lines, 12);
                }

                codeCategory += `\n\nLbl ${category.id}`;
                
                textArrays.forEach((text, textIndex) => {
                  let offset = 0;
                  let addedLine = true;
                  let emptyLines = 0;

                  if (text.length > 0) {
                    text.forEach((line) => {
                      if (line === "") {
                        emptyLines++;
                      }
                    });
                    if (emptyLines === text.length) {
                      addedLine = false;
                    }
                  }

                  if (addedLine) {
                    codeCategory += `\nClrDraw`;
                  }

                  if (text.length > 0) {
                    text.forEach((line) => {
                      if (line !== "") {
                        codeCategory += `\nText(${offset},0,"${line}")`;
                      }
                      offset += 12;
                    });
                  }

                  if (addedLine) {
                    codeCategory += `\nPause `;
                  }
                });

                codeCategory += `\nGoto ${chapter.id}`;

                mainMenuChapter += `,"${category.title}",${category.id}`;
              });

              if (categoriesArrays.length < 2) {
                mainMenuChapter += `,"[RETOUR]",${chapterIndexes[chapterArrayIndex]},"[QUITTER]",1)`;
              } else if (categoriesArrayIndex === categoriesArrays.length - 1) {
                mainMenuChapter += `,"[PAGE INITIALE]",${firstCategoryIndex - 1},"[RETOUR]",${chapterIndexes[chapterArrayIndex]},"[QUITTER]",1)`;
              } else {
                mainMenuChapter += `,"[PAGE SUIVANTE]",${index},"[RETOUR]",${chapterIndexes[chapterArrayIndex]},"[QUITTER]",1)`;
              }

              codeChapter += `\n\nLbl ${chapter.id}`;
              codeChapter += `\nClrHome`;
              codeChapter += mainMenuChapter;
              codeChapter += codeCategory;

              chapter.id = index++;

              isFirstCategory = false;
            });
          });
          
          if (chapterArrays.length < 2) {
            mainMenuChapter += `,"[QUITTER]",1)`;
          } else if (chapterArrayIndex === chapterArrays.length - 1) {
            mainMenuChapter += `,"[PAGE INITIALE]",0,"[QUITTER]",1)`;
          } else {
            mainMenuChapter += `,"[PAGE SUIVANTE]",${(index++) + 1},"[QUITTER]",1)`;
          }
          
          code += `\n\nLbl ${chapterIndexes[chapterIndexes.length - 1]}`;
          code += `\nClrHome`;
          code += mainMenuChapter;
          code += codeChapter;

          isFirstChapter = false;
        });

        code += "\n\nLbl 1";
        code += "\nClrDraw";
        code += "\nClrHome";
        code += "\nAxesOn ";
        code += "\nReturn";

        const path = dialog.showSaveDialog({
          filters: [
            { name: 'Fichier texte', extensions: ['txt'] },
            { name: 'Tous les fichiers', extensions: ['*'] },
          ],
        });

        if (path != null) {
          if (path !== "") {
            fs.writeFileSync(path, code);
          }
        }
      },
      load: function () {
        utils.getCookie("state", (result) => {
          if (result) {
            this.state = parseInt(result.value, 10);
          }
        });
        utils.getCookie("currentCategory", (result) => {
          if (result) {
            this.currentCategory = parseInt(result.value, 10);
          }
        });
        utils.getCookie("savePath", (result) => {
          if (result) {
            this.savePath = result.value;
          }
        });
        utils.getCookie("course", (result) => {
          if (result) {
            this.course = JSON.parse(result.value);
          }
        });

        ipcRenderer.on("new", () => {
          this.new();
        });
        ipcRenderer.on("open", () => {
          this.new();
          this.open();
        });
        ipcRenderer.on("save", () => {
          this.save();
        });
        ipcRenderer.on("save-as", () => {
          this.saveAs();
        });
        ipcRenderer.on("export", () => {
          this.export();
        });
      },
    },
    mounted: function () {
      this.load();
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/app.scss";
</style>
