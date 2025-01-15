import { createRouter, createWebHistory } from "vue-router";
import userRouter, { routerCustomerGuard } from "./user-router/router";
import shopRouter from "./shop-router/router";
import notFound from '../components/notFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...shopRouter.options.routes,
        ...userRouter.options.routes,
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            meta: {
                title: 'Shop.co | Page NotFound 404',
            },
            component: notFound
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || new Promise((resolve) => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                resolve({ top: 0 });
            }, 150);
        });
        // if (to.hash) {
        //     return {
        //         el: to.hash,
        //         behavior: 'smooth',
        //     };
        // }
        // return { top: 0 };
    },
});

// router Guards
router.beforeEach(routerCustomerGuard);

// loading spinner transition
router.beforeEach((to, from, next) => {
    if (to.meta.requiresTransition) {
        document.getElementById('loading').classList.remove('hidden');
    }
    next();
});
router.afterEach((to) => {
    if (to.meta.requiresTransition) {
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
        }, 800);
    }
});

export default router;