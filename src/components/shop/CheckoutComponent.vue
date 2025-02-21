<template>
    <div v-show="!cartEmpty" class="capitalize m-auto my-2 p-4 border-2 rounded w-11/12 h-fit">
        <h1 class="font-bold">checkout summary</h1>
        <div class="text-gray-500 text-sm sm:text-md flex justify-between my-1">
            <p>subtotal</p>
            <p class="text-black font-bold"><span class="text-xs">EGP </span>{{ subTotal.toFixed(2) }}</p>
        </div>
        <div class="text-gray-500 text-sm sm:text-md flex justify-between my-1">
            <p>discount(-{{ clacDiscount }}%)</p>
            <p class="text-red-600 font-bold">-<span class="text-xs">EGP </span>{{ discount.toFixed(2) }}</p>
        </div>
        <div class="text-gray-500 text-sm sm:text-md flex justify-between my-1">
            <p>delivery fees</p>
            <p class="text-black font-bold"><span class="text-xs">EGP </span>{{ deliveryFees.toFixed(2) }}
            </p>
        </div>
        <hr class="my-4">
        <div class="text-black text-sm sm:text-md font-bold flex justify-between">
            <p>total</p>
            <p class="font-bold"><span class="text-xs">EGP </span>{{ cartTotal.toFixed(2) }}</p>
        </div>
        <div v-if="!checkout" class="promo-code flex justify-between mt-4">
            <label for="promoCode" class="relative text-sm sm:text-md w-8/12">
                <input name="promoCode" id="promoCode" v-model="promoCode" placeholder="Add promo code"
                    class="w-full bg-gray-200 pl-8 py-2 rounded border-2 outline-none">
                <i class="fa-duotone fa-solid fa-tag absolute top-[20%] left-[5%] text-gray-500 text-lg"></i>
            </label>

            <BaseButton class="font-medium w-[30%] py-[8px] text-sm sm:text-md">apply</BaseButton>
        </div>
        <div class="mt-3" v-if="!checkout">
            <BaseButton @click="this.$router.push({ name: 'User-Checkout' })"
                class="w-full py-[8px] text-sm sm:text-md">
                go to checkout <i class="fa-solid fa-arrow-right-long pl-4"></i>
            </BaseButton>
        </div>
    </div>
</template>
<script>
import BaseButton from '../BaseButton.vue';
export default {
    name: 'CheckoutComponent',
    components: { BaseButton },
    props: {
        subTotal: { type: Number.parseFloat, default: 0.00 },
        discount: { type: Number.parseFloat },
        deliveryFees: { type: Number.parseFloat },
        cartEmpty: { type: Boolean },
        checkout: { type: Boolean }
    },
    data() {
        return {
            promoCode: ''
        }
    },
    computed: {
        clacDiscount() {
            return ((this.discount * 100) / this.subTotal).toFixed(2);
            // return (this.subTotal * this.discount).toFixed(2);
        },
        cartTotal() {
            return this.subTotal - this.discount + this.deliveryFees;
        }
    },
    methods: {}

}
</script>