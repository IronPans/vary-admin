<template>
  <div class="va-page-box">
    <va-row :gutter="16">
      <va-col :lg="4">
        <va-card header="Text only">
          <va-list>
            <va-list-item v-for="(list, j) in lists" :key="j.toString()">
              <va-list-item-text>
                {{ list.name }}
              </va-list-item-text>
            </va-list-item>
          </va-list>
        </va-card>
      </va-col>
      <va-col :lg="4">
        <va-card header="Icon with text">
          <va-list>
            <va-list-item v-for="(list, j) in lists" :key="j.toString()">
              <va-icon :icon="list.icon"></va-icon>
              <va-list-item-text>
                {{ list.name }}
              </va-list-item-text>
            </va-list-item>
          </va-list>
        </va-card>
      </va-col>
      <va-col :lg="4">
        <va-card header="Avatar with text">
          <va-list>
            <va-list-item v-for="(list, j) in lists" :key="j.toString()">
              <va-avatar :src="list.avatar"></va-avatar>
              <va-list-item-text>
                {{ list.name }}
              </va-list-item-text>
            </va-list-item>
          </va-list>
        </va-card>
      </va-col>
      <va-col :lg="4">
        <va-card header="Avatar with text">
          <va-list>
            <va-list-item v-for="(list, j) in lists" :key="j.toString()">
              <va-avatar :src="list.avatar"></va-avatar>
              <va-list-item-text>
                {{ list.name }}
                <div class="text-muted">Vary Admin</div>
              </va-list-item-text>
            </va-list-item>
          </va-list>
        </va-card>
      </va-col>
      <va-col :lg="4">
        <va-card header="With Action">
          <va-list>
            <va-list-item v-for="(list, j) in lists" :key="j.toString()">
              <va-avatar :src="list.avatar"></va-avatar>
              <va-list-item-text>
                {{ list.name }}
                <div class="text-muted">Vary Admin</div>
              </va-list-item-text>
              <va-list-item-action>
                <va-icon icon="star"></va-icon>
              </va-list-item-action>
            </va-list-item>
          </va-list>
        </va-card>
      </va-col>
    </va-row>
  </div>
</template>

<script setup lang="ts">
import avatarBg from "@assets/images/avatar/1.jpg";
const lists = [
  {
    name: "item0",
    icon: "home",
    avatar: avatarBg,
  },
  {
    name: "item1",
    icon: "home",
    avatar: avatarBg,
  },
  {
    name: "item2",
    icon: "home",
    avatar: avatarBg,
  },
  {
    name: "item3",
    icon: "home",
    avatar: avatarBg,
  },
];

</script>
