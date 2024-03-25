<template>
  <div class="va-page-box">
    <va-row :gutter="16" class="m-t-20">
      <va-col :lg="4">
        <va-card header="Default Notification">
          <va-button class="m-5" @click="openNotification('show')">Default</va-button>
        </va-card>
      </va-col>
      <va-col :lg="8">
        <va-card header="With Icon Notification">
          <va-button class="m-5" @click="openNotification('info')">Info</va-button>
          <va-button class="m-5" @click="openNotification('success')">Success</va-button>
          <va-button class="m-5" @click="openNotification('warning')">Warning</va-button>
          <va-button class="m-5" @click="openNotification('error')">Error</va-button>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
function openNotification(type: string) {
  window.$notification[type]({
    title: "Welcome to Vary-Admin!",
    message:
      "I will never close automatically. I will be close automatically. I will never close automatically.",
    delay: 0,
  });
}
// const prefixCls = 'va-notification-case';

// export default {
//     name: 'va-notification-case',
//     methods: {
//         openNotification(type) {
//             this.$Notification[type]({
//                 title: 'Welcome to Vary-Admin!',
//                 message: 'I will never close automatically. I will be close automatically. I will never close automatically.',
//                 delay: 0
//             });
//         }
//     }
// }
</script>
