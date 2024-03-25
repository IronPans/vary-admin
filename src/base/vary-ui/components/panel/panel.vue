<template>
  <div :class="classes" v-show="!closed">
    <div :class="`${prefixCls}-header`" v-if="header || $slots.header">
      <h3 :class="`${prefixCls}-title`" v-if="header">{{ header }}</h3>
      <slot name="header"></slot>
      <div :class="`${prefixCls}-toolbar`" v-if="!$slots.toolbar && toolbar">
        <i class="va-icon" @click="handleMax">fullscreen</i>
        <i class="va-icon" @click="onExpand()">
          {{ expanded ? "remove" : "add" }}
        </i>
        <i class="va-icon" @click="closed = !closed">clear</i>
      </div>
      <div :class="`${prefixCls}-toolbar`" v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>
    <collapse-transition>
      <div :class="`${prefixCls}-body`" v-show="expanded">
        <div :class="`${prefixCls}-wrapper`">
          <slot></slot>
        </div>
        <div :class="`${prefixCls}-footer`" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { oneOf } from "../base/utils";
import CollapseTransition from "../transitions/collapse-transition.vue";
const prefixCls = "va-panel";

export default defineComponent({
  name: "va-panel",
  components: {
    CollapseTransition,
  },
  props: {
    header: {
      type: String,
    },
    toolbar: {
      type: Boolean,
    },
    theme: {
      validator(value) {
        return oneOf(value, [
          "default",
          "primary",
          "info",
          "success",
          "warning",
          "danger",
        ]);
      },
      default: "default",
    },
  },
  setup(props) {
    const expanded = ref(true);
    const maximized = ref(false);

    function onExpand() {
      expanded.value = !expanded.value;
    }

    function handleMax() {
      maximized.value = !maximized.value;
    }

    return {
      prefixCls,
      maximized,
      expanded,
      closed: false,
      handleMax,
      onExpand,
      classes: computed(() => {
        return [
          prefixCls,
          `${prefixCls}-${props.theme}`,
          {
            [`${prefixCls}-maximized`]: maximized.value,
          },
        ];
      }),
    };
  },
});
</script>
