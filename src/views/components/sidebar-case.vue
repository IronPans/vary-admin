<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="12">
        <va-card>
          <va-button @click="openLeftSidebar">Left</va-button>
          <va-button @click="openRightSidebar">Right</va-button>
        </va-card>
      </va-col>
    </va-row>
    <va-sidebar v-model="leftReveal"> Left Sidebar </va-sidebar>
    <va-sidebar v-model="rightReveal" dir="right"> Right Sidebar </va-sidebar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftReveal = ref(false);

const rightReveal = ref(false);

function openLeftSidebar() {
  leftReveal.value = true;
}
function openRightSidebar() {
  rightReveal.value = true;
}

// const prefixCls = 'va-sidebar-case';

// export default {
//     name: 'va-sidebar-case',
//     data() {
//         return {
//             leftReveal: false,
//             rightReveal: false
//         }
//     },
//     methods: {
//         openLeftSidebar() {
//             this.leftReveal = true;
//         },
//         openRightSidebar() {
//             this.rightReveal = true;
//         }
//     }
// }
</script>
