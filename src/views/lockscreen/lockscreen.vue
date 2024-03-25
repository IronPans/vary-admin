<template>
  <div class="va-page-lockscreen">
    <va-card class="login-box animated flipInX">
      <template #content>
        <p class="text-center">
          <va-avatar :src="avatar"></va-avatar>
          <br />
          <span>Siam Graves</span>
        </p>
        <div class="form-group">
          <va-input placeholder="Password"></va-input>
        </div>
        <div class="form-group text-center">
          <va-button
            @click="unlock"
            class="va-unlock-btn"
            theme="primary"
            size="lg"
            :rounded="true"
          >
            Unlock
          </va-button>
        </div>
      </template>
    </va-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

import avatarBg from "@assets/images/avatar/1.jpg";
const avatar = avatarBg;
function unlock() {
  localStorage.removeItem("locking");
  // this.$router.push({
  //   name: "home_index",
  // });
  router.push({
    name: "home_index",
    query: {
      ...route.query,
    },
  });
}
</script>

<style scoped lang="less">
@import "./lockscreen.less";
</style>
