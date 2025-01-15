<template>
    <div class="checkout capitalize m-auto my-2 p-4 border-2 rounded-md w-11/12 h-fit">
        <h1 class="font-bold">order summary</h1>
        <div class="text-gray-500 flex justify-between">
            <p>subtotal</p>
            <p class="text-black font-bold"><span class="text-xs">EGP </span>{{ subTotal }}</p>
        </div>
        <div class="text-gray-500 flex justify-between">
            <p>discount(-{{ Discount * 100 }}%)</p>
            <p class="text-red-600 font-bold">-<span class="text-xs">EGP </span>{{ discount }}</p>
        </div>
        <div class="text-gray-500 flex justify-between">
            <p>delivery fees</p>
            <p class="text-black font-bold"><span class="text-xs">EGP </span>{{ deliveryFees }}</p>
        </div>
        <hr class="my-4">
        <div class="text-black font-bold flex justify-between">
            <p>total</p>
            <p class="font-bold"><span class="text-xs">EGP </span>{{ cartTotal }}</p>
        </div>
        <div class="promo-code flex justify-between mt-4">
            <label :for="promoCode" class="relative w-8/12">
                <input name="promoCode" v-model="promoCode" placeholder="Add promo code"
                    class="w-full bg-gray-200 pl-10 py-2 rounded-md border-2">
                <i class="fa-duotone fa-solid fa-tag absolute top-2 left-4 text-gray-500 text-lg"></i>
            </label>

            <baseButton class="apply font-medium">apply</baseButton>
        </div>
        <div class="mt-3">
            <baseButton class="w-full">
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

    padding-top: 7px;
    padding-bottom: 7px;
}

:deep(button) {
    padding: 12px;
}
</style>