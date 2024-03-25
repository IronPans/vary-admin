<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { oneOf } from "../base/utils";
const prefixCls = "va-button-group";

export default defineComponent({
  name: "VaButtonGroup",
  props: {
    dir: {
      validator(value) {
        return oneOf(value, ["horizontal", "vertical"]);
      },
      default: "horizontal",
    },
  },
  setup(props) {
    return {
      classes: computed(() => {
        return [prefixCls, `${prefixCls}-${props.dir}`];
      }),
    };
  },
});
</script>
