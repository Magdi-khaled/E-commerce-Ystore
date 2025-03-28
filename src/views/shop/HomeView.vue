<script setup>
import UserNavbar from '@/components/user/UserNavbar.vue';
import BaseNavbar from '@/components/BaseNavbar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import BecomeSeller from '@/components/BecomeSeller.vue';

import BaseCard from '@/components/BaseCard.vue';
import ProductComponent from '@/components/shop/ProductComponent.vue';
import Brands from '@/components/shop/Brands.vue';
import Preview from '@/components/Preview.vue';
import Fashion from '@/components/Fashion.vue';
import data from '@/composables/data.js';

import { onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Mousewheel, Scrollbar } from 'swiper/modules';
import { useStore } from 'vuex';

const user = localStorage.getItem('user') || "Guest";
const store = useStore();
const modules = [Navigation, Mousewheel, Scrollbar];
// Computed Properties
const newProducts = computed(() => store.getters.Get_NewProducts);
const bestSellers = computed(() => store.getters.Get_bestSellers);
const reviews = computed(() => [
    ...data[0].feedbacks,
    {
        name: 'Magdi Khaled',
        rating: 5,
        feedback: 'This product is amazing',
        title: 'Good & Warm'
    }
]);

const fetchData = async () => {
    try {
        await store.dispatch('FetchNBProduvts');
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    localStorage.setItem("user", "Guest");
    fetchData();
});
</script>

<template>
    <UserNavbar v-if="user === 'customer'" :currentlyShop="true" />
    <BaseNavbar v-else />
    <div>
        <!-- PREVIEW -->
        <section data-aos="fade-up"
            class="preview bg-[#37474ff2] w-full h-[50vh] sm:h-[60vh] md:h-[80vh] flex justify-center items-end">
            <Preview />
        </section>

        <!-- BRANDS -->
        <section class="brands w-full min-h-20 sm:min-h-24 bg-black flex flex-wrap items-center 
            justify-evenly gap-x-1 sm:gap-x-4 px-6 sm:px-12">
            <Brands />
        </section>

        <!-- NEW ARRIVALS -->
        <section data-aos="fade-up" class="new-arrivals px-8 md:px-16">
            <div class="p-10 sm:p-16 pb-5 sm:pb-10">
                <h1 class="whitespace-nowrap tracking-normal text-2xl sm:text-3xl 
                md:text-4xl font-bold text-center uppercase">
                    new arrivals
                </h1>
            </div>
            <!-- Products -->
            <div class="new-arrivals-products">
                <swiper :modules="modules" :breakpoints="{
                    336: { slidesPerView: 1.2, spaceBetween: 10 },
                    368: { slidesPerView: 2, spaceBetween: 10 },
                    450: { slidesPerView: 2.5, spaceBetween: 20 },
                    568: { slidesPerView: 3, spaceBetween: 25 },
                    778: { slidesPerView: 3.5, spaceBetween: 25 },
                    1096: { slidesPerView: 4.5, spaceBetween: 30 }
                }" navigation pagination
                    :mousewheel="mouseWheelResponsive ? { forceToAxis: true, passive: true } : false"
                    :autoplay="{ delay: 1500 }">
                    <swiper-slide v-for="product in newProducts" class="mt-4 mr-4 rounded-sm product relative">
                        <router-link :to="{ name: 'Product', params: { id: product._id } }">
                            <ProductComponent :product="product" />
                        </router-link>
                    </swiper-slide>
                </swiper>
                <div class="w-full text-center my-6">
                    <button @click="this.$router.push({ name: 'Shop' })" class="w-full sm:w-2/12 py-2 border-b-2 border-l-2 rounded-sm capitalize
                        hover:bg-black hover:text-white transition duration-300">
                        view all <i class="fa-solid fa-chevrons-right text-sm pl-2"></i>
                    </button>
                </div>
            </div>
        </section>
        <hr class="m-auto w-1/2">

        <!-- Best seller -->
        <section data-aos="fade-up" class="top-selling  px-8 md:px-16">
            <div class="p-10 sm:p-16 pb-5 sm:pb-10">
                <h1 class="whitespace-nowrap tracking-normal text-2xl sm:text-3xl 
                md:text-4xl font-bold text-center uppercase">
                    best seller
                </h1>
            </div>
            <!-- Products -->
            <div class="best-seller-products">
                <swiper :modules="modules" :breakpoints="{
                    336: { slidesPerView: 1.2, spaceBetween: 10 },
                    368: { slidesPerView: 2, spaceBetween: 10 },
                    450: { slidesPerView: 2.5, spaceBetween: 20 },
                    568: { slidesPerView: 3, spaceBetween: 25 },
                    778: { slidesPerView: 3.5, spaceBetween: 25 },
                    1096: { slidesPerView: 4.5, spaceBetween: 30 }
                }" navigation pagination
                    :mousewheel="mouseWheelResponsive ? { forceToAxis: true, passive: true } : false"
                    :autoplay="{ delay: 1500 }">
                    <swiper-slide v-for="product in bestSellers" class="mt-4 mr-4 rounded-sm product relative">
                        <router-link :to="{ name: 'Product', params: { id: product._id } }">
                            <ProductComponent :product="product" />
                        </router-link>
                    </swiper-slide>
                </swiper>
                <div class="w-full text-center my-6">
                    <button @click="this.$router.push({ name: 'Shop' })" class="w-full sm:w-2/12 py-2 border-b-2 border-l-2 rounded-sm capitalize
                        hover:bg-black hover:text-white transition duration-300">
                        view all <i class="fa-solid fa-chevrons-right text-sm pl-2"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Fashion -->
        <section data-aos="fade-up" class="styles w-full py-6 px-2 md:px-8 lg:px-14 bg-white">
            <Fashion />
        </section>

        <!-- Become Seller -->
        <section data-aos="fade-up" v-show="!this.user"
            class="become-seller my-4 md:my-8 px-8 lg:px-16 flex flex-wrap justify-between border-y-2 border-y-gray-300 ">
            <BecomeSeller />
            <div class="w-full md:w-6/12 flex justify-center items-center px-0 md:px-6 py-4">
                <img class="w-full h-[16em] lg:h-[20em] rounded border-2 border-gray-300 bg-gray-50 shadow-sm"
                    loading="lazy" src="@/assets/media/shop/preview/fashion shop-pana2.svg" alt="">
            </div>
        </section>

        <!-- FEEDBACK -->
        <section data-aos="fade-up" class="feedback px-6 md:px-16">
            <div class="mb-4 text-lg sm:text-xl md:text-3xl my-6">
                <h1 class="whitespace-nowrap tracking-normal font-bold text-center capitalize">
                    <i class="fa-regular fa-comments"></i> our happy customers
                </h1>
            </div>
            <div class="swiper-cards">
                <swiper class="w-full flex justify-evenly" :modules="modules" :breakpoints="{
                    446: { slidesPerView: 1.2, spaceBetween: 15 },
                    568: { slidesPerView: 2, spaceBetween: 15 },
                    768: { slidesPerView: 2.5, spaceBetween: 15 },
                    1024: { slidesPerView: 3.2, spaceBetween: 15 },
                }" navigation :pagination="{ clickable: true }" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="review in reviews" class="feedback-card cursor-pointer">
                        <BaseCard :card="review" />
                    </swiper-slide>
                </Swiper>
            </div>
        </section>
    </div>

    <BaseFooter />
</template>

<style scoped>
@import "@/assets/css/shop/home.css";
</style>
