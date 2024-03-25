<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="4">
        <va-panel header="Default Panel">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
      <va-col :lg="4">
        <va-panel header="Success" :toolbar="true" theme="success">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
      <va-col :lg="4">
        <va-panel header="Info" :toolbar="true" theme="info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
    </va-row>
    <va-row :gutter="16" class="m-t-20">
      <va-col :lg="4">
        <va-panel header="Warning" theme="warning">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
      <va-col :lg="4">
        <va-panel header="Danger" :toolbar="true" theme="danger">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
      <va-col :lg="4">
        <va-panel header="Primary" :toolbar="true" theme="primary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
    </va-row>
    <va-row :gutter="16" class="m-t-20">
      <va-col :lg="4">
        <va-panel header="With switcher">
          <div slot="toolbar">
            <va-switch></va-switch>
          </div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
      <va-col :lg="4">
        <va-panel header="With progress bar">
          <va-progress
            slot="toolbar"
            :value="50"
            width="120px"
            :animated="true"
            :striped="true"
          ></va-progress>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </va-panel>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
// const prefixCls = 'va-panel-case';

// export default {
//     name: 'va-panel-case'
// }
</script>
