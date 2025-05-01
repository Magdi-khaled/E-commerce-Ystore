<script setup>
import { handlePrice } from '@/composables/useUtils';

defineProps({ product: { type: Object, required: true } });
</script>

<template>
    <div class="h-40 sm:h-52 md:h-56 transition duration-300">
        <img :src="product.image" alt="product" loading="lazy"
            class="w-[100%] h-[100%] rounded-[8px] border-[0.4px] border-gray-400">
    </div>

    <div class="detail py-2 flex flex-col justify-between">
        <p
            class="capitalize font-medium text-sm sm:text-md h-5 w-40 md:w-36 lg:w-[13rem] overflow-hidden text-ellipsis tracking-tight">
            {{ product.title }} </p>

        <div
            class="product-price text-sm sm:text-md font-sans flex pt-[1px] gap-1 sm:gap-2 tracking-normal whitespace-nowrap">
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
                    {{ product.sale }}% OFF</span>
            </div>
        </div>
    </div>
</template>