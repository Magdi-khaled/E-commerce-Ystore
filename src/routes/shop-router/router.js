import { createRouter, createWebHistory } from "vue-router";
import data from '../../data.json'
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
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                ]
            },
        },
        {
            path: "/shop.co/shop",
            name: "shop",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                ]
            },
        },
        {
            path: "/shop.co/shop/fashion/men-wear",
            name: "men-fashion",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'men\'s fashion', link: '/shop.co/shop/fashion/men-wear' },
                ]
            },
        },
        {
            path: "/shop.co/shop/fashion/women-wear",
            name: "women-fashion",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'women\'s fashion', link: '/shop.co/shop/fashion/women-wear' },
                ]
            },
        },
        {
            path: "/shop.co/shop/sport-wear",
            name: "sport-wear",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'sport wear', link: '/shop.co/shop/sport-wear' },
                ]
            },
        },
        {
            path: "/shop.co/shop/girls-wear",
            name: "girls-wear",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'girls wear', link: '/shop.co/shop/girls-wear' },
                ]
            },
        },
        {
            path: "/shop.co/shop/boys-wear",
            name: "boys-wear",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'boys wear', link: '/shop.co/shop/boys-wear' },
                ]
            },
        },
        {
            path: "/shop.co/shop/bags-luggage",
            name: "bags-luggage",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'bags & luggage', link: '/shop.co/shop/bags-luggage' },
                ]
            },
        },
        {
            path: "/shop.co/shop/formal",
            name: "formal-wear",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'formal wear', link: '/shop.co/shop/formal' },
                ]
            },
        },
        {
            path: "/shop.co/shop/shoes-waer",
            name: "shoes-fashion",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'shoes', link: '/shop.co/shop/shoes' },
                ]
            },
        },
        {
            path: "/shop.co/shop/watches",
            name: "watches",
            component: () => import("../../views/shop/shop.vue"),
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'watches', link: '/shop.co/shop/watches' },
                ]
            },
        },
        {
            path: "/shop.co/shop/product/:id",
            name: "shop-product",
            component: () => import("../../views/shop/shop.product/shop.product.vue"),
            props: true,
            meta: {
                breadcrumb: [
                    { name: 'home', link: '/shop.co/home' },
                    { name: 'shop', link: '/shop.co/shop' },
                    { name: 'product' },
                ]
            },
            beforeEnter: (to, from, next) => {
                if (data.find(v => v._id === parseInt(to.params.id))) {
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        resolve({ top: 0 });
                    }, 150);
                    next();
                }
                else {
                    next('/shop.co/404-not-found');
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