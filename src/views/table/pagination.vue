<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Pagination">
          <va-pagination
            :total="total"
            :row="row"
            @on-page-change="onPageChange"
          ></va-pagination>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
const total = 20;
const row = 5;
function onPageChange(event) {
  console.log(event);
}
</script>
