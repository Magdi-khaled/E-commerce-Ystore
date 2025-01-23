<template>
    <hr>
    <div class="flex">
        <section class="w-2/12 flex border-r-2 border-r-gray-400 " :class="{
            active: show && !medium, 'nav-links-hidden': !medium, 'toggle-small-side': medium,
            'toggle-small-side-active  w-8/12 sm:w-6/12 md:w-4/12': show && medium
        }">
            <div class="w-full bg-white h-full">
                <div class="w-full flex items-center">
                    <div class="w-full flex items-center px-2 mt-2" :class="{ 'w-9/12 mt-0 text-sm': medium }">
                        <i class="fa-solid fa-shop text-3xl sm:text-4xl p-2"></i>
                        <div class="w-full">
                            <p class="text-sm capitalize font-bold">{{ shopName }}</p>
                            <p class="text-xs capitalize font-medium text-gray-500">Owner/{{ shopOwner }}</p>
                        </div>
                    </div>
                    <div class="w-2/12 text-center">
                        <button v-if="medium" @click="show = !show">
                            <i class="fa-regular fa-xmark text-xl"></i>
                        </button>
                    </div>
                </div>
                <hr class="border-t-2 border-t-gray-300">
                <ul lass="list-none w-full lg:W-8/12">
                    <li class=" py-3">
                        <router-link :to="{ name: 'seller-dashboard' }"
                            class="p-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-sharp fa-solid fa-chart-line p-1 mr-2"></i>
                            Dashboard
                        </router-link>
                    </li>
                    <hr>
                    <li class="w-full relative text-start">
                        <!-- <router-link :to="{ name: 'shop.co-home' }"
                            class="p-2 w-full font-medium capitalize text-black hover:text-gray-600"> -->
                        <button @click="servShow = !servShow"
                            class="p-2 py-2 font-medium capitalize text-black hover:text-gray-700">
                            <i class="fa-regular fa-box-open-full p-1 mr-1"></i>
                            services
                            <!-- <i v-if="!servShow"
                                class="fa-solid fa-angle-right text-gray-600 absolute top-[35%] right-[8%]"></i>
                            <i v-else class="fa-solid fa-angle-down text-gray-600 absolute top-[35%] right-[8%]"></i> -->
                        </button>
                        <!-- </router-link> -->
                    </li>
                    <div class="pl-4 w-full">
                        <li class="border-l-[1px] border-b-2 border-l-gray-300 py-2">
                            <router-link :to="{ name: 'add-product', params: { id: 1 } }"
                                class="p-3 font-medium capitalize text-black hover:text-gray-600 text-sm">
                                <i class="fa-thin fa-basket-shopping-plus font-bold text-sm pr-1"></i> add product
                            </router-link>
                        </li>
                        <li class="border-l-[1px] border-b-2 border-l-gray-300 py-2">
                            <router-link :to="{ name: 'update-product', params: { id: 1 } }"
                                class="p-3 font-medium capitalize text-black hover:text-gray-600 text-sm">
                                <i class="fa-sharp fa-light fa-pen text-sm pr-1"></i> update product
                            </router-link>
                        </li>
                        <li class="border-l-[1px] border-l-gray-300 py-2">
                            <router-link :to="{ name: 'delete-product', params: { id: 1 } }"
                                class="p-3 font-medium capitalize text-black hover:text-gray-600 text-sm">
                                <i class="fa-regular fa-trash text-sm pr-1"></i> delete product
                            </router-link>
                        </li>
                    </div>
                    <hr>
                    <li class=" py-3">
                        <router-link :to="{ name: 'seller-store' }"
                            class="p-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-sharp fa-regular fa-store p-1 mr-2"></i>
                            inventory
                        </router-link>
                    </li>
                    <hr>
                    <li class=" py-3">
                        <router-link :to="{ name: 'seller-inbox' }"
                            class="p-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-light fa-envelope p-1 mr-2"></i>
                            inbox
                        </router-link>
                    </li>
                    <hr>
                    <li class=" py-3">
                        <router-link :to="{ name: 'ads-manager' }"
                            class="p-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-regular fa-megaphone p-1 mr-2"></i>
                            ads manager
                        </router-link>
                    </li>
                    <hr>
                    <li class=" py-3">
                        <router-link :to="{ name: 'seller-faqs' }"
                            class="p-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-sharp fa-light fa-square-question  rounded-md border-black p-1 mr-2"></i>
                            FAQ
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>

        <section class="w-10/12 h-fit " :class="{ 'w-full': !show || medium }">
            <adminNavbar :dashboard="true" :customClass="'w-full'" @toggleSidebar="toggleSide" :medium="medium">
            </adminNavbar>
            <div class="content bg-gray-100 flex">
                <section class="w-full md:w-9/12" :class="{ 'w-10/12': !show }">
                    <div class="w-full flex flex-wrap justify-between p-2 sm:p-4">
                        <div class="w-full md:w-6/12 h-fit">
                            <h1 class="font-bold text-lg">Sales Monitoring Dashboard</h1>
                            <p class="text-gray-500 py-2 md:py-0 text-sm">
                                Hi, welcome back! Here's your summary of your
                                business.</p>
                        </div>
                        <div class="w-full lg:w-6/12 flex h-fit justify-end gap-2 text-xs sm:text-sm font-medium text-gray-500 
                            whitespace-nowrap">
                            <div class="w-[22%] border-r-2 p-1 pl-0">
                                <p>START DATE</p>
                                <p class="font-bold text-gray-700 py-1">Oct 10, 2018</p>
                            </div>
                            <div class="w-[22%] border-r-2 p-1">
                                <p>END DATE</p>
                                <p class="font-bold text-gray-700 py-1"> Oct 23, 2018</p>
                            </div>
                            <div class="w-4/12 p-1">
                                <p class="">PRODUCT CATEGORY </p>
                                <p class="font-bold text-gray-700 py-1">All Categories</p>
                            </div>
                            <baseButton class="w-3/12 md:w-2/12 rounded-sm h-12">Export</baseButton>
                        </div>
                    </div>
                    <!-- chart -->
                    <div class="chart bg-white mx-2 my-4 bg-white shadow-md p-4">
                        <h1 class="font-bold text-md uppercase mb-4">sales overview
                            <span class="font-semibold text capitalize text-gray-500">(all sales)</span>
                        </h1>
                        <div class="w-full flex flex-wrap justify-start md:justify-between gap-4 md:gap-0 h-fit whitespace-nowrap uppercase"
                            :class="{ 'gap-0': !show }">
                            <div class="w-3/12 sm:w-[15%]">
                                <p class="text-[10px] sm:text-xs font-bold text-gray-600">product sold</p>
                                <p class="font-bold text-lg sm:text-2xl mt-2">1,752</p>
                            </div>
                            <div class="w-3/12 sm:w-[15%]">
                                <p class="text-[10px] sm:text-xs font-bold text-gray-600">net revenue </p>
                                <p class="font-bold text-lg sm:text-2xl mt-2">
                                    <span class="text-sm text-gray-600 font-semibold">EGP</span> 3,550
                                </p>
                            </div>
                            <div class="w-4/12 sm:w-2/12">
                                <p class="text-[10px] sm:text-xs font-bold text-gray-600">products available</p>
                                <p class="font-bold text-lg sm:text-2xl mt-2">1,125</p>
                            </div>

                            <div class="w-full md:w-6/12">
                                <h1 class="font-bold text-xs capitalize">about revenue</h1>
                                <p class="whitespace-normal text-xs text-gray-500 normal-case mt-1 sm:mt-2">
                                    The total revenue from all events transactions. Depending on your
                                    implementation,
                                    this can include tax, discounts such as early bird promo.
                                    <router-link to="" class="text-blue-400 hover:underline font-medium">
                                        Learn more
                                    </router-link>
                                </p>
                            </div>
                        </div>
                        <hr class="my-4 w-full">
                        <div>
                            <chartComponent></chartComponent>
                        </div>
                    </div>
                </section>

                <section class="sechedule w-3/12 h-fit hidden md:block mr-2 my-4 bg-white shadow-md p-4"
                    :class="{ 'w-2/12': !show }">
                    <h1 class="uppercase font-bold text-sm">event calender</h1>
                    <div class="calender mt-1">
                        <Calendar :show="show" />
                    </div>

                </section>
            </div>
        </section>
    </div>
    <adminfooter></adminfooter>
</template>

<script>
import adminNavbar from '../../../../../components/admin/adminNavbar.vue';
import adminSidebarComponent from '../../../../../components/admin/adminSidebarComponent.vue';
import baseButton from '../../../../../components/baseButton.vue';
import adminfooter from '../../../../../components/profileFooter.vue';
import Calendar from '../../../../../components/admin/calender.vue';
import chartComponent from '../../../../../components/admin/chartComponent.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
export default {
    components: { adminNavbar, adminSidebarComponent, baseButton, Calendar, chartComponent, adminfooter },
    data() {
        return {
            shopName: 'SHOP.CO',
            shopOwner: 'John Doe',
            show: true,
            servShow: false,
        };
    },
    setup() {
        const medium = ref(window.innerWidth < 1120);
        const updateShow = () => {
            medium.value = window.innerWidth < 1120;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateShow);
        });
        return { medium };
    },
    methods: {
        toggleSide(show) {
            this.show = show;
        }
    },
    mounted() { }
};
</script>

<style scoped>
.toggle-small-side {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100%);
    transition: transform 0.5s ease, opacity 0.5s ease, visibility 0.5s;
}

.toggle-small-side-active {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
}

.nav-links-hidden {
    display: none;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.5s ease-in-out;
}

.nav-links-hidden.active {
    display: block;
    transform: translateX(0);
    opacity: 1;
}
</style>