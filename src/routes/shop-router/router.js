import { createRouter, createWebHistory } from "vue-router";
import data from '@/composables/data.js';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/ystore/home'
        },
        {
            path: '/ystore/home',
            name: 'Home',
            component: () => import('@/views/shop/HomeView.vue'),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                ]
            },

        },
        {
            path: "/ystore/shop",
            name: "Shop",
            component: () => import("@/views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                ]
            },
        },
        {
            path: "/ystore/shop/fashion/men-wear",
            name: "men-fashion",
            component: () => import("@/views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'men\'s fashion', link: '/ystore/shop/fashion/men-wear' },
                ]
            },
        },
        {
            path: "/ystore/shop/fashion/women-wear",
            name: "women-fashion",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'women\'s fashion', link: '/ystore/shop/fashion/women-wear' },
                ]
            },
        },
        {
            path: "/ystore/shop/sport-wear",
            name: "sport-wear",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'sport wear', link: '/ystore/shop/sport-wear' },
                ]
            },
        },
        {
            path: "/ystore/shop/girls-wear",
            name: "girls-wear",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'girls wear', link: '/ystore/shop/girls-wear' },
                ]
            },
        },
        {
            path: "/ystore/shop/boys-wear",
            name: "boys-wear",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'boys wear', link: '/ystore/shop/boys-wear' },
                ]
            },
        },
        {
            path: "/ystore/shop/bags-luggage",
            name: "bags-luggage",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'bags & luggage', link: '/ystore/shop/bags-luggage' },
                ]
            },
        },
        {
            path: "/ystore/shop/formal-wear",
            name: "formal-wear",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'formal wear', link: '/ystore/shop/formal' },
                ]
            },
        },
        {
            path: "/ystore/shop/shoes-wear", // Fixed the typo
            name: "shoes-fashion",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'shoes', link: '/ystore/shop/shoes-wear' },
                ]
            },
        },
        {
            path: "/ystore/shop/accessories", // Fixed the typo
            name: "accessories",
            component: () => import("../../views/shop/ShopView.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'shoes', link: '/ystore/shop/accessories' },
                ]
            },
        },
        {
            path: "/ystore/shop/product/:id",
            name: "Product",
            component: () => import("../../views/shop/shop.product/Product.vue"),
            meta: {
                requiresTransition: true,
                breadcrumb: [
                    { name: 'home', link: '/ystore/home' },
                    { name: 'shop', link: '/ystore/shop' },
                    { name: 'product', link: '/ystore/shop/product/:id' },
                ]
            },
            beforeEnter: (to, from, next) => {
                const productExists = data.find(v => v._id === parseInt(to.params.id));
                if (productExists) {
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 150);
                    next();
                }
                else {
                    next('/ystore/404-not-found');
                }
            },
        },
    ]
})

router.beforeEach((to, from, next) => {

    console.log(`Navigating from ${from.path} to ${to.path}`);
    next();
});
export default router;