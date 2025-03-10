import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/ystore/login",
            name: "User-Login",
            component: () => import("../../views/users/auth/Login.vue"),
        },
        {
            path: "/ystore/signup",
            name: "User-Signup",
            component: () => import("../../views/users/auth/Signup.vue"),
        },
        {
            path: "/ystore/user/forget-password",
            name: "User-ForgetPassword",
            component: () => import("../../views/users/auth/ForgetPassword.vue"),
        },
        {
            path: '/ystore/user/shopping-cart',
            name: 'User-Cart',
            component: () => import('../../views/users/user/shop/Cart.vue'),
            meta: {
                requiresTransition: true
            },
        },
        {
            path: '/ystore/user/wishlist',
            name: 'User-Wishlist',
            component: () => import('../../views/users/user/shop/Wishlist.vue'),
            meta: {
                requiresTransition: true
            },
        },
        {
            path: "/ystore/user/profile",
            name: "User-Profile",
            component: () => import("../../views/users/user/profile/UserProfile.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/qr-code",
            name: "User-Qrcode",
            component: () => import("../../views/users/user/profile/UserQrcode.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/orders",
            name: "User-Orders",
            component: () => import("../../views/users/user/profile/UserOrders.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/returns",
            name: "User-Returns",
            component: () => import("../../views/users/user/profile/UserReturns.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/payments",
            name: "User-Payments",
            component: () => import("../../views/users/user/profile/UserPayments.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/notifications",
            name: "User-Notifications",
            component: () => import("../../views/users/user/profile/UserNotifyHistory.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/security-sittings",
            name: "User-SecuritySittings",
            component: () => import("../../views/users/user/profile/UserSecuritySittings.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/ystore/user/cart/checkout",
            name: "User-Checkout",
            component: () => import("../../views/users/user/shop/CheckOut.vue"),
            meta: {
                requiresTransition: true,
                // // requiredAuth: true
            },
        },
    ]
})

export function routerUserGuard(to, from, next) {
    if (to.meta.requiredAuth) {
        const isAuthenticated = localStorage.getItem("token");
        if (isAuthenticated) {
            next();
        } else {
            next({ name: 'User-Login' });
        }
    } else {
        next();
    }
}

export default router;
