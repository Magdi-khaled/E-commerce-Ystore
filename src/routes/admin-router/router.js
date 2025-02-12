import { createRouter, createWebHistory } from "vue-router";
import data from '../../assets/db/data.json'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/shop.co.trade/login",
            name: "AD-Login",
            component: () => import("../../views/users/auth/Login.vue"),
        },
        {
            path: "/shop.co.trade/register",
            name: "AD-Signup",
            component: () => import("../../views/users/auth/Signup.vue"),
        },
        {
            path: "/shop.co.trade/forget-password",
            name: "AD-ForgetPassword",
            component: () => import("../../views/users/auth/ForgetPassword.vue"),
        },
        {
            path: "/shop.co.trade/seller/dashboard",
            name: "AD-Dashboard",
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/:shopName/:sId",
            name: "AD-Shop",
            component: () => import("../../views/users/admin/services/profile/ShopInfo.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/inventory",
            name: "AD-Inventory",
            props: true,
            component: () => import("../../views/users/admin/services/services/Inventory.vue"),
            meta: {
                requiresTransition: true
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/inbox",
            name: "AD-Inbox",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/ads-manager",
            name: "AD-adsManager",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/faqs",
            name: "AD-Faqs",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/seller/services/add-product",
            name: "Add-Product",
            component: () => import("../../views/users/admin/services/services/AddProduct.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/shop.co.trade/inventory/edit-product/:id",
            name: "Edit-Product",
            component: () => import("../../views/users/admin/services/services/EditProduct.vue"),
            beforeEnter: (to, from, next) => {
                const productExists = data.find(v => v._id === parseInt(to.params.id));
                if (productExists) {
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 150);
                    next();
                }
                else {
                    next('/shop.co/404-not-found');
                }
            },
        }
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
