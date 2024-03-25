<template>
  <div :class="classes" v-clickoutside="onClickoutside" @mouseleave="handleMouseleave">
    <div :class="`${prefixCls}-header`" @click="toggle" @mouseover="handleMouseover">
      <slot />
    </div>
    <transition :name="hover ? 'moveInUp' : 'scaleInTop'">
      <div :class="menuClasses" ref="dropdown" v-show="expanded">
        <ul v-if="currentMenu && currentMenu.length > 0">
          <template v-for="(item, index) in currentMenu">
            <li
              v-if="!item.divider"
              :key="index"
              :class="`${prefixCls}-menu-item`"
              @click="itemClick(item)"
            >
              <i v-if="item.icon" class="va-icon">{{ item.icon }}</i>
              {{ item.title }}
            </li>
            <li v-if="item.divider" :class="`${prefixCls}-divider`"></li>
          </template>
        </ul>
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { oneOf } from "../base/utils";
import { addClass } from "../base/dom";
import clickoutside from "../../directives/clickoutside";

const prefixCls = "va-dropdown";

export default defineComponent({
  name: "va-dropdown",
  directives: { clickoutside },
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
    direction: {
      validator(value) {
        return oneOf(value, ["top-left", "bottom-right", "bottom-left", "top-right"]);
      },
      default: "bottom-left",
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const expanded = ref(false);
    function itemClick(item) {
      expanded.value = false;
      if (item.onClick) {
        item.onClick();
      }
    }
    function toggle() {
      if (!props.hover) {
        expanded.value = !expanded.value;
      }
    }
    function handleMouseover() {
      if (props.hover) {
        expanded.value = true;
      }
    }
    function handleMouseleave() {
      if (props.hover) {
        expanded.value = false;
      }
    }
    function close() {
      expanded.value = false;
    }
    function onClickoutside() {
      if (!props.hover) {
        close();
      }
    }
    return {
      currentMenu: props.menu,
      expanded,
      prefixCls,
      handleMouseleave,
      handleMouseover,
      itemClick,
      toggle,
      hover: props.hover,
      onClickoutside,
      classes: computed(() => {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-expanded`]: expanded.value,
            [`${prefixCls}-hover`]: props.hover,
          },
        ];
      }),
      menuClasses: computed(() => {
        return [`${prefixCls}-menu`, `${prefixCls}-${props.direction}`];
      }),
    };
  },
});
</script>
