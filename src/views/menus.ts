const MENUS = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    to: '/vueadmin/home'
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
            to: '/vueadmin/basics/grid'
          },
          {
            name: 'Box Shadow',
            to: '/vueadmin/basics/box-shadow'
          },
          {
            name: 'Color',
            to: '/vueadmin/basics/colors'
          },
          {
            name: 'Typography',
            to: '/vueadmin/basics/typography'
          },
          {
            name: ' Generic Classes',
            to: '/vueadmin/basics/generic-classes'
          }
        ]
      },
      {
        name: 'Applications',
        icon: 'web',
        children: [
          {
            name: 'Chat',
            to: '/vueadmin/chat'
          },
          {
            name: 'Mail Box',
            to: '/vueadmin/email'
          },
          {
            name: 'Note',
            to: '/vueadmin/note'
          },
          // {
          //   name: 'Calendar',
          //   to: '/vueadmin/calendar'
          // },
          {
            name: 'Todo List',
            to: '/vueadmin/todo-list'
          }
        ]
      },
      {
        name: 'UI Elements',
        icon: 'view_module',
        count: 10,
        children: [
          {
            name: 'Alert',
            to: '/vueadmin/components/alert'
          },
          {
            name: 'Badge & Chip',
            to: '/vueadmin/components/badge'
          },
          {
            name: 'Button',
            to: '/vueadmin/components/buttons'
          },
          {
            name: 'Collapse',
            to: '/vueadmin/components/collapse'
          },
          {
            name: 'List',
            to: '/vueadmin/components/list'
          },
          {
            name: 'Loading',
            to: '/vueadmin/components/loading'
          },
          {
            name: 'Notification',
            to: '/vueadmin/components/notification'
          },
          {
            name: 'Modal',
            to: '/vueadmin/components/modal'
          },
          {
            name: 'Panel',
            to: '/vueadmin/components/panel'
          },
          {
            name: 'Progress Bar',
            to: '/vueadmin/components/progress'
          },
          {
            name: 'Sidebar',
            to: '/vueadmin/components/sidebar'
          },
          {
            name: 'Steps',
            to: '/vueadmin/components/steps'
          },
          {
            name: 'Swiper',
            to: '/vueadmin/components/swiper'
          },
          {
            name: 'Tabs',
            to: '/vueadmin/components/tabs'
          },
          {
            name: 'Toast',
            to: '/vueadmin/components/toast'
          },
          {
            name: 'Tooltip & Popover',
            to: '/vueadmin/components/tooltips'
          },
          {
            name: 'Tree',
            to: '/vueadmin/components/tree'
          }
        ]
      },
      {
        name: 'Forms',
        icon: 'text_fields',
        children: [
          {
            name: 'Form Basic',
            to: '/vueadmin/components/form'
          },
          {
            name: 'Form Validation',
            to: '/vueadmin/components/form-validation'
          },
          {
            name: 'Form Picker',
            to: '/vueadmin/components/picker'
          },
          {
            name: 'Form Editor',
            to: '/vueadmin/components/editor'
          }
        ]
      },
      {
        name: 'Tables',
        icon: 'grid_on',
        children: [
          {
            name: 'Pagination',
            to: '/vueadmin/components/pagination'
          },
          {
            name: 'Basic Table',
            to: '/vueadmin/components/base-table'
          },
          {
            name: 'Data Table',
            to: '/vueadmin/components/datatable'
          }
        ]
      },
      {
        name: 'Charts',
        icon: 'insert_chart',
        children: [
          {
            name: 'Chart.js',
            to: '/vueadmin/components/charts'
          }
        ]
      },
      {
        name: 'Authentication',
        icon: 'verified_user',
        children: [
          {
            name: 'Login',
            to: '/vueadmin/login'
          },
          {
            name: 'Register',
            to: '/vueadmin/register'
          },
          {
            name: 'Lockscreen',
            to: '/vueadmin/lockscreen'
          },
          {
            name: 'Recover password',
            to: '/vueadmin/forgot_password'
          },
          {
            name: '404',
            to: '/vueadmin/404'
          },
          {
            name: '500',
            to: '/vueadmin/500'
          }
        ]
      },
      {
        name: 'Extra Page',
        icon: 'filter_none',
        children: [
          {
            name: 'Timeline',
            to: '/vueadmin/timeline'
          }
        ]
      }
    ]
  }
]

export default MENUS
