<script setup>
import BaseTeleport from '@/components/BaseTeleport.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

defineProps({
    product: { type: Object, required: true },
    smallWished: { type: Boolean, default: false }
});

const store = useStore();
const wished = defineModel('wished');
const hoveredProductId = defineModel('hoveredProductId');

const show = ref(false);
const wish = ref(false);
const unwish = ref(false);

const isWished = (product) => {
    return store.getters.Get_Wishlist.some(v => v._id === product._id);
};
const addToCart = async (cartItem) => {
    try {
        await store.dispatch('AddItemToCart', cartItem);
        show.value = true;
        setTimeout(() => { show.value = false; }, 1500);
    } catch (err) {
        console.error('Add to Cart:', err);
    }
};

const addToWishlist = async (wishItem) => {
    try {
        const exist = await store.dispatch('AddToWishlist', wishItem);
        if (exist) {
            unwish.value = true;
            setTimeout(() => { unwish.value = false; }, 1500);
            return;
        }
        wish.value = true;
        setTimeout(() => { wish.value = false; }, 1500);
    } catch (err) {
        console.error('Add to Wishlist:', err);
    }
};
</script>

<template>
    <BaseTeleport :show="show" :type="'message'">
        <i class="fa-solid fa-cart-plus text-gray-200"></i>
        Product Added to shopping cart
    </BaseTeleport>
    <BaseTeleport :show="wish" :type="'message'">
        <i class="fa-regular fa-heart"></i> Product Added to Wishlist
    </BaseTeleport>
    <BaseTeleport :show="unwish" :type="'message'">
        <i class="fa-regular fa-heart-crack"></i> Product removed from Wishlist
    </BaseTeleport>
    <!-- Small Screen Wishlist Button -->
    <transition name="fade">
        <button v-if="smallWished" @mouseover="wished = product._id" @mouseleave="wished = null"
            @click="addToWishlist(product)" class="absolute z-10 font-extrabold text-md sm:text-2xl top-2 right-[3%] 
                    text-sm sm:text-[15px] p-[2.5px] opacity-[1] border border-black 
                    rounded-full flex flex-col transition-all duration-150" title="Add To Wishlist">
            <i class="text-gray-900" :class="{
                'fa-regular fa-heart': wished !== product._id && !isWished(product),
                'fa-solid fa-heart': wished === product._id || isWished(product)
            }"></i>
        </button>
    </transition>

    <!-- Large Screen Wishlist Button -->
    <transition name="fade" v-if="!smallWished">
        <button v-if="hoveredProductId === product._id || isWished(product)" @mouseover="wished = product._id"
            @mouseleave="wished = null" @click="addToWishlist(product)" class="absolute z-10 font-extrabold top-2 right-2 text-sm sm:text-[15px] 
                    p-[2px] opacity-[1] border border-black rounded-full flex flex-col 
                    transition-all duration-150" title="Add To Wishlist">
            <i class="text-gray-900" :class="{
                'fa-regular fa-heart': wished !== product._id && !isWished(product),
                'fa-solid fa-heart': wished === product._id || isWished(product)
            }"></i>
        </button>
    </transition>

    <!-- Add to Cart Button -->
    <transition name="fade">
        <button @click="addToCart(product)" class="absolute z-10 font-extrabold text-md sm:text-xl bottom-[77%] sm:bottom-4 
                    right-[4%] sm:right-0 opacity-[1] flex flex-col transition-all duration-150" title="Add To Cart">
            <i class="fa-solid fa-cart-plus text-gray-900 hover:text-gray-500"></i>
        </button>
    </transition>
</template>
