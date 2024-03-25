<template>
  <div class="va-page-box">
    <va-card class="email-wrapper">
      <div>
        <va-row>
          <va-col :md="3" class="mail-sidebar">
            <div class="p-10 text-center">
              <va-button link-to="/email_compose" theme="primary">Compose</va-button>
            </div>
            <div class="menu-bar">
              <va-list :items="emails">
                <template #item="{ menu }">
                  <va-icon :icon="menu.icon"></va-icon>
                  <va-list-item-text> {{ menu.name }}</va-list-item-text>
                  <va-list-item-action v-if="menu.count > 0">
                    <va-badge
                      :count="menu.count"
                      :status="menu.status"
                      :fixed="menu.fixed"
                    ></va-badge>
                  </va-list-item-action>
                </template>
              </va-list>
              <!-- <va-list>
                <va-list-item class="active">
                  <va-icon icon="local_post_office"></va-icon>
                  <va-list-item-text> Inbox</va-list-item-text>
                  <va-list-item-action>
                    <va-badge :count="11" status="primary" :fixed="false"></va-badge>
                  </va-list-item-action>
                </va-list-item>
                <va-list-item>
                  <va-icon icon="star"></va-icon>
                  <va-list-item-text> Starred </va-list-item-text>
                </va-list-item>
                <va-list-item>
                  <va-icon icon=" assignment"></va-icon>
                  <va-list-item-text> Drafts </va-list-item-text>
                </va-list-item>
                <va-list-item>
                  <va-icon icon="send"></va-icon>
                  <va-list-item-text> Sent Mail </va-list-item-text>
                </va-list-item>
                <va-list-item>
                  <va-icon icon="delete"></va-icon>
                  <va-list-item-text> Trash </va-list-item-text>
                  <va-list-item-action>
                    <va-badge :count="11" status="info" :fixed="false"></va-badge>
                  </va-list-item-action>
                </va-list-item>
              </va-list> -->
              <div class="label-list">
                <h5>Labels</h5>
                <va-list :items="labels">
                  <template #item="{ menu }">
                    <va-list-item-text>
                      <va-badge
                        :dot="menu.dot"
                        :fixed="menu.fixed"
                        :status="menu.status"
                      ></va-badge>
                      {{ menu.name }}
                    </va-list-item-text>
                  </template>
                  <!-- <va-list-item>
                    <va-list-item-text>
                      <va-badge :dot="true" :fixed="false" status="primary"></va-badge>
                      Work
                    </va-list-item-text>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-text>
                      <va-badge :dot="true" :fixed="false" status="info"></va-badge>
                      Design
                    </va-list-item-text>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-text>
                      <va-badge :dot="true" :fixed="false" status="success"></va-badge>
                      Family
                    </va-list-item-text>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-text>
                      <va-badge :dot="true" :fixed="false" status="warning"></va-badge>
                      Friends
                    </va-list-item-text>
                  </va-list-item>
                  <va-list-item>
                    <va-list-item-text>
                      <va-badge :dot="true" :fixed="false" status="error"></va-badge>
                      Office
                    </va-list-item-text>
                  </va-list-item> -->
                </va-list>
              </div>
            </div>
          </va-col>
          <va-col :md="9" class="mail-body">
            <div class="mail-body-header">
              <va-button theme="primary" size="sm">
                <va-icon icon="error"></va-icon>
              </va-button>
              <va-button theme="info" size="sm">
                <va-icon icon="move_to_inbox"></va-icon>
              </va-button>
              <va-button theme="danger" size="sm">
                <va-icon icon="delete"></va-icon>
              </va-button>
              <va-button theme="success" shape="circle" size="sm">
                <va-icon icon="autorenew"></va-icon>
              </va-button>
            </div>
            <va-table
              :pagination="true"
              selection-mode="multiple"
              :hover="true"
              :columns="columns"
              :data="data"
            >
              <!-- <template #body="{ column, data }">
                <template v-if="column.field === 'progress'">
                  <va-icon
                    :class="data.progress.labelClass"
                    :icon="data.progress.icon"
                  ></va-icon>
                </template>
                <template v-else-if="column.field === 'amount'">
                  <va-button link-to="email_view">view</va-button>
                </template>
                <template v-else>{{ column.header }}</template>
              </template> -->
            </va-table>
          </va-col>
        </va-row>
      </div>
    </va-card>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import vaIcon from "../../base/vary-ui/components/icon";
import vaButton from "../../base/vary-ui/components/button";

const columns = [
  {
    field: "progress",
    header: "Progress",
    render(params) {
      const data = params.rowData.progress;
      return h(vaIcon, {
        class: data.labelClass,
        icon: data.icon,
      });
    },
  },
  {
    field: "name",
    header: "First name",
  },
  {
    field: "deadline",
    header: "Deadline",
  },
  {
    field: "amount",
    header: "Amount",
    render(params) {
      return h(
        vaButton,
        {
          "link-to": "email_view",
        },
        "view"
      );
    },
  },
];
const data = [
  {
    name: "John Doe",
    progress: {
      icon: "star",
      labelClass: "text-c-red",
    },
    amount: "$ 77.99",
    deadline: "13:02 PM",
  },
  {
    name: "Messsy Adam",
    progress: {
      icon: "star",
      labelClass: "text-c-green",
    },
    amount: "$245.30",
    deadline: "July 1, 2018",
  },
  {
    name: "John Richards",
    progress: {
      icon: "star",
      labelClass: "text-c-blue",
    },
    amount: "$138.00",
    deadline: "Apr 12, 2018",
  },
  {
    name: "John Doe",
    progress: {
      icon: "star",
      labelClass: "text-c-red",
    },
    amount: "$ 77.99",
    deadline: "13:02 PM",
  },
  {
    name: "Messsy Adam",
    progress: {
      icon: "star",
    },
    amount: "$245.30",
    deadline: "July 1, 2018",
    labelClass: "text-c-blue",
  },
  {
    name: "John Richards",
    progress: {
      icon: "star",
    },
    amount: "$138.00",
    deadline: "Apr 12, 2018",
    labelClass: "text-c-red",
  },
];

const emails = [
  {
    name: "Inbox",
    icon: "local_post_office",
    count: 10,
    clz: "active",
    fixed: false,
  },
  {
    name: "Starred",
    icon: "star",
    count: 0,
    clz: "",
    fixed: false,
  },
  {
    name: "Drafts",
    icon: "assignment",
    count: 0,
    clz: "",
    fixed: false,
  },
  {
    name: "Sent Mail",
    icon: "send",
    count: 0,
    clz: "",
    fixed: false,
  },
  {
    name: "Trash",
    icon: "delete",
    count: 11,
    clz: "",
    fixed: false,
  },
];

const labels = [
  {
    name: "Work",
    status: "primary",
    fixed: false,
    dot: true,
  },
  {
    name: "Design",
    status: "info",
    fixed: false,
    dot: true,
  },
  {
    name: "Friends",
    status: "success",
    fixed: false,
    dot: true,
  },
  {
    name: "Work",
    status: "warning",
    fixed: false,
    dot: true,
  },
  {
    name: "Office",
    status: "error",
    fixed: false,
    dot: true,
  },
];

// export default {
//   name: "va-email",
//   data() {
//     return {
//       columns: [
//         {
//           field: "progress",
//           header: "Progress",
//           render(h, params) {
//             const data = params.rowData.progress;
//             return h("va-icon", {
//               class: data.labelClass,
//               props: {
//                 icon: data.icon,
//               },
//             });
//           },
//         },
//         {
//           field: "name",
//           header: "First name",
//         },
//         {
//           field: "deadline",
//           header: "Deadline",
//         },
//         {
//           field: "amount",
//           header: "Amount",
//           render(h, params) {
//             return h(
//               "va-button",
//               {
//                 props: {
//                   "link-to": "email_view",
//                 },
//               },
//               "view"
//             );
//           },
//         },
//       ],
//       data: [
//         {
//           name: "John Doe",
//           progress: {
//             icon: "star",
//             labelClass: "text-c-red",
//           },
//           amount: "$ 77.99",
//           deadline: "13:02 PM",
//         },
//         {
//           name: "Messsy Adam",
//           progress: {
//             icon: "star",
//             labelClass: "text-c-green",
//           },
//           amount: "$245.30",
//           deadline: "July 1, 2018",
//         },
//         {
//           name: "John Richards",
//           progress: {
//             icon: "star",
//             labelClass: "text-c-blue",
//           },
//           amount: "$138.00",
//           deadline: "Apr 12, 2018",
//         },
//         {
//           name: "John Doe",
//           progress: {
//             icon: "star",
//             labelClass: "text-c-red",
//           },
//           amount: "$ 77.99",
//           deadline: "13:02 PM",
//         },
//         {
//           name: "Messsy Adam",
//           progress: {
//             icon: "star",
//           },
//           amount: "$245.30",
//           deadline: "July 1, 2018",
//           labelClass: "text-c-blue",
//         },
//         {
//           name: "John Richards",
//           progress: {
//             icon: "star",
//           },
//           amount: "$138.00",
//           deadline: "Apr 12, 2018",
//           labelClass: "text-c-red",
//         },
//       ],
//     };
//   },
// };
</script>

<style lang="less">
@import "./email.less";
</style>
