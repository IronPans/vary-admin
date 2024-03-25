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
        v-show="visibility.inner"
      >
        <div :class="`${prefixCls}-body`">
          <h5>{{ title }}</h5>
          <div v-if="!!content">{{ content }}</div>
          <template v-else-if="$slots.default">
            <slot name="default"></slot>
          </template>
        </div>
        <div :class="`${prefixCls}-footer`">
          <div class="text-right">
            <va-button size="sm" @click="handleCancel">{{ cancelText }}</va-button>
            <va-button size="sm" theme="primary" @click="handleOk">{{
              okText
            }}</va-button>
          </div>
        </div>
        <!-- <va-template v-else :render="template"></va-template> -->
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted, onUnmounted } from "vue";
const prefixCls = "va-modal";

export default defineComponent({
  name: "VaConfirm",
  model: {
    prop: "visible",
    event: "change",
  },
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    hideBackdrop: {
      default: true,
    },
    modalValue: {
      default: false,
    },
    width: {
      type: [Number, String],
      default: 500,
    },
    height: {
      type: [Number, String],
      default: 0,
    },
    render: Function,
    okText: {
      type: String,
      default: "Confirm",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    onOk: Function,
    onCancel: Function,
    onClose: Function,
  },
  emits: ["update:modalValue", "on-close", "on-ok", "on-cancel"],
  setup(props, { emit }) {
    let modal = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
    let windowE = {
      width: 0,
      height: 0,
    };
    const visibility = ref({
      modal: props.modalValue || false,
      inner: false,
    });
    const visible = ref(props.modalValue || false);
    function close() {
      emit("update:modalValue", false);
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
      width = /%$/.test(props.width + "") ? wWidth * +props.width : getSize(props.width);
      height = /%$/.test(props.height + "")
        ? wHeight * +props.height
        : getSize(props.height);
      const left = (wWidth - width) / 2,
        top = 80;
      return {
        width,
        height,
        left,
        top,
      };
    }
    function getSize(val: number) {
      return typeof val !== "number" ? parseInt(val, 10) : val;
    }
    function handleOk() {
      props.onOk?.();
      visible.value = false;
      toggle(visible.value);
      emit("on-ok");
      props.onClose?.();
    }
    function handleCancel() {
      props.onCancel?.();
      visible.value = false;
      toggle(visible.value);
      emit("on-cancel");
      props.onClose?.();
    }
    function toggle(val: boolean) {
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
    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    onMounted(() => {
      if (visible.value) {
        toggle(visible.value);
      }
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onWindowResize);
    });

    watch(
      () => props.modalValue,
      (val: boolean) => {
        visible.value = val;
        toggle(val);
      }
    );

    return {
      prefixCls,
      visibility,
      //   template: this.render,
      //   display: this.visible,
      cancelText: props.cancelText,
      close,
      handleCancel,
      handleOk,
      classes: computed(() => {
        return [
          prefixCls,
          "va-confirm",
          {
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
  //   watch: {
  //     visible(val) {
  //       this.display = val;
  //     },
  //     display(val) {
  //       this.toggle(val);
  //     },
  //   },
});
</script>
