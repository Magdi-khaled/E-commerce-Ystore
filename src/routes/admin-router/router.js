import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/shop.co.trade/login",
            name: "seller-login",
            component: () => import("../../views/users/admin/auth/login.vue"),
        },
        {
            path: "/shop.co.trade/register",
            name: "seller-signup",
            component: () => import("../../views/users/admin/auth/signup.vue"),
        },
        {
            path: "/shop.co.trade/seller/dashboard",
            name: "seller-dashboard",
            component: () => import("../../views/users/admin/services/dashboard/dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/:shopName/:shopId",
            name: "seller-shop",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/store",
            name: "seller-store",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/dashboard.vue"),
            meta: {
                requiresTransition: true
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/inbox",
            name: "seller-inbox",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/ads-manager",
            name: "ads-manager",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/faqs",
            name: "seller-faqs",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/services/add-product",
            name: "add-product",
            component: () => import("../../views/users/admin/services/product-services/add-product.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/services/update-product/:id",
            name: "update-product",
            props: true,
            component: () => import("../../views/users/admin/services/product-services/update-product.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/services/delete-product/:id",
            name: "delete-product",
            props: true,
            component: () => import("../../views/users/admin/services/product-services/delete-product.vue"),
            meta: {
                // requiredAuth: true
            },
        },
    ]
})

export function routerSellerrGuard(to, from, next) {
    if (to.meta.requiredAuth) {
        const isAuthenticated = localStorage.getItem("admintoken");
        if (!isAuthenticated) {
            next();
        } else {
            next({ name: 'seller-login' });
        }
    } else {
        next();
    }
}

export default router;
