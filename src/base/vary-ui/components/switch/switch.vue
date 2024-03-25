<template>
  <label :class="classes">
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="checked"
      @change="handleInputChange"
    />
    <div :class="`${prefixCls}-media`">
      <span :class="`${prefixCls}-label`"></span>
    </div>
    <div :class="`${prefixCls}-inner`">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
const prefixCls = "va-switch";

export default defineComponent({
  name: "va-switch",
  props: {
    modelValue: {
      default: false,
    },
    inputValue: {
      type: [String, Number, Boolean],
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
    type: {
      type: Number,
      default: 2,
    },
    label: {
      type: String,
    },
  },
  emits: ["update:modelValue", "on-change"],
  setup(props, { emit }) {
    const checked = ref(props.modelValue);
    function handleInputChange(event) {
      checked.value = event.target.checked;
      const newValue = checked.value ? props.trueValue : props.falseValue;
      emit("update:modelValue", newValue);

      emit("on-change", {
        checked,
        value: newValue,
      });
    }
    return {
      prefixCls,
      handleInputChange,
      checked,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-disabled`]: props.disabled,
            [`${prefixCls}-${props.type}`]: props.type,
          },
        ];
      }),
    };
  },
});
</script>
