<template>
    <div class="flex flex-row flex-wrap items-center justify-between px-6 md:px-12 py-4 ">
        <!-- LOGO SHOP.CO -->
        <div class="w-[11%]" :class="{ 'w-[27%]': sm }">
            <router-link to="/shop.co/home">
                <img src="../../assets/images/logo/shop-co-logo.png" alt="SHOP.CO">
            </router-link>
        </div>
        <div v-if="!sm" class="w-1/12 px-4 font-bold text-sm whitespace-nowrap">
            <router-link to="/shop.co/user/profile" class="flex sm:block hover:opacity-60">
                <h1 class="capitalize"><i class="fa-regular fa-location-dot"></i> address : </h1>
                <p class="text-gray-500 pl-2">{{ user.address }}</p>
            </router-link>

            <button v-if="currentlyShop == null" @click="this.$router.push('/shop.co/shop')" class="capitalize border-2 
            p-2 mt-4 rounded-md text-gray-200 border-2 border-gray-300 bg-gray-900 hover:text-gray-900 hover:bg-gray-200
            transition duration-300">
                go to shop <i class="fa-solid fa-shop pl-2"></i>
            </button>
        </div>
        <div v-if="!sm" class="w-4/12 lg:w-6/12 search-bar relative hidden sm:block">
            <label for="userSreachTxt" class="flex w-full bg-[#f2f2f2] border-2 rounded-sm py-[6px] px-4">
                <i class="fa-regular fa-magnifying-glass text-lg md:text-xl text-gray-400 pr-2"></i>
                <input name="searchText" v-model="userSreachTxt" @change="handleSearchResult" type="text"
                    placeholder="What are you looking for?" class="w-full bg-[#f2f2f2] outline-none">
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
        <!-- <div class="w-3/12 sm:w-2/12 md:w-1/12 py-1 font-bold capitalize relative cursor-pointer whitespace-nowrap" -->
        <div class="w-3/12 sm:w-1/12 py-1 font-bold capitalize relative cursor-pointer whitespace-nowrap hover:text-gray-600"
            @click="accountDropdown = !accountDropdown">
            <h1 class="text-sm hidden sm:block">ahlan {{ user.name.split(' ')[0] }}! <i
                    class="fa-solid fa-sort-down pl-1 sm:pl-2"></i>
            </h1>
            <p class="text-gray-700 sm:text-gray-500 text-sm flex items-center gap-1">
                <span v-if="!sm">my account</span>
                <span v-else>your account</span>
                <i class="fa-solid fa-bars block sm:hidden"></i>
            </p>
            <div v-if="accountDropdown"
                class="w-fit h-fit bg-white absolute z-50 top-[100%] left-[-2%] border-2 rounded-md hover:text-gray-900">
                <ul @click.stop class="px-1 text-sm sm:text-md">
                    <li class="p-2">
                        <router-link to="/shop.co/user/profile" class="hover:opacity-60">
                            <i class="fa-solid fa-user pr-1"></i>
                            profile
                        </router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/qr-code" class="hover:opacity-60">
                            <i class="fa-solid fa-qrcode pr-1"></i> QR code</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/shopping-cart" class="hover:opacity-60">
                            <i class="fa-solid fa-heart pr-1"></i> wishlist</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/orders" class="hover:opacity-60">
                            <i class="fa-solid fa-list-dropdown pr-1"></i> orders</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/returns" class="hover:opacity-60">
                            <i class="fa-duotone fa-regular fa-rotate-left pr-1"></i>
                            returns</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/payments" class="hover:opacity-60">
                            <i class="fa-duotone fa-solid fa-wallet pr-1"></i>
                            payments</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/notifications" class="hover:opacity-60">
                            <i class="fa-solid fa-bell pr-1"></i>
                            notifactions</router-link>
                    </li>
                    <hr>
                    <li class="p-2">
                        <router-link to="/shop.co/user/security-sittings" class="hover:opacity-60">
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
        <cart-shop :showCart="cartOn" @closeCart="cartOn = false"></cart-shop>

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
            <button v-if="currentlyShop == null" @click="this.$router.push('/shop.co/shop')" class="capitalize border-2 
            px-2 rounded-md text-gray-200 border-2 border-gray-300 bg-gray-900 hover:text-gray-900 hover:bg-gray-200
            transition duration-300">
                go to shop <i class="fa-solid fa-shop pl-2"></i>
            </button>
        </div>
    </div>
    <hr>
    <div>
        <ul
            class="shop-categ relative z-10 flex flex-wrap capitalize text-sm sm:text-[16px] font-medium whitespace-nowrap">
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'shop.co-home' }">home</router-link>
            </li>
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'men-fashion' }">men's
                    fashion</router-link>
            </li>
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'women-fashion' }">women's
                    fashion</router-link>
            </li>
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'kids-wear' }">kids's
                    fashion</router-link>
            </li>
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'sport-wear' }">sports</router-link>
            </li>
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'shoes-fashion' }">shoes</router-link>
            </li>
            <li class="hover:bg-gray-200 text-center py-1">
                <router-link class="px-4 sm:px-10 md:px-16 py-1" :to="{ name: 'watches' }">watches</router-link>
            </li>
        </ul>
    </div>
    <hr>

</template>
<script>
import cartShop from '../cart/cart.shop.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { mapActions } from 'vuex';

export default {
    name: 'userNavbar',
    components: { cartShop },
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
            products: ['T-shirt', 'boxer', 'dress', 'Jacket',],
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
    },
    created() {
        console.log(this.$route);
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
    },

    setup() {
        const sm = ref(window.innerWidth < 680);
        const updateShow = () => {
            sm.value = window.innerWidth < 680;
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
.shop-categ {
    display: flex;
    justify-content: center;
}
</style>