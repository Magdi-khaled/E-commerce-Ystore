<script setup>
import { useStore } from 'vuex';
import CheckoutComponent from './CheckoutComponent.vue';
import CartCardComponent from '../shop/CartCardComponent.vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { handlePrice } from '@/composables/useUtils.js';

const show = defineModel('show');
const store = useStore();
const router = useRouter();
const cartItems = computed(() => store.getters['Get_CartItems']);
const subTotal = computed(() => {
    let total = 0;
    if (cartItems.value.length) {
        cartItems.value.forEach(item => {
            total += handlePrice(item.price, item.sale) * item.orderQuantity;
        });
        return total;
    }
    return 0;
});
const discount = computed(() => {
    let discount = 0;
    if (cartItems.value.length) {
        cartItems.value.forEach(item => {
            discount += (item.sale / 100) * item.price * item.orderQuantity;
        });
        return discount;
    }
});
const fetchData = async () => {
    try {
        await store.dispatch('FetchCartItems');
    }
    catch (error) {
        console.error('Fetching Cart Error: ', error);
    }
};
onMounted(() => fetchData());
</script>
<template>
    <Teleport to='body'>
        <div class="bg-gray-800 w-full h-full">
            <div :class="[`shopping-cart fixed z-[100] top-0 right-0 w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 h-full 
            bg-white border-l-2 border-l-gray-600 flex flex-col`, { active: show }]">
                <div class="flex items-center justify-between p-5 font-bold">
                    <div class="w-48 text-md sm:text-lg flex justify-between items-center">
                        <button @click="router.push({ name: 'User-Cart' })"
                            class="capitalize w-5/12 whitespace-nowrap hover:text-gray-500">
                            shopping cart <i class="fa-solid fa-up-right-from-square"></i>
                        </button>
                    </div>
                    <button @click="show = false" class="font-bold text-lg sm:text-xl">
                        <i class="fa-solid fa-xmark hover:text-gray-500"></i>
                    </button>
                </div>
                <hr class="h-0.5 w-full bg-gray-500">
                <!-- Cart Items -->
                <div v-if="!cartItems.length" class="h-screen w-full flex items-center justify-center">
                    <h1 class="font-medium italic text-gray-600">No items in your cart...</h1>
                </div>
                <div v-else class="" :class="{ 'overflow-y-scroll': cartItems.length > 2 }">
                    <div v-for="(item, index) in cartItems" :key="item._id"
                        class="flex items-center border-b-2 relative">
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
</style>