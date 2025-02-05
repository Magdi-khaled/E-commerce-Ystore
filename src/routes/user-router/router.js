import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/shop.co/login",
            name: "User-Login",
            component: () => import("../../views/users/customer/auth/Login.vue"),
        },
        {
            path: "/shop.co/signup",
            name: "User-Signup",
            component: () => import("../../views/users/customer/auth/Signup.vue"),
        },
        {
            path: "/shop.co/user/forget-password",
            name: "User-ForgetPassword",
            component: () => import("../../views/users/customer/auth/ForgetPassword.vue"),
        },
        {
            path: '/shop.co/user/shopping-cart',
            name: 'User-Cart',
            component: () => import('../../views/users/customer/shop/Cart.vue'),
            meta: {
                requiresTransition: true
            },
        },
        {
            path: "/shop.co/user/profile",
            name: "User-Profile",
            component: () => import("../../views/users/customer/profile/UserProfile.vue"),
            meta: {
                requiresTransition: true,
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/qr-code",
            name: "User-Qrcode",
            component: () => import("../../views/users/customer/profile/UserQrcode.vue"),
            meta: {
                requiresTransition: true,
                //  requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/orders",
            name: "User-Orders",
            component: () => import("../../views/users/customer/profile/UserOrders.vue"),
            meta: {
                requiresTransition: true,
                //  requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/returns",
            name: "User-Returns",
            component: () => import("../../views/users/customer/profile/UserReturns.vue"),
            meta: {
                requiresTransition: true,
                //  requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/payments",
            name: "User-Payments",
            component: () => import("../../views/users/customer/profile/UserPayments.vue"),
            meta: {
                requiresTransition: true,
                //  requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/notifications",
            name: "User-Notifications",
            component: () => import("../../views/users/customer/profile/UserNotifyHistory.vue"),
            meta: {
                requiresTransition: true,
                //  requiredAuth: true
            },
        },
        {
            path: "/shop.co/user/security-sittings",
            name: "User-SecuritySittings",
            component: () => import("../../views/users/customer/profile/UserSecuritySittings.vue"),
            meta: {
                requiresTransition: true,
                //  requiredAuth: true
            },
        },
    ]
})

export function routerCustomerGuard(to, from, next) {
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
