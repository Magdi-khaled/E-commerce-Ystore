<template>
    <UserNavbar v-if="tuser === 'customer'" />
    <BaseNavbar v-else />
    <div class="px-6 sm:px-16 mb-[10em] mt-2">
        <h1 class="whitespace-nowrap text-2xl font-bold uppercase py-5" :class="{ 'text-center': !cartItems.length }">
            <i class="fa-regular fa-cart-shopping"></i>
            your cart
        </h1>
        <div class="flex flex-wrap justify-center" :class="{ 'h-60': !cartItems.length }">
            <div v-if="!cartItems.length"
                class=" w-6/12 h-[100%] border-2 border-gray-400 rounded-md mb-6 lg:mb-2 flex justify-center items-center">
                <div class="w-7/12 text-center ">
                    <h1 class="font-normal text-md text-gray-500">No products in your cart...
                    </h1>
                    <router-link :to="{ name: 'Shop' }">
                        <BaseButton class="w-9/12 mt-2">
                            go shopping now
                            <i class="fa-solid fa-up-right-from-square pl-2"></i>
                        </BaseButton>
                    </router-link>
                </div>
            </div>
            <div v-else class=" w-full lg:w-7/12 border-2 border-gray-400 rounded mb-6 lg:mb-0">
                <div v-for="item in cartItems" class="cart-item flex flex-wrap relative">
                    <button class="text-lg sm:text-xl absolute right-[4%] sm:right-[2%] top-[11%]" title="remove-item">
                        <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
                    </button>

                    <div class="w-3/12 h-auto m-2 sm:m-3">
                        <img class="w-full sm:w-11/12 h-[7em] sm:h-[8em] md:h-[10em] rounded border-2 border-gray-400"
                            :src="item.imgSrc" alt="cart-product">
                    </div>
                    <div class="w-[65%] sm:w-[70%] py-4 flex flex-col justify-between">
                        <div>
                            <h1 class="font-bold text-sm sm:text-xl capitalize whitespace-nowrap">
                                {{ item.title }}</h1>
                            <p class="font-medium text-sm sm:text-lg capitalize">size: <span class="text-gray-500">
                                    {{ item.size }}</span>
                            </p>
                            <p class="font-medium text-sm sm:text-lg capitalize">color: <span class="text-gray-500">
                                    {{ item.color }}</span>
                            </p>
                        </div>
                        <div class="flex items-center justify-between">
                            <p class="font-bold text-sm sm:text-xl capitalize">
                                <span class="text-gray-600 text-sm">EGP </span>{{ item.price }}
                            </p>
                            <div
                                class="text-sm sm:text-md font-medium grid grid-cols-3 border-[1.5px] border-black w-[30%] sm:w-[25%]">
                                <div class="bg-gray-900 text-white flex items-center justify-center">
                                    <button @click="item.quantity--" class="block w-full h-full py-2 px-1">
                                        <i class="fa-solid fa-minus"></i></button>
                                </div>
                                <div class="bg-white flex items-center justify-center">
                                    <p class="text-sm sm:text-lg">{{ item.quantity }}</p>
                                </div>
                                <div class="bg-gray-900 text-white flex items-center justify-center">
                                    <button @click="item.quantity++" class="block w-full h-full py-2 px-1"><i
                                            class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="w-full bg-gray-300 block">
                </div>
            </div>
            <CheckoutComponent v-if="cartItems.length" :subTotal="calcSubTotal" :Discount="0.2" :deliveryFees="15"
                class="w-full lg:w-4/12 rounded h-fit border-gray-400" />
        </div>
    </div>
    <BaseFooter />
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BaseNavbar from '../../../../components/BaseNavbar.vue';
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import BaseButton from '../../../../components/BaseButton.vue';
import CheckoutComponent from '../../../../components/cart/CheckoutComponent.vue';
import BaseFooter from '../../../../components/BaseFooter.vue';

export default {
    components: { BaseNavbar, UserNavbar, BaseButton, CheckoutComponent, BaseFooter },
    data() {
        return {
            tuser: localStorage.getItem('user'),
            cartItems: [],
        }
    },
    computed: {
        ...mapGetters(['Get_CartItems']),
        calcSubTotal() {
            var total = 0;
            this.Get_CartItems.forEach(item => {
                console.log(item.price);
                total += item.price * item.quantity;
            });
            return total;
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(['FetchCartItems']),
        async fetchData() {
            try {
                await this.FetchCartItems();
                this.initData();
            }
            catch (error) {
                console.error('Fetching Cart Error: ', error);
            }
        },
        initData() {
            this.cartItems = this.Get_CartItems;
        }
    }
}
</script>
<style scoped></style>