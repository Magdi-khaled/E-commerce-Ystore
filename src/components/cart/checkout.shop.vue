<template>
    <div class="checkout capitalize m-auto my-2 p-4 border-2 rounded-md w-11/12 h-fit">
        <h1 class="font-bold">order summary</h1>
        <div class="text-gray-500 flex justify-between">
            <p>subtotal</p>
            <p class="text-black font-bold">${{ subTotal }}</p>
        </div>
        <div class="text-gray-500 flex justify-between">
            <p>discount(-{{ Discount * 100 }}%)</p>
            <p class="text-red-600 font-bold">-${{ discount }}</p>
        </div>
        <div class="text-gray-500 flex justify-between">
            <p>delivery fees</p>
            <p class="text-black font-bold">${{ deliveryFees }}</p>
        </div>
        <hr class="my-4">
        <div class="text-black font-bold flex justify-between">
            <p>total</p>
            <p class="font-bold">${{ cartTotal }}</p>
        </div>
        <div class="promo-code flex justify-between mt-4 relative">
            <input v-model="promoCode" placeholder="Add promo code"
                class="w-8/12 bg-gray-100 outline-none pl-10 py-3 rounded-3xl">
            <i class="fa-duotone fa-solid fa-tag absolute top-3 left-4 text-gray-500 text-xl"></i>
            <!-- <button
                class="w-3/12 py-3 capitalize bg-black font-bold text-white rounded-full hover:bg-gray-200 hover:text-black">
                apply
            </button> -->

            <baseButton class="apply">apply</baseButton>
        </div>
        <div class="mt-3">
            <baseButton>
                go to checkout <i class="fa-solid fa-arrow-right-long pl-4"></i>
            </baseButton>
        </div>
    </div>
</template>
<script>
import baseButton from '../baseButton.vue';
export default {
    name: 'checkoutComponent',
    components: { baseButton },
    props: ['subTotal', 'Discount', 'deliveryFees'],
    data() {
        return {
            promoCode: ''
        }
    },
    computed: {
        discount() {
            return (this.subTotal * this.Discount);
        },
        cartTotal() {
            return this.subTotal - this.discount + this.deliveryFees;
        }
    },
    methods: {}

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

:deep(.apply) {
    width: 30%;

}

:deep(button) {
    padding: 12px;
}
</style>