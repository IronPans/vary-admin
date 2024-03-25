<template>
  <div
    ref="scrollElem"
    :class="classes"
    @mouseover="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="va-scroll-wrapper" :style="{ height }">
      <div class="va-scroll-inner">
        <slot></slot>
      </div>
    </div>
    <div
      class="va-scroll-scrollbar"
      ref="bar"
      @mouseover="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="va-scroll-track" ref="track"></div>
      <div class="va-scroll-thumb" ref="thumb"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted } from "vue";
import { css, addClass, setTransform } from "../base/dom";
import { listen, getTouchEvent } from "../base/event";
import { getRequestAnimationFrame, getBrowser } from "../base/utils";

const prefixCls = "va-scroll";

export default defineComponent({
  name: "VaScroll",
  props: {
    options: {
      type: Object,
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  emits: [],
  setup(props, { emit }) {
    const animationFrame = getRequestAnimationFrame();
    const isMoz = getBrowser() === "FF";
    let thumbTouchstartListener: any;
    let wheelListener: any;
    let queueHide: any;
    let documentTouchendListener: any;
    let documentTouchListener: any;
    let documentTouchmoveListener: any;
    let requestAnimationId: any;
    const WHEEL_EV = isMoz ? "DOMMouseScroll" : "mousewheel";
    const defaultOptions = {
      width: "auto",
      height: "250px",
      size: "7px",
      position: "right",
      alwaysVisible: false,
      wheelStep: 20,
      distance: "2px",
      thumbDraggable: true,
      touchScrollStep: 200,
      thumbBorderRadius: "2px",
      trackBorderRadius: "2px",
      thumbColor: "rgba(0, 0, 0, 0.29804)",
      trackColor: "#e0e0e0",
      showBar: true,
    };
    const params = Object.assign(defaultOptions, props.options);
    const TOUCH_EV = getTouchEvent();
    const isMobile = TOUCH_EV.mobile;
    const minBarHeight = 30;
    let isDragg = false;
    const isOverBar = ref(false);
    const scrollElem = ref();
    const bar = ref();
    const track = ref();
    const wrapper = ref();
    const thumb = ref();
    let initial = false;
    let barHeight = 0;
    let maxScrollTop = 0;
    let scrollTop = 0;
    let scrollHeight = 0;
    let isOverContent = false;
    let isLoading = false;
    let isRunning = false;

    function setBarStyle() {
      css(scrollElem.value, {
        overflow: "hidden",
        position: "relative",
        width: params.width,
        height: params.height,
      });
      css(bar.value, {
        position: "absolute",
        opacity: 0.01,
        width: params.size,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 101,
        transition: "all .2s",
      });
      css(track.value, {
        position: "absolute",
        width: params.size,
        top: 0,
        bottom: 0,
        MozBorderRadius: params.trackBorderRadius,
        WebkitBorderRadius: params.trackBorderRadius,
        borderRadius: params.trackBorderRadius,
        background: params["trackColor"],
      });
      if (params["trackClass"]) {
        addClass(track.value, params["trackClass"]);
      }
      const dist =
        params.position === "left"
          ? { left: params.distance }
          : { right: params.distance };
      css(bar.value, dist);
      css(wrapper.value, {
        position: "relative",
        zIndex: "10",
      });
      css(thumb.value, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        MozBorderRadius: params.thumbBorderRadius,
        WebkitBorderRadius: params.thumbBorderRadius,
        borderRadius: params.thumbBorderRadius,
        background: params["thumbColor"],
      });
      if (params["thumbClass"]) {
        addClass(thumb.value, params["thumbClass"]);
      }
    }

    function setUserSelect() {
      isOverBar.value = !isOverBar.value;
    }

    function scrollContent(y: number, isWheel: boolean, isTo: boolean) {
      let delta = y;
      if (maxScrollTop > 0) {
        if (isWheel) {
          delta = scrollTop + ((y * defaultOptions.wheelStep) / 100) * barHeight;
          delta = Math.min(Math.max(delta, 0), maxScrollTop);
          delta = y > 0 ? Math.ceil(delta) : Math.floor(delta);
          setTransform(thumb.value, "translate3d(0, " + delta + "px, 0");
          scrollTop = delta;
        }
        const percentScroll = scrollTop / (outerHeight - barHeight);
        delta = percentScroll * (scrollHeight - outerHeight);
        if (isTo) {
          delta = y;
          let offsetTop = (y / scrollHeight) * outerHeight;
          offsetTop = Math.min(Math.max(offsetTop, 0), maxScrollTop);
          setTransform(thumb.value, "translate3d(0, " + offsetTop + "px, 0");
        }
        setTransform(wrapper.value, "translate3d(0, -" + Math.ceil(delta) + "px, 0");
      }
      if (initial) {
        //                    onContentScroll.emit({
        //                        event: event,
        //                        scrollTop: scrollTop,
        //                        end: maxScrollTop <= scrollTop
        //                    });
      }
      showBar();
      hideBar();
    }

    function refresh() {
      if (requestAnimationId) {
        animationFrame.clearAnimationFrame(requestAnimationId);
      }
      if (scrollElem) {
        scrollHeight = scrollElem.value.scrollHeight;
        outerHeight = scrollElem.value.offsetHeight;
        barHeight = Math.max((outerHeight / scrollHeight) * outerHeight, minBarHeight);
        maxScrollTop = outerHeight - barHeight;
        thumb.value.style.height = barHeight + "px";
      }
      updatePosition();
      if (barHeight === outerHeight) {
        hideBar();
      }
    }

    function updatePosition() {
      let top = scrollTop || 0;
      top = Math.min(Math.max(top, 0), maxScrollTop);
      scrollTop = top;
      scrollTo(top, 0, true);
    }

    function scrollTo(y: number, x: number, isTo: boolean) {
      const percentScroll = y / (outerHeight - barHeight);
      const delta = percentScroll * (scrollHeight - outerHeight);
      setTransform(thumb.value, "translate3d(0, " + y + "px, 0");
      if (isTo) {
        setTransform(wrapper.value, "translate3d(0, -" + Math.ceil(delta) + "px, 0");
      }
    }

    function reset() {
      scrollTop = 0;
      setTransform(thumb.value, "translate3d(0, 0px, 0");
      setTransform(wrapper.value, "translate3d(0, " + scrollTop + "px, 0");
    }

    function onWheel(e: any) {
      let wheelDeltaY;
      if ("wheelDelta" in e) {
        // down -120，up 120
        wheelDeltaY = -e.wheelDelta / 120;
      } else if ("detail" in e) {
        // down 3，up -3
        wheelDeltaY = e.detail * 3;
      } else {
        return;
      }
      if (!isLoading) {
        isRunning = true;
        scrollContent(wheelDeltaY, true, false);
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
    }

    function showBar() {
      clearTimeout(queueHide);
      if (!params["alwaysVisible"] && maxScrollTop > 0) {
        css(bar.value, {
          opacity: 0.9,
        });
      }
    }

    function hideBar() {
      if (!params["alwaysVisible"] && maxScrollTop >= 0) {
        queueHide = setTimeout(() => {
          if (!isDragg) {
            css(bar.value, {
              opacity: 0.01,
            });
          }
        }, 500);
      }
    }

    function onMouseEnter() {
      showBar();
    }

    function onMouseLeave() {
      hideBar();
    }

    function onTouch(event: any) {
      refresh();
      isDragg = true;
      let ev = event || window["event"];
      if (isMobile) {
        ev = ev.changedTouches[0];
        showBar();
      }
      let target = "document";
      if (isOverContent) {
        target = scrollElem.value;
      }
      let pageY = ev.pageY;
      let pageX = ev.pageX;
      documentTouchmoveListener = listen(target, TOUCH_EV.touchmove, (e: any) => {
        let vm = e || window["event"];
        if (isMobile) {
          vm = vm.changedTouches[0];
        }
        if (isDragg) {
          if (isMobile) {
            const diff = (pageY - vm.pageY) / params.touchScrollStep;
            scrollContent(diff, true, false);
          } else {
            const t = scrollTop + vm.pageY - pageY;
            scrollTop = t;
            setTransform(thumb.value, "translate3d(0, " + t + "px, 0");
            scrollContent(0, false, false);
          }
          pageY = vm.pageY;
          pageX = vm.pageX;
        }
      });
      documentTouchendListener = listen("document", TOUCH_EV.touchend, () => {
        isDragg = false;
        setUserSelect();
        if (isMobile) {
          hideBar();
        }
        unbindDocumentTouchListener();
      });
    }

    function unbindDocumentTouchListener() {
      if (documentTouchmoveListener) {
        documentTouchmoveListener();
        documentTouchmoveListener = null;
      }
      if (documentTouchendListener) {
        documentTouchendListener();
        documentTouchendListener = null;
      }
    }

    onMounted(() => {
      wrapper.value = scrollElem.value.querySelector(".va-scroll-wrapper");
      setBarStyle();
      if (isMobile) {
        documentTouchListener = listen(scrollElem, TOUCH_EV.touchstart, (e: any) => {
          onTouch(e);
          isOverContent = true;
        });
      }
      wheelListener = listen(scrollElem, WHEEL_EV, (e: any) => onWheel(e));
      thumbTouchstartListener = listen(thumb.value, TOUCH_EV.touchstart, (e: any) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
        setUserSelect();
        onTouch(e);
        isOverContent = false;
      });
      refresh();
      let offset = scrollTop;
      if ("scrollTo" in params) {
        offset = parseInt(params["scrollTo"], 10);
      }
      css(bar.value, {
        opacity: 0.9,
      });
      scrollContent(offset, false, true);
      initial = true;
      if (!params["alwaysVisible"]) {
        hideBar();
      }
    });
    onUnmounted(() => {
      if (documentTouchListener) {
        documentTouchListener();
        documentTouchListener = null;
      }
      if (thumbTouchstartListener) {
        thumbTouchstartListener();
        thumbTouchstartListener = null;
      }
      if (requestAnimationId) {
        animationFrame.clearAnimationFrame(requestAnimationId);
      }
      if (wheelListener) {
        wheelListener();
        wheelListener = null;
      }
      unbindDocumentTouchListener();
      queueHide = null;
    });

    return {
      prefixCls,
      scrollTop: 0,
      scrollElem,
      isOverBar,
      onMouseEnter,
      onMouseLeave,
      thumb,
      track,
      bar,
      height: `${props.height}px`,
      classes: computed(() => {
        return [
          prefixCls,
          {
            "va-scroll-auto": isOverBar.value,
          },
        ];
        // return {
        //   userSelect: isOverBar.value ? "none" : "auto",
        //   cursor: isOverBar.value ? "default" : "auto",
        // };
      }),
    };
  },
});
</script>

<style scoped>
.va-scroll {
  user-select: auto;
  cursor: auto;

  .va-scroll-wrapper {
    overflow: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  &.va-scroll-auto {
    user-select: none;
    cursor: default;
  }
}
</style>
