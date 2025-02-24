<template>
    <UserNavbar v-if="user === 'customer'" />
    <BaseNavbar v-else />
    <div class="px-6 sm:px-16 mb-[10em] mt-2">
        <h1 class="whitespace-nowrap text-xl sm:text-2xl font-bold uppercase py-5"
            :class="{ 'text-center': !cartItems.length }">
            <i class="fa-regular fa-cart-shopping"></i>
            your cart
        </h1>
        <div class="flex flex-wrap justify-center" :class="{ 'h-60': !cartItems.length }">
            <div v-if="!cartItems.length"
                class=" w-full sm:w-10/12 lg:w-8/12 h-[100%] border-2 border-gray-400 rounded-md mb-6 lg:mb-2 flex justify-center items-center">
                <div class="w-9/12 sm:w-7/12 text-center ">
                    <h1 class="font-normal text-sm sm:text-md text-gray-500">No products in your cart...
                    </h1>
                    <router-link :to="{ name: 'Shop' }">
                        <BaseButton class="w-full sm:w-9/12 mt-2 text-sm sm:text-md">
                            go shopping now
                            <i class="fa-solid fa-up-right-from-square pl-2"></i>
                        </BaseButton>
                    </router-link>
                </div>
            </div>
            <div v-else class=" w-full h-fit lg:w-7/12 border-2 border-gray-400 rounded mb-6 lg:mb-0">
                <div v-for="item in cartItems" class="cart-item flex flex-wrap relative">
                    <button @click="removeCartItem(item._id)"
                        class="text-lg sm:text-xl absolute right-[4%] sm:right-[2%] top-[11%]" title="remove-item">
                        <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
                    </button>

                    <div class="w-3/12 h-auto m-2 sm:m-3">
                        <router-link :to="{ name: 'Product', params: { id: item._id } }">
                            <img class="w-full sm:w-11/12 h-[7em] sm:h-[8em] md:h-[10em] rounded border-2 border-gray-400"
                                :src="item.src" alt="cart-product">
                        </router-link>
                    </div>
                    <div class="w-[65%] sm:w-[70%] py-4 flex flex-col justify-between">
                        <div>
                            <h1 class="font-bold text-sm sm:text-xl capitalize whitespace-nowrap">
                                {{ item.title }}</h1>
                            <p class="font-medium text-sm sm:text-lg capitalize">size: <span class="text-gray-500">
                                    {{ item.providedSizes[0] }}</span>
                            </p>
                            <p class="font-medium text-sm sm:text-lg capitalize">color: <span class="text-gray-500">
                                    {{ item.providedColors[0].color }}</span>
                            </p>
                        </div>
                        <div class="flex items-center justify-between">
                            <p class="font-bold text-sm sm:text-xl capitalize">
                                <span class="text-gray-600 text-sm">EGP </span>{{ item.price }}
                            </p>

                            <div class="pagination font-medium grid grid-cols-3 text-lg
                                        border-2 border-black w-[30%] sm:w-[24%]">
                                <div class="bg-gray-900 text-white flex items-center justify-center">
                                    <button @click="handleQuantity(false, item)">
                                        <i class="fa-solid fa-minus text-sm sm:text-md"></i></button>
                                </div>
                                <div class="text-black bg-white flex items-center justify-center">
                                    <p class="px-3 text-lg">{{ item.orderQuantity }}</p>
                                </div>
                                <div class="bg-gray-900 text-white flex items-center justify-center">
                                    <button @click="handleQuantity(true, item)"><i
                                            class="fa-solid fa-plus text-sm sm:text-md"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="w-full bg-gray-300 block">
                </div>
            </div>
            <CheckoutComponent :subTotal="subTotal" :discount="discount" :deliveryFees="15"
                :cartEmpty="cartItems.length ? false : true"
                class="w-full lg:w-4/12 my-[0] rounded h-fit border-gray-400" />
        </div>
    </div>
    <BaseFooter />
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BaseNavbar from '../../../../components/BaseNavbar.vue';
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import BaseButton from '../../../../components/BaseButton.vue';
import CheckoutComponent from '../../../../components/shop/CheckoutComponent.vue';
import BaseFooter from '../../../../components/BaseFooter.vue';
import { inject } from 'vue';
export default {
    components: { BaseNavbar, UserNavbar, BaseButton, CheckoutComponent, BaseFooter },
    data() {
        return {
            user: localStorage.getItem('user'),
        }
    },
    computed: {
        ...mapGetters(['Get_CartItems']),
        cartItems() {
            return this.Get_CartItems;
        },
        subTotal() {
            var total = 0;
            this.cartItems.forEach(item => {
                total += this.handlePrice(item.price, item.sale) * item.orderQuantity;
            });
            return total;
        },
        discount() {
            var discount = 0;
            this.cartItems.forEach(item => {
                discount += (item.sale / 100) * item.price * item.orderQuantity;
            }); // 0.12 * 1200 * 1
            return discount;
        }
    },
    setup() {
        const handlePrice = inject('handlePrice');
        const handleQuantity = inject('handleQuantity');
        return { handlePrice, handleQuantity }
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(['FetchCartItems', 'RemoveCartItem']),
        async fetchData() {
            try {
                await this.FetchCartItems();
                this.initData();
            }
            catch (error) {
                console.error('Fetching Cart Error: ', error);
            }
        },
        async removeCartItem(id) {
            try {
                await this.RemoveCartItem(id);
                this.show = true;
                setTimeout(() => { this.show = false }, 1500);
            }
            catch (error) {
                console.error('Remove Item Error: ', error);
            }
        },
        initData() {
            this.cartItems = this.Get_CartItems;
        },
    }
}
</script>