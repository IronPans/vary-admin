<template>
  <div :class="classes">
    <label :for="labelFor" v-if="label || $slots.label" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </label>
    <div :class="`${prefixCls}-wrapper`">
      <slot></slot>
      <transition name="vFadeIn">
        <div :class="`${prefixCls}-error-msg`" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, inject } from "vue";
import { validate } from "../base/validator";
import { getSize } from "../base/utils";
import { formInjectKey } from "./config";

const prefixCls = "va-form-item";

export default defineComponent({
  name: "VaFormItem",
  props: {
    labelWidth: {
      type: [Number, String],
    },
    label: {
      type: String,
    },
    labelFor: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  setup(props) {
    const errorMessage: any = ref("");
    const form: any = inject(formInjectKey);
    async function validForm(callback = (args) => {}) {
      errorMessage.value = "";
      const error = await validate(
        { [props.name + ""]: form.getValue(props.name) },
        { [props.name + ""]: form.getRules(props.name) }
      );
      return new Promise((resolve, reject) => {
        if (error) {
          errorMessage.value = error;
        } else {
          resolve(true);
        }
        callback(error);
      });
    }

    if (props.name) {
      form?.addField(validForm);
    }

    return {
      prefixCls,
      errorMessage,
      labelFor: props.labelFor,
      label: props.label,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-error`]: errorMessage,
          },
        ];
      }),
      labelStyle: computed(() => {
        return {
          width: getSize(props.labelWidth),
        };
      }),
    };
  },
});
</script>
