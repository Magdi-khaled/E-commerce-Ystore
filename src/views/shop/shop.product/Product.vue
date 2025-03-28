```html
<template>
    <UserNavbar v-if="tuser == 'customer'" />
    <BaseNavbar v-else />

    <BaseTeleport :show="show" :type="'success'">
        Product Added to shopping cart
    </BaseTeleport>
    <Breadcrumbs class="mt-2 px-3 md:px-4 pt-[3px] pb-4" :breadcrumbs="this.$route.meta.breadcrumb" />
    <div class="px-4 sm:px-8 ">
        <div data-aos="fade-up" class=" flex flex-wrap">
            <div class="w-full md:w-1/2 flex flex-row gap-2 lg:gap-3">
                <!-- Options Images -->
                <div class="w-[25%] lg:w-[22%] flex flex-col">
                    <div v-for="(image, index) in product?.providedImages" :key="index"
                        class="w-full h-auto p-1 cursor-pointer" @click="showImage(image, index)">
                        <img :class="{ 'opacity-[1] border-2 border-gray-600': selectedImageIndex == index }"
                            class="opacity-80 h-[6.5em] md:h-[8em] lg:h-[9em] w-full rounded-md border hover:scale-[101.5%] transition-transform duration-200 ease-in-out"
                            :src="image" alt="Product Option" />
                    </div>
                </div>
                <!-- Main Image -->
                <div class="w-[80%] md:w-[100%] lg:w-[90%] h-auto p-0 sm:p-1">
                    <div class="relative overflow-hidden w-full h-auto rounded-md cursor-zoom-in" @mousemove="zoomLens"
                        @mouseleave="hideLens">
                        <img ref="mainImage" class="w-full h-[25em] md:h-[30em] lg:h-[35em]" :src="selectedImg"
                            alt="Main Product Image" />
                        <div ref="lens" class="absolute rounded-full bg-transparent border-2 border-gray-500 "
                            :style="lensStyles"></div>
                    </div>
                    <div class="w-full mt-4">
                        <BaseButton @click="addToCart(product)" class="addToCart-btn w-full">add to cart <i
                                class="fa-solid fa-cart-shopping"></i>
                        </BaseButton>
                    </div>
                </div>
            </div>
            <div class="p-2 px-4 md:px-6 w-full md:w-1/2">
                <p class="candal-regular font-bold text-2xl lg:text-3xl capitalize">{{ product.title }}</p>
                <div class="product-rate">
                    <div class="stars-rate my-2 flex items-center gap-1">
                        <div v-for="item in Math.floor(product.rating?.avg)">
                            <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                        </div>
                        <i v-if="isHalf(product.rating?.avg)"
                            class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                        <div v-for="item in handleStars(product.rating?.avg)">
                            <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
                        </div>
                        <p class="pl-1 font-semibold">
                            {{ product.rating?.avg }}<span class="text-gray-400">/5</span>
                        </p>
                    </div>
                    <div class="product-price my-4">
                        <p class="capitalize text-xl sm:text-2xl font-medium"><span class="text-xs text-gray-700">EGP
                            </span>
                            {{ handlePrice(product.price, product.sale) }}</p>
                        <div v-if="product.sale != 0.0" class="product-price-discount">
                            <div class="flex relative mt-1">
                                <p class="text-gray-500">
                                    <span class="text-xs">EGP
                                    </span>
                                    {{ product.price }}
                                    <span class="w-full h-[1.5px] bg-black  left-0 absolute top-[40%]"></span>
                                </p>
                            </div>
                            <span class="text-sm font-sans font-bold text-green-600 pl-2 mt-1">
                                {{ product.sale }}% OFF</span>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-10/12 my-6">
                    <p class="text-gray-600">
                        {{ product.details }}
                    </p>
                </div>
                <hr class="my-6">
                <!-- colours -->
                <div>
                    <p class="capitalize text-gray-600">select color</p>
                    <div class="colors mt-3 flex flex-wrap w-8/12">
                        <label v-for="item in product?.providedColors" class="relative">
                            <input v-if="item.color != 'all'" name="selectedColor" type="radio" v-model="color"
                                :value="item.value" class="appearance-none w-6 sm:w-8 
                        h-6 sm:h-8 mr-3 border-2 border-gray-400 cursor-pointer rounded"
                                :class="{ 'outline outline-2 outline-[#000]': color == item.value }"
                                :style="{ 'background-color': `#${item.value}` }">
                            <i v-if="color"
                                class="fa-solid fa-check text-gray-300 absolute z-30 py-3 px-4 text-xl sm:text-2xl"
                                :class="{ 'hidden': color != item.value, 'text-gray-600': item.color === 'white' }"></i>
                        </label>
                    </div>
                </div>
                <hr class="my-6">
                <!-- sizes -->
                <div>
                    <p class="capitalize text-gray-600">choose size</p>
                    <div class="colors mt-3 flex flex-wrap w-10/12 gap-y-2">
                        <label v-for="item in product?.providedSizes" :key="item"
                            class="flex items-center cursor-pointer">
                            <input type="radio" v-model="size" :value="item" :id="item" class="appearance-none hidden">
                            <span v-if="item != 'All'"
                                class="px-2 md:px-2 py-1 md:py-1 mr-1 border-2 bg-gray-100 text-gray-600 whitespace-nowrap capitalize font-bold transition-all"
                                :class="{ 'text-red-400 border-gray-500': size === item }">
                                {{ item }}
                            </span>
                        </label>
                    </div>
                </div>
                <hr class="my-8">
                <div class="flex justify-between w-full gap-5">
                    <div class="pagination font-medium grid grid-cols-3 text-lg 
                        border-2 border-black w-[30%] sm:w-[24%]">
                        <div class="bg-gray-900 text-white flex items-center justify-center">
                            <button @click="handleQuantity(false)">
                                <i class="fa-solid fa-minus"></i></button>
                        </div>
                        <div class="bg-white flex items-center justify-center">
                            <p class="px-3 text-lg">{{ quantity }}</p>
                        </div>
                        <div class="bg-gray-900 text-white flex items-center justify-center">
                            <button @click="handleQuantity(true)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="w-8/12 sm:w-9/12">
                        <BaseButton class="addToCart-btn w-full">buy it now <i class="fa-solid fa-money-bill-wave"></i>
                        </BaseButton>
                    </div>
                </div>
                <p v-if="outStock" class="text-red-500 text-sm my-2">You can't order more quantity than what
                    is in stock.</p>
            </div>
        </div>
    </div>
    <!-- product rating & reviews -->
    <div data-aos="fade-up" class="product-details px-4 md:px-10">
        <hr class="my-4">
        <!-- product details  -->
        <div data-aos="fade-up">
            <div>
                <h1 class="font-medium font-sans text-xl">Producet details</h1>
            </div>
            <div class="my-3 ml-0 sm:ml-2">
                <table class="text-sm sm:text-md w-full md:w-8/12">
                    <tbody>
                        <tr class="border-t-[1px] border-t-[#bbbfbf]">
                            <td class="w-5/12 bg-[#f0f2f2] text-gray-700 p-2">Title</td>
                            <td class="capitalize text-black p-2">
                                {{ product.title }}
                            </td>
                        </tr>
                        <tr class="border-t-[1px] border-t-[#bbbfbf]">
                            <td class="bg-[#f0f2f2] text-gray-700 p-2">
                                Date first available
                            </td>
                            <td class="text-black p-2">
                                9 July 2023
                            </td>
                        </tr>
                        <tr class="border-t-[1px] border-t-[#bbbfbf]">
                            <td class="bg-[#f0f2f2] text-gray-700 p-2">
                                Department
                            </td>
                            <td class="text-black p-2">
                                Men's winter wear <i class="fa-regular fa-snowflake text-xs"></i>
                            </td>
                        </tr>
                        <tr class="border-t-[1px] border-t-[#bbbfbf]">
                            <td class="capitalize bg-[#f0f2f2] text-gray-700 p-2">
                                Manufacturer
                            </td>
                            <td class="text-black p-2">
                                SHOP.CO </td>
                        </tr>
                        <tr class=" border-t-[1px] border-t-[#bbbfbf]">
                            <td class="capitalize bg-[#f0f2f2]  text-gray-700 p-2">
                                material
                            </td>
                            <td class="text-black p-2">
                                {{ product.material }}
                            </td>
                        </tr>
                        <tr class="border-y-[1px] border-y-[#bbbfbf]">
                            <td class="capitalize bg-[#f0f2f2]  text-gray-700 p-2">
                                package dimensions
                            </td>
                            <td class="text-black p-2">
                                22.9 x 13 x 5.9 cm - 200 g
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <hr class="my-4">
        <!-- rates & reviews  -->
        <section class="rounded-b mt-6 flex flex-wrap justify-end">
            <!-- customer reviews -->
            <div class="rates w-full sm:w-4/12 md:w-3/12">
                <h1 class="font-medium text-lg sm:text-xl capitalize whitespace-nowrap">
                    customer reviews
                </h1>
                <div class="product-global-rate my-1 flex items-center gap-[2px]">
                    <div v-for="item in Math.floor(3.5)">
                        <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                    </div>
                    <i v-if="isHalf(3.5)" class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                    <div v-for="item in handleStars(3.5)">
                        <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
                    </div>
                    <p class="pl-1 font-medium text-sm sm:text-lg whitespace-nowrap">
                        <!-- {{ product.rate }} -->
                        3.5 out of 5
                    </p>
                </div>
                <h1 class="text-gray-600 mb-2">{{ product?.feedbacks.length }} global ratings</h1>
                <div v-for="item in [1, 2, 3, 4, 5].reverse()"
                    class="flex items-center justify-start whitespace-nowrap">
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
            <!-- reviews -->
            <div class="w-full sm:w-8/12 md:w-9/12">
                <div v-if="!product?.feedbacks.length"
                    class="h-36 sm:h-full  bg-gray-50 border-[2px] p-2  rounded flex flex-col justify-center items-center">
                    <h1 class="font-medium text-sm text-gray-500">no reviews about this product untill
                        now...</h1>
                    <BaseButton @click="navigateAndToggleReview" class="text-sm sm:text-md px-12 mt-2 hidden sm:block">
                        write a first review
                        <i class="fa-solid fa-pen-line pl-2"></i>
                    </BaseButton>
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

                <div v-if="product?.feedbacks.length > displayedCount" class="flex justify-center my-3 relative">
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
                        <BaseButton @click="addReview" :class="{ 'submit-review w-full sm:w-3/12': true }">submit
                        </BaseButton>
                    </div>
                </Form>
            </div>
        </section>
    </div>
    <BaseFooter />
</template>
<script>
import BaseNavbar from '../../../components/BaseNavbar.vue';
import UserNavbar from '../../../components/user/UserNavbar.vue';
import BaseButton from '../../../components/BaseButton.vue';
import BaseTeleport from '../../../components/BaseTeleport.vue';
import BaseCard from '../../../components/BaseCard.vue';
import Field from '../../../components/form/Field.vue';
import { Form } from 'vee-validate';
import BaseFooter from '../../../components/BaseFooter.vue';
import { mapActions, mapGetters, } from 'vuex';

import { inject } from "vue";

export default {
    components: { BaseNavbar, BaseTeleport, UserNavbar, BaseButton, BaseCard, Field, Form, BaseFooter },
    data() {
        return {
            tuser: localStorage.getItem('user'),
            product: {},
            selectedImg: null,
            selectedImageIndex: null,
            providedImages: [],
            color: '',
            size: '',
            show: false,
            r_more: false,
            quantity: 1,
            outStock: '',
            reviewsFilter: 'latest',
            review: "",
            reviewTitle: "",
            reviewObj: {},
            selectedRating: null,
            dropdownOpen: false,
            displayedCount: 4,
            lensStyles: {
                width: "150px",
                height: "150px",
                display: "none",
                background: "",
                backgroundPosition: "center",
                pointerEvents: "none",
            },
        }
    },
    setup() {
        const handlePrice = inject('handlePrice');
        return { handlePrice }
    },
    computed: {
        ...mapGetters(['Get_Products']),
        displayedFeedbacks() {
            return this.product?.feedbacks.slice(0, this.displayedCount);
        },
    },
    created() {
        this.fetchData();
    },
    methods: {
        ...mapActions(['FetchProducts', 'AddItemToCart']),
        async fetchData() {
            try {
                await this.FetchProducts();
                this.initData();
            } catch (err) {
                console.error(err);
            }
        },
        async addToCart(cartItem) {
            try {
                await this.AddItemToCart(cartItem);
                this.show = true;
                setTimeout(() => { this.show = false }, 1500);
            }
            catch (err) {
                console.error('Add to Cart : ', err);
            }
        },
        showImage(src, index) {
            this.selectedImg = src;
            this.selectedImageIndex = index;
        },
        initData() {
            this.product = this.Get_Products.find(v => v._id == this.$route.params.id);
            this.selectedImg = this.product.src;
        },

        zoomLens(event) {
            const mainImage = this.$refs.mainImage;
            const lens = this.$refs.lens;
            const rect = mainImage.getBoundingClientRect();

            // Mouse position relative to the image
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Check bounds to keep the lens inside the image
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                this.lensStyles.display = "none";
                return;
            }

            // Update lens position
            lens.style.left = `${x - lens.offsetWidth / 2}px`;
            lens.style.top = `${y - lens.offsetHeight / 2}px`;

            // Update lens background to zoom in on hovered pixel
            this.lensStyles = {
                ...this.lensStyles,
                display: "block",
                background: `url(${this.selectedImg})`,
                backgroundSize: `${rect.width * 2}px ${rect.height * 2}px`,
                backgroundPosition: `${-(x * 2 - lens.offsetWidth / 2)}px ${-(y * 2 - lens.offsetHeight / 2)}px`,
            };
        },
        hideLens() {
            this.lensStyles.display = "none";
        },
        isHalf(rate) {
            var b = +Math.trunc(rate);
            return rate != b;
        },
        handleQuantity(id) {
            if (id) {
                if (this.quantity === this.product.quantity) {
                    this.outStock = true;
                    return;
                }
                this.quantity++;
            }
            else {
                if (this.quantity == 1) return;
                this.quantity--;
                this.outStock = false;
            }
        },
        handleStars(rate) {
            return 5 - Math.ceil(rate);
        },
        navigateAndToggleReview() {
            if (this.tuser != 'customer') this.$router.push({ name: 'User-Login' });
            else {
                const section = document.getElementById('textarea-review');
                section.scrollIntoView({ behavior: 'smooth' });
            }
        },
        selectRating(rating) {
            this.selectedRating = rating;
            this.dropdownOpen = false;
        },
        showMoreReviews() {
            this.r_more = true;
            setTimeout(() => {
                this.r_more = false;
                this.displayedCount += 4;
            }, 2000);
        },
        addReview() {
            this.reviewObj.id = 4
            this.reviewObj.name = 'Magdi Khaled';
            this.reviewObj.rating = this.selectedRating;
            this.reviewObj.title = reviewTitle.value;
            this.reviewObj.feedback = review.value;
            this.product?.feedbacks.push(this.reviewObj);
            this.displayedCount += 1;
        }
    }
}
</script>
<style scoped>
@import "@/assets/css/Product.css";
</style>
