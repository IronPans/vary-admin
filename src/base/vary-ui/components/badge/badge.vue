<template>
  <span :class="classes">
    <slot></slot>
    <span :class="supClasses">
      <template v-if="text">{{ text }}</template>
      <span v-if="!text" :class="`${prefixCls}-count-inner`">
        <template v-if="!dot && count !== 0">
          {{ currentCount }}
        </template>
      </span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, useSlots } from "vue";
import { oneOf } from "../base/utils";

const prefixCls = "va-badge";

export default defineComponent({
  name: "va-badge",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    dot: {
      default: false,
    },
    fixed: {
      default: true,
    },
    notify: {
      default: false,
    },
    max: {
      type: Number,
      default: 99,
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle"]);
      },
    },
    status: {
      validator(value) {
        return oneOf(value, ["error", "primary", "info", "success", "warning"]);
      },
      default: "error",
    },
    text: {
      type: [String],
    },
  },
  setup(props) {
    const slots = useSlots();
    return {
      prefixCls,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-sr-only`]: !slots.default,
            [`${prefixCls}-fixed`]: props.fixed,
          },
        ];
      }),
      supClasses: computed(() => {
        return [
          `${prefixCls}-count`,
          {
            [`${prefixCls}-dot`]: props.dot,
            [`${prefixCls}-notify`]: props.notify,
            [`${prefixCls}-circle`]: props.shape === "circle",
          },
          `${prefixCls}-${props.status}`,
        ];
      }),
      currentCount: computed(() => {
        return props.count > props.max ? props.max + "+" : props.count;
      }),
    };
  },
});
</script>
