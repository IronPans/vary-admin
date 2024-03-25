<template>
  <div :class="prefixCls"><slot /></div>
</template>

<script setup lang="ts">
const prefixCls = "va-list-item-text";

// export default {
//     name: 'va-list-item-text',
//     computed: {
//         classes() {
//             return prefixCls;
//         }
//     }
// }
</script>
