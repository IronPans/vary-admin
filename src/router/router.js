import Main from '@/views/main';

export const page404 = {
    path: '404',
    component: () => import('@/views/error/404')
};

export const mainRouter = [
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: 'home', name: 'home_index', component: () => import('@/views/home/home')
            }
        ]
    }
];

export const routers = [
    page404,
    ...mainRouter
];
