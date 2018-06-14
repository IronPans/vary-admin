<template>
    <div :class="classes">
        <!--Aside-->
        <aside class="aside">
            <div class="aside-menu">
                <template v-for="(item) in MENUS">
                    <div class="aside-menu-item" v-if="!item.type">
                        <router-link :to="item.to">
                            <va-icon :icon="item.icon"></va-icon>
                            <span>{{item.name}}</span>
                        </router-link>
                    </div>
                    <va-collapse v-model="collapseValue" :accordion="true" v-else-if="item.type==='accordion'">
                        <va-collapse-item v-for="(citem, index) in item.children" :name="citem.name" :key="index.toString()">
                            <template slot="header">
                                <va-icon :icon="citem.icon"></va-icon>
                                <span>{{citem.name}}</span>
                            </template>
                            <template slot="content">
                                <va-list>
                                    <va-list-item v-for="(menu,j) in citem.children" :key="j.toString()">
                                        <router-link :to="menu.to">
                                            <va-list-item-text>
                                                {{menu.name}}
                                            </va-list-item-text>
                                        </router-link>
                                    </va-list-item>
                                </va-list>
                            </template>
                        </va-collapse-item>
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
                                    <va-list-item-text>
                                        Level 2
                                    </va-list-item-text>
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
                                                            <va-list-item-text>
                                                                Level 3
                                                            </va-list-item-text>
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
                        <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="47" y1="94" x2="47">
                            <stop offset="0" stop-color="#1691f5"/>
                            <stop offset="1" stop-color="#3369E6"/>
                        </linearGradient>
                    </defs>
                    <g>
                        <rect width="94" height="94" rx="4" ry="4" fill="transparent"/>
                        <text x="10" y="75"
                              font-family="Tangerine"
                              font-size="80" font-weight="bold" :fill="svgColor" fill-rule="evenodd"> V </text>
                    </g>
                </svg>
                <span class="name">Vary Admin</span>
            </div>
            <div class="nav-menu ">
                <div class="nav-left">
                    <!--<va-button class="nav-menu-toggle" @click="toggle">-->
                        <!--<va-icon icon="menu"/>-->
                    <!--</va-button>-->
                    <div class="hamburger" :class="{'is-active': mini}" @click="toggle">
                        <span class="line"></span>  <span class="line"></span>  <span class="line"></span>
                    </div>
                    <va-input class="search-bar" placeholder="Search" :clear="true" icon="search" dir="right"/>
                </div>
                <div class="nav-right">
                    <!--<va-input class="m-r-20" placeholder="Search" :clear="true" icon="search" dir="right"/>-->
                    <!--<va-switch v-model="mini" class="m-r-20"></va-switch>-->
                    <a class="nav-link p-l-10 p-r-10 m-r-10" @click="toggleFullscreen">
                        <va-icon icon="crop_free"/>
                    </a>
                    <va-dropdown :hover="true" direction="bottom-right" class="nav-dropdown app-sortcut">
                        <a>
                            <va-icon icon="apps"/>
                        </a>
                        <template slot="menu">
                            <va-row class="app-sortcut-list">
                                <va-col :lg="4" v-for="(item,index) in shortcuts" :key="index.toString()">
                                    <router-link :to="item.to">
                                        <va-icon :icon="item.icon" class="m-b-10"></va-icon>
                                        <p class="m-0">{{item.label}}</p>
                                    </router-link>
                                </va-col>
                            </va-row>
                        </template>
                    </va-dropdown>
                    <va-dropdown direction="bottom-right" class="nav-dropdown notification-dropdown">
                        <a>
                            <va-badge :count="5" :notify="true">
                                <va-icon icon="notifications_none" class="animated infinite swing"/>
                            </va-badge>
                        </a>
                        <template slot="menu">
                            <div class="notification-header">
                                <h6>Notifications</h6>
                                <label class="label bg-danger">New</label>
                            </div>
                            <va-list>
                                <va-list-item v-for="(menu, index) in messages" :key="index.toString()">
                                    <va-avatar :src="menu.avatar"/>
                                    <va-list-item-text>
                                        <h5 class="notification-user">John Doe</h5>
                                        <p class="notification-msg">Lorem ipsum dolor sit amet, consectetuer elit.</p>
                                        <span class="notification-time">30 minutes ago</span>
                                    </va-list-item-text>
                                </va-list-item>
                            </va-list>
                            <div class="notification-footer">
                                Show All Notifications
                            </div>
                        </template>
                    </va-dropdown>
                    <va-dropdown :menu="menus" direction="bottom-right" class="profile-dropdown">
                        <a class="row justify-center">
                            <va-avatar width="35px" theme="primary" src="assets/images/avatar/1.jpg"/>
                            <span class="user-name">Siam Graves</span>
                            <va-icon icon="arrow_drop_down"/>
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
                        <h3 class="page-title text-capitalize">{{name}}</h3>
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
                        <li class="col-3" v-for="(t,i) in themes.light" :key="i.toString()">
                            <a :class="themeClass(t)" @click="selectTheme(t)"></a>
                        </li>
                    </ul>
                </div>
                <div class="pane pane-vertical">
                    <h4>Dark Sidebar</h4>
                    <ul class="row">
                        <li class="col-3" v-for="(t,i) in themes.dark" :key="i.toString()">
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

<script>
    import {addClass, removeClass, hasClass} from '@/base/vary-ui/components/base/dom';
    import {toggleFullScreen} from '@/base/vary-ui/components/base/utils';
    import {listen} from '@/base/vary-ui/components/base/event';
    import MENUS from './menus';

    export default {
        name: "va-main",
        data() {
            return {
                MENUS,
                mini: false,
                fixHeader: true,
                fixSidebar: true,
                name: '',
                menus: [
                    {
                        title: 'Profile',
                        icon: 'person',
                        onClick: () => {
                            this.$router.push({
                                name: 'personal'
                            })
                        }
                    },
                    {
                        title: 'Inbox',
                        icon: 'mail',
                        onClick: () => {
                            this.$router.push({
                                name: 'email'
                            })
                        }
                    },
                    {
                        title: 'Lock Screen',
                        icon: 'lock',
                        onClick: () => {
                            localStorage.setItem('locking', 1);
                            this.$router.push({
                                name: 'lockscreen'
                            });
                        }
                    },
                    {
                        divider: true
                    },
                    {
                        title: 'Logout',
                        icon: 'settings',
                        onClick: () => {
                            this.$store.commit('logout');
                            this.$router.push({
                                name: 'login'
                            });
                        }
                    }
                ],
                reveal: false,
                messages: [
                    {
                        text: 'Grid',
                        path: '/gird',
                        avatar: 'assets/images/avatar/1.jpg',
                        icon: 'home'
                    },
                    {
                        text: 'Buttons',
                        path: '/buttons',
                        avatar: 'assets/images/avatar/1.jpg',
                        icon: 'home'
                    },
                    {
                        text: 'Lists',
                        path: '/lists',
                        avatar: 'assets/images/avatar/1.jpg',
                        icon: 'home'
                    }
                ],
                shortcuts: [
                    {
                        label: 'Calendar',
                        icon: 'today',
                        to: '/calendar'
                    },
                    {
                        label: 'Chat',
                        icon: 'apps',
                        to: '/chat'
                    },
                    {
                        label: 'TodoList',
                        icon: 'table_chart',
                        to: '/todo-list'
                    },
                    {
                        label: 'Gallery',
                        icon: 'image',
                        to: '/chat'
                    },
                    {
                        label: 'Note',
                        icon: 'note',
                        to: '/note'
                    },
                    {
                        label: 'Contact',
                        icon: 'person_pin',
                        to: '/chat'
                    }
                ],
                navigations: [
                    {
                        name: 'HomePage',
                        icon: 'home',
                        type: 'icon',
                        render(h, params) {
                            return h('va-icon', {
                                icon: params.icon
                            })
                        }
                    }
                ],
                collapseValue: [],
                resizeListener: null,
                themes: {
                    light: ['blue', 'green', 'yellow', 'red', 'purple', 'megan'],
                    dark: ['white-dark', 'blue-dark', 'green-dark', 'yellow-dark', 'red-dark', 'purple-dark', 'megan-dark']
                },
                currentTheme: 'white-dark'
            }
        },
        methods: {
            themeClass(t) {
                return [
                    `${t}-theme`,
                    {
                        active: this.currentTheme === t
                    }
                ]
            },
            selectTheme(t) {
                this.currentTheme = t;
                this.$store.commit('setTheme', t);
                document.getElementById('admin-theme').href = `assets/themes/${t}.css`;
            },
            toggle() {
                this.mini = !hasClass(document.body, 'va-mini');
            },
            toggleSidebar() {
                this.reveal = !this.reveal;
            },
            close() {
                this.reveal = false;
            },
            toggleFullscreen() {
                toggleFullScreen();
            },
            fetchNavigation(nav) {
                const navigations = [this.navigations[0]];
                if (nav) {
                    const navs = nav.split('-');
                    for (const na of navs) {
                        navigations.push({
                            name: na
                        });
                    }
                    this.name = navs[navs.length - 1] || '';
                }
                this.navigations = navigations;
            },
            setFixHeader(fixed) {
                if (fixed) {
                    addClass(document.body, 'va-fix-header');
                } else {
                    removeClass(document.body, 'va-fix-header');
                }
            },
            setFixSidebar(fixed) {
                if (fixed) {
                    addClass(document.body, 'va-fix-sidebar');
                } else {
                    removeClass(document.body, 'va-fix-sidebar');
                }
            },
            handleResize() {
                this.mini = window.innerWidth <= 800;
            }
        },
        computed: {
            classes() {
                return [
                    'app'
                ]
            },
            svgColor() {
                if (!/dark/.test(this.currentTheme)) {
                    return '#303548';
                }
                return this.currentTheme !== 'white-dark' ? '#fff' : 'url(#linear-gradient)'
            }
        },
        watch: {
            '$route' (to, from) {
                this.fetchNavigation(to.meta.nav);
            },
            mini(val) {
                if (val) {
                    addClass(document.body, 'va-mini');
                } else {
                    removeClass(document.body, 'va-mini');
                }
            },
            fixHeader(val) {
                this.setFixHeader(val)
            },
            fixSidebar(val) {
                this.setFixSidebar(val);
            }
        },
        mounted() {
            this.fetchNavigation(this.$route.meta.nav);
            this.setFixHeader(this.fixHeader);
            this.setFixSidebar(this.fixSidebar);
            this.handleResize();
            this.resizeListener = listen(window, 'resize', this.handleResize);
        },
        beforeDestroy() {
            if (this.resizeListener) {
                this.resizeListener();
                this.resizeListener = null;
            }
        }
    }
</script>

<style lang="less">
    @import "main";
</style>