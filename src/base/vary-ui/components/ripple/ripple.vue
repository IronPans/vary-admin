<template>
  <div :class="classes" ref="node">
    <div
      v-for="(child, index) in children"
      :key="index.toString()"
      :class="prefixCls"
      :style="{ backgroundColor: color }"
      @animationend="handleAnimationEnd(child)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref } from "vue";
import { listen } from "../base/event";
import { getRect, addClass, css } from "../base/dom";

const prefixCls = "va-ripple";

export default defineComponent({
  name: "va-ripple",
  props: {
    centerMode: {
      type: Boolean,
    },
    color: {
      type: String,
    },
    hidden: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
    },
  },
  setup(props) {
    const isMobile = "ontouchstart" in document;
    const node = ref();
    let clickListener: any;
    const children = ref<string[]>([]);
    const now = new Date();
    let seed = 0;
    function getUuid() {
      return `Ripple-${now}_${seed++}`;
    }
    function getPoint(event) {
      event = event || window.event;
      return isMobile ? event.changedTouches[0] : event;
    }

    function ripple(event, element) {
      const touchEvent = getPoint(event);
      const { centerMode, size: sizeProps } = props;
      let x =
        touchEvent.pageX ||
        document.documentElement.scrollLeft +
          document.body.scrollLeft +
          touchEvent.clientX;
      let y =
        touchEvent.pageY ||
        document.documentElement.scrollTop + document.body.scrollTop + touchEvent.clientY;
      const parentNode = node.value.parentNode.parentNode;
      const { offsetWidth, offsetHeight } = parentNode;
      const scale = sizeProps === "sm" ? 2 : 1;
      let size = Math.max(offsetWidth, offsetHeight) * 2;
      const rect = getRect(parentNode);
      if (!centerMode) {
        x = x - rect.left - size / 2;
        y = y - rect.top - size / 2;
      } else {
        x = y = -size / 4;
      }
      if (sizeProps === "sm") {
        x = y = 0;
      }
      css(element, {
        width: size / scale + "px",
        height: size / scale + "px",
        top: y + "px",
        left: x + "px",
      });
      addClass(element, `${prefixCls}-Effect`);
    }

    function handleTouchStart(event) {
      const childs: string[] = [...children.value];
      childs.push(getUuid());
      children.value = childs;
      setTimeout(() => {
        const activeIndex = children.value.length - 1;
        const rippleChild = node.value.parentNode.querySelectorAll(`.${prefixCls}`);
        if (rippleChild[activeIndex]) {
          ripple(event, rippleChild[activeIndex]);
        }
      }, 0);
    }

    function handleAnimationEnd(key: string) {
        children.value = children.value.filter((child) => {
        return key !== child;
      });
    }

    onMounted(() => {
      const touchstart = isMobile ? "touchstart" : "mousedown";
      clickListener = listen(node.value.parentNode, touchstart, handleTouchStart);
    });
    onUnmounted(() => {
      if (clickListener) {
        clickListener();
        clickListener = null;
      }
    });

    return {
      prefixCls,
      children,
      node,
      color: props.color,
      handleAnimationEnd,
      classes: computed(() => {
        return [
          prefixCls + "-group",
          {
            [`${prefixCls}-hidden`]: props.hidden,
          },
        ];
      }),
    };
  },
});
</script>
