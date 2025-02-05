<template>
    <section v-if="show" class="w-full h-fit px-4 sm:px-12 py-8  bg-gray-100">
        <div class="bg-white p-4 shadow-md px-4 sm:px-8 py-2 sm:py-4">
            <h1 id="result" class="font-bold text-2xl capitalize">
                product preview
            </h1>

            <div class=" flex flex-wrap mt-4 ">
                <div class="w-full md:w-1/2 flex flex-row gap-2 sm:gap-3">
                    <!-- Options Images -->
                    <div class="w-[25%] flex flex-col">
                        <div v-for="(image, index) in object.providedImages" :key="index"
                            class="w-full h-auto p-1 cursor-pointer" @click="showImage(image, index)">
                            <img :class="{ 'opacity-[1] border-2 border-gray-600': selectedImageIndex == index }"
                                class="opacity-80 h-[5.8em] sm:h-[8em] md:h-[9em] w-full rounded-sm border hover:scale-[101.5%] transition-transform duration-200 ease-in-out"
                                :src="image" alt="Product Option" />
                        </div>
                    </div>

                    <!-- Main Image -->
                    <div class="w-[80%] md:w-[90%] h-auto p-0 sm:p-1">
                        <div class="relative overflow-hidden w-full h-auto rounded-sm">
                            <img class="w-full h-[25em] sm:h-[35em]" :src="object.src" alt="Main Product Image" />
                        </div>
                    </div>
                </div>
                <div class="p-2 px-0 md:px-6 w-full md:w-1/2">
                    <div class="p-2 px-4 md:px-6 w-full">
                        <p class="font-bold text-2xl lg:text-4xl uppercase">{{ object.title }}</p>
                        <div class="product-price my-4">
                            <p class="capitalize text-xl sm:text-2xl font-medium"><span
                                    class="text-xs text-gray-700">EGP
                                </span>
                                {{ calcSale(object.price, object.sale / 100) }}</p>
                            <div v-if="object.sale != 0.0" class="product-price-discount">
                                <div class="flex relative mt-1">
                                    <p class="text-gray-500">
                                        <span class="text-xs">EGP</span>
                                        {{ object.price }}
                                        <span class="w-full h-[1.5px] bg-black  left-0 absolute top-[40%]">
                                        </span>
                                    </p>
                                </div>
                                <span class="text-sm font-sans font-bold text-green-600 pl-2 mt-1">
                                    {{ object.sale }}% OFF</span>
                            </div>
                        </div>
                        <div class="w-full my-4">
                            <p class="text-gray-600">
                                {{ object.details }}
                            </p>
                        </div>
                        <hr class="my-6">
                        <!-- colours -->
                        <div>
                            <p class="capitalize text-gray-600 font-medium">provided colors</p>
                            <div class="colors mt-3 flex flex-wrap">
                                <label v-for="item in object.providedColors" class="not-import relative">
                                    <input name="selectedColor" type="radio" :value="item.color" class="appearance-none w-6 
                                        sm:w-8 h-6 sm:h-8 mr-3 border-2 border-gray-400 cursor-pointer rounded"
                                        :style="{ 'background-color': `#${providedColor(item)}` }">
                                </label>
                            </div>
                        </div>
                        <hr class="my-6">
                        <!-- sizes -->
                        <div>
                            <p class="capitalize text-gray-600 font-medium">provided sizes</p>
                            <div class="colors mt-3 flex">
                                <label v-for="item in object.providedSizes" :key="item"
                                    class="not-import flex items-center cursor-pointer">
                                    <input type="radio" :value="item" :id="item" class="appearance-none hidden">
                                    <span class="px-2 md:px-2 py-1 md:py-1 mr-1 border-2 bg-gray-100 text-gray-600
                                        whitespace-nowrap capitalize font-bold transition-all">
                                        {{ item }}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import dataCategories from '../../assets/db/shop.categories.data.json'
export default {
    name: 'ProductResultComponent',
    props: {
        object: {
            type: Object,
            required: true
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedColor: '',
            main: null,
            colors: dataCategories.colorList,
            // show result
            selectedImg: null,
            selectedImageIndex: null,
        }
    },
    methods: {
        showImage(src, index) {
            this.object.src = src;
            this.selectedImageIndex = index;
        },
        providedColor(item) {
            const color = this.colors.find(v => v.color === item.color);
            return color.value;
        },
        calcSale(price, sale) {
            return (price * (1 - sale)).toFixed(0);
        },
    }
}
</script>
<style scoped>
@import url('../../assets/stylesheets/ADProduct.css');
</style>