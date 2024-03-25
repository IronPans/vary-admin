<template>
  <!-- <va-message></va-message> -->
  <div class="app">
    <!--Aside-->
    <aside class="aside">
      <div class="aside-menu">
        <template v-for="item in asideMenus">
          <div class="aside-menu-item" v-if="!item.type">
            <router-link :to="item.to">
              <va-icon :icon="item.icon"></va-icon>
              <span>{{ item.name }}</span>
            </router-link>
          </div>
          <va-collapse
            v-model="collapseValue"
            :items="item.children"
            :accordion="true"
            v-else-if="item.type === 'accordion'"
          >
            <template #header="{ item, index, open }">
              <va-icon :icon="item.icon"></va-icon>
              <span>{{ item.name }}</span>
              <va-badge v-if="item.count" :count="item.count" :fixed="false"></va-badge>
            </template>
            <template #content="{ item, index, open }">
              <va-list :items="item.children">
                <template #item="{ menu }">
                  <router-link :to="menu.to">
                    <va-list-item-text>
                      {{ menu.name }}
                    </va-list-item-text>
                  </router-link>
                </template>
                <!-- <va-list-item v-for="(menu, j) in item.children" :key="j.toString()">
                  <router-link :to="menu.to">
                    <va-list-item-text>
                      {{ menu.name }}
                    </va-list-item-text>
                  </router-link>
                </va-list-item> -->
              </va-list>
            </template>
            <!-- <template #item="{ item, index, open }"></template> -->
            <!-- <va-collapse-item
              v-for="(citem, index) in item.children"
              :name="citem.name"
              :key="index.toString()"
            >
              <template slot="header">
                <va-icon :icon="citem.icon"></va-icon>
                <span>{{ citem.name }}</span>
                <va-badge
                  v-if="citem.count"
                  :count="citem.count"
                  :fixed="false"
                ></va-badge>
              </template>
              <template slot="content">
                <va-list>
                  <va-list-item v-for="(menu, j) in citem.children" :key="j.toString()">
                    <router-link :to="menu.to">
                      <va-list-item-text>
                        {{ menu.name }}
                      </va-list-item-text>
                    </router-link>
                  </va-list-item>
                </va-list>
              </template>
            </va-collapse-item> -->
          </va-collapse>
        </template>
        <va-collapse v-model="collapseValue" :accordion="true">
          <va-collapse-item name="multi-level">
            <template slot="header">
              <va-icon icon="replay"></va-icon>
              <span>Multi Level</span>
            </template>
            <template slot="content">
              <va-list>
                <va-list-item>
                  <va-list-item-text> Level 2 </va-list-item-text>
                </va-list-item>
                <va-list-item>
                  <va-list-item-text>
                    <va-collapse :accordion="true">
                      <va-collapse-item>
                        <template slot="header">
                          <span>Level 2</span>
                        </template>
                        <template slot="content">
                          <va-list>
                            <va-list-item>
                              <va-list-item-text> Level 3 </va-list-item-text>
                            </va-list-item>
                          </va-list>
                        </template>
                      </va-collapse-item>
                    </va-collapse>
                  </va-list-item-text>
                </va-list-item>
              </va-list>
            </template>
          </va-collapse-item>
        </va-collapse>
      </div>
    </aside>
    <!--Top Nav-->
    <header class="nav current-theme">
      <div class="nav-logo">
        <!--<img src="assets/vary-logo.svg" alt="vary-admin" class="va-logo">-->
        <svg width="94" height="94" viewBox="0 0 94 94" class="va-logo">
          <defs>
            <linearGradient
              id="linear-gradient"
              gradientUnits="userSpaceOnUse"
              x1="47"
              y1="94"
              x2="47"
            >
              <stop offset="0" stop-color="#1691f5" />
              <stop offset="1" stop-color="#3369E6" />
            </linearGradient>
          </defs>
          <g>
            <rect width="94" height="94" rx="4" ry="4" fill="transparent" />
            <text
              x="10"
              y="75"
              font-family="Tangerine"
              font-size="80"
              font-weight="bold"
              :fill="svgColor"
              fill-rule="evenodd"
            >
              V
            </text>
          </g>
        </svg>
        <span class="name">Vary Admin</span>
      </div>
      <div class="nav-menu">
        <div class="nav-left">
          <!--<va-button class="nav-menu-toggle" @click="toggle">-->
          <!--<va-icon icon="menu"/>-->
          <!--</va-button>-->
          <div class="hamburger" :class="{ 'is-active': mini }" @click="toggle">
            <span class="line"></span> <span class="line"></span>
            <span class="line"></span>
          </div>
          <va-input
            class="search-bar"
            placeholder="Search"
            :clear="true"
            icon="search"
            dir="right"
          />
        </div>
        <div class="nav-right">
          <!--<va-input class="m-r-20" placeholder="Search" :clear="true" icon="search" dir="right"/>-->
          <!--<va-switch v-model="mini" class="m-r-20"></va-switch>-->
          <a class="nav-link p-l-10 p-r-10 m-r-10" @click="toggleFullscreen">
            <va-icon icon="crop_free" />
          </a>
          <va-dropdown
            :hover="true"
            direction="bottom-right"
            class="nav-dropdown app-sortcut"
          >
            <a>
              <va-icon icon="apps" />
            </a>
            <template #menu>
              <va-row class="app-sortcut-list">
                <va-col
                  :lg="4"
                  v-for="(item, index) in shortcuts"
                  :key="index.toString()"
                >
                  <router-link :to="item.to">
                    <va-icon :icon="item.icon" class="m-b-10"></va-icon>
                    <p class="m-0">{{ item.label }}</p>
                  </router-link>
                </va-col>
              </va-row>
            </template>
          </va-dropdown>
          <va-dropdown
            direction="bottom-right"
            class="nav-dropdown notification-dropdown"
          >
            <a>
              <va-badge :count="5" :notify="true">
                <va-icon icon="notifications_none" class="animated infinite swing" />
              </va-badge>
            </a>
            <template #menu>
              <div class="notification-header">
                <h6>Notifications</h6>
                <label class="label bg-danger">New</label>
              </div>
              <va-list>
                <va-list-item v-for="(menu, index) in messages" :key="index.toString()">
                  <va-avatar :src="menu.avatar" />
                  <va-list-item-text>
                    <h5 class="notification-user">John Doe</h5>
                    <p class="notification-msg">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span class="notification-time">30 minutes ago</span>
                  </va-list-item-text>
                </va-list-item>
              </va-list>
              <div class="notification-footer">Show All Notifications</div>
            </template>
          </va-dropdown>
          <va-dropdown :menu="menus" direction="bottom-right" class="profile-dropdown">
            <a class="row justify-center">
              <va-avatar width="35px" theme="primary" src="images/avatar/1.jpg" />
              <span class="user-name">Siam Graves</span>
              <va-icon icon="arrow_drop_down" />
            </a>
          </va-dropdown>
        </div>
      </div>
    </header>
    <!--Main Content-->
    <main class="main">
      <div class="va-content" id="content">
        <div class="page-header-title">
          <va-panel class="w-100">
            <h3 class="page-title text-capitalize">{{ name }}</h3>
            <div class="page-navigations">
              <va-breadcrumb :data="navigations"></va-breadcrumb>
            </div>
          </va-panel>
        </div>
        <div class="content-wrapper">
          <transition name="vInOut">
            <router-view></router-view>
          </transition>
          <va-back-top>
            <va-button shape="circle">
              <va-icon icon="keyboard_arrow_up"></va-icon>
            </va-button>
          </va-back-top>
        </div>
      </div>
    </main>
    <!--Setting Sidebar-->
    <va-sidebar v-model="reveal" dir="right" class="setting-board">
      <div class="va-sidebar-header current-theme">
        <h4 class="m-0">Settings</h4>
        <va-icon icon="clear" class="close-btn" @click="close"></va-icon>
      </div>
      <div class="va-sidebar-body">
        <div class="pane">
          <b>Fix Header</b> <va-switch v-model="fixHeader"></va-switch>
        </div>
        <div class="pane">
          <b>Fix Sidebar</b> <va-switch v-model="fixSidebar"></va-switch>
        </div>
        <div class="pane pane-vertical">
          <h4>Light Sidebar</h4>
          <ul class="row">
            <li class="col-3" v-for="(t, i) in themes.light" :key="i.toString()">
              <a :class="themeClass(t)" @click="selectTheme(t)"></a>
            </li>
          </ul>
        </div>
        <div class="pane pane-vertical">
          <h4>Dark Sidebar</h4>
          <ul class="row">
            <li class="col-3" v-for="(t, i) in themes.dark" :key="i.toString()">
              <a :class="themeClass(t)" @click="selectTheme(t)"></a>
            </li>
          </ul>
        </div>
        <!--<div class="pane">-->
        <!--<va-switch label="dark" true-value="dark" false-value="white-dark"-->
        <!--@on-change="selectTheme"></va-switch>-->
        <!--</div>-->
      </div>
    </va-sidebar>
    <va-button class="settings-toggle" shape="circle" @click="toggleSidebar" size="lg">
      <va-icon icon="settings"></va-icon>
    </va-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted, computed, onUnmounted, watch } from "vue";
import { addClass, removeClass, hasClass } from "@/base/vary-ui/components/base/dom";
import { toggleFullScreen } from "@/base/vary-ui/components/base/utils";
import { listen } from "@/base/vary-ui/components/base/event";
import { useSettingStore } from "@store";
import MENUS from "./menus";
import avatarBg from "@assets/images/avatar/1.jpg";

const settingStore = useSettingStore();
const route = useRoute();
const router = useRouter();
const themes = {
  light: ["blue", "green", "yellow", "red", "purple", "megan"],
  dark: [
    "white-dark",
    "blue-dark",
    "green-dark",
    "yellow-dark",
    "red-dark",
    "purple-dark",
    "megan-dark",
  ],
};

const mini = ref(false);
const fixHeader = ref(true);
const fixSidebar = ref(true);
const reveal = ref(false);
const name = ref("");
const menus = [
  {
    title: "Profile",
    icon: "person",
    onClick: () => {
      router.push({
        name: "personal",
      });
    },
  },
  {
    title: "Inbox",
    icon: "mail",
    onClick: () => {
      router.push({
        name: "email",
      });
    },
  },
  {
    title: "Lock Screen",
    icon: "lock",
    onClick: () => {
      localStorage.setItem("locking", "1");
      router.push({
        name: "lockscreen",
      });
    },
  },
  {
    divider: true,
  },
  {
    title: "Logout",
    icon: "settings",
    onClick: () => {
      // this.$store.commit("logout");
      router.push({
        name: "login",
      });
    },
  },
];

const messages = [
  {
    text: "Grid",
    path: "/gird",
    avatar: avatarBg,
    icon: "home",
  },
  {
    text: "Buttons",
    path: "/buttons",
    avatar: avatarBg,
    icon: "home",
  },
  {
    text: "Lists",
    path: "/lists",
    avatar: avatarBg,
    icon: "home",
  },
];
const shortcuts = [
  {
    label: "Calendar",
    icon: "today",
    to: "/vueadmin/calendar",
  },
  {
    label: "Chat",
    icon: "apps",
    to: "/vueadmin/chat",
  },
  {
    label: "TodoList",
    icon: "table_chart",
    to: "/vueadmin/todo-list",
  },
  {
    label: "Gallery",
    icon: "image",
    to: "/vueadmin/chat",
  },
  {
    label: "Note",
    icon: "note",
    to: "/vueadmin/note",
  },
  {
    label: "Contact",
    icon: "person_pin",
    to: "/vueadmin/chat",
  },
];
const navigations = ref([
  {
    name: "HomePage",
    icon: "home",
    type: "icon",
    render(h: any, params: any) {
      return h("va-icon", {
        icon: params.icon,
      });
    },
  },
]);
const collapseValue = ref([]);
const currentTheme = ref("white-dark");

const asideMenus = MENUS;
let resizeListener: any = null;

const svgColor = computed(() => {
  if (!/dark/.test(currentTheme.value)) {
    return "#303548";
  }
  return currentTheme.value !== "white-dark" ? "#fff" : "url(#linear-gradient)";
});

function themeClass(t: string) {
  return [
    `${t}-theme`,
    {
      active: currentTheme.value === t,
    },
  ];
}
function selectTheme(t: string) {
  currentTheme.value = t;
  settingStore.setTheme(t);
  const elem: any = document.getElementById("admin-theme");
  if (elem) {
    elem.href = `assets/themes/${t}.css`;
  }
}
function toggle() {
  mini.value = !hasClass(document.body, "va-mini");
}
function toggleSidebar() {
  reveal.value = !reveal.value;
}
function close() {
  reveal.value = false;
}
function toggleFullscreen() {
  toggleFullScreen();
}
function fetchNavigation(nav: string) {
  const navs: any = [navigations.value[0]];
  if (nav) {
    const navs = nav.split("-");
    for (const na of navs) {
      navs.push({
        name: na,
      });
    }
    name.value = navs[navs.length - 1] || "";
  }
  navigations.value = navs;
}
function setFixHeader(fixed: boolean) {
  if (fixed) {
    addClass(document.body, "va-fix-header");
  } else {
    removeClass(document.body, "va-fix-header");
  }
}
function setFixSidebar(fixed: boolean) {
  if (fixed) {
    addClass(document.body, "va-fix-sidebar");
  } else {
    removeClass(document.body, "va-fix-sidebar");
  }
}
function handleResize() {
  mini.value = window.innerWidth <= 800;
}

onMounted(() => {
  // fetchNavigation(route.meta.nav);
  setFixHeader(fixHeader.value);
  setFixSidebar(fixSidebar.value);
  handleResize();
  resizeListener = listen(window, "resize", handleResize);
});

onUnmounted(() => {
  if (resizeListener) {
    resizeListener();
    resizeListener = null;
  }
});

watch(mini, (newVal) => {
  if (newVal) {
    addClass(document.body, "va-mini");
  } else {
    removeClass(document.body, "va-mini");
  }
});

watch(fixHeader, (newVal) => {
  setFixHeader(newVal);
});

watch(fixSidebar, (newVal) => {
  setFixSidebar(newVal);
});
</script>

<style lang="less">
@import "main";
</style>
