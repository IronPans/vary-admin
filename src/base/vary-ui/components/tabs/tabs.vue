<template>
  <div :class="classes">
    <div :class="navClass" ref="navRef">
      <div
        :class="`${prefixCls}-nav-wrapper`"
        ref="wrapperRef"
        :style="navStyle"
        @mousedown="handleMousedown"
        @touchstart="handleTouchstart"
      >
        <div
          :class="tabClasses(index)"
          v-for="(tab, index) in tabList"
          @click="tabClick(index)"
          :key="index.toString()"
        >
          {{ tab.label }}
        </div>
        <!-- <div :class="`${prefixCls}-indicator`" :style="lineStyle"></div> -->
      </div>
    </div>
    <div :class="contentClass">
      <div :class="`${prefixCls}-wrapper`" :style="wrapperStyle">
        <template v-for="(tab, index) in tabList">
          <div :class="itemPrefixCls">
            <slot name="item" :item="tab" :indxe="index"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, nextTick } from "vue";
import { oneOf } from "../base/utils";
import { setTransitionDuration } from "../base/dom";

const prefixCls = "va-tabs";
const itemPrefixCls = "va-tab-pane";

export default defineComponent({
  name: "va-tabs",
  props: {
    items: {
      type: Array,
      default: [],
    },
    activekey: {
      type: Number,
      default: 0,
    },
    animated: {
      type: Boolean,
      default: true,
    },
    centermode: {
      type: Boolean,
      default: false,
    },
    position: {
      validator(value) {
        return oneOf(value, ["top", "left", "bottom", "right"]);
      },
      default: "top",
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isMobile = "ontouchstart" in document;
    const activeIndex = ref(props.activekey || 0);
    let dragging = false;
    const wrapperRef = ref();
    const navRef = ref();
    const tabList = ref<any>(props.items || []);
    const lineOffset = ref(0);
    const lineSize = ref(0);
    const navOffsetX = ref(0);
    const navOffsetY = ref(0);
    let touches = {
      startX: 0,
      startY: 0,
      moveWidth: 0,
      moveHeight: 0,
    };

    function refresh() {
      //   const tabs = $children;
      //   tabs.forEach((tab, index) => {
      //     tabList.push({
      //       label: tab.label || "",
      //       index,
      //     });
      //   });
    }

    function getLineOffset() {
      const index = activeIndex.value || 0;
      let width = 0,
        height = 0,
        left = 0,
        top = 0;
      const navNode = navRef.value;
      if (navNode) {
        const tabs = navNode.querySelectorAll(".va-tabs-tab");
        for (let i = 0; i < tabs.length; i++) {
          if (i < index) {
            left += tabs[i].offsetWidth;
            top += tabs[i].offsetHeight;
          }
          if (i === index) {
            width = tabs[i].offsetWidth;
            height = tabs[i].offsetHeight;
          }
        }
      }
      return {
        width,
        left,
        height,
        top,
      };
    }
    // function updateIndicator() {
    //   nextTick(() => {
    //     const lineRect = getLineOffset();
    //     if (props.position === "left" || props.position === "right") {
    //       lineOffset.value = lineRect.top;
    //       lineSize.value = lineRect.height;
    //     } else {
    //       lineOffset.value = lineRect.left;
    //       lineSize.value = lineRect.width;
    //     }
    //   });
    // }
    function updateNav() {
      const { width, height, left, top } = getLineOffset();
      const wrapperNode = wrapperRef.value;
      const tabNode = navRef.value;
      if (props.centermode) {
        setTransitionDuration(wrapperNode, 300);
        if (props.position === "left" || props.position === "right") {
          const navHeight = tabNode.offsetHeight;
          let wrapperHeight = wrapperNode.offsetHeight;
          const offsetY = top + height / 2;
          let diffHeight = offsetY - navHeight / 2;
          if (diffHeight > 0) {
            if (wrapperHeight - top - height <= navHeight / 2) {
              diffHeight = wrapperHeight - navHeight;
            }
            wrapperHeight = wrapperNode.offsetHeight;
            navOffsetY.value = -diffHeight;
          }
        } else {
          const navWidth = tabNode.offsetWidth;
          let wrapperWidth = wrapperNode.offsetWidth;
          const offsetX = left + width / 2;
          let diffWidth = offsetX - navWidth / 2;
          if (diffWidth > 0) {
            if (wrapperWidth - left - width <= navWidth / 2) {
              diffWidth = wrapperWidth - navWidth;
            }
          } else {
            diffWidth = 0;
          }
          wrapperWidth = wrapperNode.offsetWidth;
          navOffsetX.value = -diffWidth;
        }
      }
    }
    function tabClasses(index: number) {
      return [
        `${prefixCls}-tab`,
        {
          [`${prefixCls}-tab-active`]: index === activeIndex.value,
        },
      ];
    }
    function tabClick(index: number) {
      activeIndex.value = index;
    }
    function getPoint(e: any) {
      const touchEvent = isMobile ? e.changedTouches[0] : e;
      return {
        x: touchEvent.pageX || touchEvent.clientX,
        y: touchEvent.pageY || touchEvent.clientY,
      };
    }
    function handleMousedown(event: any) {
      if (!isMobile) {
        swipeStart(event);
      }
    }
    function handleTouchstart(event: any) {
      if (isMobile) {
        swipeStart(event);
      }
    }
    function swipeStart(event: any) {
      const wrapperNode = wrapperRef.value;
      const tabNode = navRef.value;
      touches.moveWidth = wrapperNode.offsetWidth - tabNode.offsetWidth;
      touches.moveHeight = wrapperNode.offsetHeight - tabNode.offsetHeight;
      if (props.scrollable && touches.moveWidth > 0) {
        setTransitionDuration(wrapperNode, 0);
        event.stopPropagation();
        const { x, y } = getPoint(event);
        dragging = true;
        touches.startX = x;
        touches.startY = y;
        document.addEventListener(isMobile ? "touchmove" : "mousemove", swipeMove);
        document.addEventListener(isMobile ? "touchend" : "mouseup", swipeEnd);
      }
    }
    function swipeMove(event: any) {
      event.stopPropagation();
      if (dragging) {
        let { x, y } = getPoint(event);
        let diffX = x - touches.startX + navOffsetX.value;
        let diffY = y - touches.startY + navOffsetY.value;
        navOffsetX.value = Math.max(Math.min(0, diffX), -touches.moveWidth);
        navOffsetY.value = Math.max(Math.min(0, diffY), -touches.moveHeight);
        touches.startX = x;
        touches.startY = y;
      }
    }
    function swipeEnd(event: any) {
      event.stopPropagation();
      dragging = false;
      document.removeEventListener(isMobile ? "touchmove" : "mousemove", swipeMove);
      document.removeEventListener(isMobile ? "touchend" : "mouseup", swipeEnd);
    }

    onMounted(() => {
      refresh();
      //   updateIndicator();
      updateNav();
    });

    watch(
      () => props.activekey,
      (val) => {
        activeIndex.value = val;
      }
    );

    watch(activeIndex, () => {
      //   updateIndicator();
      updateNav();
    });

    return {
      activeIndex,
      prefixCls,
      wrapperRef,
      navRef,
      tabClasses,
      handleMousedown,
      tabClick,
      handleTouchstart,
      itemPrefixCls,
      tabList,
      classes: computed(() => {
        return `${prefixCls}`;
      }),
      navClass: computed(() => {
        return `${prefixCls}-nav`;
      }),
      contentClass: computed(() => {
        return `${prefixCls}-content`;
      }),
      lineStyle: computed(() => {
        let style = {
          width: `${lineSize}px`,
          left: "",
        };
        style.left = `${lineOffset.value}px`;
        return style;
      }),
      wrapperStyle: computed(() => {
        const percent = activeIndex.value;
        const horizontal = props.position === "left" || props.position === "right";
        return {
          transform: !horizontal
            ? `translate3d(-${percent}00%, 0, 0)`
            : `translate3d(0, -${percent}00%, 0)`,
          WebkitTransform: !horizontal
            ? `translate3d(-${percent}00%, 0, 0)`
            : `translate3d(0, -${percent}00%, 0)`,
          msTransform: !horizontal
            ? `translate3d(-${percent}00%, 0, 0)`
            : `translate3d(0, -${percent}00%, 0)`,
          WebkitTransition: props.animated
            ? "-webkit-transform .3s cubic-bezier(0.35, 0, 0.25, 1)"
            : "",
          transition: props.animated
            ? "transform .3s cubic-bezier(0.35, 0, 0.25, 1)"
            : "",
        };
      }),
      navStyle: computed(() => {
        return {
          transform: `translate3d(${navOffsetX.value}px, 0, 0)`,
        };
      }),
    };
  },
});
</script>
