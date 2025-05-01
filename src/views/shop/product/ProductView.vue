<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import BaseNavbar from '@/components/BaseNavbar.vue';
import UserNavbar from '@/components/user/UserNavbar.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue';
import ProductPreview from '@/components/shop/ProductPreview.vue';
import ProductOrder from '@/components/shop/ProductOrder.vue';
import ProductDetails from '@/components/shop/ProductDetails.vue';
import Rate from '@/components/shop/Rate.vue';
import Field from '@/components/form/Field.vue';
import { Form } from 'vee-validate';
import BaseFooter from '@/components/BaseFooter.vue';
import { selectedImg } from '@/composables/useUtils.js';

const store = useStore();
const route = useRoute();

const tuser = ref(localStorage.getItem('user'));
const product = ref({});
const r_more = ref(false);
const reviewsFilter = ref('latest');
const reviewTitle = ref('');
const review = ref('');
const isFeedback = ref(0);
const selectedRating = ref(null);
const dropdownOpen = ref(false);
const displayedCount = ref(4);

const displayedFeedbacks = computed(() => product.value?.feedbacks?.slice(0, displayedCount.value) || []);
const fetchData = async () => {
    try {
        await store.dispatch('FetchProducts');
        initData();
    } catch (e) {
        console.error(e);
    }
};
const initData = () => {
    product.value = store.getters['Get_Products'].find(v => v._id == route.params.id);
    selectedImg.value = product.value?.image;
    isFeedback.value = product.value?.feedbacks.length;
};
const selectRating = (rating) => {
    selectedRating.value = rating;
    dropdownOpen.value = false;
};
const showMoreReviews = () => {
    r_more.value = true;
    setTimeout(() => {
        r_more.value = false;
        displayedCount.value += 4;
    }, 2000);
};
const addReview = () => {
    const newReview = {
        id: 4,
        name: 'Magdi Khaled',
        rating: selectedRating.value,
        title: reviewTitle.value,
        feedback: review.value,
    };
    product.value.feedbacks.push(newReview);
    displayedCount.value += 1;
};

onMounted(() => fetchData());
</script>

<template>
    <UserNavbar v-if="tuser == 'customer'" />
    <BaseNavbar v-else />
    <Breadcrumbs class="mt-2 px-3 md:px-4 pt-[3px] pb-4" />
    <div class="px-4 sm:px-8 ">
        <div data-aos="fade-up" class=" flex flex-wrap">
            <ProductPreview :product="product" />
            <ProductOrder v-model:product="product" />
        </div>
    </div>
    <!-- product rating & reviews -->
    <div data-aos="fade-up" class="product-details px-4 md:px-10">
        <hr class="my-4">
        <!-- product details  -->
        <ProductDetails :product="product" />
        <hr class="my-4">
        <!-- rates & reviews  -->
        <section class="rounded-b mt-6 flex flex-wrap justify-end">
            <!-- customer reviews -->
            <Rate :product="product" />
            <!-- reviews -->
            <div class="w-full sm:w-8/12 md:w-9/12">
                <div v-if="!isFeedback"
                    class="h-36 sm:h-full  bg-gray-50 border-[2px] p-2  rounded flex flex-col justify-center items-center">
                    <h1 class="font-medium text-sm text-gray-500">No reviews about this product untill
                        now...</h1>
                </div>
                <div v-else class="flex flex-row flex-wrap justify-between">
                    <div class="ml-4 w-4/12 sm:w-2/12">
                        <select id="reviewFilter"
                            class="w-full pl-2 rounded capitalize border-[2px] border-gray-400 bg-gray-100 text-black cursor-pointer font-medium outline-none"
                            v-model="reviewsFilter">
                            <option value="latest" class="text-md" selected>latest
                            </option>
                            <option value="earliest" class="text-md">earliest</option>
                        </select>
                    </div>
                    <div v-for="(review, index) in displayedFeedbacks" :key="index" class="w-full my-[-8px]">
                        <BaseCard :card="review" class="rounded-none border-t-0 border-r-0" />
                    </div>
                </div>
                <div v-if="isFeedback > displayedCount" class="flex justify-center my-3 relative">
                    <button @click="showMoreReviews" class="font-medium text-md 
                            hover:text-gray-600 rounded whitespace-nowrap underline transition duration-150">
                        <p v-if="!r_more">more reviews <i class="fa-solid fa-chevrons-right text-xs"></i></p>
                        <p v-else class="show-more border-4 border-gray-500 m-auto w-8 h-8"></p>
                    </button>
                </div>
            </div>
            <hr class="my-6">
            <!-- write review -->
            <span id="textarea-review"></span>
            <div v-if="tuser === 'customer'" class="w-full sm:w-8/12 md:w-9/12 flex flex-col flex-wrap mt-6">
                <div class="flex items-center justify-between flex-wrap">
                    <label for="review" class="font-bold mb-4 text-md sm:text-lg whitespace-nowrap">
                        Write your review <i class="fa-solid fa-pen-line"></i>
                    </label>
                    <div class="w-full sm:w-3/12 whitespace-nowrap relative">
                        <div @click="dropdownOpen = !dropdownOpen" class="capitalize text-sm sm:text-md font-medium
                                bg-gray-100 border-2 border-gray-400 p-2 rounded-sm shadow-sm cursor-pointer">
                            <span v-if="selectedRating">
                                Selected Rate :
                                {{ selectedRating }}/5 <i class="fa-solid fa-star text-black"></i>
                            </span>
                            <span v-else>Choose rate</span>
                            <i class="fa-solid fa-sort-down text-black absolute z-30 top-[25%] right-[4%]"></i>
                        </div>
                        <div v-if="dropdownOpen">
                            <ul class="w-full absolute bg-white mt-0.5 rounded shadow-md">
                                <li v-for="item in 5" :key="item" @click="selectRating(item)" class="px-2 sm:px-4 py-1 cursor-pointer
                                        text-sm sm:text-md hover:bg-gray-100 hover:rounded flex items-center">
                                    <p class="pr-3">{{ item }}</p>
                                    <i v-for="i in item" :key="i" class="fa-solid fa-star text-[#db9454]"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Form @submit.prevent="addReview" class="w-full mt-2 grid gap-4">

                    <Field label="title" type="text" name="reviewTitle" placeholder="Enter review title"
                        v-model="reviewTitle" />
                    <Field label="description" type="textarea" name="review" placeholder="Enter your feedback..."
                        v-model="review" />
                    <div class="w-full flex justify-end mt-2">
                        <BaseButton @click="addReview" class="rounded-none w-full sm:w-3/12">submit
                        </BaseButton>
                    </div>
                </Form>
            </div>
        </section>
    </div>
    <BaseFooter />
</template>

<style scoped>
@import "@/assets/css/product.css";
</style>
