<template>

    <baseError :show="failed">wrong data , product not edited</baseError>
    <baseSuccess :show="success">product details updated successfully</baseSuccess>
    <section class="w-full h-fit bg-gray-100">
        <ADNavigation />
        <div class="px-4 sm:px-16 py-8">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold">
                    <i class="fa-light fa-pen-to-square font-bold pr-1"></i>
                    Edit Product Details
                </h1>
                <BaseButton class="text-sm sm:text-md rounded px-6 py-[10px]"
                    @click="this.$router.push({ name: 'AD-Dashboard' })">
                    back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                </BaseButton>
            </div>
            <!-- edit form -->
            <div class="bg-white w-full p-4 shadow-md my-4 rounded">
                <form class="flex flex-col gap-2 mt-2" @submit.prevent="addProduct">
                    <div class="flex flex-col gap-1">
                        <label for="title" class="text-sm sm:text-md font-semibold capitalize">Title</label>
                        <input type="text" name="title" id="title" placeholder="Product title"
                            v-model="this.object.title"
                            class="text-sm sm:text-md p-2 bg-gray-100 border-[1px] rounded outline-none text-gray-700 capitalize">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="details" class="text-sm sm:text-md font-semibold capitalize">
                            Description</label>
                        <textarea name="details" id="details"
                            placeholder="Product description like [This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style]."
                            v-model="this.object.details"
                            class="h-20 text-sm sm:text-md p-2 bg-gray-100 border-[1px] rounded outline-none text-gray-700"></textarea>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
                        <div class="flex flex-col gap-1">
                            <label for="price" class="text-sm sm:text-md font-semibold capitalize">price</label>
                            <input type="number" name="price" id="price" placeholder="Product price" min="1" max="12000"
                                v-model="this.object.price"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px] rounded outline-none text-gray-700">
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="sale" class="text-sm sm:text-md font-semibold capitalize">sale</label>
                            <input type="number" name="sale" id="sale" min="0" max="20" v-model="this.object.sale"
                                placeholder="(0 to 1)"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px] rounded outline-none text-gray-700">
                        </div>

                        <div class="flex flex-col gap-1">
                            <label for="quantity" class="text-sm sm:text-md font-semibold capitalize">product
                                quantity</label>
                            <input type="number" name="quantity" id="quantity" v-model="this.object.quantity"
                                placeholder="How many ?"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px] rounded outline-none text-gray-700">
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="category" class="text-sm sm:text-md font-semibold capitalize">
                                Category</label>
                            <select name="category" id="category" v-model="this.object.category" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px] rounded outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" selected disabled>Choose Category</option>
                                <option v-for="item in categories" :value="item">{{ item }}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-1">
                            <label for="material" class="text-sm sm:text-md font-semibold capitalize">
                                material</label>
                            <select name="material" id="material" v-model="this.object.material" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px] rounded outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" disabled selected>select material</option>
                                <option v-for="(item, index) in materials" :key="index" :value="item">{{ item }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <label for="gender" class="text-sm sm:text-md font-semibold capitalize">
                                <i class="fa-solid fa-venus-mars"></i> for : </label>
                            <select name="gender" id="gender" v-model="this.object.for" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px] rounded outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" disabled selected>Select gender</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="both">good for both</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-2">
                        <div class="relative">
                            <p
                                class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-semibold capitalize">
                                provided sizes
                            </p>
                            <div id="custom-select1" @click="dropdownOpen1 = !dropdownOpen1"
                                class="w-full border-[2px] rounded p-2 cursor-pointer bg-gray-100 relative">
                                <span class="select-size text-gray-700 text-sm sm:text-md">
                                    {{ this.object.providedSizes.length ? this.object.providedSizes.join(", ")
                                        : "Select Sizes" }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownOpen1" class="absolute mt-1 w-full border-[2px] text-sm sm:text-md rounded bg-white shadow-lg
                                    z-10 max-h-[200px] overflow-y-auto">
                                <label v-for="(option, index) in sizes" :key="index" :for="option"
                                    @click="handleSizeChange(option)"
                                    class="not-import flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer ">
                                    <input type="checkbox" :name="option" :value="option"
                                        v-model="this.object.providedSizes" class="mr-2" />
                                    {{ option }}
                                </label>
                            </div>
                        </div>
                        <div class="relative">
                            <p
                                class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-semibold capitalize">
                                provided colors
                            </p>
                            <div id="custom-select" @click="dropdownOpen2 = !dropdownOpen2"
                                class="w-full border-[2px] rounded p-2 cursor-pointer bg-gray-100 relative">
                                <span :title="providedColors.join(', ')"
                                    class="select-size  text-gray-700 text-sm sm:text-md capitalize">
                                    {{ providedColors.length ? providedColors.join(", ")
                                        : "select colors"
                                    }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownOpen2"
                                class="absolute mt-1 w-full border-[1px] rounded bg-white shadow-lg z-10 max-h-[200px] overflow-y-auto capitalize">
                                <label v-for="(option, index) in colors" :key="index" :for="option.color"
                                    @click="handelColorChange(option)"
                                    class="not-import flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer ">
                                    <input type="checkbox" :name="option.color" :value="option.color"
                                        v-model="providedColors" class="mr-2" />
                                    {{ option.color }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-2">
                        <div class="flex flex-col gap-1 mt-2">
                            <label for="mainImage" class="text-sm sm:text-md font-semibold capitalize">
                                Product Image</label>
                            <input type="file" name="mainImage" accept="image/webp" id="mainImage"
                                @change="handleFileChange"
                                class="rounded text-sm sm:text-md border-2 text-slate-500 file:cursor-pointer file:mr-4 file:py-2 file:sm:py-3 
                            file:px-8 file:rounded file:border-none file:border-r-2 file:border-r-gray-200
                            file:text-md file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 file:transition file:duration-150">
                            <p class="text-medium text-red-600 text-sm">{{ mainImageErr }}</p>
                        </div>

                        <div class="flex flex-col gap-1 mt-2">
                            <label for="providedImages" class="text-sm sm:text-md font-semibold capitalize">
                                provided Images</label>
                            <input type="file" name="providedImages" accept="image/webp" id="providedImages" multiple
                                @change="handleFilesChange"
                                class="rounded text-sm sm:text-md border-2 text-slate-500 file:cursor-pointer file:mr-4 file:py-2  file:sm:py-3 
                            file:px-8 file:rounded file:border-none file:border-r-2 file:border-r-gray-200
                            file:text-md file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 file:transition file:duration-150">
                            <div class="flex flex-wrap  gap-2 mt-2">
                                <p v-if="filesError" class="text-red-400">You can only select less than or equal 4
                                    images</p>
                                <p class="text-medium text-red-600 text-sm">{{ providedImagesErr }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- submit -->
                    <div class="w-full flex gap-2 sm:gap-4 justify-end mt-2 text-sm sm:text-md">
                        <BaseButton @click="this.$router.push({ name: 'seller-dashboard' })"
                            class="cancel w-4/12 sm:w-2/12 rounded bg-white border-none hover:bg-white">
                            cancel
                        </BaseButton>
                        <BaseButton @click="object.src = mainImage" :disabled="false"
                            class="w-4/12 md:w-2/12 rounded py-[6px] sm:py-[10px]">
                            update
                        </BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <!-- product result -->
    <ProductResultComponent :object="object" :show="true" />
    <InFooter />
</template>
<script>

import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import ProductResultComponent from '../../../../../components/admin/ProductResultComponent.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import baseSuccess from '../../../../../components/baseSuccess.vue';
import baseError from '../../../../../components/baseError.vue';
import InFooter from '../../../../../components/InFooter.vue';
import dataCategories from '../../../../../assets/db/shop.categories.data.json'
import data from '../../../../../assets/db/data.json'
export default {
    components: { ADNavigation, ProductResultComponent, BaseButton, baseSuccess, baseError, InFooter },
    data() {
        return {
            show: false,
            success: false,
            failed: false,
            filesError: false,
            dropdownOpen1: false,
            dropdownOpen2: false,
            showfinal: true,
            object: {},
            providedSizes: [],
            providedColors: [],
            mainImage: null,
            mainImageErr: '',
            providedImagesErr: '',
            imagesSrc: [],
            categories: dataCategories.categories.map(cat => cat.name),
            materials: dataCategories.materials,
            sizes: dataCategories.sizes,
            colors: dataCategories.colorList,
        }
    },
    created() {
        this.initData();
    },
    methods: {
        editProduct() {
            this.success = true;
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                this.success = false;
                document.body.style.overflow = 'auto';
            }, 1500);

            console.log('Product added');
        },
        initData() {
            this.object = data.find(v => v._id === Number(this.$route.params.id));
            this.providedColors = this.object.providedColors.map(v => v.color);
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const isWebP = file.type === 'image/webp';
            if (file && isWebP) {
                this.mainImageErr = '';
                console.log('Files selected:', file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.mainImage = new URL(e.target.result, import.meta.url).href; // Add the image URL to the array
                    // this.object.src = new URL(e.target.result, import.meta, url).href;
                };
                reader.readAsDataURL(file);
                console.log('Updated Main Image:', this.mainImage);
            } else {
                this.mainImageErr = 'Only images.webp are allowed!';
                event.target.value = ''; // Clear the input
                this.mainImage = null; // Reset if no file is selected
            }
        },
        handleFilesChange(event) {
            const files = event.target.files
            let isWebP = true;
            if (files.length <= 4) {
                this.imagesSrc = [];
                this.filesError = false;
                console.log('Files selected:', files);
                Array.from(files).slice(0, 4).forEach((file) => {
                    console.log(file.type);

                    isWebP = file.type === 'image/webp';
                    if (!isWebP) {
                        this.providedImagesErr = 'Only images.webp are allowed!';
                        event.target.value = ''; // Clear the input
                    }
                    else {
                        this.providedImagesErr = '';
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.providedImagesErr = '';
                            this.imagesSrc.push(e.target.result); // Add the image URL to the array
                        };
                        reader.readAsDataURL(file);
                    }
                });
                console.log('Updated imagesSrc:', this.imagesSrc);
            }
            else {
                return this.filesError = true;
            }
        },
        removeImage(index) {
            this.imagesSrc.splice(index, 1); // Remove the image from the array
        },
        handleSizeChange(option) {
            if (option === 'All' && (this.providedSizes.length || this.providedSizes.find(v => v === 'All'))) { this.providedSizes = []; }
            else if (this.providedSizes.find(v => v === option)) {
                this.providedSizes = this.providedSizes.filter(v => v !== option && v !== 'All');
            }
            else if (option === 'All') { this.providedSizes = [...this.sizes]; }
            else this.providedSizes.push(option);
        },

        handelColorChange(option) {
            if (option.value === '' && (this.providedColors.length ||
                this.providedColors.find(v => v.value === ''))) { this.providedColors = []; }
            else if (this.providedColors.find(v => v === option.color)) {
                this.providedColors = this.providedColors.filter(v => v !== option.color && v !== 'all');
            }
            else if (option.value === '') { this.providedColors = [...this.colors.map(v => v.color)]; }

            else this.providedColors.push(option.color);
        },
        showProduct() {
            this.object.src = this.mainImage;
        },
    }
}
</script>
<style scoped>
@import url('../../../../../assets/stylesheets/ADProduct.css');
</style>