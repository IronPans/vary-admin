<template>
  <div :class="classes" :style="progressStyle">
    <div :class="`${prefixCls}-bar`" :style="barStyle">
      <template v-if="showValue">{{ currentValue + "%" }}</template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { getSize } from "../base/utils";

const prefixCls = "va-progress";

export default defineComponent({
  name: "va-progress",
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    completeColor: {
      type: String,
      default: "#28a745",
    },
    animated: {
      type: Boolean,
      defualt: false,
    },
    showValue: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: "100%",
    },
    height: {
      type: [Number, String],
      default: "8px",
    },
    trackColor: {
      type: String,
    },
    barColor: {
      type: String,
    },
  },
  setup(props) {
    const currentValue = ref(formatValue(props.value) || 0);
    function formatValue(val) {
      const value = typeof val !== "number" ? parseInt(val, 10) : val;
      return Math.min(value, 100);
    }

    watch(() => props.value, (val) => {
      currentValue.value = formatValue(val)
    })
    return {
      currentValue,
      prefixCls,
      showValue: props.showValue,
      classes: computed(()=> {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-active`]: props.animated,
          [`${prefixCls}-striped`]: props.striped,
        },
      ];
    }),
    progressStyle: computed(()=> {
      return {
        width: getSize(props.width),
        height: getSize(props.height),
        backgroundColor: props.trackColor,
      };
    }),
    barStyle: computed(()=> {
      return {
        width: currentValue.value + "%",
        backgroundColor: currentValue.value >= 100 ? props.completeColor : props.barColor,
      };
    })
    };
  },
});
</script>
