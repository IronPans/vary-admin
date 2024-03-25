<template>
  <div :class="classes" :style="itemStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, inject, defineComponent } from "vue";
import { gridInjectionKey } from "./config";

export default defineComponent({
  props: {
    lg: {
      type: Number,
    },
    md: {
      type: Number,
    },
    offset: {
      type: Number,
    },
    order: {
      type: Number,
    },
    sm: {
      type: Number,
    },
    span: {
      type: Number,
    },
    xs: {
      type: Number,
    },
  },
  setup(props) {
    const { itemStyleRef } = inject(gridInjectionKey);
    const classes = computed(() => {
      let colClass = [];
      const sizes = ["lg", "md", "sm", "xs"];
      const { offset, order, span = 0 } = props;
      for (const col of sizes) {
        let sizeProps = {};
        const colProps = props[col];
        if (!colProps) {
          continue;
        }
        if (typeof colProps === "number") {
          sizeProps.span = colProps;
        } else if (typeof colProps === "object") {
          sizeProps = colProps || {};
        }
        colClass.push({
          [`col-${col}-${sizeProps.span}`]: sizeProps.span >= 0,
          [`col-${col}-offset-${sizeProps.offset}`]: sizeProps.offset,
          [`col-order-${sizeProps.order}`]: sizeProps.order,
        });
      }
      return [
        {
          [`col-${span}`]: span >= 0,
          [`col-offset-${offset}`]: !!offset,
          [`col-order-${order}`]: !!order,
        },
        ...colClass,
      ];
    });

    return {
      itemStyle: itemStyleRef,
      classes,
    };
  },
});
</script>

<style scoped></style>
