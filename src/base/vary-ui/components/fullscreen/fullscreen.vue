<template>
  <div class="fullscreen-container" ref="container">
    <div
      class="fullscreen-wrapper"
      @transitionstart="transitionStart"
      @transitionend="transitionEnd"
      :style="{ transform: `translate3d(0, ${scrollY}px,0)` }"
    >
      <div
        :class="[
          'fullscreen-slide',
          {
            active: activeIndex === index,
          },
        ]"
        v-for="(item, index) in items"
        :style="{ height: `${height}px`, width: `${width}px` }"
      >
        <slot name="slide" :item="item" :index="index"></slot>
      </div>
    </div>
    <div class="fullscreen-pagination" v-if="pagination">
      <span
        :class="[
          'fullscreen-pagination-bullet',
          {
            'fullscreen-pagination-bullet-active': activeIndex === index,
          },
        ]"
        :title="bullet.name || ''"
        v-for="(bullet, index) in items"
        @click="handlePagination(index)"
      >
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "vaFullscreen",
  props: {
    items: {
      type: Array,
      default: [],
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    paginationClickable: {
      type: Boolean,
      default: true,
    },
    on: {
      type: Object,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const activeIndex = ref(0);
    const items = ref(props.items || []);
    let isScroll = false;
    const scrollY = ref(0);
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);

    function handlePagination(index: number) {
      scrollTo(index);
    }

    function scrollFunc(e: any) {
      e = e || window.event;
      if (!isScroll) {
        if (e.wheelDelta) {
          //判断浏览器IE，谷歌滑轮事件
          if (e.wheelDelta > 0) {
            //当滑轮向上滚动时
            scrollPrev();
          } else if (e.wheelDelta < 0) {
            //当滑轮向下滚动时
            scrollNext();
          }
        } else if (e.detail) {
          //Firefox滑轮事件
          if (e.detail > 0) {
            //当滑轮向上滚动时
            scrollPrev();
          } else if (e.detail < 0) {
            //当滑轮向下滚动时
            scrollNext();
          }
        }
      }
    }
    function scrollPrev() {
      if (activeIndex.value > 0) {
        isScroll = true;
        scrollY.value += height.value;
        activeIndex.value--;
        emit("update:modelValue", activeIndex.value);
      }
    }

    function scrollNext() {
      if (activeIndex.value < items.value.length - 1) {
        isScroll = true;
        scrollY.value -= height.value;
        activeIndex.value++;
        emit("update:modelValue", activeIndex.value);
      }
    }

    function scrollTo(index: number) {
      if (index < items.value.length) {
        isScroll = true;
        scrollY.value += height.value * (activeIndex.value - index);
        activeIndex.value = index;
        emit("update:modelValue", activeIndex.value);
      }
    }

    function transitionStart() {
      isScroll = true;
      if (props.on?.pageChangeStart) {
        props.on.pageChangeStart();
      }
    }
    function transitionEnd() {
      isScroll = false;
      if (props.on?.pageChangeEnd) {
        props.on.pageChangeEnd();
      }
    }

    watch(
      () => props.modelValue,
      (val: number) => {
        scrollTo(val);
      }
    );

    window.addEventListener("mousewheel", scrollFunc);
    window.addEventListener("resize", () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    });
    document.addEventListener("mousewheel", scrollFunc);
    if (props.on?.init) {
      props.on.init();
    }

    return {
      items,
      activeIndex,
      pagination: props.pagination,
      transitionStart,
      transitionEnd,
      handlePagination,
      scrollY,
      height,
      width,
    };
  },
});
</script>

<style scoped>
.fullscreen-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fullscreen-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -moz-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
}

.fullscreen-wrapper {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate(0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  transition: all cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.8s;
  -webkit-transition: all cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.8s;
}

.fullscreen-slide {
  position: relative;
  width: 100%;
  display: -moz-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  overflow: hidden;
}

.fullscreen-pagination {
  position: fixed;
  top: 50%;
  right: 20px;
  width: 50px;
  padding-left: 20px;
  transform: translate3d(0, -50%, 0);
  transition: 0.3s;
  z-index: 1000;
}

.fullscreen-pagination-bullet {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #bbbdbb;
  cursor: pointer;
  margin: 15px 0;
  display: block;
}

.fullscreen-pagination-bullet-active {
  opacity: 1;
  background: #fff;
  box-shadow: 0 0 5px 3px #999;
  -webkit-box-shadow: 0 0 5px 3px #999;
}
</style>
