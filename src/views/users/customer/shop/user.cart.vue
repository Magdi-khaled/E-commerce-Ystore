<template>
    <div>
        <baseNavbar></baseNavbar>
        <div class="px-6 sm:px-16">
            <baseTitle class="cart-title">your cart</baseTitle>
            <div class="flex flex-wrap justify-between">
                <div class=" w-full lg:w-7/12 border-2 rounded-xl mb-6 lg:mb-0">
                    <div v-for="item in cartItems" class="cart-item flex flex-wrap relative">
                        <button class="text-md sm:text-2xl absolute right-5 sm:right-10 top-5 sm:top-8"
                            title="remove-item">
                            <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
                        </button>
                        <div class="w-3/12 p-0 sm:p-2 m-3 sm:m-4">
                            <img class="rounded-md" :src="item.imgSrc" alt="cart-product">
                        </div>
                        <div class="w-8/12 py-4 sm:pt-7 flex flex-col justify-between">
                            <div>
                                <h1 class="font-bold font-sans text-md sm:text-2xl capitalize whitespace-nowrap">
                                    {{ item.title }}</h1>
                                <p class="font-bold text-md sm:text-xl capitalize">size: <span class="text-gray-500">
                                        {{ item.size }}</span>
                                </p>
                                <p class="font-bold text-md sm:text-xl capitalize">color: <span class="text-gray-500">
                                        {{ item.color }}</span>
                                </p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="font-bold text-md sm:text-xl capitalize">
                                    price: <span class="text-gray-500"> {{ `$` + item.price }}</span>
                                </p>
                                <div class="pagination p-1 sm:p-2 font-bold flex items-center justify-evenly
                                text-sm sm:text-xl rounded-md bg-gray-100 ">
                                    <button @click="item.quantity--">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>|
                                    <p disabled class="px-1 sm:px-2">{{ item.quantity }}</p>|
                                    <button @click="item.quantity++">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr class="w-full bg-gray-300 block">
                    </div>
                </div>
                <checkoutComponent :subTotal="calcSubTotal" :Discount="0.2" :deliveryFees="15"
                    class="w-full lg:w-4/12 rounded-xl h-80 m-0 my-0">
                </checkoutComponent>
            </div>
        </div>
        <baseFooter></baseFooter>
    </div>
</template>
<script>
import { reactive } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import baseNavbar from '../../../../components/baseNavbar.vue';
import baseFooter from '../../../../components/baseFooter.vue';
import baseTitle from '../../../../components/baseTitle.vue';
import checkoutComponent from '../../../../components/cart/checkout.shop.vue';
export default {
    components: { baseNavbar, baseTitle, checkoutComponent, baseFooter },
    data() {
        return {
            cartItems: reactive([]),
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
<style scoped>
:deep(div.cart-title) {
    padding-top: 2rem;
    padding-left: 0;
}

:deep(div h1) {
    text-align: start;

}
</style>