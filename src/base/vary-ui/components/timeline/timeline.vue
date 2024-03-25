<template>
  <div :class="prefixCls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const prefixCls = "va-timeline";

export default defineComponent({
  name: "VaTimeline",
  setup() {
    return { prefixCls };
  },
});
</script>
