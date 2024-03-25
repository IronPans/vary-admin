<template>
  <div class="va-page-error">
    <va-card class="panel-box animated flipInX">
      <template #content>
        <div class="header text-center">
          <h4>Error <strong>500</strong></h4>
        </div>
        <div class="text-center">
          <h4 class="m-t-20 m-b-0">Whoops</h4>
          <p class="text-muted">Something's broken :-(</p>
        </div>
        <div class="form-group text-center">
          <va-button
            link-to="/vueadmin/home"
            class="va-unlock-btn text-uppercase"
            theme="primary"
            size="lg"
          >
            <va-icon icon="home"></va-icon>
            return to home
          </va-button>
        </div>
      </template>
    </va-card>
  </div>
</template>

<script setup lang="ts">
// export default {
//     name: "va-page500"
// }
</script>

<style scoped lang="less">
@import "./error.less";
</style>
