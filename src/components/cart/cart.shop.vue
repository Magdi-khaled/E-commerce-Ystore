<template>
    <!-- border-l-4 border-l-gray-600 flex flex-col`, { active: showCart, 'hidden': showCart2 }]"> -->
    <div :class="[`shopping-cart fixed z-50 top-0 right-0 w-10/12 sm:w-7/12 md:w-6/12 lg:w-4/12 z-30 h-full bg-white
        border-l-4 border-l-gray-600 flex flex-col`, { active: showCart }]">
        <div class="flex items-center justify-between p-5 font-bold">
            <div class="w-48 flex justify-between items-center">
                <button @click="gotoCart"
                    class="capitalize w-5/12 text-lg sm:text-xl whitespace-nowrap hover:text-gray-500">
                    shopping cart <i class="fa-solid fa-up-right-from-square"></i>
                </button>
            </div>
            <button @click="$emit('closeCart')" class="font-bold text-xl sm:text-2xl">
                <i class="fa-solid fa-xmark hover:text-gray-500"></i>
            </button>
        </div>
        <hr class="h-0.5 w-full bg-gray-500">
        <!-- Cart Items -->
        <div v-if="!cartItems.length" class="h-screen w-full flex items-center justify-center">
            <h1 class="font-medium text-lg text-gray-400">No items in your cart...</h1>
        </div>
        <div v-else class="" :class="{ 'overflow-y-scroll': cartItems.length > 2 }">
            <div v-for="item in cartItems" class="cart-item flex items-center border-b-2 relative">
                <button class="absolute right-[4%] top-[10%]" title="remove-item">
                    <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
                </button>
                <div class="w-3/12 m-3">
                    <img class="rounded-md" :src="item.imgSrc" alt="cart-product">
                </div>
                <div class="w-8/12 h-[120px] flex flex-col justify-between">
                    <div class="w-10/12 h-8/12">
                        <h1 class="font-bold text-sm sm:text-md">{{ item.title }}</h1>
                        <p class="font-medium text-sm sm:text-mdtext-md capitalize">
                            size: <span class="text-gray-500">{{ item.size }}</span>
                        </p>
                        <p class="font-medium text-sm sm:text-mdtext-md capitalize">
                            color: <span class="text-gray-500">{{ item.color }}</span>
                        </p>
                    </div>
                    <div class="h-4/12 flex items-center justify-between">
                        <p class="font-bold text-sm sm:text-md"><span class="text-xs text-gray-700">EGP</span>{{
                            item.price }}</p>
                        <div class="font-medium grid grid-cols-3 text-lg
                        border-2 border-black w-[30%] sm:w-[25%] mr-2 sm:mr-0">
                            <div class="bg-gray-900 text-white flex items-center justify-center">
                                <button @click="item.quantity--"><i class="fa-solid fa-minus"></i></button>
                            </div>
                            <div class="bg-white flex items-center justify-center">
                                <p class="text-lg">{{ item.quantity }}</p>
                            </div>
                            <div class="bg-gray-900 text-white flex items-center justify-center">
                                <button @click="item.quantity++"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="w-full bg-gray-300 block">
        </div>
        <!-- checkout component -->
        <checkoutComponent :subTotal="calcSubTotal" :Discount="0.2" :deliveryFees="15">
        </checkoutComponent>
    </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import checkoutComponent from './checkout.shop.vue';

export default {
    name: 'cart-shop',
    // props: ['showCart', 'showCart2'],
    props: ['showCart'],
    components: { checkoutComponent },
    data() {
        return {
            cartItems: reactive([]),
            promoCode: ''
        }
    },
    computed: {
        ...mapGetters(['Get_CartItems']),
        calcSubTotal() {
            var subTotal = 0;
            this.Get_CartItems.forEach(item => {
                subTotal += item.price * item.quantity;
            });
            return subTotal;
        }
    },
    created() { this.fetchData(); },
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
        },
        gotoCart() {
            this.$router.push('/shop.co/user/shopping-cart');
        },
    }

}
</script>
<style scoped>
.shopping-cart {
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.5s ease-in-out;
}

.shopping-cart.active {
    transform: translateX(0);
    opacity: 1;
}

.cart-item img {
    width: 8rem;
    height: 8rem;
}

@media (max-width:419px) {
    .cart-item img {
        height: 7rem;
    }
}
</style>