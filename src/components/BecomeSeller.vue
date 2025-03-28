<template>
    <div class="w-full md:w-6/12 py-4 md:py-10">
        <h1 class="whitespace-nowrap font-bold text-lg sm:text-xl md:text-2xl uppercase">
            <i class="fa-sharp fa-regular fa-cart-flatbed-boxes pr-2"></i> become ystore seller
        </h1>
        <div class="w-full">
            <p class="text-sm sm:text-md pt-4 text-gray-500 leading-7">
                Join YSTORE as a seller and take control of your online business! Manage your product listings,
                respond to customer inquiries, and ensure a seamless shopping experience. Your role includes
                creating compelling listings, processing orders efficiently, and keeping inventory accurate.
                Start selling effortlessly on YSTORE today! 🚀<br>
                Join <span class="text-black font-bold uppercase">ystore</span> sellers and easily list your
                products for sell.
            </p>
        </div>
        <hr class="w-full md:w-10/12 my-3 sm:my-6" />
        <BaseButton @click="router.push({ name: 'AD-Dashboard' })" class="whitespace-nowrap text-start 
        w-full sm:w-6/12 md:w-8/12 px-6 rounded-sm border-t-0 border-r-0 border-gray-300 flex justify-between">
            <p>join YSTORE sellers community now</p>
            <div>
                <i class="fa-light fa-users pl-2"></i><i class="fa-solid fa-chevrons-right text-sm pl-2"></i>
            </div>
        </BaseButton>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
const router = useRouter();
</script>