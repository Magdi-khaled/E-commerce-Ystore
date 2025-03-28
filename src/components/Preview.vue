<script setup>
import BaseButton from '@/components/BaseButton.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const br1 = ref(window.innerWidth > 642);
</script>

<template>
    <div class="py-8 px-4 lg:px-14 w-full">
        <p class=" w-full md:w-3/12 lg:w-[8.9%] py-5 sm:py-8 text-gray-200 text-sm md:text-lg font-medium  ">
            Browse through our diverse range of meticulously crafted garments,
            <br v-if="br1">
            designed to bring out your individuality and cater to your sense of style.
        </p>
        <BaseButton class="goto-shop text-md sm:text-lg w-full sm:w-5/12 mb-[-12px]"
            @click="router.push({ name: 'Shop' })">
            go shopping now <i class="fa-sharp-duotone fa-thin fa-bags-shopping font-bold pl-2"></i>
        </BaseButton>
    </div>
</template>