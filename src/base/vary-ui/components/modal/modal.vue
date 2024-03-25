<template>
  <div :class="classes" v-if="visibility.modal">
    <transition name="vFadeIn">
      <div
        :class="`${prefixCls}-backdrop`"
        v-show="visibility.inner"
        @click="close"
      ></div>
    </transition>
    <transition name="vFadeInDown">
      <div
        :class="`${prefixCls}-container`"
        :style="modalStyle"
        ref="modal"
        v-show="visibility.inner"
      >
        <div v-if="header || $slots.header" :class="`${prefixCls}-header`">
          {{ header }}
          <slot name="header"></slot>
          <button :class="`${prefixCls}-close`" @click="close"><span /></button>
        </div>
        <div :class="`${prefixCls}-body`">
          <slot></slot>
        </div>
        <div :class="`${prefixCls}-footer`">
          <slot name="footer"></slot>
          <div class="text-right" v-if="!$slots.footer">
            <va-button size="sm" @click="onCancel">{{ cancelText }}</va-button>
            <va-button :disabled="confirmLoading" size="sm" theme="primary" @click="onOk">
              <va-spin
                :width="50"
                :height="50"
                color="#fff"
                v-if="confirmLoading"
              ></va-spin>
              {{ okText }}
            </va-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUnmounted, watch } from "vue";
const prefixCls = "va-modal";

export default defineComponent({
  name: "VaModal",
  model: {
    prop: "visible",
    event: "change",
  },
  props: {
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
    },
    hideBackdrop: {
      default: true,
    },
    modelValue: {
      default: false,
    },
    maxHeight: {
      type: [Number, String],
    },
    width: {
      type: [Number, String],
      default: 500,
    },
    height: {
      type: [Number, String],
      default: 0,
    },
    okText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
  },
  emits: ["update:modelValue", "on-close", "on-ok", "on-cancel"],
  setup(props, { emit }) {
    const windowE = {
      width: 0,
      height: 0,
    };
    let modal = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
    const visibility = ref({
      modal: props.modelValue || false,
      inner: false,
    });
    // const visible = ref(props.modelValue || false);
    function close() {
      emit("update:modelValue", false);
      emit("on-close", false);
    }
    function onWindowResize() {
      windowE.width = window.innerWidth;
      windowE.height = window.innerHeight;
    }
    function position() {
      let width = 0,
        height = 0;
      const wWidth = windowE.width,
        wHeight = windowE.height;
      width = /%$/.test(props.width + '') ? wWidth * +props.width : getSize(props.width);
      height = /%$/.test(props.height + '') ? wHeight * +props.height : getSize(props.height);
      const left = (wWidth - width) / 2,
        top = 80;
      return {
        width,
        height,
        left,
        top,
      };
    }
    function getSize(val: number | string) {
      return typeof val !== "number" ? parseInt(val, 10) : val;
    }
    function onOk() {
      emit("on-ok");
    }
    function onCancel() {
      emit("on-cancel");
    }
    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    onUnmounted(() => {
      window.removeEventListener("resize", onWindowResize);
    });

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          visibility.value.modal = true;

          setTimeout(() => {
            visibility.value.inner = true;
          }, 0);
        } else {
          visibility.value.inner = false;

          setTimeout(() => {
            visibility.value.modal = false;
          }, 250);
        }
      }
    );

    return {
      prefixCls,
      visibility,
      onCancel,
      onOk,
      close,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-max`]: props.maxHeight,
            [`${prefixCls}-open`]: visibility.value.modal,
          },
        ];
      }),
      modalStyle: computed(() => {
        modal = { ...position() };
        const { width, height, top, left } = modal;
        return {
          width: width + "px",
          height: height ? height + "px" : null,
          top: top + "px",
          left: left + "px",
        };
      }),
    };
  },
});
</script>

<style scoped></style>
