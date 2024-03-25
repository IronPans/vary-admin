<template>
  <div :class="prefixCls" @click="onSelector">
    <span class="va-icon" @click="count(1)">keyboard_arrow_up</span>
    <span :class="`${prefixCls}-wrapper`">{{ getFormatValue(currentValue) }}</span>
    <span class="va-icon" @click="count(-1)">keyboard_arrow_down</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, inject } from "vue";
import { pickerInjectKey } from "./config";

const prefixCls = "va-time-selector";

export default defineComponent({
  name: "va-time-selector",
  props: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    type: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ["update:modelValue", "on-change"],
  setup(props, { emit }) {
    const currentValue = ref("");

    function count(add) {
      currentValue.value += add;
      if (currentValue.value < props.min) {
        currentValue.value = props.max;
      }
      if (currentValue.value > props.max) {
        currentValue.value = props.min;
      }
      emit("update:modelValue", currentValue.value);
      emit("on-change", {
        type: props.type,
        value: currentValue.value,
      });
    }

    const setValue = inject(pickerInjectKey);

    function setCurrentValue() {
      const date = new Date();
      const picker = {};
      switch (props.type) {
        case "h":
          picker.currentHour = currentValue.value = date.getHours();
          break;
        case "m":
          picker.currentMinute = currentValue.value = date.getMinutes();
          break;
        case "s":
          picker.currentSecond = currentValue.value = date.getSeconds();
      }
      setValue?.(picker);
    }

    function getFormatValue(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    }

    function onSelector(event) {
      event.stopPropagation();
    }

    watch(props.modelValue, (val) => {
      if (typeof val !== "undefined") {
        currentValue.value = val;
      } else {
        setCurrentValue?.();
      }
    });

    onMounted(() => {
      setCurrentValue?.();
    });

    return {
      prefixCls,
      currentValue,
      count,
      getFormatValue,
      onSelector,
    };
  },
});
</script>
