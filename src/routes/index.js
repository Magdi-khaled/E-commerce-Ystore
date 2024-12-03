import { createRouter, createWebHistory } from "vue-router";
import userRouter from "./user-router/router";
import shopRouter from "./shop-router/router";
import notFound from '../components/notFound.vue';
import UnAuthorized from '../components/unAuthorized.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...shopRouter.options.routes,
        ...userRouter.options.routes,

        {
            path: '/:catchAll(.*)',
            meta: {
                title: 'Shop.co | Page NotFound 404',
            },
            component: notFound
        },
        {
            path: '/shop.co/401-un-authorized',
            name: 'UnAuthorized',
            title: 'Shop.co | UnAuthorized',
            component: UnAuthorized
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/shop.co/401-un-authorized'
        },
    ],
});

export default router;