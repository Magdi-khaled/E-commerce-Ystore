<template>

    <UserNavbar v-if="user == 'customer'" :currentlyShop="true" />
    <BaseNavbar v-else />
    <div>
        <!-- PREVIEW -->
        <section data-aos="fade-up"
            class="preview w-full h-[50vh] sm:h-[60vh] md:h-[80vh] flex justify-center items-end">
            <div class="py-8 px-4 lg:px-14 w-full">
                <p class=" w-full md:w-3/12 lg:w-[8.9%] py-5 sm:py-8 text-gray-200 text-sm md:text-lg font-medium  ">
                    Browse through our diverse range of meticulously crafted garments,
                    <br v-if="br1">
                    designed to bring out your individuality and cater to your sense of style.
                </p>
                <BaseButton class="goto-shop text-md sm:text-lg w-full sm:w-5/12 mb-[-12px]"
                    @click="this.$router.push({ name: 'Shop' })">
                    go shopping now <i class="fa-sharp-duotone fa-thin fa-bags-shopping font-bold pl-2"></i>
                </BaseButton>
            </div>
        </section>

        <!-- BRANDS -->
        <section class="brands w-full min-h-20 sm:min-h-24 bg-black flex flex-wrap items-center 
            justify-evenly gap-x-1 sm:gap-x-4 px-6 sm:px-12">
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/versace.webp" alt="VERSACE">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/zara.webp" alt="ZARA">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/gucci.webp" alt="GUCCI">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/calvin-klein.webp" alt="CALVIN KLEIN">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/prada.webp" alt="PRADA">
            </div>
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
                <div v-if="!spvCheck" class="flex flex-wrap justify-between gap-4">
                    <div v-for="product in newProducts" class="mt-4 product relative">
                        <router-link :to="{ name: 'Product', params: { id: product._id } }">
                            <ProductComponent :product="product"></ProductComponent>
                        </router-link>
                    </div>
                </div>
                <swiper v-else class="flex flex-wrap justify-between" :modules="modules"
                    :slides-per-view="slidesPerView" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="product in newProducts" class="mt-4 mr-4 rounded-sm product relative">
                        <router-link :to="{ name: 'Product', params: { id: product._id } }">
                            <ProductComponent :product="product"></ProductComponent>
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
            <div class="new-arrivals-products">
                <div v-if="!spvCheck" class="flex flex-wrap justify-between gap-4">
                    <div v-for="product in bestSellers" class="mt-4 rounded-sm product relative">
                        <router-link :to="{ name: 'Product', params: { id: product._id } }">
                            <ProductComponent :product="product" />
                        </router-link>
                    </div>
                </div>
                <swiper v-else class="flex flex-wrap justify-between" :modules="modules"
                    :slides-per-view="slidesPerView" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
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
            <div class="rounded-md my-4">
                <p class="text-xl sm:text-3xl font-bold uppercase text-center my-6">
                    <i class="fa-solid fa-hat-cowboy-side"></i> Fashion <i class="fa-solid fa-hat-cowboy-side"></i>
                </p>
                <div class="styles-imgs w-full grid grid-cols-4 gap-x-1 sm:gap-x-4 justify-center">
                    <div class="relative">
                        <img class="h-[9rem] sm:h-[18rem] md:h-[21rem]" loading="lazy" src="/assets/shop/product12.webp"
                            alt="Casual">
                    </div>
                    <div class="px-1 md:px-2 py-6 relative">
                        <img class="h-[9rem] sm:h-[18rem] md:h-[21rem]" loading="lazy" src="/assets/shop/product5.webp"
                            alt="formal">
                    </div>
                    <div class="relative">
                        <img class="h-[9rem] sm:h-[18rem] md:h-[21rem]" loading="lazy" src="/assets/shop/product17.webp"
                            alt="Party">
                    </div>
                    <div class="px-1 md:px-2 py-4 relative">
                        <img class="h-[9rem] sm:h-[18rem] md:h-[21rem]" loading="lazy" src="/assets/shop/product18.webp"
                            alt="GYM">
                    </div>
                </div>
            </div>
        </section>

        <!-- become seller -->
        <section data-aos="fade-up" v-show="!this.user"
            class="become-seller my-4 md:my-8 px-8 lg:px-16 flex flex-wrap justify-between border-y-2 border-y-gray-300 ">

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
                <BaseButton @click="this.$router.push({ name: 'AD-Dashboard' })"
                    class="whitespace-nowrap text-start 
                    w-full sm:w-6/12 md:w-8/12 px-6 rounded-sm border-t-0 border-r-0 border-gray-300 flex justify-between">
                    <p>join YSTORE sellers community now</p>
                    <div>
                        <i class="fa-light fa-users pl-2"></i><i class="fa-solid fa-chevrons-right text-sm pl-2"></i>
                    </div>
                </BaseButton>
            </div>
            <div class="w-full md:w-6/12 flex justify-center items-center px-0 md:px-6 py-4">
                <img class="w-full h-[16em] lg:h-[20em] rounded border-2 border-gray-300 bg-gray-50 shadow-sm"
                    loading="lazy" src="../../assets/images/shop/preview/fashion shop-pana2.svg" alt="">
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
                    640: { slidesPerView: 1.25, spaceBetween: 15 },
                    768: { slidesPerView: 2.5, spaceBetween: 15 },
                    1024: { slidesPerView: 3.25, spaceBetween: 15 },
                }" navigation :pagination="{ clickable: true }" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="review in reviews" class="feedback-card cursor-pointer">
                        <BaseCard :card="review">
                        </BaseCard>
                    </swiper-slide>
                </Swiper>
            </div>
        </section>
    </div>
    <!-- FOOTER -->
    <BaseFooter />
</template>

<script>

import UserNavbar from '../../components/user/UserNavbar.vue';
import BaseNavbar from '../../components/BaseNavbar.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import BaseButton from '../../components/BaseButton.vue';
import BaseCard from '../../components/BaseCard.vue';
import ProductComponent from '../../components/shop/ProductComponent.vue';
import Data from '../../composables/data.js';

import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Mousewheel, Scrollbar } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        BaseNavbar, UserNavbar, BaseFooter, BaseButton, BaseCard,
        ProductComponent, Swiper, SwiperSlide
    },
    data() {
        return {
            user: localStorage.getItem('user'),
            newProducts: [],
            bestSellers: [],
            reviews: [...Data[0].feedbacks, {
                name: 'Magdi Khaled',
                rating: 5,
                feedback: 'This product is amazing',
                title: 'Good & Warm'
            }],
        }
    },
    computed: {
        ...mapGetters(['Get_NewProducts', 'Get_bestSellers']),
        slidesPerView() {
            if (this.spvCheck) {
                this.spv = 1.5;
                return this.spv;
            }
            this.spv = 4;
            return this.spv;
        }
    },
    created() {
        this.fetchData();
    },
    setup() {
        const br1 = ref(window.innerWidth > 642);
        const spvCheck = ref(window.innerWidth < 590);
        const spv = ref(4);

        const updateShow = () => {
            br1.value = window.innerWidth > 642;
            spvCheck.value = window.innerWidth < 590;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.addEventListener('resize', updateShow);
        });
        return {
            br1, spv, spvCheck,
            modules: [Navigation, Mousewheel, Scrollbar],
        };
    },
    methods: {
        ...mapActions(['FetchNBProduvts']),
        initData() {
            this.newProducts = this.Get_NewProducts;
            this.bestSellers = this.Get_bestSellers;
        },
        async fetchData() {
            try {
                await this.FetchNBProduvts();
                await this.initData();
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style scoped>
@import url('../../assets/stylesheets/shop/home-page.style.css');
</style>
