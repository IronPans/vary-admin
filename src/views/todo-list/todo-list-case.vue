<template>
  <div class="va-page-box">
    <va-row>
      <va-col :lg="12">
        <va-card header="Todo List">
          <div class="va-todo-list-toolbar">
            <va-input
              v-model="value"
              :border="true"
              placeholder="What do you need to do today?"
            ></va-input>
            <va-button theme="primary" @click="addList">Add</va-button>
          </div>
          <va-todo-list :data="eventLists"></va-todo-list>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import VaTodoList from "@/base/components/todo-list";

const value = ref("");

const eventLists = reactive([
  {
    label: "Pick up kids from school",
  },
  {
    label: "Pick up kids from school",
    completed: true,
  },
  {
    label: "Pick up kids from school",
  },
]);

function addList() {
  eventLists.push({
    label: value.value
  });
  value.value = "";
}
// const prefixCls = 'va-todo-list-case';

// export default {
//     name: 'va-todo-list-case',
//     components: {
//         VaTodoList
//     },
//     data() {
//         return {
//             value: '',
//             eventLists: [
//                 {
//                     label: 'Pick up kids from school'
//                 },
//                 {
//                     label: 'Pick up kids from school',
//                     completed: true
//                 },
//                 {
//                     label: 'Pick up kids from school'
//                 }
//             ]
//         }
//     },
//     methods: {
//         addList() {
//             this.eventLists.push({
//                 label: this.value
//             });
//             this.value = '';
//         }
//     }
// }
</script>

<style lang="less">
.va-todo-list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  .va-input {
    flex: 1;
    margin-right: 10px;

    input {
      min-height: 36px;
    }
  }
}
</style>
