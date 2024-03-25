<template>
  <label :class="classes" :for="id">
    <input
      type="checkbox"
      :id="id"
      :disabled="disabled"
      :checked="checked"
      :true-value="trueValue"
      :false-value="falseValue"
      @change="handleInputChange"
    />
    <div :class="`${prefixCls}-wrapper`">
      <svg focusable="false" viewBox="0 0 24 24" :class="`${prefixCls}-noChecked`">
        <path
          d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        />
      </svg>
      <svg focusable="false" viewBox="0 0 24 24" :class="`${prefixCls}-checked`">
        <path
          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>
    </div>
    <div :class="`${prefixCls}-inner`">
      <slot />
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
const prefixCls = "va-checkbox";

export default defineComponent({
  name: "va-checkbox",
  props: {
    modelValue: {
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    id: {
      type: String,
    },
  },
  emits: ["update:modelValue", "on-change"],
  setup(props, { emit }) {
    const checked = ref(props.modelValue || props.checked || false);
    function handleInputChange(event: any) {
      const { checked } = event.target;
      const newValue = checked ? props.trueValue : props.falseValue;
      emit("update:modelValue", checked);
      emit("on-change", {
        newValue,
        value: newValue,
      });
    }

    return {
      id: props.id,
      disabled: props.disabled,
      checked,
      prefixCls,
      trueValue: props.trueValue,
      falseValue: props.falseValue,
      handleInputChange,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-disabled`]: props.disabled,
          },
        ];
      }),
    };
  },
});
</script>
