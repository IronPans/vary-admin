<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Simple Alert">
          <va-alert>A Info Alert</va-alert>
          <va-alert class="m-t-10" type="success">A Success Alert</va-alert>
          <va-alert class="m-t-10" type="warning">A Warning Alert</va-alert>
          <va-alert class="m-t-10" type="error">A Error Alert</va-alert>
        </va-card>
        <va-card header="With Icon" class="m-t-20">
          <va-alert show-icon>A Info Alert</va-alert>
          <va-alert class="m-t-10" type="success" show-icon>A Success Alert</va-alert>
          <va-alert class="m-t-10" type="warning" show-icon>A Warning Alert</va-alert>
          <va-alert class="m-t-10" type="error" show-icon>A Error Alert</va-alert>
        </va-card>
        <va-card header="With Icon" class="m-t-20">
          <va-alert show-icon closable>A Info Alert</va-alert>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="With Description">
          <va-alert>
            A Info Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
          <va-alert class="m-t-10" type="success">
            A Success Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
          <va-alert class="m-t-10" type="warning">
            A Warning Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
          <va-alert class="m-t-10" type="error">
            A Error Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
        </va-card>
        <va-card header="With Icon and Description" class="m-t-20">
          <va-alert show-icon>
            A Info Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
          <va-alert class="m-t-10" type="success" show-icon>
            A Success Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
          <va-alert class="m-t-10" type="warning" show-icon>
            A Warning Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
          <va-alert class="m-t-10" type="error" show-icon>
            A Error Alert
            <template #desc
              >Alert Description.Alert Description.Alert Description.Alert
              Description.</template
            >
          </va-alert>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
// const prefixCls = 'va-alert-case';

// export default {
//     name: 'va-alert-case'
// }
</script>
