<template>
  <div :class="`${prefixCls}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const prefixCls = "va-timeline-node";

export default defineComponent({
  name: "VaTimelineNode",
  setup() {
    return {
      prefixCls,
    };
  },
});
</script>
