<template>
  <div :class="classes">
    <div :class="`${prefixCls}-start`" v-if="$slots.start">
      <slot name="start"></slot>
    </div>
    <div :class="`${prefixCls}-wrapper`" ref="slider">
      <div :class="`${prefixCls}-bar`"></div>
      <div :class="activeBarClasses" ref="track"></div>
      <div
        :class="`${prefixCls}-knob-handle`"
        @mousedown="onMousedown"
        @touchstart="onTouchStart"
        ref="thumb"
      >
        <div :class="knobClass"></div>
      </div>
    </div>
    <div :class="`${prefixCls}-end`" v-if="$slots.end">
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { getTouchEvent } from "../base/event";

const prefixCls = "va-slider";

export default defineComponent({
  name: "VaSlider",
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    vertical: {
      default: false,
    },
    disabled: {
      default: false,
    },
  },
  emits: ["input"],
  setup(props, { emit }) {
    let currentOffset = {};
    let startOffset = {};
    let touch = {};
    let isDragging = false;
    const isMobile = "ontouchstart" in document;
    const slider = ref(null);
    const thumb = ref(null);
    const track = ref(null);
    const currentValue = ref(0);
    function pageInit() {
      const { min, max } = props;
      const percent = (currentValue.value - min) / (max - min);
      const current = Math.floor(percent * slider?.value?.offsetWidth);
      currentOffset = {
        x: 0,
        y: slider?.value?.offsetHeight - thumb?.value?.offsetHeight,
      };
      if (!isNaN(current)) {
        setValue(current);
      }
    }

    function getPoint(event) {
      event = event || window.event;
      const touchEvent = touch.mobile ? event.changedTouches[0] : event;
      return {
        pageX: touchEvent.pageX,
        pageY: touchEvent.pageY,
      };
    }

    function setValue(value) {
      const { max, min, step, vertical } = props;
      const size = vertical
        ? slider?.value?.offsetHeight - thumb?.value?.offsetHeight / 2
        : slider?.value?.offsetWidth - thumb?.value?.offsetWidth / 2;
      let offset = vertical
        ? currentOffset.y + value * step
        : currentOffset.x + value * step;
      if (offset >= size) {
        offset = size;
      } else if (offset < 0) {
        offset = 0;
      }
      let percent = (offset / size) * 100;
      if (vertical) {
        thumb.value["style"].top = offset + "px";
        track.value["style"].top = percent + "%";
      } else {
        thumb.value["style"].left = offset + "px";
        track.value["style"].right = 100 - percent + "%";
      }
      currentOffset = {
        x: offset,
        y: offset,
      };
      currentValue.value = Math.ceil(((max - min) * percent) / 100) + min;
      emit("input", currentValue.value);
    }

    function getValue(event) {
      const point = getPoint(event);
      setValue(
        props.vertical ? point.pageY - startOffset.pageY : point.pageX - startOffset.pageX
      );
    }

    function touchstart(event) {
      if (event.button || props.disabled) {
        return;
      }
      const point = getPoint(event);
      startOffset = {
        pageX: point.pageX,
        pageY: point.pageY,
      };
      isDragging = true;
      document.addEventListener(touch.touchmove, onTouchMove);
      document.addEventListener(touch.touchend, onTouchEnd);
    }

    function onTouchStart(event) {
      if (isMobile) {
        touchstart(event);
      }
    }

    function onMousedown(event) {
      if (!isMobile) {
        touchstart(event);
      }
    }

    function onTouchMove(event) {
      if (isDragging) {
        const point = getPoint(event);
        getValue(event);
        startOffset = {
          pageX: point.pageX,
          pageY: point.pageY,
        };
      }
    }

    function onTouchEnd() {
      document.removeEventListener(touch.touchmove, onTouchMove);
      document.removeEventListener(touch.touchend, onTouchEnd);
      isDragging = false;
    }

    onMounted(() => {
      //   this.start = this.$slots.start;
      //   this.end = this.$slots.end;
      //   this.slider = this.$refs.slider;
      //   this.thumb = this.$refs.thumb;
      //   this.track = this.$refs.track;
      touch = getTouchEvent();
      pageInit();
    });

    return {
      prefixCls,
      onMousedown,
      onTouchStart,
      slider,
      thumb,
      track,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-vertical`]: props.vertical,
            [`${prefixCls}-disabled`]: props.disabled,
          },
        ];
      }),
      activeBarClasses: computed(() => {
        return [`${prefixCls}-bar`, `${prefixCls}-bar-active`];
      }),
      knobClass: computed(() => {
        return {
          [`${prefixCls}-knob`]: true,
          active: isDragging,
        };
      }),
    };
  },
});
</script>
