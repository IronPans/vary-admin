<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Default Tabs">
          <va-tabs :items="tabs">
            <template #item="{ item }">
              <span>{{ item.content }}</span>
            </template>
          </va-tabs>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Center Tabs">
          <va-tabs :centermode="true" :items="tabs2">
            <template #item="{ item }">
              <span>{{ item.content }}</span>
            </template>
          </va-tabs>
        </va-card>
      </va-col>
    </va-row>
    <va-row :gutter="16" class="m-t-20">
      <va-col :lg="3">
        <va-card header="Swiper Tabs">
          <va-tabs :scrollable="true" :items="tabs3">
            <template #item="{ item }">
              <span>{{ item.content }}</span>
            </template>
          </va-tabs>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
];
const tabs2 = [
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
];
const tabs3 = [
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
  {
    label: "Tab1",
    content: "tab1",
  },
  {
    label: "Tab2",
    content: "tab2",
  },
  {
    label: "Tab3",
    content: "tab3",
  },
];

</script>
