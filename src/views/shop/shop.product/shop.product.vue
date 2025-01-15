```html
<template>
    <userNavbar v-if="tuser == 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="productproduct px-4 sm:px-8 ">
        <breadcrumbs></breadcrumbs>
        <div class=" flex flex-wrap mt-4 ">
            <div class="w-full md:w-1/2 flex flex-row gap-2 sm:gap-3">
                <!-- Options Images -->
                <div class="w-[25%] sm:w-[22%] flex flex-col">
                    <div v-for="(image, index) in images" :key="index" class="w-full h-auto p-1 cursor-pointer"
                        @click="showImage(image, index)">
                        <!-- <img :class="{ 'border-2 border-gray-700 opacity-100': image == selectedImg }" -->
                        <img :class="{ 'opacity-[1] border-2 border-gray-600': selectedImageIndex == index }"
                            class="opacity-80 h-auto h-[100px] sm:h-[130px] md:h-[135px] w-full rounded-md border hover:scale-[101.5%] transition-transform duration-200 ease-in-out"
                            :src="image" alt="Product Option" />
                    </div>
                </div>

                <!-- Main Image -->
                <div class="w-[80%] md:w-[90%] h-auto p-0 sm:p-1">
                    <div class="relative overflow-hidden w-full h-auto rounded-md cursor-zoom-in" @mousemove="zoomLens"
                        @mouseleave="hideLens">
                        <img ref="mainImage" class="w-full h-auto max-h-[520px]" :src="selectedImg"
                            alt="Main Product Image" />
                        <div ref="lens" class="absolute rounded-full bg-transparent border-2 border-gray-500"
                            :style="lensStyles"></div>
                    </div>
                    <div class="w-full mt-4">
                        <baseButton class="addToCart-btn w-full">add to cart <i class="fa-solid fa-cart-shopping"></i>
                        </baseButton>
                    </div>
                </div>
            </div>
            <div class="p-2 px-4 md:px-6 w-full md:w-1/2">
                <p class="candal-regular font-bold text-2xl lg:text-4xl uppercase">{{ product.title }}</p>
                <div class="product-rate">
                    <div class="stars-rate my-2 flex items-center gap-1">
                        <div v-for="item in Math.floor(product.rate)">
                            <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                        </div>
                        <i v-if="isHalf(product.rate)"
                            class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                        <div v-for="item in clacStars(product.rate)">
                            <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
                        </div>
                        <p class="pl-1 font-semibold">
                            {{ product.rate }}<span class="text-gray-400">/5</span>
                        </p>
                    </div>
                    <div class="product-price my-4">
                        <p class="capitalize text-xl sm:text-2xl font-medium"><span class="text-xs text-gray-700">EGP
                            </span>
                            {{ calcSale(product.price, product.sale) }}</p>
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
                                {{ product.sale * 100 }}% OFF</span>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-10/12 my-6">
                    <p class="text-gray-600">
                        This graphic t-shirt which is perfect for any occasion.
                        Crafted from a soft and breathable fabric, it
                        offers superior comfort and style.
                    </p>
                </div>
                <hr class="my-6">
                <!-- colours -->
                <div>
                    <p class="capitalize text-gray-600">select color</p>
                    <div class="colors mt-3 flex">
                        <label v-for="item in product.providedColors" class="relative">
                            <input name="selectedColor" type="radio" v-model="color" :value="item.value" class="appearance-none w-8 
                        h-8 mr-3 border-2 border-gray-400 cursor-pointer rounded-sm"
                                :class="{ 'outline outline-2 outline-[#000]': color == item.value }"
                                :style="{ 'background-color': `#${item.value}` }">
                            <i v-if="color" class="fa-solid fa-check text-gray-300 absolute z-30 py-3 px-4 text-2xl"
                                :class="{ 'hidden': color != item.value }"></i>
                        </label>
                    </div>
                </div>
                <hr class="my-6">
                <!-- sizes -->
                <div>
                    <p class="capitalize text-gray-600">choose size</p>
                    <div class="colors mt-3 flex">
                        <label v-for="item in product.providedSizes" :key="item"
                            class="flex items-center cursor-pointer">
                            <input type="radio" v-model="size" :value="item" :id="item" class="appearance-none hidden">
                            <span
                                class="px-3 py-2 mr-1 border-2 bg-gray-100 text-gray-500 whitespace-nowrap capitalize font-bold transition-all"
                                :class="{ 'text-gray-700 border-gray-500': size === item }">
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
                            <button @click="quantity--"><i class="fa-solid fa-minus"></i></button>
                        </div>
                        <div class="bg-white flex items-center justify-center">
                            <p class="px-3 text-lg">{{ quantity }}</p>
                        </div>
                        <div class="bg-gray-900 text-white flex items-center justify-center">
                            <button @click="quantity++"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="w-8/12 sm:w-9/12">
                        <baseButton class="addToCart-btn w-full">buy it now <i class="fa-solid fa-money-bill-wave"></i>
                        </baseButton>
                    </div>
                </div>
                <hr class="my-8 hidden md:block">
            </div>
        </div>
    </div>
    <!-- product details & reviews -->
    <div class="product-details px-4 md:px-10 mt-8">
        <hr class="my-4">
        <!-- product details  -->
        <div>
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
        <div class="rounded-b-xl mt-6">
            <section class="flex flex-wrap justify-end">
                <!-- customer reviews -->
                <div class="rates w-full sm:w-4/12 md:w-3/12">
                    <div class="mb-4 flex items-center justify-between">
                        <h1 class="font-medium text-lg sm:text-xl capitalize whitespace-nowrap">
                            customer reviews
                        </h1>
                    </div>
                    <div class="product-global-rate my-1 flex items-center gap-[2px]">
                        <div v-for="item in Math.floor(3.5)">
                            <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                        </div>
                        <i v-if="isHalf(3.5)" class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                        <div v-for="item in clacStars(3.5)">
                            <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
                        </div>
                        <p class="pl-1 font-medium text-sm sm:text-lg whitespace-nowrap">
                            <!-- {{ product.rate }} -->
                            3.5 out of 5
                        </p>
                    </div>
                    <h1 class="text-gray-600 mb-2">{{ product.feedbacks.length }} global ratings</h1>
                    <div v-for="item in [1, 2, 3, 4, 5].reverse()"
                        class="flex items-center justify-start whitespace-nowrap">
                        <p class="text-gray-500 w-2/12">{{ item }} star</p>
                        <div class="border-2 border-gray-400 rounded-md h-4 md:h-5 w-5/12 md:w-7/12 my-1">
                            <div class="rounded-l-sm w-[25%] h-full bg-[#db9454]">
                            </div>
                        </div>
                        <p class="text-gray-500 w-2/12 pl-2">{{ 25 }}%</p>
                    </div>
                    <baseButton @click="navigateAndToggleReview"
                        class="w-11/12 text-sm sm:text-md mt-4 py-[8px] sm:py-[10px] rounded-sm my-6">
                        write a review
                        <i class="fa-solid fa-pen-line pl-2"></i>
                    </baseButton>
                </div>
                <!-- reviews -->
                <div class="w-full sm:w-8/12 md:w-9/12">
                    <div v-if="!product.feedbacks.length"
                        class="product-reviews bg-gray-100 h-32 flex flex-col justify-center items-center">
                        <h1 class="font-medium text-md text-gray-500">no reviews about this product untill
                            now...</h1>
                        <baseButton class=" text-sm sm:text-md px-12 mt-2">
                            write a first review
                            <i class="fa-solid fa-pen-line pl-2"></i>
                        </baseButton>
                    </div>
                    <div v-else class="flex flex-row flex-wrap justify-between">
                        <div class="ml-4 w-4/12 sm:w-2/12">
                            <select id="reviewFilter" class="w-full pl-2 rounded-md capitalize font-bold border-[2px] 
                                        border-gray-400 bg-gray-100 text-black cursor-pointer font-medium outline-none"
                                v-model="reviewsFilter">
                                <option value="latest" class="text-md" selected>latest
                                </option>
                                <option value="earliest" class="text-md">earliest</option>
                            </select>
                        </div>
                        <div v-for="(review, index) in displayedFeedbacks" :key="index" class="w-full my-[-8px]">
                            <baseCard :card="review" class="rounded-none border-t-0 border-r-0">
                            </baseCard>
                        </div>
                    </div>

                    <div v-if="product.feedbacks.length > displayedCount" class="flex justify-center my-3 relative">
                        <button @click="showMoreReviews" class="font-medium text-md 
                            hover:text-gray-600 rounded-sm whitespace-nowrap underline transition duration-150">
                            <p v-if="!r_more">more reviews <i class="fa-solid fa-chevrons-right text-xs"></i></p>
                            <p v-else class="show-more border-4 border-gray-500 m-auto w-8 h-8"></p>
                        </button>
                    </div>
                </div>
                <hr class="my-6">
                <span id="write-review"></span>
                <div v-if="tuser === 'customer'"
                    class="w-full sm:w-8/12 md:w-9/12 font-bold flex flex-col flex-wrap p-1 sm:p-2 mt-4">
                    <div class="flex items-center justify-between flex-wrap">
                        <label for="review" class="mb-4 text-md sm:text-lg whitespace-nowrap ">Write your review
                            <i class="fa-solid fa-pen-line"></i>
                        </label>
                        <div class="w-full sm:w-3/12 whitespace-nowrap relative">
                            <div @click="dropdownOpen = !dropdownOpen" class="capitalize text-sm sm:text-md font-medium
                                bg-gray-50 border-2 p-2 rounded-sm cursor-pointer">
                                <span v-if="selectedRating">
                                    Selected Rate :
                                    {{ selectedRating }}/5 <i class="fa-solid fa-star text-black"></i>
                                </span>
                                <span v-else>Choose rate</span>
                                <i class="fa-solid fa-sort-down text-black absolute z-30 top-[25%] right-[4%]"></i>
                            </div>
                            <div v-if="dropdownOpen">
                                <ul class="w-full absolute bg-white mt-0.5 rounded-sm shadow-md">
                                    <li v-for="item in 5" :key="item" @click="selectRating(item)" class="px-2 sm:px-4 py-1 cursor-pointer
                                        text-sm sm:text-md hover:bg-gray-100 hover:rounded-sm flex items-center">
                                        <p class="pr-3">{{ item }}</p>
                                        <i v-for="i in item" :key="i" class="fa-solid fa-star text-[#db9454]"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="w-full mt-2">
                        <textarea v-model="review" id="review" type="text" placeholder="What's your opinion?" class="w-full font-medium 
                        placeholder:font-normal py-3 px-3 h-14 sm:h-16
                            bg-gray-50 outline-none rounded-sm focus:bg-white border-2">
                            </textarea>
                        <div class="w-full flex justify-end mt-2 ">
                            <baseButton :class="{ 'submit-review w-full sm:w-3/12': true }">submit
                            </baseButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <baseFooter></baseFooter>
</template>
<script>
import baseNavbar from '../../../components/baseNavbar.vue';
import userNavbar from '../../../components/user/userNavbar.vue';
import baseButton from '../../../components/baseButton.vue';
import baseCard from '../../../components/baseCard.vue';
import baseFooter from '../../../components/baseFooter.vue';
import { mapActions, mapGetters, } from 'vuex';
export default {
    components: { baseNavbar, userNavbar, baseButton, baseCard, baseFooter },
    data() {
        return {
            tuser: localStorage.getItem('user'),
            product: null,
            selectedImg: null,
            selectedImageIndex: null,
            images: [],
            color: '',
            size: '',
            productDetails: false,
            r_more: false,
            quantity: 1,
            allReviews: 451,
            colorList:
                [
                    { color: '', value: '', },
                    { color: 'green', value: '00C12B', },
                    { color: 'red', value: 'F50606', },
                    { color: 'yellow', value: 'F5DD06', },
                    { color: 'orange', value: 'F57906', },
                    { color: 'babyblue', value: '06CAF5', },
                    { color: 'blue', value: '063AF5', },
                    { color: 'purple', value: '7D06F5', },
                    { color: 'pink', value: 'F506A4', },
                    { color: 'white', value: 'c8c8c8', },
                    { color: 'black', value: '000000', }
                    , { color: 'gray', value: '808080', }
                ],
            reviewsFilter: 'latest',
            reviewFilters: ['latest', 'newest'],
            writeReview: false,
            review: "",
            selectedRating: null,
            dropdownOpen: false,
            displayedCount: 4,
            lensStyles: {
                width: "200px",
                height: "200px",
                display: "none",
                background: "",
                backgroundSize: "200%",
                backgroundPosition: "center",
                pointerEvents: "none",
            },
        }
    },
    computed: {
        ...mapGetters(['Get_Products']),
        displayedFeedbacks() {
            return this.product.feedbacks.slice(0, this.displayedCount);
        },
    },
    async created() {
        await this.fetchData();
        console.log(this.Get_Products);
        console.log(this.product.feedbacks.length);
    },
    methods: {
        ...mapActions(['fetchProducts']),
        async fetchData() {
            try {
                await this.fetchProducts();
                this.initData();
            } catch (err) {
                console.error(err);
            }
        },
        showImage(src, index) {
            this.selectedImg = src;
            this.selectedImageIndex = index;
        },
        initData() {
            this.product = this.Get_Products.find(v => v._id === +this.$route.params.id);
            //...
            this.images.push(new URL(this.product.src, import.meta.url).href);
            this.images.push(new URL(this.product.src, import.meta.url).href);
            this.images.push(new URL(this.product.src, import.meta.url).href);
            this.images.push(new URL(this.product.src, import.meta.url).href);
            this.selectedImg = this.images[0];
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
        calcSale(price, sale) {
            return (price * (1 - sale)).toFixed(0);
        },
        isHalf(rate) {
            var b = +Math.trunc(rate);
            return rate != b;
        },
        clacStars(rate) {
            return 5 - Math.ceil(rate);
        },
        navigateAndToggleReview() {
            if (this.tuser != 'customer') {
                this.$router.push({ name: 'customer-login' });
            }
            else {
                this.scrollToSection();
            }
        },
        scrollToSection() {
            const section = document.getElementById('write-review');
            section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
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
    }
}
</script>
<style scoped>
/* Zoom lens styling */
.lens {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid rgb(0, 0, 0);
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
    display: none;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

.product-price {
    display: flex;
    gap: 10px;
}

.product-price p:not(.product-price-discount) {
    font-weight: bold;
}

.product-price .product-price-discount {
    display: flex;
}

.product-price .product-price-discount .sale {
    display: flex;
    align-items: center;
    color: #FF3333;
    font-weight: bold;
    background-color: rgba(255, 0, 0, 0.148);
    padding: 0px 12px;
    margin-left: 10px;
    border-radius: 35px;
}

.colors input[value='']:first-child {
    position: relative;
}

.colors input[value='']:first-child::before {
    content: "";
    position: absolute;
    background-color: red;
    width: 5px;
    height: 100%;
    transform: rotateZ(-45deg);
    left: 43%;
    border: 1px solid rgba(0, 0, 0, 0.497);
}

.show-more {
    border-radius: 50%;
    border-top: 5px solid rgb(190, 190, 190);
    animation-name: showmoreAnimate;
    animation-duration: 0.6s;
    animation-direction: normal;
    animation-iteration-count: infinite;
}

@keyframes showmoreAnimate {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

.fa-check {
    right: 3%;
    bottom: -14%;
}

:deep(.addToCart-btn) {
    padding: 12px 0;
    border-radius: 0;
}

.review-btn,
.review-edit,
:deep(.submit-review) {
    padding: 8px 20px;
    border-radius: 0;
}


@media (max-width:656px) {
    .product-price p:not(.product-price-discount) {
        font-weight: bold;
        font-size: 100%;
    }

    :deep(.addToCart-btn) {
        padding: 10px 0;
        border-radius: 0;
    }
}
</style>
