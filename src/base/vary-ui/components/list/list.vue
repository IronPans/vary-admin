<template>
  <ul :class="classes">
    <li
      v-for="menu in items"
      :class="[
        itemPrefixCls,
        menu.clz || '',
        menu.reveal ? `${itemPrefixCls}-reveal` : '',
      ]"
      @click="handleClick"
    >
      <div :class="`${itemPrefixCls}-content`">
        <slot name="item" :menu="menu" :item="menu" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";

const prefixCls = "va-list";

const itemPrefixCls = "va-list-item";

const props = defineProps({
  reveal: {
    default: false,
  },
  items: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["click"]);

const classes = computed(() => {
  return [
    prefixCls,
    itemPrefixCls,
    {
      [`${prefixCls}-reveal`]: props.reveal,
    },
  ];
});

function handleClick(event) {
  emit("click", event);
}

// export default {
//   name: "va-list",
//   props: {
//     reveal: {
//       default: false,
//     },
//   },
//   computed: {
//     classes() {
//       return [
//         prefixCls,
//         {
//           [`${prefixCls}-reveal`]: this.reveal,
//         },
//       ];
//     },
//   },
// };
</script>
