import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'all-user-page',
        component: () => import('@/components/page/UserWallPage.vue'),
    },
    {
        path: '/favorite/',
        name: 'favorite-page',
        component: () => import('@/components/page/UserWallPage.vue'),
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
];

const option: RouterOptions = {
    history: createWebHashHistory(),
    routes,
};

const router: Router = createRouter(option);
export default router;
