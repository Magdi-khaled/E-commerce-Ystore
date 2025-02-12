<template>
    <nav class="flex flex-row flex-wrap items-center justify-between px-6 lg:px-12 py-4 ">
        <!-- LOGO SHOP.CO -->
        <div class="w-[11%]" :class="{ 'w-[27%]': sm }">
            <router-link :to="{ name: 'Home' }">
                <img src="../../assets/images/logo/logo.webp" alt="SHOP.CO">
            </router-link>
        </div>
        <div v-if="!sm" class="w-1/12 font-bold text-sm whitespace-nowrap">
            <router-link to="/shop.co/user/profile" class="flex sm:block hover:opacity-60">
                <h1 class="capitalize"><i class="fa-regular fa-location-dot"></i> address : </h1>
                <p class="text-gray-500 pl-2">{{ user.address }}</p>
            </router-link>

            <button v-if="currentlyShop == null" @click="this.$router.push({ name: 'Shop' })" class="capitalize
            p-2 mt-4 rounded-md text-gray-200 border-2 border-gray-300 bg-gray-900 hover:text-gray-900 hover:bg-gray-200
            transition duration-300">
                go to shop <i class="fa-solid fa-shop pl-2"></i>
            </button>
        </div>
        <div v-if="!sm" class="w-4/12 lg:w-5/12 search-bar relative hidden sm:block">
            <label for="userSreachTxt"
                class="text-sm sm:text-md flex w-full bg-gray-100 border-2 rounded-sm py-[6px] px-3">
                <i class="fa-regular fa-magnifying-glass text-sm sm:text-[16px] text-gray-400 pr-2"></i>
                <input name="searchText" v-model="userSreachTxt" @change="handleSearchResult" type="text"
                    placeholder="What are you looking for?" class="w-10/12 bg-[#f2f2f2] outline-none">
            </label>
            <ul v-if="userSreachTxt" class="w-full absolute z-50 bg-white border-2 border-t-0 rounded-b-md">
                <template v-for="item in handleSearchResult" :key="index" class="w-full flex flex-col">
                    <li class="w-96 py-2">
                        <router-link to="" class="hover:bg-[#2f2f2f] hover:text-white  px-8 py-2 cursor-pointer">
                            {{ item }}
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
        <div class="w-3/12 sm:w-1/12 font-bold capitalize relative cursor-pointer whitespace-nowrap hover:text-gray-600"
            @click="accountDropdown = !accountDropdown">
            <h1 class="text-sm hidden sm:block">ahlan {{ user.name.split(' ')[0] }}! <i
                    class="fa-solid fa-sort-down pl-1 sm:pl-2"></i>
            </h1>
            <p class="text-gray-700 sm:text-gray-500 text-sm flex items-center gap-1">
                <span v-if="!sm">my account</span>
                <span v-else>your account</span>
                <i class="fa-solid fa-bars block sm:hidden"></i>
            </p>
            <div v-show="accountDropdown"
                class="w-fit h-fit bg-white absolute z-[60] top-[100%] left-[-2%] border-2 rounded-md hover:text-gray-900">
                <ul @click.stop class="px-1 text-sm sm:text-md">
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Profile' }" class="hover:opacity-60">
                            <i class="fa-solid fa-user pr-1"></i>
                            profile
                        </router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Qrcode' }" class="hover:opacity-60">
                            <i class="fa-solid fa-qrcode pr-1"></i> QR code</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Cart' }" class="hover:opacity-60">
                            <i class="fa-solid fa-heart pr-1"></i> wishlist</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Orders' }" class="hover:opacity-60">
                            <i class="fa-solid fa-list-dropdown pr-1"></i> orders</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Returns' }" class="hover:opacity-60">
                            <i class="fa-duotone fa-regular fa-rotate-left pr-1"></i>
                            returns</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Payments' }" class="hover:opacity-60">
                            <i class="fa-duotone fa-solid fa-wallet pr-1"></i>
                            payments</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-Notifications' }" class="hover:opacity-60">
                            <i class="fa-solid fa-bell pr-1"></i>
                            notifactions</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link :to="{ name: 'User-SecuritySittings' }" class="hover:opacity-60">
                            <i class="fa-solid fa-lock pr-1"></i>
                            security sittings</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <button @click="uLogout" class="hover:opacity-60">
                            <i class="fa-solid fa-door-open"></i>
                            signout
                        </button>
                    </li>
                    <hr>
                </ul>
            </div>
        </div>
        <span v-if="sm" class="px-4">|</span>
        <!-- <div class="w-2/12 md:w-1/12 border-r-2 sm:border-x-2 px-2 font-bold capitalize">
            <router-link class="flex items-center justify-center text-sm sm:text-md" to="">
                <span class="tracking-wide hidden sm:block">wishlist</span>
                <i class="fa-regular fa-heart text-lg pl-0 sm:pl-2"></i>
            </router-link>
        </div> -->
        <div class="w-2/12 lg:w-1/12 px-2 font-bold capitalize whitespace-nowrap">
            <button class="ml-2 w-full flex items-center justify-end text-sm sm:text-md hover:text-gray-500"
                @click="cartOn = true">
                <!-- <span class="tracking-wide hidden sm:block"> -->
                <span class="tracking-wide">your cart </span>
                <i class="fa-solid fa-cart-shopping pl-2"></i>
            </button>
        </div>
        <!-- side-shopping-cart -->
        <NavigatedCart :showCart="cartOn" @closeCart="cartOn = false" />

        <div v-if="sm" class="w-full relative pt-4">
            <label for="" class="relative">
                <input name="searchText" v-model="userSreachTxt" @change="handleSearchResult" type="text"
                    placeholder="What are you looking for?"
                    class="w-full mb-2 p-2 pl-8 bg-[#f2f2f2] outline-none rounded-sm text-sm focus:bg-white focus:border-[1px]">
                <i class="fa-regular fa-magnifying-glass absolute left-[10px] top-[18%] text-md text-gray-400"></i>
                <ul v-if="userSreachTxt" class=" absolute bg-white w-full z-50 rounded-b-xl">
                    <template v-for="item in handleSearchResult" :key="index">
                        <li class="hover:bg-[#2f2f2f] hover:text-white px-10 py-2 cursor-pointer">{{ item }}
                        </li>
                    </template>
                </ul>
            </label>
        </div>
        <div v-if="sm" class="w-full font-bold text-sm whitespace-nowrap flex justify-between">
            <router-link to="/shop.co/user/profile" class="flex sm:block hover:opacity-60">
                <h1 class="capitalize text-xs">
                    <i class="fa-regular fa-location-dot"></i> address :
                    <span class="text-gray-500 pl-2">{{ user.address }}</span>
                </h1>
            </router-link>
            <button v-if="currentlyShop == null" @click="this.$router.push({ name: 'Shop' })" class="capitalize
            px-2 rounded-md text-gray-200 border-2 border-gray-300 bg-gray-900 hover:text-gray-900 hover:bg-gray-200
            transition duration-300">
                go to shop <i class="fa-solid fa-shop pl-2"></i>
            </button>
        </div>
    </nav>
    <hr>
    <div class="hidden">{{ allv }}</div>
    <div v-show="this.$route.name.split('-')[0] !== 'user'" class="relative">
        <button @click="scrollLeft" class="prev-btn text-gray-300 bg-gray-200 font-bold absolute z-[50] left-2 
        px-2 py-0 sm:py-[1.5px] shadow-sm hover:text-gray-700 hover:bg-gray-400 transition-all duration-100">
            <i class="fa-solid fa-angle-left text-sm sm:text-md"></i>
        </button>
        <ul ref="scrollContainer"
            class="border-b-[1px] bg-white w-full px-5 flex justify-between overflow-x-scroll scroll-smooth capitalize text-sm sm:text-[16px] font-medium whitespace-nowrap scrollbar-hidden">
            <!-- class="border-b-[1px] absolute z-[50] bg-white w-full px-5 flex justify-between overflow-x-scroll scroll-smooth capitalize text-sm sm:text-[16px] font-medium whitespace-nowrap scrollbar-hidden"> -->
            <li class="hover:bg-gray-200 text-center py-1 transition-all duration-100"
                v-for="(item, index) in NavigationItems" :key="index">
                <router-link class="px-4 sm:px-10 md:px-14 py-1" :to="{ name: item.route }">
                    {{ item.label }}
                </router-link>
            </li>
        </ul>
        <button @click="scrollRight" class="next-btn text-gray-300 bg-gray-200 font-bold absolute z-[50] right-2 top-0
        px-2 py-[1.5px] shadow-sm hover:text-gray-700 hover:bg-gray-400 transition-all duration-100">
            <i class="fa-solid fa-angle-right text-sm sm:text-md"></i>
        </button>
    </div>
</template>
<script>
import NavigatedCart from '../shop/NavigatedCart.vue';
import db from '../../assets/db/data.json';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { mapActions } from 'vuex';

export default {
    name: 'UserNavbar',
    components: { NavigatedCart },
    props: ['currentlyShop'],
    data() {
        return {
            userSreachTxt: '',
            accountDropdown: false,
            user: {
                name: 'Magdi Khaled',
                address: 'Giza - El-warrak'
            },
            hiddenNav: false,
            cartOn: false,
            products: db.map(v => v.title),
            NavigationItems: [
                { label: "Home", route: "Home" },
                { label: "men's fashion", route: "men-fashion" },
                { label: "women's fashion", route: "women-fashion" },
                { label: "boys wear", route: "boys-wear" },
                { label: "girls wear", route: "girls-wear" },
                { label: "sports", route: "sport-wear" },
                { label: "shoes", route: "shoes-fashion" },
                { label: "accessories", route: "accessories" },
                { label: "bags-luggage", route: "bags-luggage" },
            ],
        }
    },
    computed: {
        handleSearchResult() {
            const searchedList = this.products.filter((item) =>
                item.toLowerCase().toString().includes(this.userSreachTxt.toLowerCase())
            );
            console.log('searching...');
            setTimeout(() => {
                this.show = false;
            }, 1000);
            this.show = true;
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
            };
            console.log('current:', to.name);
            sessionStorage.setItem('allT', routeMapping[to.name]);
            // Perform any logic needed on route change
        }
    },
    methods: {
        ...mapActions(['userLogout']),
        async uLogout() {
            try {
                await this.userLogout();
                setTimeout(() => {
                    this.$router.push({ name: 'customer-login' });
                }, 1500)
            } catch (error) {
                console.error('logout error : ', error);
            }
        },
        scrollLeft() {
            this.$refs.scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
        },
        scrollRight() {
            this.$refs.scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
        },
    },
    setup() {
        const sm = ref(window.innerWidth < 880);
        const updateShow = () => {
            sm.value = window.innerWidth < 880;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateShow);
        });
        return {
            sm
        }
    }
}
</script>
<style scoped>
/* Hide scrollbar */
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
