<template>
    <div
        :class="['shopping-cart fixed z-50 top-0 right-0 w-6/12 lg:w-4/12 z-30 h-full bg-white border-l-4 border-l-gray-600 flex flex-col', { active: showCart, 'hidden': showCart2 }]">
        <div class="flex items-center justify-between p-5 font-bold">
            <div class="w-48 flex justify-between items-center">
                <h1 class="w-8/12 capitalize text-2xl whitespace-nowrap">shopping cart</h1>
                <button title="Goto shopping-cart page" @click="gotoCart">
                    <i class="fa-solid fa-up-right-from-square hover:text-gray-400"></i>
                </button>
            </div>
            <button @click="$emit('closeCart')" class="font-bold text-2xl">
                <i class="fa-solid fa-xmark hover:text-gray-400"></i>
            </button>
        </div>
        <hr class="h-0.5 w-full bg-gray-400">
        <!-- Cart Items -->
        <div v-if="!cartItems.length" class="h-screen w-full flex items-center justify-center">
            <h1 class="font-bold text-xl capitalize font-sans text-gray-400">no items in your cart...</h1>
        </div>
        <div v-else class="overflow-y-scroll">
            <div v-for="item in cartItems" class="cart-item flex flex-wrap items-center relative">
                <button class="absolute right-6 top-6" title="remove-item">
                    <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
                </button>
                <div class="w-3/12 m-3">
                    <img class="rounded-xl" :src="item.imgSrc" alt="cart-product">
                </div>
                <div class="w-8/12">
                    <h1 class="font-bold text-md capitalize">{{ item.title }}</h1>
                    <p class="font-bold text-md capitalize">size: <span class="text-gray-500">{{ item.size }}</span></p>
                    <p class="font-bold text-md capitalize">color: <span class="text-gray-500">{{ item.color }}</span>
                    </p>
                    <div class="flex items-center justify-between">
                        <p class="font-bold text-xl capitalize">${{ item.price }}</p>
                        <div
                            class="pagination p-2 font-bold flex items-center justify-evenly text-md rounded-md bg-gray-100">
                            <button @click="item.quantity--"><i class="fa-solid fa-minus"></i></button>|
                            <p disabled class="px-2 ">{{ item.quantity }}</p>|
                            <button @click="item.quantity++"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <hr class="w-full bg-gray-300 block">
            </div>
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
    props: ['showCart', 'showCart2'],
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
    height: 8rem
}
</style>