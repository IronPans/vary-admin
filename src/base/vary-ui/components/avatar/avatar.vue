<template>
  <span :class="classes" :style="styles">
    <img v-if="src" :src="src" :alt="alt" />
    <va-icon v-if="icon" :icon="icon" />
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { oneOf, getSize } from "../base/utils";

export default defineComponent({
  props: {
    alt: {
      type: String,
    },
    icon: {
      type: String,
    },
    src: {
      type: String,
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    theme: {
      validator(value) {
        return oneOf(value, ["primary", "info", "success", "info", "error"]);
      },
    },
  },
  setup(props) {
    const prefixCls = "va-avatar";
    return {
      prefixCls,
      src: props.src,
      icon: props.icon,
      alt: props.alt,
      classes: computed(() => {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${props.theme}`]: props.theme,
          },
        ];
      }),
      styles: computed(() => {
        return {
          width: getSize(props.width),
          height: getSize(props.height),
        };
      }),
    };
  },
});
</script>

<style scoped></style>
