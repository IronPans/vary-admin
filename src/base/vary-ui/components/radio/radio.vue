<template>
  <label :class="classes" :for="id">
    <input
      type="radio"
      :id="id"
      :disabled="disabled"
      :check="shouldBeChecked"
      :name="name"
      @change="handleChange"
    />
    <div :class="`${prefixCls}-wrapper`">
      <svg :class="`${prefixCls}-noChecked`" focusable="false" viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        />
      </svg>
      <svg :class="`${prefixCls}-checked`" focusable="false" viewBox="0 0 24 24">
        <path
          d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        />
      </svg>
    </div>
    <div :class="`${prefixCls}-inner`">
      <slot />
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
const prefixCls = "va-radio";

export default defineComponent({
  name: "va-radio",
  props: {
    value: {
      type: [String, Number, Object],
    },
    disabled: {
      type: Boolean,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  emits: ["update:modelValue", "on-change"],
  setup(props, { emit }) {
    function handleChange(event) {
      if (props.disabled) {
        return false;
      }
      const { checked } = event.target;

      const value = checked ? props.trueValue : props.falseValue;

      emit("update:modelValue", checked);

      emit("on-change", {
        checked,
        value,
      });
    }
    return {
      id: props.id,
      prefixCls,
      value: props.value,
      name: props.name,
      disabled: props.disabled,
      handleChange,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-disabled`]: props.disabled,
          },
        ];
      }),
      shouldBeChecked: computed(() => {
        return props.value === props.trueValue;
      }),
    };
  },
});
</script>
