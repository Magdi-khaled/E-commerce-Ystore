<template>
    <!-- SALE FIRST SIGN UP -->
    <div class="bg-black py-1 flex items-center justify-start px-2 md:px-0 sm:justify-center">
        <p class="text-white text-sm">Sign up and get 20% of your first order.
            <router-link :to="{ name: 'User-Signup' }" class="underline font-bold">Sign Up Now</router-link>
            <button>
                <i class="fa-light fa-xmark text-white text-md md:text-xl top-2 md:top-0 right-4"></i>
            </button>
        </p>
    </div>
    <!-- NAVIGATION -->
    <nav class="flex flex-row items-center justify-between px-4 md:px-6 lg:px-14 py-2">
        <button @click="toggleNavigation = !toggleNavigation" v-if="!handleNavigation"
            class="pr-5 hover:text-gray-500 text-xl">
            <i class="fa-solid fa-bars"></i>
        </button>

        <!-- LOGO SHOP.CO -->
        <div class="w-[25%] md:w-[20%] lg:w-[12%]">
            <router-link :to="{ name: 'Home' }">
                <img class="w-[80%]" src="../assets/images/logo/logo.png" alt="SHOP.CO">
            </router-link>
        </div>

        <!-- NAV-LINKS -->
        <div v-if="handleNavigation" class="nav-links w-[30%]">
            <ul class="list-none flex items-center gap-5 text-sm sm:text-md">
                <li class="relative cursor-pointer py-4">
                    <router-link :to="{ name: 'Home' }" class="whitespace-nowrap capitalize">
                        <i
                            class="fa-sharp fa-regular fa-house border-[2px] rounded-md border-black p-1 text-sm sm:text-[15px]"></i>
                        home
                    </router-link>
                </li>
                <li @mouseover="dropStoreCategories = true" @mouseleave="dropStoreCategories = false"
                    class="whitespace-nowrap relative cursor-pointer py-4">
                    <router-link :to="{ name: 'Shop' }" class="whitespace-nowrap capitalize">
                        <i class="fa-sharp fa-regular fa-store border-[2px] rounded-md border-black p-1"></i> store
                    </router-link>
                    <i class="fa-regular fa-chevron-down text-xs"></i>

                    <ul v-show="dropStoreCategories"
                        class="text-black bg-white absolute z-20 left-0 top-11 border-2 rounded-md">
                        <li v-for="(item, index) in StoreLinks" :key="index" class="capitalize" :class="{
                            'rounded-t-md': item.name === 'men-fashion',
                            'rounded-b-md': item.name === 'formal-wear'
                        }">
                            <router-link class="p-2 block w-full h-full" :to="{ name: item.name }">
                                {{ item.label }}</router-link>
                            <hr>
                        </li>
                    </ul>
                </li>
                <li class="py-4">
                    <router-link to="#" class="whitespace-nowrap capitalize">
                        <i class="fa-solid fa-scarf border-[2px] rounded-md border-black p-1"></i> brands
                    </router-link>
                </li>
                <li class="py-4">
                    <router-link to="#" class="whitespace-nowrap capitalize">
                        <i class="fa-light fa-book-open-reader border-[2px] rounded-md border-black p-1"></i> about us
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- CART - PROFILE - SEARCH -->
        <div class="w-7/12 md:w-8/12 lg:w-[50%] flex flex-row">
            <!-- SEARCH-BAR -->
            <div v-if="!handleSearchBar" class="w-full lg:w-10/12 relative">
                <label for="searchText" class="relative">
                    <i class="fa-regular fa-magnifying-glass absolute left-[10px] top-[13%] text-md text-gray-400"></i>
                    <input name="searchText" v-model="searchText" @change="handleSearchResult" type="text"
                        placeholder="What are you looking for?" class="w-full border-2 p-2 pl-8 bg-[#f2f2f2] outline-none rounded-sm text-sm md:text-md focus:bg-white 
                        focus:border-[1px] focus:border-gray-500 focus:shadow-md">
                    <div v-if="handleSearchResult.length && searchText"
                        class="w-full absolute z-[100] bg-white max-h-[25em] overflow-y-auto border-[1px] border-gray-500 border-t-0 rounded-b-sm shadow-md">
                        <ul class="mb-4">
                            <h1 class="px-4 py-2 text-gray-500 capitalize text-sm">matching keywords</h1>
                            <li v-for="item in handleSearchResult"
                                class="max-h-[3em] overflow-hidden text-ellipsis text-sm md:text-md leading-7 border-b-[1px]">
                                <router-link :to="{ name: 'Product', params: { id: item._id } }"
                                    class="block w-full h-full first-letter:capitalize hover:bg-gray-700 hover:text-white px-6 py-2 cursor-pointer">
                                    {{ item.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </label>
            </div>
            <!--  -->
            <div class="w-full sm:w-4/12 md:w-3/12 flex items-center justify-end">
                <!-- cart -->
                <button @click="cartOn = true" class="w-4/12 pr-4 text-center hover:opacity-70" title="cart">
                    <i class="fa-solid fa-cart-shopping text-md sm:text-xl"></i>
                </button>
                <NavigatedCart :showCart="cartOn" @closeCart="cartOn = false" />
                <!-- sign in -->
                <BaseButton @click="this.$router.push({ name: 'User-Login' })"
                    class="py-[5px] px-[6px] whitespace-nowrap rounded-sm text-sm sm:text-md">sign in
                </BaseButton>
            </div>
        </div>
    </nav>

    <!-- hidden navbar -->
    <Teleport to='body'>
        <nav
            :class="[`nav-links-hidden overflow-y-auto border-r-4 border-r-gray-600 
            bg-white pt-4 fixed z-20 left-0 top-0 h-full w-full sm:w-8/12 md:w-6/12 p-4`, { active: toggleNavigation }]">
            <div class="flex gap-6 mb-2">
                <button @click="toggleNavigation = false" class="px-2 hover:text-gray-500 text-xl">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div class="w-4/12">
                    <img class="w-[80%]" src="../assets/images/logo/logo.png" alt="shop.co">
                </div>
            </div>
            <hr>
            <ul lass="list-none W-6/12">
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link :to="{ name: 'Home' }"><i class="fa-solid fa-house w-1/12"></i>
                        home</router-link>
                </li>
                <hr>
                <li @click="dropCategories = !dropCategories"
                    class="hover:font-medium whitespace-nowrap cursor-pointer capitalize">
                    <router-link :to="{ name: 'Shop' }">
                        <i class="fa-solid fa-shop w-1/12"></i>
                        store
                    </router-link>
                    <i v-if="dropCategories" class="fa-regular fa-chevron-up text-xs font-bold"></i>
                    <i v-else class="fa-regular fa-chevron-down text-xs font-bold"></i>
                </li>
                <ul v-show="dropCategories" class="text-black bg-white transition-all duration-150 ml-4">
                    <li v-for="(item, index) in StoreLinks" :key="index" class="p-2 border-b-2 border-l-2 capitalize">
                        <router-link class="py-2" :to="{ name: item.name }">{{ item.label }}</router-link>
                    </li>
                </ul>
                <hr>
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link to="#"><i class="fa-solid fa-badge-percent w-1/12"></i> OnSale</router-link>
                </li>
                <hr>
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link to="#"><i class="fa-solid fa-clothes-hanger w-1/12"></i> brands</router-link>
                </li>
                <hr>
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link to="#"><i class="fa-brands fa-blogger-b w-1/12"></i> blogs</router-link>
                </li>
                <hr>
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link to="#"><i class="fa-solid fa-square-question w-1/12"></i> about us</router-link>
                </li>
                <hr>
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link to="#"><i class="fa-solid fa-phone-volume w-1/12"></i> Support</router-link>
                </li>
                <hr>
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white uppercase">
                    <router-link to="#"><i class="fa-solid fa-message-question w-1/12"></i> faq</router-link>
                </li>
            </ul>
        </nav>
    </Teleport>

    <!-- Small Search  -->
    <div v-if="handleSearchBar" class="w-full py-2 px-4 relative">
        <label for="searchText" class="relative border-2">
            <i class="fa-regular fa-magnifying-glass absolute left-[10px] top-[5%] text-sm text-gray-400"></i>
            <input name="searchText" v-model="searchText" @change="handleSearchResult" type="text"
                placeholder="What are you looking for?"
                class="w-full p-2 pl-8 bg-[#f2f2f2] outline-none rounded-sm text-sm sm:text-md focus:bg-white focus:border-[1px]">

            <div v-if="handleSearchResult.length && searchText"
                class="w-full absolute z-50 bg-white max-h-[15em] overflow-y-auto border-2 border-t-0 rounded-b-sm">
                <ul class="mb-4">
                    <h1 class="px-4 py-2 text-gray-500 capitalize text-sm">matching keywords</h1>
                    <li v-for="item in handleSearchResult"
                        class="max-h-[3em] overflow-hidden text-ellipsis text-sm md:text-md leading-7 border-b-[1px]">
                        <router-link :to="{ name: 'Product', params: { id: item._id } }"
                            class="block w-full h-full first-letter:capitalize hover:bg-gray-700 hover:text-white px-6 py-2 cursor-pointer">
                            {{ item.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </label>
    </div>
    <hr>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavigatedCart from '../components/shop/NavigatedCart.vue';
import BaseButton from '../components/BaseButton.vue';
import data from '../assets/db/data.json';

export default {
    name: 'BaseNavbar',
    components: { NavigatedCart, BaseButton },
    data() {
        return {
            dropStoreCategories: false,
            dropCategories: false,
            toggleNavigation: false,
            searchText: '',
            cartOn: false,
            products: data,
            userToken: localStorage.getItem('token'),
            StoreLinks: [
                { name: 'men-fashion', label: 'men\'s fashion' },
                { name: 'women-fashion', label: 'women\'s fashion' },
                { name: 'boys-wear', label: 'boys wear' },
                { name: 'girls-wear', label: 'girls wear' },
                { name: 'sport-wear', label: 'sport wear' },
                { name: 'bags-luggage', label: 'bags & luggage' },
                { name: 'shoes-fashion', label: 'shoes' },
                { name: 'formal-wear', label: 'formal wear' }
            ]
        }
    },
    computed: {
        handleNavigation() {
            if (window.innerWidth <= 1150) this.showSideNav = false;
            else this.showSideNav = true;
            return this.showSideNav;
        },
        handleSearchResult() {
            const searchedList = data.filter((item) =>
                item.title.toLowerCase().toString().includes(this.searchText.toLowerCase())
            );
            console.log('searching...');
            setTimeout(() => {

            }, 1200);
            return searchedList;
        },
        allv() {
            const routeMapping = {
                "Shop": "all fashion",
                "women-fashion": "all women's fashion",
                "men-fashion": "all men's fashion",
                "bags-luggage": "all bags & luggage",
                "shoes-fashion": "all shoes",
                "accessories": "all accessories",
                "sport-wear": "all sport wear",
                "girls-wear": "all girls fashion",
                "boys-wear": "all boys fashion",
                "formal-wear": "all formal wear",
            };
            if (routeMapping[this.$route.name])
                sessionStorage.setItem('allT', routeMapping[this.$route.name]);
            return sessionStorage.getItem('allT');
        },
    },
    watch: {
        $route(to, from) {
            console.log("Route changed from:", from.name);
            console.log("Route changed to:", to.name);
            const routeMapping = {
                "Shop": "all fashion",
                "women-fashion": "all women's fashion",
                "men-fashion": "all men's fashion",
                "bags-luggage": "all bags & luggage",
                "shoes-fashion": "all shoes",
                "accessories": "all accessories",
                "sport-wear": "all sport wear",
                "girls-wear": "all girls fashion",
                "boys-wear": "all boys fashion",
                "formal-wear": "all formal wear",
            };
            console.log('current:', to.name);
            sessionStorage.setItem('allT', routeMapping[to.name]);
            // Perform any logic needed on route change
        }
    },
    setup() {
        const showSideNav = ref(window.innerWidth > 1150);
        const handleSearchBar = ref(window.innerWidth <= 592);

        const updateShow = () => {
            showSideNav.value = window.innerWidth > 1150;
            handleSearchBar.value = window.innerWidth <= 592;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateShow);
        });
        return { showSideNav, handleSearchBar };
    },

}
</script>
<style scoped>
@import url('../assets/stylesheets/shop/nav-bar.style.css');
</style>