<template>

    <userNavbar v-if="user == 'customer'" :currentlyShop="true"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div>
        <!-- PREVIEW -->
        <!-- <section class="preview w-full h-screen flex flex-row flex-wrap"> -->
        <!-- <div class="w-full lg:w-1/2 py-16 px-8 lg:px-14"> -->
        <section class="preview w-full h-[50vh] sm:h-[60vh] md:h-[80vh] flex justify-center items-end">
            <div class="py-8 px-4 lg:px-14 w-full">
                <!--<div> 
                    <p
                        class="w-10/12 sm:w-8/12 md:w-[82%] uppercase font-extrabold font-sans text-2xl sm:text-4xl md:text-5xl">
                        Find <span class="text-gray-600">clothes</span>
                        that <span class="text-gray-600">matches</span>
                        your <span class="text-gray-600">style</span>
                    </p> -->
                <!-- class="w-1/12 py-5 sm:py-8 text-gray-600 text-sm md:text-lg font-medium whitespace-wrap md:whitespace-nowrap "> -->
                <p class="w-full md:w-3/12 lg:w-[8.9%] py-5 sm:py-8 text-gray-200 text-sm md:text-lg font-medium  ">
                    Browse through our diverse range of meticulously crafted garments,
                    <br v-if="br1">
                    designed to bring out your individuality and cater to your sense of style.
                </p>
                <baseButton class="goto-shop text-md sm:text-lg w-full sm:w-5/12 mb-[-12px]"
                    @click="this.$router.push('/shop.co/shop')">
                    go shopping now <i class="fa-sharp-duotone fa-thin fa-bags-shopping font-bold pl-2"></i>
                </baseButton>
                <!-- </div> -->

                <!-- <div class="results w-full flex flex-row flex-wrap lg:flex-nowrap pt-6 justify-start">
                    <div class="p-5 pl-0">
                        <p class="font-bold text-3xl sm:text-4xl">200+</p>
                        <p class="whitespace-nowrap">International Brands</p>
                    </div>
                    <div class="p-5 pl-0 sm:pl-5 border-x-none sm:border-x-2 border-x-gray-200">
                        <p class="font-bold text-3xl sm:text-4xl">2,000+</p>
                        <p class="whitespace-nowrap">High-Quality Products</p>
                    </div>
                    <div class="p-5 pl-0 sm:pl-5">
                        <p class="font-bold text-3xl sm:text-4xl">30,000+</p>
                        <p class="whitespace-nowrap">Happy Customers</p>
                    </div>
                </div> -->
            </div>

            <!-- <div class="w-full lg:w-1/2">
                <img loading="lazy" class="m-auto w-full h-auto md:h-full grayscale-[1]" src="../../assets/images/home5.webp" alt=""> -->
            <!-- <img loading="lazy" class="m-auto w-2/3 lg:w-[95%] h-auto md:h-full"
                    src="../../assets/images/shop/preview/preview-main.png" alt=""> -->
            <!-- </div> -->
        </section>

        <!-- BRANDS -->
        <section class="brands w-full min-h-20 sm:min-h-24 bg-black flex flex-wrap items-center 
            justify-evenly gap-x-1 sm:gap-x-4 ">
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/versace.png" alt="VERSACE">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/zara.png" alt="ZARA">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/gucci.png" alt="GUCCI">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/calvin-klein.png" alt="CALVIN KLEIN">
            </div>
            <div class="w-2/12">
                <img loading="lazy" src="../../assets/images/brands/prada.png" alt="PRADA">
            </div>
        </section>

        <!-- NEW ARRIVALS -->
        <section class="new-arrivals px-8 md:px-16">
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
                        <product :product="product"></product>
                    </div>
                </div>
                <swiper v-else class="flex flex-wrap justify-between" :modules="modules"
                    :slides-per-view="slidesPerView" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="product in newProducts" class="mt-4 mr-4 rounded-sm product relative">
                        <product :product="product"></product>
                    </swiper-slide>
                </swiper>
                <div class="w-full text-center my-6">
                    <button @click="this.$router.push('/shop.co/shop')" class="w-full sm:w-2/12 py-2 border-b-2 border-l-2 rounded-sm capitalize
                        hover:bg-black hover:text-white transition duration-300">
                        view all <i class="fa-solid fa-chevrons-right text-sm pl-2"></i>
                    </button>
                </div>
            </div>
        </section>
        <hr class="m-auto w-1/2">

        <!-- Best seller -->
        <section class="top-selling px-8 md:px-16">
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
                        <product :product="product"></product>
                    </div>
                </div>
                <swiper v-else class="flex flex-wrap justify-between" :modules="modules"
                    :slides-per-view="slidesPerView" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="product in bestSellers" class="mt-4 mr-4 rounded-sm product relative">
                        <product :product="product"></product>
                    </swiper-slide>
                </swiper>
                <div class="w-full text-center my-6">
                    <button @click="this.$router.push('/shop.co/shop')" class="w-full sm:w-2/12 py-2 border-b-2 border-l-2 rounded-sm capitalize
                        hover:bg-black hover:text-white transition duration-300">
                        view all <i class="fa-solid fa-chevrons-right text-sm pl-2"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- BROWSE BY DRESS STYLE -->
        <section class="styles w-full py-6 px-2 md:px-8 lg:px-14 bg-white">
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
        <section
            class="become-seller my-4 md:my-8 px-8 lg:px-16 flex flex-wrap justify-between border-y-2 border-y-gray-300 ">
            <div class="w-full sm:w-7/12 py-14 ">
                <h1
                    class="text-start whitespace-nowrap tracking-normal font-bold text-lg sm:text-xl md:text-2xl capitalize">
                    <i class="fa-brands fa-shopify pr-2"></i> become shop.co seller
                </h1>
                <div class="pl-0 sm:pl-9 w-full sm:w-9/12 h-24 sm:h-44">
                    <p class="text-sm sm:text-[16px] pt-4 text-gray-500 leading-6">
                        Become a <span class="text-black font-medium">Shop.Co</span> seller to manage product
                        listings, handle customer inquiries, and
                        ensure a smooth online shopping experience. <br>
                        Responsibilities include creating attractive listings, processing
                        orders, and maintaining inventory accuracy. <br>
                        Join <span class="text-black font-medium">Shop.Co</span> sellers and easily list your
                        products for sell.
                    </p>
                </div>
                <baseButton class="w-full sm:w-8/12 ml-0 sm:ml-8 text-md mt-32 sm:mt-16 rounded-sm">
                    join Shop.Co sellers now <i class="fa-light fa-users pl-2"></i>
                </baseButton>
            </div>
            <div class="w-full sm:w-5/12 py-4">
                <img class="m-auto w-[65%] md:w-[75%]" src="../../assets/images/shop/preview/be-seller.svg" alt="">
            </div>
        </section>
        <!-- FEEDBACK -->
        <section class="feedback px-6 md:px-16">
            <div class="mb-4 text-lg sm:text-xl md:text-2xl">
                <h1 class="text-start whitespace-nowrap tracking-normal font-bold text-center capitalize">
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
                    <swiper-slide v-for="i in 5" class="feedback-card cursor-pointer">
                        <baseCard>
                        </baseCard>
                    </swiper-slide>
                </Swiper>
            </div>
        </section>

    </div>
    <!-- FOOTER -->
    <baseFooter></baseFooter>
</template>

<script>

import userNavbar from '../../components/user/userNavbar.vue';
import baseNavbar from '../../components/baseNavbar.vue';
import baseFooter from '../../components/baseFooter.vue';
import baseButton from '../../components/baseButton.vue';
import baseCard from '../../components/baseCard.vue';
import product from '../../components/product.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Mousewheel, Scrollbar } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        baseNavbar, userNavbar, baseFooter, baseButton, baseCard,
        product,
        Swiper, SwiperSlide
    },
    data() {
        return {
            user: localStorage.getItem('user'),
            newProducts: [],
            bestSellers: []
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
        ...mapActions(['fetchMainProducts']),
        initData() {
            this.newProducts = this.Get_NewProducts;
            this.bestSellers = this.Get_bestSellers;
        },
        async fetchData() {
            try {
                await this.fetchMainProducts();
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
