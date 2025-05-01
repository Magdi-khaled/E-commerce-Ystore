<script setup>
import { ref } from 'vue';
defineProps({
    shopLength: { type: Number, required: true, },
    shopType: { type: String, required: true, },
});
const toggleFilter = defineModel('toggleFilter');

const asPopular = ref(false);
const asUsual = ref(false);
const mostPopular = ref(false);
</script>

<template>
    <div class="flex items-center justify-between font-medium mr-1 sm:mr-2 md:mr-3 mt-3 sm:mt-0">
        <div class="flex items-center gap-4">
            <p class="whitespace-nowrap text-xs sm:text-[14px] text-gray-400 font-medium">
                Showing 1-20 from total <span class="text-black"> {{ shopLength }}</span> for
                "<span class="text-black capitalize"> {{ shopType || 'all fashion' }}</span>"
            </p>
            <div v-if="asPopular" class="w-5/12 flex items-center gap-2 text-black border-2
                            border-gray-500 cursor-pointer p-[5px] text-sm rounded-full transition-all duration-100">
                <button @click="asUsual = true, asPopular = !asPopular">
                    <i class="fa-regular fa-xmark hover:text-gray-500 "></i>
                </button>
                <p>
                    {{ asUsual ? '' : 'Most popular' }}
                </p>
            </div>
        </div>
        <div class="hidden md:flex justify-between whitespace-nowrap text-sm sm:text-md capitalize">
            showed by:
            <div class="pl-1 relative z-30 ">
                <button @click="mostPopular = !mostPopular"
                    class="capitalize text-sm sm:text-md text-black transition hover:bg-gray-200 rounded-md">
                    {{ asUsual ? 'as usual' : 'as popular' }} <i class="fa-solid fa-chevron-down text-md"></i>
                </button>
                <div v-if="mostPopular" class="w-fit rounded-sm border-2 mt-1 text-black bg-white absolute right-[0%]">
                    <button @click="asPopular = true, mostPopular = false, asUsual = false"
                        class="w-full text-sm sm:text-md capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
                        most popular <i class="fa-solid fa-arrow-up-wide-short pl-2"></i>
                    </button>
                    <hr>
                    <button @click="asUsual = true, mostPopular = false, asPopular = false"
                        class="w-full capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
                        as usual <i class="fa-solid fa-arrow-down-wide-short pl-2"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full flex md:hidden justify-end">
            <button @click="toggleFilter = !toggleFilter" class="rounded hover:text-gray-500 transition duration-150">
                <i class="fa-sharp fa-regular fa-filters text-lg"></i>
            </button>
        </div>
    </div>
</template>
