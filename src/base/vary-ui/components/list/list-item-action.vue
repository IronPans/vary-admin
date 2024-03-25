<template>
  <div :class="prefixCls">
    <slot />
  </div>
</template>

<script setup lang="ts">
const prefixCls = "va-list-item-action";

// export default {
//     name: 'va-list-item-action',
//     computed: {
//         classes() {
//             return prefixCls;
//         }
//     }
// }
</script>
