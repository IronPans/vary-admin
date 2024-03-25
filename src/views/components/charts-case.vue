<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Line Button">
          <va-chart type="line" :data="filledLineData"></va-chart>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Bar Button">
          <va-chart type="bar" :data="barChartData"></va-chart>
        </va-card>
      </va-col>
    </va-row>
    <va-row :gutter="16" class="m-t-20">
      <va-col :lg="6">
        <va-card header="Pie Button">
          <va-chart type="pie" :data="pieData"></va-chart>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Doughnut Button">
          <va-chart type="doughnut" :data="doghnutData"></va-chart>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const prefixCls = "va-charts-case";
const primaryColor = "#1880c9";
const primaryAlphaDot5 = "rgba(24,128,201,0.5)";
const primaryAlpha = "rgba(24,128,201,0)";
const whiteColor = "#fff";
const whiteAlphaDot5 = "rgba(255,255,255,0.5)";
const whiteAlphaDot25 = "rgba(255,255,255,0.25)";
const whiteAlpha = "rgba(255,255,255,0)";

const lightColor = "#f1f1f1";

const darkColor = "#2a3f5a";

const secondaryColor = "#a5b5c5";
const secondaryAlphaDot5 = "rgba(165,181,197,0.5)";

const successColor = "#66bb6a";
const successAlphaDot5 = "rgba(102,187,106,0.5)";

const dangerColor = "#f65f6e";
const dangerAlphaDot5 = "rgba(246,95,110,0.5)";

const filledLineData = ref({
  labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
  datasets: [
    {
      label: "Visitors Graph",
      fill: true,
      backgroundColor: primaryColor,
      borderColor: primaryColor,
      borderCapStyle: "butt",
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "transparent",
      pointBackgroundColor: primaryColor,
      pointBorderWidth: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: primaryColor,
      pointHoverBorderColor: primaryColor,
      pointHoverBorderWidth: 0,
      pointRadius: 3,
      pointHitRadius: 10,
      data: [16, 12, 24, 12, 15, 12, 25, 24],
    },
  ],
});

const barChartData = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
  ],
  datasets: [
    {
      label: "Orders",
      backgroundColor: primaryColor,
      hoverBackgroundColor: primaryColor,
      hoverBorderColor: primaryAlphaDot5,
      hoverBorderWidth: 5,
      data: [24, 42, 18, 34, 56, 28, 24, 42, 18, 34],
    },
  ],
});

const pieData = ref({
  labels: ["Processed", "Pending", "Cancelled", "Completed"],
  datasets: [
    {
      data: [135, 300, 95, 225],
      backgroundColor: [primaryColor, secondaryColor, successColor, dangerColor],
      hoverBackgroundColor: [primaryColor, secondaryColor, successColor, dangerColor],
      borderWidth: 0,
      hoverBorderWidth: 6,
      hoverBorderColor: [
        primaryAlphaDot5,
        secondaryAlphaDot5,
        successAlphaDot5,
        dangerAlphaDot5,
      ],
    },
  ],
});

const doghnutData = ref({
  labels: ["Processed", "Pending", "Cancelled", "Completed"],
  datasets: [
    {
      data: [135, 300, 95, 225],
      backgroundColor: [primaryColor, secondaryColor, successColor, dangerColor],
      hoverBackgroundColor: [primaryColor, secondaryColor, successColor, dangerColor],
      borderWidth: 0,
      hoverBorderWidth: 6,
      hoverBorderColor: [
        primaryAlphaDot5,
        secondaryAlphaDot5,
        successAlphaDot5,
        dangerAlphaDot5,
      ],
    },
  ],
});

// export default {
//     name: 'va-charts-case',
//     data() {
//         return {
//             filledLineData: {
//                 labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
//                 datasets: [{
//                     label: "Visitors Graph",
//                     fill: true,
//                     backgroundColor: primaryColor,
//                     borderColor: primaryColor,
//                     borderCapStyle: 'butt',
//                     borderWidth: 2,
//                     borderDash: [],
//                     borderDashOffset: 0.0,
//                     borderJoinStyle: 'miter',
//                     pointBorderColor: "transparent",
//                     pointBackgroundColor: primaryColor,
//                     pointBorderWidth: 0,
//                     pointHoverRadius: 4,
//                     pointHoverBackgroundColor: primaryColor,
//                     pointHoverBorderColor: primaryColor,
//                     pointHoverBorderWidth: 0,
//                     pointRadius: 3,
//                     pointHitRadius: 10,
//                     data: [16, 12, 24, 12, 15, 12, 25, 24]
//                 }]
//             },
//             barChartData: {
//                 labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct"],
//                 datasets: [{
//                     label: "Orders",
//                     backgroundColor: primaryColor,
//                     hoverBackgroundColor: primaryColor,
//                     hoverBorderColor: primaryAlphaDot5,
//                     hoverBorderWidth: 5,
//                     data: [24, 42, 18, 34, 56, 28, 24, 42, 18, 34]
//                 }]
//             },
//             pieData: {
//                 labels: ["Processed", "Pending", "Cancelled","Completed"],
//                 datasets: [{
//                     data: [135, 300,95,225],
//                     backgroundColor: [primaryColor, secondaryColor,successColor,dangerColor],
//                     hoverBackgroundColor: [primaryColor, secondaryColor,successColor,dangerColor],
//                     borderWidth: 0,
//                     hoverBorderWidth: 6,
//                     hoverBorderColor: [primaryAlphaDot5, secondaryAlphaDot5,successAlphaDot5,dangerAlphaDot5]
//                 }]
//             },
//             doghnutData: {
//                 labels: ["Processed", "Pending", "Cancelled","Completed"],
//                 datasets: [{
//                     data: [135, 300,95,225],
//                     backgroundColor: [primaryColor, secondaryColor,successColor,dangerColor],
//                     hoverBackgroundColor: [primaryColor, secondaryColor,successColor,dangerColor],
//                     borderWidth: 0,
//                     hoverBorderWidth: 6,
//                     hoverBorderColor: [primaryAlphaDot5, secondaryAlphaDot5,successAlphaDot5,dangerAlphaDot5]
//                 }]
//             }
//         }
//     }
// }
</script>
