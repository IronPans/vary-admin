<template>
  <transition :name="transitionName">
    <div :class="classes" v-if="true">
      <div :class="`${prefixCls}-inner`" v-html="message"></div>
      <i :class="`va-icon ${prefixCls}-close`" v-if="closable" @click="close">clear</i>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed } from "vue";
const prefixCls = "va-message-item";

export default defineComponent({
  name: "va-message-item",
  props: {
    delay: {
      type: Number,
      default: 2500,
    },
    message: {
      type: String,
    },
    className: {
      type: String,
    },
    closable: {
      default: false,
    },
    transitionName: {
      type: String,
      default: "scaleInTop",
    },
  },
  emits: ["on-close"],
  setup(props, { emit }) {
    let timer = null;
    function show() {
      if (timer) {
        return;
      }
      if (props.delay > 0) {
        timer = setTimeout(() => {
          close();
        }, props.delay);
      }
    }
    function close() {
      clearTimer();
      emit("on-close", props.key);
    }
    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    onMounted(() => {
      show();
    });

    onUnmounted(() => {
      clearTimer();
    });
    return {
      prefixCls,
      transitionName: props.transitionName,
      message: props.message,
      closable: props.closable,
      close,
      classes: computed(() => {
        return [prefixCls, props.className];
      }),
    };
  },
});
</script>
