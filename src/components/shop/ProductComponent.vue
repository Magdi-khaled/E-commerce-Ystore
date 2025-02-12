<template>
    <div class="h-48 sm:h-52 md:h-56 transition duration-300">
        <img :src="product.src" alt="product" loading="lazy"
            class="w-[100%] h-[100%] rounded-[20px] border-[0.1px] border-gray-400">
    </div>

    <div class="detail px-2 py-2 flex flex-col justify-between">
        <p class="capitalize font-medium text-sm sm:text-md h-5 tracking-tight">{{ product.title }}</p>
        <!-- product-price -->
        <div
            class="product-price text-sm sm:text-md font-sans flex pt-1 gap-1 sm:gap-2 tracking-normal whitespace-nowrap">
            <p class="font-medium">
                <span class="text-xs text-gray-700">EGP </span>
                {{ handlePrice(product.price, product.sale) }}
            </p>

            <div v-if="product.sale != 0.0" class="flex items-center">
                <div class="relative flex items-center whitespace-nowrap font-medium">
                    <p class="text-gray-500"> {{ product.price }} </p>
                    <span class="w-full h-[1px] sm:h-[1.8px] bg-gray-700 absolute top-[50%]"></span>
                </div>
                <span class="text-xs font-sans font-semibold text-green-600 pl-2 whitespace-nowrap">
                    {{ product.sale }}% OFF
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    props: ['product'],
    setup() {
        const handlePrice = inject('handlePrice');
        return { handlePrice }
    },
}
</script>

<style scoped>
p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>