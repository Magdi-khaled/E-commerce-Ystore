<template>
    <div>
        <baseNavbar></baseNavbar>
        <!-- PREVIEW -->
        <section class="preview w-full flex flex-row flex-wrap">
            <div class="w-full lg:w-1/2 p-8 lg:p-16">
                <div>
                    <p class="preview-txt font-extrabold font-sans text-4xl sm:text-6xl whitespace-nowrap">
                        FIND CLOTHES
                        <br>THAT MATCHES
                        <br>YOUR STYLE
                    </p>
                    <p class="py-5 sm:py-10 text-gray-600 text-sm md:text-lg whitespace-wrap md:whitespace-nowrap ">
                        Browse through our diverse range of meticulously crafted garments,
                        <br v-if="br1">
                        designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <baseButton class="goto-shop" @click="this.$router.push('/shop.co/shop')">
                        Shop Now <i class="fa-solid fa-cart-shopping pl-1"></i>
                    </baseButton>
                </div>

                <div class="results w-full flex flex-row flex-wrap lg:flex-nowrap pt-6 justify-center md:justify-start">
                    <div class="p-5 pl-0">
                        <p class="font-bold text-3xl sm:text-4xl">200+</p>
                        <p class="whitespace-nowrap">International Brands</p>
                    </div>
                    <span v-if="vr1"
                        class="m-2 my-auto w-px h-20 rounded-full border-l-2 border-l-solid boreder-l-red-400"></span>
                    <div class="p-5 pl-0 sm:pl-5">
                        <p class="font-bold text-3xl sm:text-4xl">2,000+</p>
                        <p class="whitespace-nowrap">High-Quality Products</p>
                    </div>
                    <span v-if="vr2"
                        class="m-2 my-auto w-px h-20 rounded-full border-l-2 border-l-solid boreder-l-red-400"></span>
                    <div class="p-5 pl-0 sm:pl-5">
                        <p class="font-bold text-3xl sm:text-4xl">30,000+</p>
                        <p class="whitespace-nowrap">Happy Customers</p>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/2">
                <img class="m-auto w-2/3 lg:w-full h-auto md:h-full"
                    src="../../assets/images/shop/preview/preview-main.png" alt="">
            </div>
        </section>

        <!-- BRANDS -->
        <section class="brands pt-3 w-full min-h-36 bg-black flex flex-wrap items-center justify-between px-8 md:px-16">
            <div>
                <img src="../../assets/images/brands/versace.png" alt="VERSACE">
            </div>
            <div>
                <img src="../../assets/images/brands/zara.png" alt="ZARA">
            </div>
            <div>
                <img src="../../assets/images/brands/gucci.png" alt="GUCCI">
            </div>
            <div>
                <img src="../../assets/images/brands/prada.png" alt="PRADA">
            </div>
            <div>
                <img src="../../assets/images/brands/calvin-klein.png" alt="CALVI KLEIN">
            </div>
        </section>

        <!-- NEW ARRIVALS -->
        <section class="new-arrivals px-8 md:px-16">
            <baseTitle>
                new arrivals
            </baseTitle>
            <!-- Products -->
            <div class="new-arrivals-products">
                <div v-if="!spvCheck" class="flex flex-wrap justify-between">
                    <div v-for="product in newProducts" class="na-img cursor-pointer">
                        <product :product="product"></product>
                    </div>
                </div>
                <swiper v-else class="flex flex-wrap justify-between" :modules="modules"
                    :slides-per-view="slidesPerView" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="product in newProducts" class="na-img ml-5 md:ml-0 cursor-pointer">
                        <product :product="product"></product>
                    </swiper-slide>
                </swiper>
                <div class="w-full text-center my-4">
                    <button @click="this.$router.push('/shop.co/shop')"
                        class="w-full sm:w-2/12 py-3 border-2 rounded-full capitalize hover:font-bold hover:bg-[#2f2f2f] hover:text-white  ">
                        view all
                    </button>
                </div>
            </div>
        </section>
        <hr class="m-auto w-1/2">

        <!-- TOP SELLING -->
        <section class="top-selling px-8 md:px-16">
            <baseTitle>
                top selling
            </baseTitle>
            <!-- Products -->
            <div class="new-arrivals-products">
                <div v-if="!spvCheck" class="flex flex-wrap justify-between">
                    <div v-for="product in bestSellers" class="na-img cursor-pointer">
                        <product :product="product"></product>
                    </div>
                </div>
                <swiper v-else class="flex flex-wrap justify-between" :modules="modules"
                    :slides-per-view="slidesPerView" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="product in bestSellers" class="na-img ml-5 md:ml-0 cursor-pointer">
                        <product :product="product"></product>
                    </swiper-slide>
                </swiper>
                <div class="w-full text-center my-4">
                    <button @click="this.$router.push('/shop.co/shop')"
                        class="w-full sm:w-2/12 py-3 border-2 rounded-full capitalize hover:font-bold hover:bg-[#2f2f2f] hover:text-white  ">
                        view all
                    </button>
                </div>
            </div>
        </section>

        <!-- BROWSE BY DRESS STYLE -->
        <section class="styles w-full p-6 md:p-12 lg:p-16 bg-white">
            <div class="p-6 sm:p-8 lg:p-10 bg-[#f0eeed] rounded-3xl">
                <p class="text-xl sm:text-3xl md:text-4xl font-bold uppercase font-sans text-center mb-5">
                    browse by dress style
                </p>
                <div class="styles-imgs w-full flex flex-wrap justify-center">
                    <div class="w-full md:w-1/3 p-0 sm:p-4 pb-5 sm:pb-0 relative">
                        <img src="../../assets/images/shop/styles/casual.png" alt="Casual">
                        <p
                            class="text-center text-xl lg:text-3xl font-bold font-sans  absolute left-5 sm:left-12 top-5 sm:top-12">
                            Casual
                        </p>
                    </div>
                    <div class="w-full md:w-2/3 p-0 sm:p-4 pb-5 sm:pb-0 relative">
                        <img src="../../assets/images/shop/styles/formal.png" alt="formal">
                        <p
                            class="text-center text-xl lg:text-3xl font-bold font-sans  absolute left-5 sm:left-12 top-5 sm:top-12">
                            Formal
                        </p>
                    </div>
                    <div class="w-full md:w-2/3 p-0 sm:p-4 pb-5 sm:pb-0 relative">
                        <img src="../../assets/images/shop/styles/party.png" alt="Party">
                        <p
                            class="text-center text-xl lg:text-3xl font-bold font-sans  absolute left-5 sm:left-12 top-5 sm:top-12">
                            Party
                        </p>
                    </div>
                    <div class="w-full md:w-1/3 p-0 sm:p-4 relative">
                        <img src="../../assets/images/shop/styles/gym.png" alt="GYM">
                        <p
                            class="text-center text-xl lg:text-3xl font-bold font-sans  absolute left-5 sm:left-12 top-5 sm:top-12">
                            Gym
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- FEEDBACK -->
        <section class="feedback px-8 md:px-16">
            <baseTitle>our happy customers</baseTitle>
            <div class="swiper-cards">
                <swiper class="w-full flex justify-evenly" :modules="modules" :breakpoints="{
                    640: { slidesPerView: 1.25, spaceBetween: 15 },
                    768: { slidesPerView: 2.5, spaceBetween: 15 },
                    1024: { slidesPerView: 3.25, spaceBetween: 15 },
                }" navigation :pagination="{ clickable: true }" :mousewheel="{ scorllable: true }"
                    :scrollbar="{ draggable: false }">
                    <swiper-slide v-for="i in 5"
                        class="feedback-card cursor-pointer p-4 sm:p-8 border-2 border-solid rounded-2xl">
                        <div class="card-rate flex gap-1">
                            <i v-for="i in 5" class="fa-solid fa-star text-[#FFD43B]"></i>
                        </div>
                        <div class="card-author flex w-32 py-2 items-center gap-2">
                            <p class="capitalize font-bold">magdi khaled</p>
                            <i class="fa-solid fa-circle-check text-[#01AB31]"></i>
                        </div>
                        <div class="card-content h-24">
                            <p class="text-wrap	text-sm md:text-md">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                                facere distinctio saepe itaque error, quisquam quis et ipsa,
                                unde dignissimos delectus ad neque exercitationem magni
                                assumenda hic quia rerum nobis?</p>
                        </div>
                    </swiper-slide>
                </Swiper>
            </div>
        </section>

        <!-- FOOTER -->
        <baseFooter></baseFooter>
    </div>
</template>

<script>
import baseNavbar from '../../components/baseNavbar.vue';
import baseFooter from '../../components/baseFooter.vue';
import baseTitle from '../../components/baseTitle.vue';
import baseButton from '../../components/baseButton.vue';
import product from '../../components/product.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Mousewheel, Scrollbar } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        baseNavbar, baseFooter, baseButton, baseTitle,
        product,
        Swiper, SwiperSlide
    },
    data() {
        return {
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

        const br1 = ref(window.innerWidth > 542);
        const vr1 = ref(window.innerWidth > 402);
        const vr2 = ref(window.innerWidth > 612);
        const spvCheck = ref(window.innerWidth < 590);
        const spv = ref(4);


        const updateShow = () => {
            br1.value = window.innerWidth > 542;
            vr1.value = window.innerWidth > 402;
            vr2.value = window.innerWidth > 612;
            spvCheck.value = window.innerWidth < 590;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.addEventListener('resize', updateShow);
        });
        return {
            br1, vr1, vr2, spv, spvCheck,
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
                this.initData();
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
