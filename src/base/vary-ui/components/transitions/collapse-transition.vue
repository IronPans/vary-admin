<template>
  <Transition
    @before-enter="transitionEvent.beforeEnter"
    @enter="transitionEvent.enter"
    @after-enter="transitionEvent.afterEnter"
    @before-leave="transitionEvent.beforeLeave"
    @leave="transitionEvent.leave"
    @after-leave="transitionEvent.afterLeave"
    name="collapse"
  >
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
const transitionEvent = {
  // 进入前
  beforeEnter(el) {
    el.style.height = 0;
    el.dataset.overflow = el.style.overflow;
  },
  // 进入中
  enter(el) {
    let height = 0;
    el.style.height = "1px";
    el.style.overflow = "auto";
    height = el.scrollHeight;
    el.style.overflow = "hidden";
    el.style.height = height + "px";
  },
  // 进入后
  afterEnter(el) {
    el.style.overflow = el.dataset.overflow;
  },
  // 离开前
  beforeLeave(el) {
    el.style.overflow = "hidden";
  },
  // 离开中
  leave(el) {
    el.style.height = "0px";
  },
  // 离开后
  afterLeave(el) {
    el.style.overflow = el.dataset.overflow;
  },
};
</script>
