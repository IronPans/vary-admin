import Main from '@/views/main';

export const page404 = {
    path: '/404',
    name: '404',
    meta: {
        title: '404'
    },
    component: () => import('@/views/error/404')
};

export const page500 = {
    path: '/500',
    name: '500',
    meta: {
        title: '500'
    },
    component: () => import('@/views/error/500')
};

export const pageLogin = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login'
    },
    component: () => import('@/views/login/login.vue')
};

export const pageRegister = {
    path: '/register',
    name: 'register',
    meta: {
        title: 'SignUp'
    },
    component: () => import('@/views/register/register.vue')
};

export const pageForgotPassword = {
    path: '/forgot_password',
    name: 'forgot_password',
    meta: {
        title: 'Forgot Password'
    },
    component: () => import('@/views/forgot-password/forgot-password.vue')
};

export const pageLock = {
    path: '/lockscreen',
    name: 'lockscreen',
    meta: {
        title: 'Lockscreen'
    },
    component: () => import('@/views/lockscreen/lockscreen.vue')
};

export const mainRouter = [
    {
        path: '/',
        component: Main,
        name: 'home',
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home_index',
                meta: {
                    title: 'Dashboard',
                    nav: 'Dashboard'
                },
                component: () => import('@/views/home/home.vue')  // 采取按需加载
            },
            {
                path: 'personal',
                name: 'personal',
                meta: {
                    title: 'Personal',
                    nav: 'Personal'
                },
                component: () => import('@/views/personal/personal.vue')
            },
            {
                path: 'chat',
                name: 'chat',
                meta: {
                    title: 'Chat',
                    nav: 'Chat'
                },
                component: () => import('@/views/chat/chat.vue')
            },
            {
                path: 'email',
                name: 'email',
                meta: {
                    title: 'Email',
                    nav: 'Email'
                },
                component: () => import('@/views/email/email-inbox.vue')
            },
            {
                path: 'email_compose',
                name: 'email_compose',
                meta: {
                    title: 'Email Compose',
                    nav: 'Email Compose'
                },
                component: () => import('@/views/email/email-compose.vue')
            },
            {
                path: 'email_view',
                name: 'email_view',
                meta: {
                    title: 'Email View',
                    nav: 'Email View'
                },
                component: () => import('@/views/email/email-view.vue')
            },
            {
                path: 'timeline',
                name: 'timeline',
                meta: {
                    title: 'Timeline',
                    nav: 'Timeline'
                },
                component: () => import('@/views/timeline/timeline-case.vue')
            },
            {
                path: 'note',
                name: 'note',
                meta: {
                    title: 'Note',
                    nav: 'Note'
                },
                component: () => import('@/views/note/note-case.vue')
            },
            {
                path: 'calendar',
                name: 'calendar',
                meta: {
                    title: 'Calendar',
                    nav: 'Calendar'
                },
                component: () => import('@/views/calendar/calendar-case.vue')
            },
            {
                path: 'todo-list',
                name: 'todo-list',
                meta: {
                    title: 'Todo List',
                    nav: 'Todo List'
                },
                component: () => import('@/views/todo-list/todo-list-case.vue')
            }
        ]
    },
    {
        path: '/components',
        component: Main,
        name: 'components',
        children: [
            {
                path: 'alert',
                name: 'alert',
                meta: {
                    title: 'Alert',
                    nav: 'Component-Alert'
                },
                component: () => import('@/views/components/alert-case.vue')
            },
            {
                path: 'buttons',
                name: 'button',
                meta: {
                    title: 'Button',
                    nav: 'Component-Button'
                },
                component: () => import('@/views/components/button-case.vue')
            },
            {
                path: 'charts',
                name: 'chart',
                meta: {
                    title: 'Chart',
                    nav: 'Component-Chart'
                },
                component: () => import('@/views/components/charts-case.vue')
            },
            {
                path: 'Badge',
                name: 'Badge',
                meta: {
                    title: 'Badge',
                    nav: 'Component-Badge'
                },
                component: () => import('@/views/components/badge-case.vue')
            },
            {
                path: 'collapse',
                name: 'collapse',
                meta: {
                    title: 'Collapse',
                    nav: 'Component-Collapse'
                },
                component: () => import('@/views/components/collapse-case.vue')
            },
            {
                path: 'base-table',
                name: 'base-table',
                meta: {
                    title: 'BaseTable',
                    nav: 'Component-BaseTable'
                },
                component: () => import('@/views/table/base-table.vue')
            },
            {
                path: 'datatable',
                name: 'datatable',
                meta: {
                    title: 'Datatable',
                    nav: 'Component-Datatable'
                },
                component: () => import('@/views/table/datatable.vue')
            },
            {
                path: 'editor',
                name: 'editor',
                meta: {
                    title: 'Editor',
                    nav: 'Component-Editor'
                },
                component: () => import('@/views/form/editor-case.vue')
            },
            {
                path: 'form',
                name: 'form',
                meta: {
                    title: 'Form',
                    nav: 'Component-Form'
                },
                component: () => import('@/views/form/forms.vue')
            },
            {
                path: 'form-validation',
                name: 'form-validation',
                meta: {
                    title: 'Form Validation',
                    nav: 'Component-Form Validation'
                },
                component: () => import('@/views/form/form-validation.vue')
            },
            {
                path: 'picker',
                name: 'picker',
                meta: {
                    title: 'Picker',
                    nav: 'Component-Picker'
                },
                component: () => import('@/views/form/picker-case.vue')
            },
            {
                path: 'list',
                name: 'list',
                meta: {
                    title: 'List',
                    nav: 'Component-List'
                },
                component: () => import('@/views/components/list-case.vue')
            },
            {
                path: 'loading',
                name: 'loading',
                meta: {
                    title: 'Loading',
                    nav: 'Component-Loading'
                },
                component: () => import('@/views/components/loading-case.vue')
            },
            {
                path: 'notification',
                name: 'notification',
                meta: {
                    title: 'Notification',
                    nav: 'Component-Notification'
                },
                component: () => import('@/views/components/notification-case.vue')
            },
            {
                path: 'modal',
                name: 'modal',
                meta: {
                    title: 'Modal',
                    nav: 'Component-Modal'
                },
                component: () => import('@/views/components/modal-case.vue')
            },
            {
                path: 'panel',
                name: 'panel',
                meta: {
                    title: 'Panel',
                    nav: 'Component-Panel'
                },
                component: () => import('@/views/components/panel-case.vue')
            },
            {
                path: 'progress',
                name: 'progress',
                meta: {
                    title: 'Progress',
                    nav: 'Component-Progress'
                },
                component: () => import('@/views/components/progress-case.vue')
            },
            {
                path: 'sidebar',
                name: 'sidebar',
                meta: {
                    title: 'Sidebar',
                    nav: 'Component-Sidebar'
                },
                component: () => import('@/views/components/sidebar-case.vue')
            },
            {
                path: 'steps',
                name: 'steps',
                meta: {
                    title: 'Steps',
                    nav: 'Component-Steps'
                },
                component: () => import('@/views/components/steps-case.vue')
            },
            {
                path: 'swiper',
                name: 'swiper',
                meta: {
                    title: 'Swiper',
                    nav: 'Component-Swiper'
                },
                component: () => import('@/views/components/swiper-case.vue')
            },
            {
                path: 'tabs',
                name: 'tabs',
                meta: {
                    title: 'Tabs',
                    nav: 'Component-Tabs'
                },
                component: () => import('@/views/components/tabs-case.vue')
            },
            {
                path: 'toast',
                name: 'toast',
                meta: {
                    title: 'Toast',
                    nav: 'Component-Toast'
                },
                component: () => import('@/views/components/toast-case.vue')
            },
            {
                path: 'tooltips',
                name: 'tooltip',
                meta: {
                    title: 'Tooltip',
                    nav: 'Component-Tooltip'
                },
                component: () => import('@/views/components/tooltip-case.vue')
            },
            {
                path: 'tree',
                name: 'tree',
                meta: {
                    title: 'Tree',
                    nav: 'Component-Tree'
                },
                component: () => import('@/views/components/tree-case.vue')
            }
        ]
    },
    {
        path: '/basics',
        component: Main,
        name: 'basics',
        children: [
            {
                path: 'grid',
                name: 'grid',
                meta: {
                    title: 'Grid',
                    nav: 'Grid'
                },
                component: () => import('@/views/basic/grid-case.vue')
            },
            {
                path: 'box-shadow',
                name: 'boxShadow',
                meta: {
                    title: 'BoxShadow',
                    nav: 'Component-BoxShadow'
                },
                component: () => import('@/views/basic/box-shadow.vue')
            },
            {
                path: 'typography',
                name: 'typography',
                meta: {
                    title: 'Typography',
                    nav: 'Component-Typography'
                },
                component: () => import('@/views/basic/typography.vue')
            },
            {
                path: 'colors',
                name: 'colors',
                meta: {
                    title: 'Color',
                    nav: 'Component-Color'
                },
                component: () => import('@/views/basic/colors.vue')
            },
            {
                path: 'generic-classes',
                name: 'generic-classes',
                meta: {
                    title: 'Classes',
                    nav: 'Component-Classes'
                },
                component: () => import('@/views/basic/generic-classes.vue')
            }
        ]
    }
];

export const routers = [
    pageLogin,
    pageRegister,
    pageLock,
    pageForgotPassword,
    page404,
    page500,
    ...mainRouter
];
