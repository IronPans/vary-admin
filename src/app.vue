<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

declare const window: any;

function addThemeLink() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.id = "admin-theme";
  link.href = `${window.NODE_ENV === "production" ? "/" : "/"}themes/white-dark.css`;
  document.head.appendChild(link);
}

onMounted(() => {
  addThemeLink();
});
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font: 13px Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande,
    sans-serif;
  line-height: 1.5;
  color: #303548;
  background: #f5f5f5;

  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6e6e6e;
    outline: 1px solid #333;
  }

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

@import "@/base/vary-ui/styles/base";
@import "@/base/vary-ui/styles/index";
@import "@/base/styles/widget/index";
</style>
