<template>
  <div :class="prefixCls" :style="styles">
    <div :class="`${prefixCls}-wrapper`">
      <svg :class="`${prefixCls}-circle`" viewBox="0 0 100 100">
        <path :class="`${prefixCls}-circle-trail`" :style="trailStyles" :d="pathString" />
        <path :class="`${prefixCls}-circle-path`" :style="pathStyles" :d="pathString" />
      </svg>
      <div :class="`${prefixCls}-inner`">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed  } from "vue";
import { oneOf, getSize } from "../base/utils";

const prefixCls = "va-knob";

export default {
  name: "vaKnob",
  props: {
    animated: {
      default: true,
    },
    gapDegree: {
      type: Number,
      default: 0,
    },
    gapPosition: {
      validator(value) {
        return oneOf(value, ["top", "right", "bottom", "left"]);
      },
      default: "top",
    },
    lineWidth: {
      type: Number,
      default: 6,
    },
    lineCap: {
      validator(value) {
        return oneOf(value, ["round", "square"]);
      },
      default: "round",
    },
    size: {
      type: Number,
      default: 80,
    },
    barColor: {
      type: String,
      default: "#5db2ff",
    },
    trackColor: {
      type: String,
      default: "#eee",
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    function getStrokeMessage(radius, gapPosition) {
      let beginPositionX = 0;
      let beginPositionY = -radius;
      let endPositionX = 0;
      let endPositionY = -2 * radius;
      switch (gapPosition) {
        case "left":
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;
        case "right":
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;
        case "bottom":
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;
        default:
      }
      const pathString =
        "M 50,50 m " +
        beginPositionX +
        "," +
        beginPositionY +
        "\n     a " +
        radius +
        "," +
        radius +
        " 0 1 1 " +
        endPositionX +
        "," +
        -endPositionY +
        "\n     a " +
        radius +
        "," +
        radius +
        " 0 1 1 " +
        -endPositionX +
        "," +
        endPositionY;
      return {
        pathString,
      };
    }
    return {
      prefixCls,
      styles: computed(() => {
        const size = getSize(props.size);
        return {
          width: size,
          height: size,
        };
      }),
      trailStyles: computed(() => {
        const { animated, lineWidth, value, gapDegree, trackColor } = props;
        const radius = 50 - lineWidth / 2;
        const len = Math.PI * 2 * radius;
        const dasharray = (value / 100) * len + "px " + len + "px";
        return {
          stroke: trackColor,
          strokeWidth: lineWidth,
          fillOpacity: 0,
          strokeDasharray: len - gapDegree + "px " + len + "px",
          strokeDashoffset: "-" + gapDegree / 2 + "px",
          transition:
            animated &&
            "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s",
        };
      }),
      pathStyles: computed(() => {
        const { animated, lineWidth, lineCap, value, gapDegree, barColor } = props;
        const radius = 50 - lineWidth / 2;
        const len = Math.PI * 2 * radius;
        return {
          stroke: barColor,
          strokeWidth: lineWidth,
          strokeLinecap: lineCap,
          fillOpacity: 0,
          strokeDasharray: (value / 100) * (len - gapDegree) + "px " + len + "px",
          strokeDashoffset: "-" + gapDegree / 2 + "px",
          transition:
            animated &&
            "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s",
        };
      }),
      pathString: computed(() => {
        const { lineWidth, gapPosition } = props;
        const radius = 50 - lineWidth / 2;
        const strokeMessage = getStrokeMessage(radius, gapPosition);
        return strokeMessage.pathString;
      }),
    };
  },
};
</script>
