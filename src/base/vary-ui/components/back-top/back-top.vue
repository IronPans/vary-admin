<template>
  <div
    :class="prefixCls"
    :style="styles"
    v-show="visible"
    @click="handleClick"
    ref="nodeRef"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import EASINGS from "../base/easing";
import { getScrollParent } from "../base/dom";
import { listen } from "../base/event";
import { getSize } from "../base/utils";

const prefixCls = "va-back-top";

export default defineComponent({
  name: "va-back-top",
  props: {
    destination: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 200,
    },
    easing: {
      type: String,
      default: "linear",
    },
    target: {
      type: Object,
    },
    bottom: {
      type: [Number, String],
      default: 30,
    },
    right: {
      type: [Number, String],
      default: 30,
    },
    height: {
      type: Number,
      default: 10,
    },
  },
  emits: ["on-scroll-end"],
  setup(props, { emit }) {
    let startY = 0;
    let startTime = 0;
    let scrollNode = null;
    const nodeRef = ref();
    function scroll() {
      if (!scrollNode) {
        return;
      }
      const { destination, duration, easing } = props;
      let now = Date.now();
      let time = Math.min(1, (now - startTime) / duration);
      let timeFunction = EASINGS[easing](time);
      scrollNode.scrollTop = timeFunction * (destination - startY) + startY;
      if (scrollNode.scrollTop === destination) {
        emit("on-scroll-end");
        return;
      }
      window.requestAnimationFrame(scroll);
    }

    function handleClick() {
      startTime = Date.now();
      startY = scrollNode.scrollTop;
      scroll();
    }

    let scrollListener;

    const visible = ref(false);

    onMounted(() => {
      let scrollNode = props.target;
      if (!scrollNode) {
        scrollNode = getScrollParent(nodeRef.value);
      }
      scrollNode = scrollNode;
      scrollListener = listen(scrollNode, "scroll", (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop > parseFloat(props.height, 10)) {
          visible.value = true;
        } else if (scrollTop <= props.destination) {
          visible.value = false;
        }
      });
    });
    onUnmounted(() => {
      if (scrollListener) {
        scrollListener();
        scrollListener = null;
      }
    });

    return {
      prefixCls,
      handleClick,
      visible,
      nodeRef,
      styles: computed(() => {
        return {
          bottom: getSize(props.bottom),
          right: getSize(props.right),
        };
      }),
    };
  },
});
</script>
