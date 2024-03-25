<template>
  <div :class="classes">
    <div :class="`${prefixCls}-inner`" @mouseenter="handleShow" @mouseleave="handleClose">
      <slot></slot>
    </div>
    <transition name="vFadeIn">
      <div :class="`${prefixCls}-tip`" v-show="active">{{ content }}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { oneOf } from "../base/utils";

const prefixCls = "va-tooltip";

export default defineComponent({
  name: "VaTooltip",
  props: {
    content: {
      type: String,
    },
    dir: {
      validator(value) {
        return oneOf(value, [
          "top-left",
          "top",
          "top-right",
          "left-top",
          "left",
          "left-bottom",
          "right-top",
          "right",
          "right-bottom",
          "bottom-left",
          "bottom",
          "bottom-right",
        ]);
      },
      default: "bottom",
    },
  },
  setup(props) {
    const active = ref(false);
    function handleShow() {
      active.value = true;
    }
    function handleClose() {
      active.value = false;
    }
    return {
      prefixCls,
      active,
      handleShow,
      handleClose,
      classes: computed(() => {
        return [
          prefixCls,
          {
            active: active.value,
          },
          `${prefixCls}-${props.dir}`,
        ];
      }),
    };
  },
});
</script>
