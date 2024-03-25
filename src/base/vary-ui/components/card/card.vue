<template>
  <div :class="prefixCls">
    <div v-if="props.header || $slots.header" :class="headerClasses">
      <slot name="header">{{ header }}</slot>
    </div>
    <div :class="mediaClasses" v-if="$slots.media">
      <slot name="media" />
    </div>
    <div :class="contentClasses">
      <slot name="content" />
      <slot />
    </div>
    <div :class="footerClasses" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
const prefixCls = "va-card";
const headerClasses = `${prefixCls}-header`;
const mediaClasses = `${prefixCls}-media`;
const contentClasses = `${prefixCls}-content`;
const footerClasses = `${prefixCls}-footer`;

const props = defineProps({
  header: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
