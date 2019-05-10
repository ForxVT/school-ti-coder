<template>
  <div class="base-view">
    <img id="base-view-background" src="@/assets/images/ti83.svg"/>
    <div id="base-view-content">
        <div id="base-view-header">
            <div id="base-view-header-border"></div>
            <div id="base-view-header-content">
                <slot name="header"></slot>
            </div>
        </div>
        <div id="base-view-main">
            <div id="base-view-main-border"></div>
            <div id="base-view-main-content">
                <slot></slot>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "base-view",
  };
</script>

<style lang="scss">
  @import "@/assets/styles/components/baseview.scss";
</style>
