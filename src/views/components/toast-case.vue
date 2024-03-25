<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="4">
        <va-card header="Default Toast">
          <va-button class="m-5" @click="toast('show')">Default</va-button>
        </va-card>
      </va-col>
      <va-col :lg="8">
        <va-card header="With Icon Toast">
          <va-button class="m-5" @click="toast('info')">Info</va-button>
          <va-button class="m-5" @click="toast('success')">Success</va-button>
          <va-button class="m-5" @click="toast('warning')">Warning</va-button>
          <va-button class="m-5" @click="toast('error')">Error</va-button>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import useMessage from "@varyui/components/message/use-message";
const prefixCls = "va-toast-case";

const message = useMessage();
console.log(message);

function toast(type) {
  $toast[type]({
    message: "Welcome to Vary-Admin!",
  });
}
// export default {
//     name: 'va-toast-case',
//     methods: {
//         toast(type) {
//             this.$Toast[type]({
//                 message: 'Welcome to Vary-Admin!'
//             });
//         }
//     }
// }
</script>
