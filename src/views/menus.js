const MENUS = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        to: '/home'
    },
    {
        type: 'accordion',
        children: [
            {
                name: 'Basics',
                icon: 'text_format',
                children: [
                    {
                        name: 'Grid',
                        to: '/basics/grid'
                    },
                    {
                        name: 'Box Shadow',
                        to: '/basics/box-shadow'
                    },
                    {
                        name: 'Color',
                        to: '/basics/colors'
                    },
                    {
                        name: 'Typography',
                        to: '/basics/typography'
                    },
                    {
                        name: ' Generic Classes',
                        to: '/basics/generic-classes'
                    }
                ]
            },
            {
                name: 'Applications',
                icon: 'web',
                children: [
                    {
                        name: 'Chat',
                        to: '/chat'
                    },
                    {
                        name: 'Mail Box',
                        to: '/email'
                    },
                    {
                        name: 'Note',
                        to: '/note'
                    },
                    {
                        name: 'Calendar',
                        to: '/calendar'
                    },
                    {
                        name: 'Todo List',
                        to: '/todo-list'
                    }
                ]
            },
            {
                name: 'UI Elements',
                icon: 'view_module',
                children: [
                    {
                        name: 'Alert',
                        to: '/components/alert'
                    },
                    {
                        name: 'Badge & Chip',
                        to: '/components/badge'
                    },
                    {
                        name: 'Button',
                        to: '/components/buttons'
                    },
                    {
                        name: 'Collapse',
                        to: '/components/collapse'
                    },
                    {
                        name: 'List',
                        to: '/components/list'
                    },
                    {
                        name: 'Loading',
                        to: '/components/loading'
                    },
                    {
                        name: 'Notification',
                        to: '/components/notification'
                    },
                    {
                        name: 'Modal',
                        to: '/components/modal'
                    },
                    {
                        name: 'Panel',
                        to: '/components/panel'
                    },
                    {
                        name: 'Progress Bar',
                        to: '/components/progress'
                    },
                    {
                        name: 'Sidebar',
                        to: '/components/sidebar'
                    },
                    {
                        name: 'Steps',
                        to: '/components/steps'
                    },
                    {
                        name: 'Swiper',
                        to: '/components/swiper'
                    },
                    {
                        name: 'Tabs',
                        to: '/components/tabs'
                    },
                    {
                        name: 'Toast',
                        to: '/components/toast'
                    },
                    {
                        name: 'Tooltip & Popover',
                        to: '/components/tooltips'
                    },
                    {
                        name: 'Tree',
                        to: '/components/tree'
                    }
                ]
            },
            {
                name: 'Forms',
                icon: 'text_fields',
                children: [
                    {
                        name: 'Form Basic',
                        to: '/components/form'
                    },
                    {
                        name: 'Form Validation',
                        to: '/components/form-validation'
                    },
                    {
                        name: 'Form Picker',
                        to: '/components/picker'
                    },
                    {
                        name: 'Form Editor',
                        to: '/components/editor'
                    }
                ]
            },
            {
                name: 'Tables',
                icon: 'grid_on',
                children: [
                    {
                        name: 'Basic Table',
                        to: '/components/base-table'
                    },
                    {
                        name: 'Data Table',
                        to: '/components/datatable'
                    }
                ]
            },
            {
                name: 'Charts',
                icon: 'insert_chart',
                children: [
                    {
                        name: 'Chart.js',
                        to: '/components/charts'
                    }
                ]
            },
            {
                name: 'Authentication',
                icon: 'verified_user',
                children: [
                    {
                        name: 'Login',
                        to: '/login'
                    },
                    {
                        name: 'Register',
                        to: '/register'
                    },
                    {
                        name: 'Lockscreen',
                        to: '/lockscreen'
                    },
                    {
                        name: 'Recover password',
                        to: '/forgot_password'
                    },
                    {
                        name: '404',
                        to: '/404'
                    },
                    {
                        name: '500',
                        to: '500'
                    }
                ]
            },
            {
                name: 'Extra Page',
                icon: 'filter_none',
                children: [
                    {
                        name: 'Timeline',
                        to: '/timeline'
                    }
                ]
            }
        ]
    }
];

export default MENUS;