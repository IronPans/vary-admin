<template>
  <a :href="to" v-if="to" :class="classes" :target="target" @click="handleClick">
    <slot></slot>
  </a>
  <router-link v-else-if="linkTo" :class="classes" :to="linkTo" @click="handleClick">
    <slot></slot>
  </router-link>
  <button v-else :class="classes" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { oneOf } from "../base/utils";

const prefixCls = "va-button";

export default defineComponent({
  name: "VaButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
    },
    theme: {
      validator(value) {
        return oneOf(value, [
          "default",
          "primary",
          "info",
          "success",
          "warning",
          "danger",
        ]);
      },
      default: "default",
    },
    size: {
      validator(value) {
        return oneOf(value, ["lg", "sm"]);
      },
    },
    isActive: {
      default: false,
    },
    to: {
      type: String,
    },
    linkTo: {
      type: String,
    },
    block: {
      default: false,
    },
    shape: {
      validator(value) {
        return oneOf(value, ["circle"]);
      },
    },
    flat: {
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
    target: {
      type: String,
    },
    float: {
      validator(value) {
        return oneOf(value, ["top-left", "top-right", "bottom-left", "bottom-right"]);
      },
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    function handleClick(event) {
      emit("click", event);
    }

    return {
      handleClick,
      ...props,
      classes: computed(() => {
        const { float, theme, flat, size, block, isActive, disabled, shape } = props;
        return [
          prefixCls,
          `${prefixCls}-${theme}`,
          {
            [`${prefixCls}-block`]: block,
            [`${prefixCls}-${size}`]: size,
            "is-active": isActive,
            "is-disabled": disabled,
            "is-flat": flat,
            [`${prefixCls}-fab`]: shape === "circle",
            [`${prefixCls}-float`]: float,
            [`${prefixCls}-${float}`]: float,
            [`${prefixCls}-rounded`]: props.rounded,
          },
        ];
      }),
    };
  },
});
</script>
