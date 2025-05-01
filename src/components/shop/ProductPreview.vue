<script setup>
import { useStore } from 'vuex';
import { onBeforeUpdate, onMounted, watch, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseTeleport from '@/components/BaseTeleport.vue';
import { selectedImg } from '@/composables/useUtils.js';



const props = defineProps({ product: { type: Object, required: true }, isView: { type: Boolean, default: true } });
const store = useStore();

const show = ref(false);
const selectedImageIndex = ref(null);

const showImage = (src, index) => {
    selectedImg.value = src;
    selectedImageIndex.value = index;
};
const addToCart = async () => {
    try {
        await store.dispatch('AddItemToCart', props.product);
        show.value = true;
        setTimeout(() => { show.value = false; }, 1500);
    } catch (err) {
        console.error('Add to Cart:', err);
    }
};
watch(() => props.product?.image, (image) => {
    if (image) {
        selectedImg.value = image;
    }
}, { immediate: true });
</script>
<template>
    <BaseTeleport :show="show" :type="'success'">
        Product Added to shopping cart
    </BaseTeleport>
    <div class="w-full md:w-1/2 flex flex-row gap-2 lg:gap-3">
        <!-- Options Images -->
        <div class="w-[25%] lg:w-[22%] flex flex-col">
            <div v-for="(image, index) in props.product?.providedImages" :key="index"
                class="w-full h-auto p-1 cursor-pointer" @click="showImage(image, index)">
                <img :class="{ 'opacity-[1] border-2 border-gray-600': selectedImageIndex == index }"
                    class="opacity-80 h-[6.5em] md:h-[8em] lg:h-[9em] w-full rounded-md border-2 hover:scale-[101.5%] transition-transform duration-200 ease-in-out"
                    :src="image" alt="Product Option" />
            </div>
        </div>
        <!-- Main Image -->
        <div class="w-[80%] md:w-[100%] lg:w-[90%] h-auto p-0 sm:p-1">
            <div class="relative w-full h-auto rounded-md">
                <img class="w-full h-[25em] md:h-[30em] lg:h-[35em]" :src="selectedImg" alt="Main Product Image" />
            </div>
            <div class="w-full mt-4" v-show="isView">
                <BaseButton @click="addToCart" class="addToCart-btn w-full">add to cart <i
                        class="fa-solid fa-cart-shopping"></i>
                </BaseButton>
            </div>
        </div>
    </div>
</template>
