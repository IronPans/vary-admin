<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="6">
        <va-card header="Default Collapse">
          <va-collapse :items="items">
            <!-- <va-collapse-item header="Item 1">
                            Item 1 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 2">
                            Item 2 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 3">
                            Item 3 content.
                        </va-collapse-item> -->
            <template #content="{ item, index, open }">
              {{ item.content }}
            </template>
          </va-collapse>
        </va-card>
      </va-col>
      <va-col :lg="6">
        <va-card header="Accordion">
          <va-collapse :accordion="true" :items="items">
            <!-- <va-collapse-item header="Item 1">
                            Item 1 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 2">
                            Item 2 content.
                        </va-collapse-item>
                        <va-collapse-item header="Item 3">
                            Item 3 content.
                        </va-collapse-item> -->
            <template #content="{ item, index, open }">
              {{ item.content }}
            </template>
          </va-collapse>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
// const prefixCls = 'va-collapse-case';

const items = [
  {
    content: "Item 1",
    header: "Item 1 content",
  },
  {
    content: "Item 2",
    header: "Item 2 content",
  },
  {
    content: "Item 3",
    header: "Item 3 content",
  },
];

// export default {
//     name: 'va-collapse-case'
// }
</script>
