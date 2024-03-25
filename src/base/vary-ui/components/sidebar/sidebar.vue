<template>
  <div
    :class="[
      prefixCls,
      {
        [`${prefixCls}-open`]: reveal,
        [`${prefixCls}-drawer`]: drawer,
      },
      `${prefixCls}-${dir}-reveal`,
    ]"
  >
    <div :class="`${prefixCls}-overlay`" @click="close"></div>
    <transition :name="transitionName">
      <div :class="`${prefixCls}-inner`" v-if="reveal">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { oneOf } from "../base/utils";

const prefixCls = "va-sidebar";

export default defineComponent({
  props: {
    dir: {
      validator(value) {
        return oneOf(value, ["left", "right"]);
      },
      default: "left",
    },
    drawer: {
      default: true,
    },
    open: {
      default: false,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const reveal = ref(false);

    const transitionName = ref("");

    function close() {
      reveal.value = false;
      emit("change", reveal.value);
    }

    onMounted(() => {
      transitionName.value = `moveIn${
        props.dir.charAt(0).toUpperCase() + props.dir.slice(1)
      }`;
    });

    watch(
      () => props.open,
      (val) => {
        reveal.value = val;
      }
    );

    return {
      prefixCls,
      reveal,
      transitionName,
      close,
    };
  },
});
</script>
