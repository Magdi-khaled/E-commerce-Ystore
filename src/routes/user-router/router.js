import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/shop.co/login",
            name: "shop.co-login",
            component: () => import("../../views/users/customer/auth/login.vue"),
        },
        {
            path: "/shop.co/signup",
            name: "shop.co-signup",
            component: () => import("../../views/users/customer/auth/signup.vue"),
        },
        {
            path: "/shop.co/user/forget-password",
            name: "shop.co-forget-password",
            component: () => import("../../views/users/customer/auth/forget-password.vue"),
        },
        {
            path: "/shop.co/user/profile",
            name: "shop.co-user-profile",
            component: () => import("../../views/users/customer/profile/user.profile.vue"),
        },
        {
            path: '/shop.co/user/shopping-cart',
            name: 'user-cart',
            component: () => import('../../views/users/customer/shop/user.cart.vue'),
        },
    ]
})

// router.beforeEach((to, from, next) => {
//     next();
// });

export default router;