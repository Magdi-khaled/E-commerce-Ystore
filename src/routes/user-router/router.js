import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/shop.co/login",
            name: "customer-login",
            component: () => import("../../views/users/customer/auth/login.vue"),
        },
        {
            path: "/shop.co/signup",
            name: "customer-signup",
            component: () => import("../../views/users/customer/auth/signup.vue"),
        },
        {
            path: "/shop.co/user/forget-password",
            name: "customer-forget-password",
            component: () => import("../../views/users/customer/auth/forget-password.vue"),
        },
        {
            path: '/shop.co/user/shopping-cart',
            name: 'user-cart',
            component: () => import('../../views/users/customer/shop/user.cart.vue'),
            meta: {
                requiresTransition: true,
                breadcrumb: 'shopping-cart'
            },
        },
        {
            path: "/shop.co/user/profile",
            name: "user-profile",
            component: () => import("../../views/users/customer/profile/user.profile.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/qr-code",
            name: "user-qr-code",
            component: () => import("../../views/users/customer/profile/user.qrcode.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/orders",
            name: "user-orders",
            component: () => import("../../views/users/customer/profile/user.orders.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/returns",
            name: "user-returns",
            component: () => import("../../views/users/customer/profile/user.returns.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/payments",
            name: "user-payments",
            component: () => import("../../views/users/customer/profile/user.payments.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/notifications",
            name: "user-notifications",
            component: () => import("../../views/users/customer/profile/user.notify-history.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/security-sittings",
            name: "user-security-sittings",
            component: () => import("../../views/users/customer/profile/user.security-sittings.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
        // seller
        {
            path: "/shop.co.seller/login",
            name: "seller-login",
            component: () => import("../../views/users/admin/auth/login.vue"),
        },
        {
            path: "/shop.co.seller/become-seller",
            name: "seller-signup",
            component: () => import("../../views/users/admin/auth/signup.vue"),
        },
        {
            path: "/shop.co.seller/dashboard",
            name: "seller-dashboard",
            component: () => import("../../views/users/customer/profile/user.security-sittings.vue"),
            meta: {
                requiresTransition: true,
                requiredAuth: true
            },
        },
    ]
})

export function routerCustomerGuard(to, from, next) {
    const isAuthenticated = localStorage.getItem("token");

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isAuthenticated) {
            next({ name: 'customer-login' });
        } else {
            next();
        }
    } else {
        next();
    }
}

export default router;
