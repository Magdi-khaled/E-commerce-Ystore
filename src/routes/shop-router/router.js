import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/shop.co/home'
        },
        {
            path: '/shop.co/home',
            name: 'shop.co-home',
            component: () => import('../../views/shop/home.vue'),
        },
        {
            path: "/shop.co/shop",
            name: "shop.co-shop",
            component: () => import("../../views/shop/shop.vue"),
        },
    ]
})

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.path} to ${to.path}`);
    next();
});
export default router;