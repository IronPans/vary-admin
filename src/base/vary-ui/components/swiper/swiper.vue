<template>
  <div :class="classes">
    <div
      :class="`${prefixCls}-wrapper`"
      ref="wrapper"
      :style="{ height: params.horizontal ? '100%' : params.height }"
    >
      <div
        :class="`${prefixCls}-list`"
        ref="slider"
        :style="listStyles"
        @transitionend="onTransitionEnd"
      >
        <template v-for="(item, index) in data">
          <div
            :class="[
              slidePrefixCls,
              {
                [`${slidePrefixCls}-active`]: index === currentIndex,
              },
            ]"
            :style="getSlideStyles(index)"
          >
            <slot name="item" :item="item" :index="index"></slot></div
        ></template>
      </div>
    </div>
    <div :class="`${prefixCls}-pagination`" v-if="params.pagination">
      <div :class="`${prefixCls}-pagination-bullets`">
        <div
          v-for="(item, index) in data"
          :class="bulletClasses(index)"
          @click="paginationClick(index)"
        ></div>
      </div>
    </div>
    <template v-if="params.navigation">
      <div :class="prevClasses" @click.stop="handleNavigation(false)"></div>
      <div :class="nextClasses" @click.stop="handleNavigation(true)"></div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, onUnmounted } from "vue";
import { listen } from "../base/event";
import { setTransitionDuration, parents } from "../base/dom";

const prefixCls = "va-swiper";
const slidePrefixCls = "va-swiper-slide";

const defaults = {
  activeIndex: 0,
  autoplay: false,
  autoplayDisableOnInteraction: false,
  centerMode: false,
  direction: "horizontal",
  easing: "ease",
  effect: "slide",
  initialSlide: 0,
  loop: false,
  observe: false,
  observeParents: false,
  pagination: true,
  paginationClickable: false,
  slideWidth: 0,
  slideHeight: 0,
  spaceBetween: 0,
  speed: 300,
  delay: 3000,
  touch: false,
};

export default defineComponent({
  name: "va-swiper",
  props: {
    data: {
      default: [],
    },
    options: {
      type: Object,
      default() {
        return defaults;
      },
    },
  },
  emits: ["on-transition-start", "on-transition-end", "on-slide-change"],
  setup(props, { emit }) {
    const data = ref(props.data || []);
    const params: any = { ...defaults, ...props.options };
    let isRunning = false;
    let total = data.value.length;
    const wrapper = ref();
    const slider = ref();
    let dragging = false;
    let touches: any = {};
    let opacity = 0;
    const isMobile = "ontouchstart" in document;
    const currentIndex = ref(0);
    let centerOffset = 0;
    let autoPlayTimer: any;
    const x = ref(0);
    const y = ref(0);
    let width = 0;
    let height = 0;
    let observers: any = [];
    let resizeListener: any;
    function isHorizontal() {
      return params.direction === "horizontal";
    }

    function getCurrentSlide(slide: number) {
      let index = slide;
      if (index < 0) {
        index = 0;
      } else {
        index = index % total;
      }
      return index;
    }

    function slideTo(index: number, speed = params.speed) {
      isRunning = true;
      const { effect, loop, spaceBetween } = params;
      if (!loop) {
        index = getCurrentSlide(index);
      }
      setTransitionDuration(slider.value, speed);
      let activeIndex = index;
      if (effect === "fade") {
        if (activeIndex < 0) {
          activeIndex = total - 1;
        } else if (activeIndex >= total) {
          activeIndex = 0;
        }
      }
      if (isHorizontal()) {
        x.value = -(width + spaceBetween) * activeIndex + centerOffset;
      } else {
        y.value = -(height + spaceBetween) * activeIndex;
      }
      currentIndex.value = activeIndex;
      opacity = 1;
      emit("on-transition-start", {
        index,
        // ev: this,
      });

      if (!speed) {
        isRunning = false;
      }
    }

    function slidePrev(disabled = true) {
      if (disabled) {
        return;
      }
      currentIndex.value--;
      slideTo(currentIndex.value);
    }

    function slideNext(disabled = true) {
      if (disabled) {
        return;
      }
      currentIndex.value++;
      slideTo(currentIndex.value);
    }

    function handleNavigation(next: boolean) {
      const { loop } = params;
      const toPrev = currentIndex.value <= 0 && !loop;
      const toNext = currentIndex.value >= total - 1 && !loop;
      let disabled = toPrev;
      if (next) {
        disabled = toNext;
      }
      if (disabled) {
        return;
      }
      if (next) {
        slideNext(disabled);
      } else {
        slidePrev(disabled);
      }
    }

    function getPoint(e: any) {
      const touchEvent = isMobile ? e.changedTouches[0] : e;
      return {
        x: touchEvent.pageX || touchEvent.clientX,
        y: touchEvent.pageY || touchEvent.clientY,
      };
    }

    function swipeStart(event: any) {
      if (params.touch && !isRunning) {
        event.stopPropagation();
        const { x, y } = getPoint(event);
        dragging = true;
        setTransitionDuration(slider.value, 0);
        if (params.autoplayDisableOnInteraction) {
          clearAutoplay();
        }
        touches.startX = x;
        touches.startY = y;
      }
    }

    function swipeMove(event: any) {
      event.stopPropagation();
      if (dragging && !isRunning) {
        let { x, y } = getPoint(event);
        const diffX = x - touches.startX;
        const diffY = y - touches.startY;
        const { effect, spaceBetween } = params;
        const activeIndex = currentIndex.value;
        if (effect === "slide") {
          const maxTranslate = isHorizontal() ? width / 2 : height / 2;
          const minTranslate = 20;
          const diff = isHorizontal() ? diffX : diffY;
          const position = (diff / width) * (maxTranslate - minTranslate);
          let translate = isHorizontal()
            ? -(width + spaceBetween) * activeIndex + position
            : -(height + spaceBetween) * activeIndex + position;
          const setPosition = (size: number) => {
            const collapseEnd = size * (total - 1) + maxTranslate;
            if (!params.loop) {
              if (translate > maxTranslate) {
                translate = maxTranslate;
              } else if (Math.abs(translate) > collapseEnd) {
                translate = -collapseEnd;
              }
            }
          };
          if (isHorizontal()) {
            setPosition(width);
            x = translate + centerOffset;
          } else {
            setPosition(height);
            y = translate;
          }
        } else {
          opacity = isHorizontal() ? Math.abs(diffX) / width : Math.abs(diffY) / height;
        }
        touches.diffX = diffX;
        touches.diffY = diffY;
        touches.currentX = x;
        touches.currentY = y;
      }
    }

    function swipeEnd(event: any) {
      event.stopPropagation();
      if (dragging && !isRunning) {
        const activeIndex = currentIndex.value;
        const { loop } = params;
        const { diffX, diffY } = touches;
        const diffWidth = width / 5;
        const diffHeight = height / 5;
        const getActiveIndex = (diff: number, dist: number) => {
          if (Math.abs(diff) > dist) {
            if (diff < 0 && (loop || activeIndex !== total - 1)) {
              currentIndex.value++;
            } else if (diff > 0 && (loop || activeIndex !== 0)) {
              currentIndex.value--;
            }
          }
        };
        if (isHorizontal()) {
          getActiveIndex(diffX, diffWidth);
        } else {
          getActiveIndex(diffY, diffHeight);
        }
        emit("on-slide-change", {
          index: activeIndex,
          //   ev: this,
        });
        if (params.effect === "fade") {
          if (activeIndex < 0) {
            currentIndex.value = total - 1;
          } else if (activeIndex >= total) {
            currentIndex.value = 0;
          }
        }
        slideTo(currentIndex.value);
      }
      dragging = false;
    }

    function bulletClasses(index: number) {
      return [
        `${prefixCls}-pagination-bullet`,
        {
          [`${prefixCls}-pagination-bullet-active`]: currentIndex.value === index,
          [`${prefixCls}-pagination-clickable`]: params.paginationClickable,
        },
      ];
    }

    function paginationClick(index: number) {
      if (!params.paginationClickable) {
        return;
      }
      if (params.autoplayDisableOnInteraction) {
        clearAutoplay();
      }
      slideTo(index);
    }

    function updateSize(size: any, slideSize: number) {
      if (size) {
        if (isNaN(Number(size))) {
          if (size.indexOf("%")) {
            slideSize *= size / 100;
          } else {
            slideSize = parseFloat(size);
          }
        } else {
          if (size < 1) {
            slideSize *= size;
          } else {
            slideSize = size;
          }
        }
      }
      return slideSize;
    }

    function reset(cb?: any) {
      if (!slider.value.firstElementChild) {
        return;
      }
      const h = slider.value.firstElementChild.offsetHeight;
      const slideWidth = params.slideWidth;
      const slideHeight = params.slideHeight;
      const w = wrapper.value.offsetWidth;
      if (params.centerMode) {
        centerOffset = Math.round((w * (1 - slideWidth)) / 2);
      }
      width = updateSize(slideWidth, w);
      height = updateSize(slideHeight, h);
      if (typeof cb === "function") {
        cb();
      }
    }

    function startAutoplay() {
      if (autoPlayTimer) {
        return false;
      }
      autoPlayTimer = setInterval(() => {
        setTransitionDuration(slider.value, params.speed);
        slideNext(false);
      }, params.delay);
    }

    function clearAutoplay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function onWindowResized() {
      reset(() => {
        slideTo(getCurrentSlide(currentIndex.value), 0);
      });
    }

    function onTransitionEnd() {
      if (currentIndex.value < 0) {
        currentIndex.value = total - 1;
      } else if (currentIndex.value >= total) {
        currentIndex.value = 0;
      }
      emit("on-transition-end", {
        index: currentIndex.value,
        // ev: this,
      });
      slideTo(currentIndex.value, 0);
      if (params.autoplay && !params.autoplayDisableOnInteraction) {
        startAutoplay();
      }
      isRunning = false;
    }

    function attach(target: any) {
      const MutationObserver =
        window["MutationObserver"] ||
        window["WebKitMutationObserver"] ||
        window["MozMutationObserver"];

      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          reset();
        });
      });

      // 配置观察选项:
      const config = { attributes: true, childList: true, characterData: true };

      // 传入目标节点和观察选项
      observer.observe(target, config);
      return observer;
    }

    function observer() {
      if (params.observe) {
        // 创建观察者对象
        observers.push(attach(wrapper.value.parentNode));
      }

      if (params.observeParents) {
        const containerParents = parents(wrapper);
        for (let i = 0; i < containerParents.length; i += 1) {
          observers.push(attach(containerParents[i]));
        }
      }
    }

    function getSlideStyles(index: number) {
      const { easing, effect, loop, spaceBetween, speed } = params;
      const horizontal = isHorizontal();
      const activeIndex = currentIndex.value;
      const isFade = effect === "fade";
      let opacity = 0;
      let left = horizontal ? index * width : 0,
        top = !horizontal ? index * height : 0;
      const { diffX, diffY } = touches,
        styles: any = {};
      if (!isFade) {
        if (loop && total > 2) {
          if (total <= activeIndex + 1 && index === 0) {
            horizontal ? (left = (width + spaceBetween) * total) : (top = height * total);
            styles["transform"] = `translate3d(${left}px, ${top}px, 0)`;
          } else if (activeIndex <= 0 && total === index + 1) {
            horizontal
              ? (left = -(width + spaceBetween) * total)
              : (top = -height * total);
            styles["transform"] = `translate3d(${left}px, ${top}px, 0)`;
          }
        }
        opacity = 1;
      } else {
        styles["transform"] = `translate3d(-${left}px, -${top}px, 0)`;
        if (dragging) {
          const diff = horizontal ? diffX : diffY;
          if (
            loop &&
            ((activeIndex <= 0 && diff > 0 && total === index + 1) ||
              (total >= activeIndex + 1 && diff < 0 && index === 0))
          ) {
            opacity = opacity;
          }
          if (
            diff > 0 &&
            activeIndex > 0 &&
            activeIndex < total &&
            activeIndex - 1 === index
          ) {
            opacity = opacity;
          }
          if (
            diff < 0 &&
            activeIndex >= 0 &&
            activeIndex < total - 1 &&
            activeIndex + 1 === index
          ) {
            opacity = opacity;
          }
        }
        if (index === activeIndex) {
          opacity = 1;
        }
      }
      if (isFade) {
        let duration = speed;
        if (dragging) {
          duration = 0;
        }
        styles["transition"] = "opacity " + duration + "ms " + easing;
        styles["WebkitTransition"] = "opacity " + duration + "ms " + easing;
      }
      if (!isFade && spaceBetween > 0) {
        styles["marginRight"] = spaceBetween;
      }
      if (width > 0) {
        styles["width"] = width;
      }
      styles["opacity"] = opacity;
      return styles;
    }

    onMounted(() => {
      reset(() => {
        slideTo(getCurrentSlide(params.initialSlide), 0);
      });
      //   $children.forEach((child, index) => {
      //     child.index = index;
      //     child.isActive = index === currentIndex;
      //     child.styles = getSlideStyles(index);
      //     bullets.push(index);
      //   });

      if (params.autoplay) {
        observer();
      }

      resizeListener = listen(window, "resize", onWindowResized);
    });
    onUnmounted(() => {
      clearAutoplay();
      if (observers.length) {
        for (const observer of observers) {
          observer.disconnect();
        }
      }
      resizeListener();
      resizeListener = null;
    });
    return {
      prefixCls,
      data,
      slidePrefixCls,
      slider,
      wrapper,
      swipeStart,
      swipeMove,
      swipeEnd,
      params,
      onTransitionEnd,
      bulletClasses,
      paginationClick,
      handleNavigation,
      getSlideStyles,
      currentIndex,
      classes: computed(() => {
        return [prefixCls, `${prefixCls}-${params.direction}`];
      }),
      listStyles: computed(() => {
        const { effect, speed, easing } = params;
        const horizontal = isHorizontal();
        const isFade = effect === "fade";
        return isFade
          ? {}
          : {
              transform: horizontal
                ? `translate3d(${x.value}px, 0, 0)`
                : `translate3d(0, ${y.value}px, 0)`,
              transition: "transform " + speed + "ms " + easing,
            };
      }),
      prevClasses: computed(() => {
        const { loop } = params;
        const toPrev = currentIndex.value <= 0 && !loop;
        return [
          `${prefixCls}-prev`,
          {
            [`${prefixCls}-disabled`]: toPrev,
          },
        ];
      }),
      nextClasses: computed(() => {
        const { loop } = params;
        const toNext = currentIndex.value >= total - 1 && !loop;
        return [
          `${prefixCls}-next`,
          {
            [`${prefixCls}-disabled`]: toNext,
          },
        ];
      }),
    };
  },
});
</script>
