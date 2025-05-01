<script setup>
import { ref } from 'vue';
import { handlePrice, handleStars, isHalf } from '@/composables/useUtils.js';
import BaseButton from '@/components/BaseButton.vue';
import OrderPagination from '@/components/shop/OrderPagination.vue';
import { useRouter } from 'vue-router';

const product = defineModel('product');
const props = defineProps({ isView: { type: Boolean, default: true } });
const router = useRouter();

const rateAvg = ref(0);
const outStock = ref(false);
const color = ref('');
const size = ref('');
const quantity = ref(1);
const orderColor = ref(false);
const orderSize = ref(false);

const buyNow = async () => {
    try {
        if (color.value != '' && size.value != '') {
            const orderProduct = {
                id: product.value._id,
                title: product.value.title,
                orderQuantity: quantity.value,
                color: color.value,
                size: size.value,
                price: product.value.price,
            };
            router.push({ name: 'User-Product-Checkout', params: { order: orderProduct } })
        }
        else {
            size.value != '' ? orderSize.value = false : orderSize.value = true;
            color.value != '' ? orderColor.value = false : orderColor.value = true;
        }
    } catch (error) {
        console.error('Buy Now Error: ', error);
    }
};
</script>

<template>
    <div class="p-2 px-4 md:px-6 w-full md:w-1/2">
        <p class="candal-regular font-bold text-2xl lg:text-3xl capitalize">{{ product.title }}</p>
        <div class="product-rate">
            <div class="stars-rate my-2 flex items-center gap-1">
                <div v-for="item in Math.floor(rateAvg)">
                    <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                </div>
                <i v-if="isHalf(rateAvg)" class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                <div v-for="item in handleStars(rateAvg)">
                    <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
                </div>
                <p class="pl-1 font-semibold">
                    {{ rateAvg }}<span class="text-gray-400">/5</span>
                </p>
            </div>
            <div class="flex gap-4 my-4 font-bold">
                <p class="capitalize text-xl sm:text-2xl"><span class="text-xs text-gray-700">EGP
                    </span>
                    {{ handlePrice(product.price, product.sale) }}</p>
                <div v-if="product.sale != 0.0" class="flex">
                    <div class="flex relative mt-1">
                        <p class="text-gray-500 ">
                            <span class="text-xs">EGP
                            </span>
                            {{ product.price }}
                            <span class="w-full h-[1.5px] bg-black  left-0 absolute top-[40%]"></span>
                        </p>
                    </div>
                    <span class="text-sm font-sans font-bold text-green-600 pl-2 mt-1">
                        {{ product.sale }}% OFF</span>
                </div>
            </div>
        </div>
        <div class="w-full md:w-10/12 my-6">
            <p class="text-gray-600">
                {{ product.details }}
            </p>
        </div>
        <hr class="my-6">
        <form @submit.prevent="buyNow">
            <!-- colours -->
            <div>
                <p class="capitalize text-gray-600">select color</p>
                <div class="colors mt-3 flex flex-wrap w-8/12">
                    <label v-for="item in product?.providedColors" class="relative">
                        <input v-if="item.color != 'all'" name="selectedColor" type="radio" v-model="color"
                            :value="item.value" class="appearance-none w-6 sm:w-8 
                                    h-6 sm:h-8 mr-3 border-2 border-gray-400 cursor-pointer rounded"
                            :class="{ 'outline outline-2 outline-[#000]': color == item.value }"
                            :style="{ 'background-color': `#${item.value}` }">
                        <i v-if="color"
                            class="fa-solid fa-check text-gray-300 absolute z-30 py-3 px-4 text-xl sm:text-2xl"
                            :class="{ 'hidden': color != item.value, 'text-gray-600': item.color === 'white' }"></i>
                    </label>
                </div>
                <p v-if="orderColor && color === ''" class="text-red-500 text-sm">Select order Color</p>
            </div>
            <hr class="my-6">
            <!-- sizes -->
            <div>
                <p class="capitalize text-gray-600">choose size</p>
                <div class="colors mt-3 flex flex-wrap w-10/12 gap-y-2">
                    <label v-for="item in product?.providedSizes" :key="item" class="flex items-center cursor-pointer">
                        <input type="radio" v-model="size" :value="item" :id="item" class="appearance-none hidden">
                        <span v-if="item != 'All'"
                            class="px-2 md:px-2 py-1 md:py-1 mr-1 border-2 bg-gray-100 text-gray-600 whitespace-nowrap capitalize font-bold transition-all"
                            :class="{ 'text-red-400 border-gray-500': size === item }">
                            {{ item }}
                        </span>
                    </label>
                </div>
                <p v-if="orderSize && size === ''" class="text-red-500 text-sm">Select order Size</p>
            </div>
            <hr class="my-8">
            <div v-show="isView" class="flex justify-between w-full gap-5">
                <OrderPagination :product="product" :productQuantity="+product.quantity" v-model:quantity="quantity"
                    v-model:outStock="outStock" />
                <div class="w-8/12 sm:w-9/12">
                    <BaseButton @click="buyNow" class="rounded-none w-full">
                        buy it now <i class="fa-solid fa-money-bill-wave"></i>
                    </BaseButton>
                </div>
            </div>
        </form>
        <p v-if="outStock" class="text-red-500 text-sm my-2">You can't order more quantity than what
            is in stock.</p>
    </div>
</template>
<style scoped>
@import "@/assets/css/product.css";
</style>