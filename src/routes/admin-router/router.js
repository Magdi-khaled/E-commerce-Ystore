import { createRouter, createWebHistory } from "vue-router";
import data from '../../assets/db/data.json'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/ystore.trade/login",
            name: "AD-Login",
            component: () => import("../../views/users/auth/Login.vue"),
        },
        {
            path: "/ystore.trade/signup",
            name: "AD-Signup",
            component: () => import("../../views/users/auth/Signup.vue"),
        },
        {
            path: "/ystore.trade/forget-password",
            name: "AD-ForgetPassword",
            component: () => import("../../views/users/auth/ForgetPassword.vue"),
        },
        {
            path: "/ystore.trade/admin/dashboard",
            name: "AD-Dashboard",
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/:shopName/:sId",
            name: "AD-Shop",
            component: () => import("../../views/users/admin/services/profile/ShopInfo.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/inventory",
            name: "AD-Inventory",
            props: true,
            component: () => import("../../views/users/admin/services/services/Inventory.vue"),
            meta: {
                requiresTransition: true
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/inbox",
            name: "AD-Inbox",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/ads-manager",
            name: "AD-adsManager",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/faqs",
            name: "AD-Faqs",
            props: true,
            component: () => import("../../views/users/admin/services/dashboard/Dashboard.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/services/add-product",
            name: "Add-Product",
            component: () => import("../../views/users/admin/services/services/AddProduct.vue"),
            meta: {
                // requiredAuth: true
            },
        },
        {
            path: "/ystore.trade/admin/inventory/edit-product/:id",
            name: "EditProduct",
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
                    next('/ystore/404-not-found');
                }
            },
        }
    ]
})

export function routerAdminGuard(to, from, next) {
    if (to.meta.requiredAuth) {
        const isAuthenticated = localStorage.getItem("admintoken");
        if (!isAuthenticated) {
            next();
        } else {
            next({ name: 'AD-Login' });
        }
    } else {
        next();
    }
}

export default router;
