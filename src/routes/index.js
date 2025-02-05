import { createRouter, createWebHistory } from "vue-router";
import userRouter, { routerCustomerGuard } from "./user-router/router";
import adminRouter, { routerSellerrGuard } from "./admin-router/router";
import shopRouter from "./shop-router/router";
import NotFound from '../components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...shopRouter.options.routes,
        ...adminRouter.options.routes,
        ...userRouter.options.routes,
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            meta: {
                title: 'Shop.co | Page NotFound 404',
            },
            component: NotFound
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || new Promise((resolve) => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                resolve({ top: 0 });
            }, 150);
        });
    },
});

// router Guards
router.beforeEach(routerCustomerGuard);
router.beforeEach(routerSellerrGuard);

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