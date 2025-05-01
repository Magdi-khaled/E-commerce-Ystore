<script setup>
import { ref } from 'vue';
import { handleStars, isHalf } from '@/composables/useUtils.js';
import BaseButton from '@/components/BaseButton.vue';
import { useRouter } from 'vue-router';

defineProps({ product: { type: Object, required: true } });

const router = useRouter();
const tuser = ref(localStorage.getItem('user'));

const navigateAndToggleReview = () => {
    if (tuser.value !== 'customer') {
        router.push({ name: 'User-Login' });
    } else {
        document.getElementById('textarea-review')?.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>
<template>
    <div class="w-full sm:w-4/12 md:w-3/12">
        <h1 class="font-medium text-lg sm:text-xl capitalize whitespace-nowrap">
            customer reviews
        </h1>
        <div class="my-1 flex items-center gap-[2px]">
            <div v-for="item in Math.floor(3.5)">
                <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
            </div>
            <i v-if="isHalf(3.5)" class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
            <div v-for="item in handleStars(3.5)">
                <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
            </div>
            <p class="pl-1 font-medium text-sm sm:text-lg whitespace-nowrap">
                {{ product?.rate }} out of 5
            </p>
        </div>
        <h1 class="text-gray-600 mb-2">{{ product?.feedbacks?.length }} global ratings</h1>
        <div v-for="item in [1, 2, 3, 4, 5].reverse()" class="flex items-center justify-start whitespace-nowrap">
            <p class="text-gray-500 w-2/12">{{ item }} star</p>
            <div class="border-2 border-gray-400 rounded h-4 md:h-5 w-5/12 md:w-7/12 my-1">
                <div class="rounded-l-sm w-[25%] h-full bg-[#db9454]">
                </div>
            </div>
            <p class="text-gray-500 text w-2/12 pl-2">{{ item * 10 }}%</p>
        </div>
        <BaseButton @click="navigateAndToggleReview"
            class="w-full sm:w-11/12 text-sm sm:text-md mt-4 py-[8px] sm:py-[10px] rounded my-6">
            write a review
            <i class="fa-solid fa-pen-line pl-2"></i>
        </BaseButton>
    </div>
</template>