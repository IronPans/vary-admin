<template>
  <ol :class="prefixCls">
    <li v-for="(menu, index) in data" :key="index.toString()">
      <template v-if="menu.icon && !$slots.icon">
        <va-icon :icon="menu.icon"></va-icon>
      </template>
      <template v-if="menu.type === 'icon' && $slots.icon">
        <!-- <va-template :render="menu.render"></va-template> -->
        <slot name="icon" :item="menu"></slot>
      </template>
      <span :class="`${prefixCls}-separator`" v-if="index > 0">
        {{ menu.separator || separator }}
      </span>
      <a :href="menu.to" v-if="!menu.linkTo">
        <span :class="`${prefixCls}-title`">{{ menu.name }}</span>
      </a>
      <router-link v-else :to="menu.linkTo">
        <span :class="`${prefixCls}-title`">{{ menu.name }}</span>
      </router-link>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// import vaTemplate from "../base/template";
import vaIcon from "../icon";

const prefixCls = "va-breadcrumb";

export default defineComponent({
  name: "vaBreadcrumb",
  components: { vaIcon },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    separator: {
      type: String,
      default: "/",
    },
  },
  setup(props) {
    return {
      prefixCls,
      data: props.data || [],
      separator: props.separator,
    };
  },
});
</script>
