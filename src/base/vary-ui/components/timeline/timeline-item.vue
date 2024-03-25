<template>
  <div :class="classes">
    <div :class="`${prefixCls}-badge`" v-if="$slots.badge">
      <slot name="badge"></slot>
    </div>
    <div :class="`${prefixCls}-panel`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
const prefixCls = "va-timeline-item";

export default defineComponent({
  name: "VaTimelineItem",
  props: {
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      prefixCls,
      classes: computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}-inverted`]: props.inverted,
          },
        ];
      }),
    };
  },
});
</script>
