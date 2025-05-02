<script setup>
import NavigatedCart from '@/components/shop/NavigatedCart.vue';
import data from '@/composables/data.js';
import { ref, onMounted, onBeforeUnmount, reactive, watch, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

defineProps(['currentlyShop']);

const route = useRoute();
const router = useRouter();
const store = useStore();

const userSreachTxt = ref('');
const accountDropdown = ref(false);
const user = reactive({
    name: 'Magdi Khaled',
    address: 'Giza - El-warrak'
});
const cartOn = ref(false);
const products = reactive(data);
const scrollContainer = ref(null);
const wishlist = computed(() => store.getters['Get_Wishlist'])
const cart = computed(() => store.getters['Get_CartItems'])

const NavigationItems = reactive([
    { label: "Home", route: "Home" },
    { label: "men's fashion", route: "men-fashion" },
    { label: "women's fashion", route: "women-fashion" },
    { label: "boys wear", route: "boys-wear" },
    { label: "girls wear", route: "girls-wear" },
    { label: "sports", route: "sport-wear" },
    { label: "shoes", route: "shoes-fashion" },
    { label: "accessories", route: "accessories" },
    { label: "bags-luggage", route: "bags-luggage" },
]);

const routeMapping = reactive({
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
});

const handleSearchResult = computed(() => products.filter((item) =>
    item.title.toLowerCase().toString().includes(userSreachTxt.value.toLowerCase())));

const allv = computed(() => {
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
    if (routeMapping[route.name])
        sessionStorage.setItem('allT', routeMapping[route.name]);
    return sessionStorage.getItem('allT');
});

watch(
    () => route.name,
    (to, from) => {
        console.log("Route changed from:", from);
        console.log("Route changed to:", to);

        const mapped = routeMapping[to] || '';
        console.log('current:', to);
        sessionStorage.setItem('allT', mapped);

        nextTick(() => {
            window.location.reload();
        });
    }
);
onMounted(() => store.dispatch('FetchWishlist'));

const uLogout = async () => {
    try {
        await store.dispatch('UserLogout');
        setTimeout(() => {
            router.push({ name: 'User-Login' });
        }, 1500)
    } catch (error) {
        console.error('Logout Error : ', error);
    }
};
const scrollLeft = () => {
    scrollContainer.value?.scrollBy({ left: -200, behavior: "smooth" });
};
const scrollRight = () => {
    scrollContainer.value?.scrollBy({ left: 200, behavior: "smooth" });
};
</script>

<template>
    <nav class="flex flex-row flex-wrap items-center justify-between px-2 sm:px-6 lg:px-12 py-4 ">
        <div class="w-[22%] sm:w-[15%] md:w-[12%] lg:w-[9%] order-0">
            <router-link :to="{ name: 'Home' }">
                <img src="@/assets/media/logo/logo.png" alt="SHOP.CO">
            </router-link>
        </div>
        <!-- <div v-if="!sm" class="w-1/12 order-5 font-bold text-sm whitespace-nowrap"> -->
        <div
            class="w-full sm:w-4/12 md:w-1/12 order-6 md:order-1 sm:block flex items-center justify-between font-bold text-sm whitespace-nowrap">
            <router-link to="/shop.co/user/profile" class="flex sm:block hover:opacity-60">
                <h1 class="capitalize"><i class="fa-regular fa-location-dot"></i> address : </h1>
                <p class="text-gray-500 pl-2">{{ user.address }}</p>
            </router-link>

            <button v-if="currentlyShop == null" @click="router.push({ name: 'Shop' })" class="capitalize
            p-2 mt-4 rounded-md text-gray-200 border-2 border-gray-300 bg-gray-900 hover:text-gray-900 hover:bg-gray-200
            transition duration-300">
                go to shop <i class="fa-solid fa-shop pl-2"></i>
            </button>
        </div>
        <!-- <div v-if="!sm" class="w-4/12 md:w-3/12 lg:w-5/12 search-bar relative hidden sm:block"> -->
        <div class="w-full md:w-3/12 order-5 md:order-2 my-3 md:my-0 lg:w-5/12 search-bar relative">
            <label for="searchText"
                class="text-sm sm:text-md flex w-full bg-gray-100 border-2 rounded-sm py-[6px] px-3">
                <i class="fa-regular fa-magnifying-glass text-sm sm:text-[16px] text-gray-400 pr-2"></i>
                <input name="searchText" id="searchText" v-model="userSreachTxt" @input="handleSearchResult" type="text"
                    autofill="off" placeholder="What are you looking for?" class="w-full bg-[#f2f2f2] outline-none">
            </label>
            <div v-show="userSreachTxt" class="w-full absolute z-50 bg-white ">
                <div v-if="handleSearchResult.length"
                    class="max-h-[15em] overflow-y-auto border-2 border-t-0 rounded-b-sm">
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
            </div>
        </div>
        <div class="w-3/12 sm:w-2/12 md:w-1/12 order-2 font-bold capitalize relative cursor-pointer whitespace-nowrap hover:text-gray-600"
            @click="accountDropdown = !accountDropdown">
            <h1 class="text-sm hidden sm:block">ahlan {{ user.name.split(' ')[0] }}! <i
                    class="fa-solid fa-sort-down pl-1 sm:pl-2"></i>
            </h1>
            <p class="text-gray-700 sm:text-gray-500 text-sm flex items-center gap-1">
                <span class="md:block hidden">my account</span>
                <span class="md:hidden block ">your account</span>
                <i class="fa-solid fa-bars block sm:hidden"></i>
            </p>
            <transition name="fade">
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
                            <router-link :to="{ name: 'User-Wishlist' }" class="hover:opacity-60">
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
            </transition>
        </div>
        <span class="block md:hidden px-4 order-3 md:order-4">|</span>
        <div
            class="w-4/12 sm:w-3/12 md:w-[15%] lg:w-2/12 order-3 md:order-4 flex justify-between font-semibold capitalize whitespace-nowrap">
            <router-link :to="{ name: 'User-Wishlist' }"
                class="w-8/12 flex items-center justify-center text-md hover:text-gray-600" to="">
                <span class="tracking-wide text-sm sm:text-md">wishlist</span>
                <i class="fa-regular fa-heart text-lg pl-1"></i>
                <span class="text-xs pt-2 mt-1">({{ wishlist.length }})</span>
            </router-link>
            <button class="ml-2 w-4/12 relative flex items-center justify-end text-xl hover:text-gray-500"
                @click="cartOn = true">
                <!-- <span class="tracking-wide">your cart </span> -->
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="bg-white pt-2 text-xs mt-1">
                    ({{ cart.length }})</span>
            </button>
        </div>
        <!-- side-shopping-cart -->
        <NavigatedCart v-model:show="cartOn" />
    </nav>
    <hr>
    <div class="hidden">{{ allv }}</div>
    <div v-if="route.name.split('-')[0] !== 'user'" class="relative overflow-hidden">
        <button @click="scrollLeft" class="prev-btn text-gray-300 bg-gray-200 font-bold absolute z-[50] left-2 
        px-2 py-0 sm:py-[1.5px] shadow-sm hover:text-gray-700 hover:bg-gray-400 transition-all duration-100">
            <i class="fa-solid fa-angle-left text-sm sm:text-md"></i>
        </button>
        <ul ref="scrollContainer"
            class="border-b-[1px] bg-white w-full px-5 flex justify-between overflow-x-scroll scroll-smooth capitalize text-sm sm:text-[16px] font-medium whitespace-nowrap scrollbar-hidden">
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

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

.scrollbar-hidden {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>