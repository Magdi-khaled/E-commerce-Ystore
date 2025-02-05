<template>
    <hr>
    <div class="flex justify-end">
        <div class="w-2/12 flex border-r-2 border-r-gray-300 " :class="{
            active: show && !medium, 'nav-links-hidden': !medium, 'toggle-small-side': medium,
            'toggle-small-side-active w-8/12 sm:w-6/12 md:w-4/12': show && medium
        }">
            <aside class="w-full bg-white h-full">
                <div class="w-full flex items-center">
                    <div class="w-full flex items-center px-2 mt-2" :class="{ 'w-9/12 mt-0 text-sm': medium }">
                        <i class="fa-solid fa-shop text-3xl sm:text-4xl p-2"></i>
                        <div class="w-full">
                            <p class="text-sm capitalize font-bold">{{ shopName }}</p>
                            <p class="text-xs capitalize font-medium text-gray-600">AD/ <span
                                    class="text-gray-700 font-semibold">{{ shopOwner }}</span></p>
                        </div>
                    </div>
                    <div class="w-2/12 text-center">
                        <button v-if="medium" @click="show = !show">
                            <i class="fa-regular fa-xmark text-xl"></i>
                        </button>
                    </div>
                </div>
                <hr class="border-t-[1px] border-t-gray-300">
                <ul lass="list-none w-full lg:W-8/12">
                    <li class="">
                        <router-link :to="{ name: 'AD-Dashboard' }"
                            class="block w-full h-full py-4 px-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-sharp fa-solid fa-chart-line p-1 mr-2"></i>
                            Dashboard
                        </router-link>
                    </li>
                    <hr>
                    <li class="w-full text-start">
                        <button @click="servShow = !servShow"
                            class="w-full flex items-center justify-between py-4 px-2 font-medium capitalize text-black hover:text-gray-700">
                            <div>
                                <i class="fa-regular fa-box-open-full p-1 mr-1"></i>
                                services
                            </div>
                            <i v-if="!servShow" class="fa-solid fa-angle-down pr-2"></i>
                            <i v-else class="fa-solid fa-angle-up pr-2"></i>
                        </button>
                    </li>
                    <hr>
                    <div v-if="servShow" class="pl-4 w-full">
                        <li class="border-l-[1px] border-b-2 border-l-gray-300 rounded-l-md">
                            <router-link :to="{ name: 'Add-Product' }"
                                class="block w-full h-full p-3 font-medium capitalize text-black hover:text-gray-600 text-sm">
                                <i class="fa-thin fa-basket-shopping-plus font-bold text-sm pr-1"></i> add product
                            </router-link>
                        </li>
                        <li class="border-l-[1px] border-b-[1px] border-l-gray-300 rounded-l-md">
                            <router-link :to="{ name: 'AD-Shop', params: { shopName: 'ZARA', shopId: 1 } }"
                                class="block w-full h-full p-3 font-medium capitalize text-black hover:text-gray-600 text-sm">
                                <i class="fa-brands fa-shopware text-sm pr-1"></i> show career
                            </router-link>
                        </li>
                    </div>
                    <li class="">
                        <router-link :to="{ name: 'AD-Inventory' }"
                            class="block w-full h-full py-4 px-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-sharp fa-regular fa-store p-1 mr-2"></i>
                            inventory
                        </router-link>
                    </li>
                    <hr>
                    <li class="">
                        <router-link :to="{ name: 'AD-Inbox' }"
                            class="block w-full h-full py-4 px-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-light fa-envelope p-1 mr-2"></i>
                            inbox
                        </router-link>
                    </li>
                    <hr>
                    <li class="">
                        <router-link :to="{ name: 'AD-adsManager' }"
                            class="block w-full h-full py-4 px-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-regular fa-megaphone p-1 mr-2"></i>
                            ads manager
                        </router-link>
                    </li>
                    <hr>
                    <li class="">
                        <router-link :to="{ name: 'AD-Faqs' }"
                            class="block w-full h-full py-4 px-2 font-medium capitalize text-black hover:text-gray-600">
                            <i class="fa-sharp fa-light fa-square-question  rounded-md border-black p-1 mr-2"></i>
                            FAQ
                        </router-link>
                    </li>
                </ul>
            </aside>
        </div>

        <section class="w-10/12 h-fit " :class="{ 'w-full': !show || medium }">
            <ADNavigation :dashboard="true" :customClass="'w-full'" @toggleSidebar="toggleSide" :medium="medium" />
            <div class="content bg-gray-100 flex">
                <section class="w-full md:w-9/12" :class="{ 'w-10/12': !show }">
                    <div class="w-full flex flex-wrap justify-between p-2 sm:p-4">
                        <div class="w-full md:w-5/12 h-fit">
                            <h1 class="font-bold text-lg">Sales Monitoring Dashboard</h1>
                            <p class="text-gray-500 py-2 md:py-0 text-sm">
                                Hi, welcome back! Here's your summary of your
                                business.</p>
                        </div>
                        <div class="w-full lg:w-7/12 flex h-fit justify-end gap-2 text-xs sm:text-sm font-medium text-gray-500 
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
                            <div class="w-2/12 mr-1 sm:mr-0">
                                <BaseButton class="px-4 sm:px-6 py-[8px] sm:py-[10px] rounded">Export</BaseButton>
                            </div>
                        </div>
                    </div>
                    <!-- chart -->
                    <div class="chart mx-2 my-4 bg-white shadow-md p-4">
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
                            <ChartComponent :startDate="'2024-11-23'" :endDate="'2025-01-10'" />
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
    <InFooter />
</template>

<script>
import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import InFooter from '../../../../../components/InFooter.vue';
import Calendar from '../../../../../components/admin/Calender.vue';
import ChartComponent from '../../../../../components/admin/ChartComponent.vue';

import { ref, onMounted, onBeforeUnmount } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { ADNavigation, BaseButton, Calendar, ChartComponent, InFooter },
    data() {
        return {
            shopName: 'ZARA',
            shopOwner: 'Magdi Khaled',
            show: true,
            servShow: false,
            shopProducts: [],
            currentPage: 1,
            pageSize: 20,
            ascending: false,
            descending: false,
            showFilter: false,
            mostPopular: false
        };
    },
    setup() {
        const medium = ref(window.innerWidth < 1080);
        const updateShow = () => {
            medium.value = window.innerWidth < 1080;
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
        ...mapActions(['fetchProducts']),
        toggleSide(show) {
            this.show = show;
        },
        initData() {
            this.shopProducts = this.Get_Products;
            // console.log('shopProducts:', this.shopProducts);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.Get_Products.slice(startIndex, endIndex);
        },
        async fetchData() {
            try {
                await this.fetchProducts();
                this.initData();
            }
            catch (err) {
                console.error('fetching shop products error : ', err);
            }
        },
        infoRoute(id) {
            return `/shop.co/shop/product/${id}`;
        },
    },
    computed: {
        ...mapGetters(['Get_Products']),

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