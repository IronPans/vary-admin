<template>
  <div :class="prefixCls">
    <ul>
      <li v-for="(list, i) in lists" :key="i.toString()" :class="listClasses(list)">
        <va-checkbox v-model="list.completed">{{ list.label }}</va-checkbox>
        <va-icon icon="clear" class="remove" @click.native="handleDelete(i)"></va-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  data: {
    type: Array,
    default() {
      return [];
    },
  },
});
const emit = defineEmits(["on-delete"]);

const lists = ref(props.data || []);

function listClasses(list: any) {
  return [
    {
      completed: list.completed,
    },
  ];
}
function handleDelete(i: number) {
  const del = lists.value.splice(i, 1);
  emit("on-delete", del);
}

const prefixCls = "va-todo-list";

// export default {
//   name: "VaTodoList",
//   props: {
//     data: {
//       type: Array,
//       default() {
//         return [];
//       },
//     },
//   },
//   data() {
//     return {
//       prefixCls,
//       lists: [...this.data],
//     };
//   },
//   methods: {
//     listClasses(list) {
//       return [
//         {
//           completed: list.completed,
//         },
//       ];
//     },
//     handleDelete(i) {
//       const del = this.lists.splice(i, 1);
//       this.$emit("on-delete", del);
//     },
//   },
//   watch: {
//     data(val) {
//       this.lists = [...val];
//     },
//   },
// };
</script>

<style scoped lang="less">
@import "todo-list";
</style>
