<template>
  <div :class="classes">
    <label v-if="label">
      <span>{{ label }}</span></label
    >
    <div :class="`${prefixCls}-wrapper`">
      <div v-if="$slots.startSlot" :class="`${prefixCls}-startSlot`">
        <slot name="startSlot" />
      </div>
      <div :class="`${prefixCls}-inner`">
        <span
          :class="['va-icon', `${prefixCls}-clear`, `${prefixCls}-icon`]"
          v-if="showClear"
          @click="handleClear"
        >
          <i class="va-icon">clear</i>
        </span>
        <i
          v-if="icon"
          :class="['va-icon', `${prefixCls}-icon-${dir}`, `${prefixCls}-icon`]"
          >{{ icon }}</i
        >
        <div :class="`${prefixCls}-label`">{{ placeholder }}</div>
        <input
          type="text"
          ref="input"
          :value="currentValue"
          :readonly="readonly"
          :disabled="disabled"
          :autofocus="autofocus"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
        />
        <hr v-if="!border" />
      </div>
      <div v-if="$slots.endSlot" :class="`${prefixCls}-endSlot`">
        <slot name="endSlot" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue";
import { oneOf } from "../base/utils";
const prefixCls = "va-input-mask";

export default defineComponent({
  name: "VaInputMask",
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    dir: {
      validator(value) {
        return oneOf(value, ["left", "right"]);
      },
      default: "left",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
    },
    clear: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    inline: {
      type: Boolean,
    },
    border: {
      type: Boolean,
    },
  },
  emits: ["on-focus", "on-blur", "on-change", "update:modelValue", "on-input-change"],
  setup(props, { emit }) {
    const focus = ref(false);
    const currentValue = ref("");
    function handleInput(event) {
      let value = event.target.value;
      emit("update:modelValue", value);
      setCurrentValue(value);
      emit("on-change", event);
    }
    function handleChange(event) {
      let value = event.target.value;
      emit("on-input-change", {
        value,
        originEvent: event,
      });
    }
    function setCurrentValue(val) {
      if (val === currentValue.value) {
        return;
      }
      currentValue.value = val;
    }
    function handleFocus(event) {
      focus.value = true;
      let value = event.target.value;
      emit("on-focus", {
        value,
        originEvent: event,
      });
    }
    function handleBlur(event) {
      focus.value = false;
      let value = event.target.value;
      emit("on-blur", {
        value,
        originEvent: event,
      });
    }
    function handleClear() {
      emit("update:modelValue", "");
      setCurrentValue("");
      emit("on-change");
    }

    watch(
      () => props.modelValue,
      (val) => {
        setCurrentValue(val);
      }
    );

    return {
      currentValue,
      prefixCls,
      showClear: false,
      handleBlur,
      handleClear,
      handleFocus,
      handleChange,
      handleInput,
      placeholder: props.placeholder,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-focus`]: focus.value,
            [`${prefixCls}-inline`]: props.inline,
            [`${prefixCls}-border`]: props.border,
            [`${prefixCls}-noEmpty`]: currentValue.value,
          },
        ];
      }),
    };
  },
});
</script>
