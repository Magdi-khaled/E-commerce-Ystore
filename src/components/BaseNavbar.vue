<template>
    <!-- SALE FIRST SIGN UP -->
    <!-- <div class="bg-black py-1 flex items-center justify-start px-2 md:px-0 sm:justify-center">
        <p class="text-white text-sm">Sign up and get 20% of your first order.
            <router-link :to="'/shop.co/signup'" class="underline font-bold">Sign Up Now</router-link>
            <button>
                <i class="fa-light fa-xmark text-white text-md md:text-xl top-2 md:top-0 right-4"></i>
            </button>
        </p>
    </div> -->
    <!-- NAVIGATION -->
    <nav class="flex flex-row items-center justify-between px-4 md:px-6 lg:px-14 py-2">
        <button @click="hiddenNav = !hiddenNav" v-if="!showNav" class="pr-5 hover:text-gray-500 text-xl">
            <i class="fa-solid fa-bars"></i>
        </button>
        <!-- LOGO SHOP.CO -->
        <div class="w-[25%] md:w-[20%] lg:w-[10%]">
            <router-link :to="{ name: 'Home' }">
                <img class="w-[100%]" src="../assets/images/logo/logo.webp" alt="SHOP.CO">
            </router-link>
        </div>
        <!-- NAV-LINKS -->
        <div v-if="showNav" class="nav-links w-[30%]">
            <ul class="list-none flex gap-5 text-sm sm:text-md">
                <li class="relative cursor-pointer py-4">
                    <router-link :to="{ name: 'Home' }" class="whitespace-nowrap capitalize">
                        <i
                            class="fa-sharp fa-regular fa-house border-[2px] rounded-md border-black p-1 text-sm sm:text-[15px]"></i>
                        home
                    </router-link>
                </li>
                <!-- <li class="relative cursor-pointer py-4"> -->
                <li @mouseover="dropDown = true" @mouseleave="dropDown = false"
                    class="whitespace-nowrap relative cursor-pointer py-4">
                    <router-link to="/shop.co/shop" class="whitespace-nowrap capitalize">
                        <i class="fa-sharp fa-regular fa-store border-[2px] rounded-md border-black p-1"></i> store
                    </router-link>
                    <i class="fa-regular fa-chevron-down text-xs"></i>
                    <ul v-if="dropDown"
                        class="dropdown text-black bg-white absolute z-20 left-0 top-11 border-2 rounded-md">
                        <li class="px-3 py-2 rounded-t-md">
                            <router-link :to="{ name: 'men-fashion' }">men's fashion</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link :to="{ name: 'women-fashion' }">women's fashion</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link class="py-2" :to="{ name: 'boys-wear' }">boys wear</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link class="py-2" :to="{ name: 'girls-wear' }">girls wear</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link :to="{ name: 'sport-wear' }">sport wear</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link :to="{ name: 'bags-luggage' }">bags & luggage</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link :to="{ name: 'shoes-fashion' }">shoes</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2">
                            <router-link :to="{ name: 'watches' }">watches</router-link>
                        </li>
                        <hr>
                        <li class="px-3 py-2  rounded-b-md">
                            <router-link :to="{ name: 'formal-wear' }">formal</router-link>
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
            <div v-if="!searchIcon" class="w-full lg:w-10/12 relative search-bar">
                <label for="searchText" class="flex w-11/12 md:w-full bg-[#f2f2f2] rounded-md py-[7px] px-4">
                    <i class="fa-regular fa-magnifying-glass text-lg md:text-xl text-gray-400 pr-2"></i>
                    <input name="searchText" v-model="searchText" @change="handleSearchResult" type="text"
                        placeholder="What are you looking for?" class="w-full bg-[#f2f2f2] outline-none">
                </label>
                <ul v-if="searchText" class=" absolute bg-white w-full z-50 rounded-b-xl">
                    <template v-for="item in handleSearchResult" :key="index">
                        <li class="hover:bg-[#2f2f2f] hover:text-white px-10 py-2 cursor-pointer">{{ item }}
                        </li>
                    </template>
                </ul>
            </div>
            <div class="w-full sm:w-4/12 md:w-3/12 flex items-center justify-end">
                <!-- cart -->
                <!-- <button v-if="!cartLink" @click="cartOn = true" class="w-6/12 pr-4 text-center hover:opacity-70" -->
                <button @click="cartOn = true" class="w-4/12 pr-4 text-center hover:opacity-70" title="cart">
                    <i class="fa-solid fa-cart-shopping text-md sm:text-xl"></i>
                </button>
                <NavigatedCart :showCart="cartOn" @closeCart="cartOn = false" />
                <!-- sign in -->
                <router-link v-if="!userToken" :to="'/shop.co/login'">
                    <!-- <i class="fa-duotone fa-solid fa-user text-black border-2 p-2 rounded-md"></i> -->
                    <BaseButton class="py-[5px] px-[6px] whitespace-nowrap rounded-sm text-sm sm:text-md">sign in
                    </BaseButton>
                </router-link>
                <div v-else class="flex w-7/12 items-center justify-end">
                    <router-link to="/shop.co/user/profile" class="pl-2 hover:opacity-70" title="profile">
                        <i class="fa-duotone fa-solid fa-user text-black border-2 p-2 rounded-md"></i>
                    </router-link>
                    <button @click="uLogout" class="pl-2 text-center justify-self-end hover:opacity-70" title="logout">
                        <i class="fa-solid fa-right-from-bracket text-gray-700 text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- hidden navbar -->
    <Teleport to='body'>
        <nav :class="[`nav-links-hidden overflow-y-scroll border-r-4 border-r-gray-600 
            bg-white pt-4 fixed z-20 left-0 top-0 h-full w-full sm:w-8/12 md:w-6/12 p-4`, { active: hiddenNav }]">
            <div class="flex gap-6 mb-2">
                <button @click="hiddenNav = false" class="px-2 hover:text-gray-500 text-xl">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div class="w-4/12">
                    <img class="w-[80%]" src="../assets/images/logo/logo.webp" alt="shop.co">
                </div>
            </div>
            <hr>
            <ul lass="list-none W-6/12">
                <!-- :class="{ 'hover:bg-white': hDropDown, 'hover:text-white': !hDropDown }" -->
                <li class="hover:bg-[#2f2f2f] hover:font-medium hover:text-white capitalize">
                    <router-link :to="{ name: 'Home' }"><i class="fa-solid fa-house w-1/12"></i>
                        home</router-link>
                </li>
                <hr>
                <li @click="hDropDown = !hDropDown"
                    class="hover:font-medium whitespace-nowrap cursor-pointer capitalize">
                    <router-link :to="{ name: 'shop' }">
                        <i class="fa-solid fa-shop w-1/12"></i> store
                    </router-link>
                    <i class="fa-regular fa-chevron-down text-xs font-bold"></i>
                </li>
                <ul v-if="hDropDown" class="dropdown text-black bg-white rounded-sm border-2 ml-4">
                    <li class="px-3 py-2 rounded-t-sm">
                        <router-link class="py-2" :to="{ name: 'men-fashion' }">men's fashion</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'women-fashion' }">women's fashion</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'boys-wear' }">boys wear</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'girls-wear' }">girls wear</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'sport-wear' }">sport wear</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'bags-luggage' }">bags & luggage</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'shoes-fashion' }">shoes</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2">
                        <router-link class="py-2" :to="{ name: 'watches' }">watches</router-link>
                    </li>
                    <hr>
                    <li class="px-3 py-2  rounded-b-sm">
                        <router-link class="py-2" :to="{ name: 'formal-wear' }">formal</router-link>
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
    <div v-if="searchIcon" class="w-full px-4 relative search-bar">
        <label for="" class="relative">
            <input name="searchText" v-model="searchText" @change="handleSearchResult" type="text"
                placeholder="What are you looking for?"
                class="w-full mb-2 p-2 pl-8 bg-[#f2f2f2] outline-none rounded-sm text-sm focus:bg-white focus:border-[1px]">
            <i class="fa-regular fa-magnifying-glass absolute left-[10px] top-[18%] text-md text-gray-400"></i>
            <ul v-if="searchText" class=" absolute bg-white w-full z-50 rounded-b-xl">
                <template v-for="item in handleSearchResult" :key="index">
                    <li class="hover:bg-[#2f2f2f] hover:text-white px-10 py-2 cursor-pointer">{{ item }}
                    </li>
                </template>
            </ul>
        </label>
    </div>
    <hr>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavigatedCart from '../components/shop/NavigatedCart.vue';
import BaseButton from '../components/BaseButton.vue';
import { mapActions } from 'vuex';
export default {
    name: 'BaseNavbar',
    components: { NavigatedCart, BaseButton },
    data() {
        return {
            dropDown: false,
            hDropDown: false,
            hiddenNav: false,
            searchText: '',
            cartOn: false,
            products: ['T-shirt', 'boxer', 'dress', 'Jacket',],
            userToken: localStorage.getItem('token'),
        }
    },

    setup() {
        // const cartLink = ref(window.innerWidth < 865);
        const show = ref(window.innerWidth > 1200);
        const searchIcon = ref(window.innerWidth <= 592);

        const updateShow = () => {
            show.value = window.innerWidth > 1200;
            searchIcon.value = window.innerWidth <= 592;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateShow);
        });

        return {
            show, searchIcon
        };
    },
    computed: {
        showNav() {
            if (window.innerWidth <= 1150) this.show = false;
            else this.show = true;
            return this.show;
        },
        handleSearchResult() {
            const searchedList = this.products.filter((item) =>
                item.toString().includes(this.searchText)
            );
            console.log('searching...');
            setTimeout(() => {
                this.show = false;
            }, 1000);
            this.show = true;
            return searchedList;
        },
        gotoCart() {
            return '/shop.co/user/shopping-cart';
        },
    },
    methods: {
        ...mapActions(['userLogout']),
        async uLogout() {
            try {
                await this.userLogout();
                setTimeout(() => {
                    this.$router.push({ name: 'shop.co-login' });

                }, 1500)
            } catch (error) {
                console.error('logout error : ', error);
            }
        },
    },
}
</script>
<style scoped>
@import url('../assets/stylesheets/shop/nav-bar.style.css');
</style>
