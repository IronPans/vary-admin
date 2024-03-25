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
        <template v-if="type !== 'textarea'">
          <div :class="`${prefixCls}-label`">{{ placeholder }}</div>
          <input
            :type="type"
            :id="id"
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
        </template>
        <textarea
          v-else
          ref="textarea"
          :id="id"
          :value="currentValue"
          :readonly="readonly"
          :disabled="disabled"
          :autofocus="autofocus"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
        ></textarea>
        <hr v-if="!border" />
      </div>
      <div v-if="$slots.endSlot" :class="`${prefixCls}-endSlot`">
        <slot name="endSlot" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { oneOf } from "../base/utils";

const prefixCls = "va-input";

export default defineComponent({
  name: "va-input",
  props: {
    id: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    animated: {
      type: Boolean,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    // 绑定v-model
    modelValue: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      validator(value) {
        return oneOf(value, ["on", "off"]);
      },
      default: "off",
    },
    placeholder: {
      type: String,
    },
    type: {
      validator(value) {
        return oneOf(value, ["text", "password", "textarea", "url", "email"]);
      },
      default: "text",
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
    block: {
      type: Boolean,
    },
  },
  emits: ["on-change", "on-input-change", "on-focus", "on-blur", "update:modelValue"],
  setup(props, { emit }) {
    const currentValue = ref(props.modelValue || "");
    const focus = ref(false);

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
      focus,
      handleClear,
      handleBlur,
      handleFocus,
      handleInput,
      handleChange,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-focus`]: focus.value,
            [`${prefixCls}-inline`]: props.inline,
            [`${prefixCls}-border`]: props.border,
            [`${prefixCls}-animated`]: props.animated,
            [`${prefixCls}-noEmpty`]: !!currentValue.value,
            [`${prefixCls}-block`]: props.block,
          },
        ];
      }),
    };
  },
});
</script>

<style scoped></style>
