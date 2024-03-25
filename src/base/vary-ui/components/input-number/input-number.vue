<template>
  <div :class="prefixCls">
    <button :class="minusStyleClass" @click="spin(-1)"></button>
    <input
      :id="id"
      type="text"
      v-model="currentValue"
      @keydown="handleKeyDown"
      @keypress="handleKeyPress"
      @change="handleChange"
    />
    <button :class="addStyleClass" @click="spin(1)"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref } from "vue";
const prefixCls = "va-input-number";

export default defineComponent({
  name: "va-input-number",
  props: {
    modalValue: {
      type: Number,
      default: 0,
    },
    disabled: {
      default: false,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
    id: {
      type: String,
    },
  },
  emits: ["update:modalValue", "on-change"],
  setup(props, { emit }) {
    const currentValue = ref(props.modalValue || 0);
    const step = props.step ? props.step.toString().split(".") : [];
    const count = step[1] ? step[1].length : 0;
    function setValue(add = 0, value) {
      const { min, max, step } = props;
      let newValue = value + add * step;
      if (newValue < min) {
        newValue = min;
      } else if (newValue > max) {
        newValue = max;
      }
      newValue = Number(newValue.toFixed(count));
      currentValue.value = newValue;
      return newValue;
    }

    function spin(add) {
      const value = setValue(add, currentValue.value);
      emit("on-change", value);
      emit("update:modalValue", value);
    }

    function handleKeyDown() {
      if (event.which === 38) {
        spin(1);
        event.preventDefault();
      } else if (event.which === 40) {
        spin(-1);
        event.preventDefault();
      }
    }

    function handleKeyPress(event) {
      const keyPattern = /[0-9\+\-]/;
      if (
        !keyPattern.test(String.fromCharCode(event.charCode)) &&
        event.keyCode !== 9 &&
        event.keyCode !== 8 &&
        event.keyCode !== 37 &&
        event.keyCode !== 39 &&
        event.keyCode !== 46
      ) {
        event.preventDefault();
      }
    }

    function handleChange(event) {
      const inputElem = event.target;
      currentValue.value = Number(inputElem.value);
      emit("on-change", currentValue.value);
      emit("update:modalValue", currentValue.value);
    }

    watch(props.modalValue, (val) => {
      setValue(0, val);
    });

    return {
      prefixCls,
      currentValue,
      count,
      spin,
      handleChange,
      handleKeyDown,
      handleKeyPress,
      minusStyleClass: computed(() => {
        return [
          `${prefixCls}-minus`,
          {
            "is-disabled": props.min <= currentValue.value,
          },
        ];
      }),
      addStyleClass: computed(() => {
        return [
          `${prefixCls}-add`,
          {
            "is-disabled": props.max >= currentValue.value,
          },
        ];
      }),
    };
  },
});
</script>
