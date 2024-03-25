<template>
  <div class="va-page-box">
    <va-row>
      <va-col :lg="12">
        <va-card header="Grid options">
          <va-table :border="true" :columns="columns" :data="data"></va-table>
        </va-card>
      </va-col>
    </va-row>
    <va-row class="m-t-20">
      <va-col :lg="12">
        <va-card header="Demo">
          <va-row :gutter="16">
            <va-col :lg="3">
              <div class="Grid-box">col-lg-3</div>
            </va-col>
            <va-col :lg="3">
              <div class="Grid-box">col-lg-3</div>
            </va-col>
            <va-col :lg="3">
              <div class="Grid-box">col-lg-3</div>
            </va-col>
            <va-col :lg="3">
              <div class="Grid-box">col-lg-3</div>
            </va-col>
          </va-row>
          <va-row class="m-t-5" :gutter="16">
            <va-col :lg="6">
              <div class="Grid-box">col-lg-6</div>
            </va-col>
            <va-col :lg="6">
              <div class="Grid-box">col-lg-6</div>
            </va-col>
          </va-row>
          <va-row :gutter="16" class="m-t-5">
            <va-col :lg="3" :xs="3">
              <div class="Grid-box">col-lg-3 col-xs-3</div>
            </va-col>
            <va-col :lg="6" :xs="6">
              <div class="Grid-box">col-lg-6 col-xs-6</div>
            </va-col>
            <va-col :lg="3" :xs="3">
              <div class="Grid-box">col-lg-3 col-xs-3</div>
            </va-col>
          </va-row>
          <va-row :gutter="16" class="m-t-5">
            <va-col :lg="3" :offset="3">
              <div class="Grid-box">col-lg-3 col-offset-3</div>
            </va-col>
            <va-col :lg="3" :offset="3">
              <div class="Grid-box">col-lg-3 col-offset-3</div>
            </va-col>
          </va-row>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const columns = ref([
  {
    field: "col",
    header: "",
  },
  {
    field: "xs",
    header: "Extra small",
  },
  {
    field: "sm",
    header: "Small",
  },
  {
    field: "md",
    header: "Medium",
  },
  {
    field: "lg",
    header: "Large",
  },
]);
const data = ref([
  {
    col: "Class prefix",
    xs: ".col-xs",
    sm: ".col-sm",
    md: ".col-md",
    lg: ".col-lg",
  },
  {
    col: "Max container width",
    xs: "None",
    sm: "750px",
    md: "970px",
    lg: "1170px",
  },
  {
    col: "# of columns",
    xs: {
      colspan: 4,
      value: 12,
    },
  },
  {
    col: "Nestable",
    xs: {
      colspan: 4,
      value: "Yes",
    },
  },
  {
    col: "Offset",
    xs: {
      colspan: 4,
      value: "Yes",
    },
  },
]);
// const prefixCls = "va-grid-case";

// export default {
//   name: "va-grid-case",
//   data() {
//     return {
//       columns: [
//         {
//           field: "col",
//           header: "",
//         },
//         {
//           field: "xs",
//           header: "Extra small",
//         },
//         {
//           field: "sm",
//           header: "Small",
//         },
//         {
//           field: "md",
//           header: "Medium",
//         },
//         {
//           field: "lg",
//           header: "Large",
//         },
//       ],
//       data: [
//         {
//           col: "Class prefix",
//           xs: ".col-xs",
//           sm: ".col-sm",
//           md: ".col-md",
//           lg: ".col-lg",
//         },
//         {
//           col: "Max container width",
//           xs: "None",
//           sm: "750px",
//           md: "970px",
//           lg: "1170px",
//         },
//         {
//           col: "# of columns",
//           xs: {
//             colspan: 4,
//             value: 12,
//           },
//         },
//         {
//           col: "Nestable",
//           xs: {
//             colspan: 4,
//             value: "Yes",
//           },
//         },
//         {
//           col: "Offset",
//           xs: {
//             colspan: 4,
//             value: "Yes",
//           },
//         },
//       ],
//     };
//   },
// };
</script>

<style scoped lang="less">
[class*="col"] {
  .Grid-box {
    background: #1e86d8;
    color: #fff;
    padding: 8px 0;
    text-align: center;
  }

  &:nth-child(2n + 1) {
    .Grid-box {
      background: #2196f3;
    }
  }
}
</style>
