<template>
    <userNavbar v-if="tuser === 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div>
        <div class="px-6 sm:px-16">
            <h1 class="whitespace-nowrap text-2xl font-bold uppercase py-4"
                :class="{ 'text-center': !cartItems.length }">
                <i class="fa-regular fa-cart-shopping"></i>
                your cart
            </h1>
            <div class="flex flex-wrap justify-center" :class="{ 'h-60': !cartItems.length }">
                <div v-if="!cartItems.length"
                    class=" w-6/12 h-[100%] border-2 border-gray-400 rounded-md mb-6 lg:mb-2 flex justify-center items-center">
                    <div class="w-7/12 text-center ">
                        <h1 class="font-normal text-md text-gray-500">No products in your cart...
                        </h1>
                        <router-link :to="{ name: 'shop' }">
                            <baseButton class="w-9/12 mt-2">
                                go shopping now
                                <i class="fa-solid fa-up-right-from-square pl-2"></i>
                            </baseButton>
                        </router-link>
                    </div>
                </div>
                <div v-else class=" w-full lg:w-7/12 border-2 border-[#070707] rounded-md mb-6 lg:mb-0">
                    <div v-for="item in cartItems" class="cart-item flex flex-wrap relative">
                        <button class="text-lg sm:text-xl absolute right-[4%] sm:right-[2%] top-[11%]"
                            title="remove-item">
                            <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
                        </button>

                        <div class="w-3/12 h-auto m-3 sm:m-3">
                            <img class="w-full sm:w-11/12 h-auto h-[120px] md:h-[160px] rounded-md border-2 border-[#978877]"
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
                                    class="text-sm sm:text-md font-medium grid grid-cols-3 border-2 border-black w-[30%] sm:w-[25%]">
                                    <div class="bg-gray-900 py-0 sm:py-1 text-white flex items-center justify-center">
                                        <button @click="item.quantity--"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                    <div class="bg-white py-0 sm:py-1 flex items-center justify-center">
                                        <p class="text-sm sm:text-lg">{{ item.quantity }}</p>
                                    </div>
                                    <div class="bg-gray-900 py-0 sm:py-1 text-white flex items-center justify-center">
                                        <button @click="item.quantity++"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="w-full bg-gray-300 block">
                    </div>
                </div>
                <checkoutComponent v-if="cartItems.length" :subTotal="calcSubTotal" :Discount="0.2" :deliveryFees="15"
                    class="w-full lg:w-4/12 rounded-md h-fit border-[#070707]">
                </checkoutComponent>
            </div>
        </div>
        <baseFooter></baseFooter>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import baseNavbar from '../../../../components/baseNavbar.vue';
import userNavbar from '../../../../components/user/userNavbar.vue';
import baseFooter from '../../../../components/baseFooter.vue';
import checkoutComponent from '../../../../components/cart/checkout.shop.vue';
import UserNavbar from '../../../../components/user/userNavbar.vue';
import baseButton from '../../../../components/baseButton.vue';
export default {
    components: { baseNavbar, userNavbar, baseButton, checkoutComponent, baseFooter },
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