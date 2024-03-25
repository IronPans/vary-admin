<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
const prefixCls = "va-swiper-slide";

export default {
  name: "va-swiper-slide",
  data() {
    return {
      index: 0,
      isActive: false,
      styles: {},
    };
  },
  computed: {
    classes() {
      return [
        prefixCls,
        {
          [`${prefixCls}-slide-active`]: this.isActive,
        },
      ];
    },
  },
};
</script>

<style scoped></style>
