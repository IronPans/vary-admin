<template>
  <div :class="prefixCls" :style="styles">
    <div :class="loaderClasses">
      <span
        v-for="(item, index) in getSpinElement()"
        :style="fetchSpinStyles(item)"
        :key="index.toString()"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { oneOf } from "../base/utils";

const prefixCls = "va-spin";

export default defineComponent({
  name: "VaSpin",
  props: {
    width: {
      type: [String, Number],
      default: 100,
    },
    height: {
      type: [String, Number],
      default: 100,
    },
    type: {
      validator(value) {
        return oneOf(value, [
          "circleRound",
          "circleLine",
          "circleRoundFade",
          "lineSquare",
          "lineRound",
          "lineBounce",
        ]);
      },
      default: "circleRound",
    },
    size: {
      validator(value) {
        return oneOf(value, ["lg", "sm", "xs"]);
      },
      default: "xs",
    },
    color: {
      type: String,
      default: "#303548",
    },
  },
  setup(props) {
    function getSize() {
      let { size, type } = props;
      let width = +props.width || 0;
      let height = +props.height || 0;
      switch (size) {
        case "xs":
          width *= 0.25;
          height *= 0.25;
          break;
        case "sm":
          width *= 0.5;
          height *= 0.5;
          break;
      }
      switch (type) {
        case "lineSquare":
        case "lineRound":
        case "lineBounce":
          height = width * 0.5;
          break;
      }
      return { width, height };
    }
    function getSpinElement() {
      const type = props.type;
      const spanSize = +getSize().width;
      const spans = [];
      let num = 8;
      let height;
      switch (type) {
        case "lineSquare":
        case "lineRound":
        case "lineBounce":
          num = 5;
          break;
      }
      if (type === "lineSquare" || type === "lineRound") {
        height = spanSize * 0.1;
      }
      for (let i = 0; i < num; i++) {
        spans.push({
          height: height + "px",
          background: props.color,
        });
      }
      return spans;
    }
    function fetchSpinStyles(item) {
      return { ...item };
    }
    return {
      prefixCls,
      getSpinElement,
      fetchSpinStyles,
      loaderClasses: computed(() => {
        return [`${prefixCls}-loader`, `${prefixCls}-${props.type}`];
      }),
      styles: computed(() => {
        const rect = getSize();
        return {
          width: rect.width + "px",
          height: rect.height + "px",
        };
      }),
    };
  },
});
</script>
