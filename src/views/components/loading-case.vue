<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Default Loading">
          <va-spin size="sm"></va-spin>
          <va-spin type="circleLine" size="sm"></va-spin>
          <va-spin type="circleRoundFade" size="sm"></va-spin>
          <va-spin type="lineSquare" size="sm"></va-spin>
          <va-spin type="lineBounce" size="sm"></va-spin>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Custom Theme">
          <va-spin size="sm" color="#007bff"></va-spin>
          <va-spin type="circleLine" size="sm" color="#34bfa3"></va-spin>
          <va-spin type="circleRoundFade" size="sm" color="#36a3f7"></va-spin>
          <va-spin type="lineSquare" size="sm" color="#ffc107"></va-spin>
          <va-spin type="lineBounce" size="sm" color="#f4516c"></va-spin>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
// const prefixCls = 'va-loading-case';

// export default {
//     name: 'va-loading-case'
// }
</script>

<style scoped>
.va-spin {
  margin: 10px;
}
</style>
