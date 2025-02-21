<template>

    <BaseTeleport :show="show" :type="'message'" class="teleport">
        Product removed from shopping cart
    </BaseTeleport>
    <Teleport to='body'>
        <div class="bg-gray-800 w-full h-full">
            <div :class="[`shopping-cart fixed z-[100] top-0 right-0 w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 h-full 
            bg-white border-l-2 border-l-gray-600 flex flex-col`, { active: showCart }]">
                <div class="flex items-center justify-between p-5 font-bold">
                    <div class="w-48 text-md sm:text-lg flex justify-between items-center">
                        <button @click="this.$router.push({ name: 'User-Cart' })"
                            class="capitalize w-5/12 whitespace-nowrap hover:text-gray-500">
                            shopping cart <i class="fa-solid fa-up-right-from-square"></i>
                        </button>
                    </div>
                    <button @click="$emit('closeCart')" class="font-bold text-lg sm:text-xl">
                        <i class="fa-solid fa-xmark hover:text-gray-500"></i>
                    </button>
                </div>
                <hr class="h-0.5 w-full bg-gray-500">
                <!-- Cart Items -->
                <div v-if="!cartItems.length" class="h-screen w-full flex items-center justify-center">
                    <h1 class="font-medium italic text-gray-600">No items in your cart...</h1>
                </div>
                <div v-else class="" :class="{ 'overflow-y-scroll': cartItems.length > 2 }">
                    <div v-for="item in cartItems" class="flex items-center border-b-2 relative">
                        <CartCardComponent :item="item" />
                    </div>
                    <hr class="w-full bg-gray-300 block">
                </div>
                <!-- checkout component -->
                <CheckoutComponent :subTotal="subTotal" :discount="discount" :deliveryFees="15"
                    :cartEmpty="!cartItems.length ? true : false" />
            </div>
        </div>
    </Teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CheckoutComponent from './CheckoutComponent.vue';
import BaseTeleport from '../BaseTeleport.vue';
import CartCardComponent from '../shop/CartCardComponent.vue';

import { inject } from 'vue';
export default {
    name: 'NavigatedCart',
    props: ['showCart'],
    components: { CheckoutComponent, CartCardComponent, BaseTeleport },
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapGetters(['Get_CartItems']),
        cartItems() {
            return this.Get_CartItems;
        },
        subTotal() {
            var total = 0;
            if (this.cartItems.length) {
                this.cartItems.forEach(item => {
                    total += this.handlePrice(item.price, item.sale) * item.orderQuantity;
                });
                return total;
            }
            return 0;
        },
        discount() {
            var discount = 0;
            if (this.cartItems.length) {
                this.cartItems.forEach(item => {
                    discount += (item.sale / 100) * item.price * item.orderQuantity;
                });
                return discount;
            }
            return 0;
        },
    },
    setup() {
        const handlePrice = inject('handlePrice');
        const handleQuantity = inject('handleQuantity');
        return { handlePrice, handleQuantity }
    },
    created() { this.fetchData(); },
    methods: {
        ...mapActions(['FetchCartItems', 'RemoveCartItem']),
        async fetchData() {
            try {
                await this.FetchCartItems();
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
    }

}
</script>
<style scoped>
.shopping-cart {
    transform: translateX(100%);
    opacity: 0;
    box-shadow: 2px 2px 2px 3px gray;
    transition: all 0.5s ease-in-out;
}

.shopping-cart.active {
    transform: translateX(0);
    opacity: 1;
}

/* :deep(.cart-item img) {
    width: 8rem;
    height: 8rem;
}

@media (max-width:419px) {
    .cart-item img {
        height: 7rem;
    }
} */
</style>