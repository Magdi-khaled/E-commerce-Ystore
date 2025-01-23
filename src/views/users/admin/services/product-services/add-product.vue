<template>
    <section class="w-full h-fit bg-gray-100">
        <adminNavbar></adminNavbar>
        <div class="px-4 sm:px-16 py-8">
            <div class="flex justify-between items-center">
                <h1 class="text-xl sm:text-2xl font-bold">
                    <i class="fa-thin fa-basket-shopping-plus font-bold pr-1"></i>
                    Add Product
                </h1>
                <baseButton class="text-sm sm:text-md rounded-sm px-6 py-[10px]"
                    @click="this.$router.push({ name: 'seller-dashboard' })">
                    back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                </baseButton>
            </div>
            <!-- add form -->
            <div class="bg-white w-full p-4 shadow-md my-4 rounded">
                <form class="flex flex-col gap-2 mt-2" @submit.prevent="addProduct">
                    <div class="flex flex-col gap-1">
                        <label for="productTitle" class="text-sm sm:text-md font-semibold capitalize">Title</label>
                        <input type="text" name="productTitle" id="productTitle" placeholder="Product title"
                            v-model="productTitle"
                            class="text-sm sm:text-md p-2 bg-gray-100 border-[1px] rounded outline-none text-gray-700">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="productDescription" class="text-sm sm:text-md font-semibold capitalize">
                            Description</label>
                        <textarea name="productDescription" id="productDescription"
                            placeholder="Product description like [This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style]."
                            v-model="productDescription"
                            class="h-20 text-sm sm:text-md p-2 bg-gray-100 border-[1px] rounded outline-none text-gray-700"></textarea>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
                        <div class="flex flex-col gap-1">
                            <label for="productPrice" class="text-sm sm:text-md font-semibold capitalize">price</label>
                            <input type="number" name="productPrice" id="productPrice" placeholder="Product price"
                                min="1" max="12000" v-model="productPrice"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px] rounded outline-none text-gray-700">
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="productSale" class="text-sm sm:text-md font-semibold capitalize">sale</label>
                            <input type="number" name="productSale" id="productSale" min="0" max="100"
                                v-model="productSale" placeholder="(1-100)"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px] rounded outline-none text-gray-700">
                        </div>

                        <div class="flex flex-col gap-1">
                            <label for="productQuantity" class="text-sm sm:text-md font-semibold capitalize">product
                                quantity</label>
                            <input type="number" name="productQuantity" id="productQuantity" v-model="productQuantity"
                                placeholder="How many ?"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px] rounded outline-none text-gray-700">
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="productCategory" class="text-sm sm:text-md font-semibold capitalize">
                                Category</label>
                            <select name="productCategory" id="productCategory" v-model="productCategory" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px] rounded outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" selected disabled>Choose Category</option>
                                <option v-for="item in categories" :value="item">{{ item }}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-1">
                            <label for="material" class="text-sm sm:text-md font-semibold capitalize">
                                material</label>
                            <select name="material" id="material" v-model="material" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px] rounded outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" disabled selected>select material</option>
                                <option v-for="(item, index) in materials" :key="index" :value="item">{{ item }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <label for="gender" class="text-sm sm:text-md font-semibold capitalize">
                                <i class="fa-solid fa-venus-mars"></i> for : </label>
                            <select name="gender" id="gender" v-model="gender" class="text-sm sm:text-md p-2 bg-gray-100
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
                            <label for="providedSizes" class="text-sm sm:text-md font-semibold capitalize">
                                provided sizes
                            </label>
                            <div id="custom-select" @click="dropdownOpen1 = !dropdownOpen1"
                                class="w-full border-[2px] rounded p-2 cursor-pointer bg-gray-100 relative">
                                <span class="select-size text-gray-700 text-sm sm:text-md">
                                    {{ providedSizes.length ? providedSizes.join(", ") : "Select Sizes" }}
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
                                    <input type="checkbox" :name="option" :value="option" v-model="providedSizes"
                                        class="mr-2" />
                                    {{ option }}
                                </label>
                            </div>
                        </div>
                        <div class="relative">
                            <label for="providedColors" class="text-sm sm:text-md font-semibold capitalize">
                                provided colors
                            </label>
                            <div id="custom-select" @click="dropdownOpen2 = !dropdownOpen2"
                                class="w-full border-[2px] rounded p-2 cursor-pointer bg-gray-100 relative">
                                <span :title="providedColors.join(', ')"
                                    class="select-size  text-gray-700 text-sm sm:text-md capitalize">
                                    {{ providedColors.length ? providedColors.join(", ") : "select colors" }}
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
                            <label for="productImage" class="text-sm sm:text-md font-semibold capitalize">
                                Product Image</label>
                            <input type="file" name="productImage" accept="image/*" id="productImage"
                                @change="handleFileChange"
                                class="rounded-sm text-sm sm:text-md border-2 text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-2  file:sm:py-3 
                            file:px-8 file:rounded-sm file:border-none file:border-r-2 file:border-r-gray-200
                            file:text-md file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 file:transition file:duration-150">
                        </div>

                        <div class="flex flex-col gap-1 mt-2">
                            <label for="productImages" class="text-sm sm:text-md font-semibold capitalize">
                                provided Images</label>
                            <input type="file" name="productImages" accept="image/*" id="productImages" multiple
                                @change="handleFilesChange"
                                class="rounded-sm text-sm sm:text-md border-2 text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-2  file:sm:py-3 
                            file:px-8 file:rounded-sm file:border-none file:border-r-2 file:border-r-gray-200
                            file:text-md file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 file:transition file:duration-150">
                            <div class="flex flex-wrap  gap-2 mt-2">
                                <p v-if="filesError" class="text-red-400">You can only select less than or equal 4
                                    images</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex gap-4 justify-end mt-2">
                        <baseButton @click="this.$router.push({ name: 'seller-dashboard' })"
                            class="cancel w-4/12 sm:w-2/12 rounded-sm bg-white border-none hover:bg-white">
                            cancel
                        </baseButton>
                        <baseButton v-if="!showfinal" @click="showProduct()"
                            class="w-5/12 sm:w-3/12 rounded-sm py-[6px] sm:py-[10px]">
                            show product before confirm
                        </baseButton>
                        <baseButton v-else @click="selectedImg = mainImage"
                            class="w-5/12 sm:w-3/12 rounded-sm py-[6px] sm:py-[10px]">
                            confirm addition
                        </baseButton>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <!-- product result -->
    <section v-if="showfinal" class="w-full h-fit px-4 sm:px-16 py-8 bg-gray-100" id="result">
        <div class="bg-white p-4">
            <h1 id="result" class="font-semibold text-xl underline">Product result</h1>

            <div class=" flex flex-wrap mt-4 ">
                <div class="w-full md:w-1/2 flex flex-row gap-2 sm:gap-3">
                    <!-- Options Images -->
                    <div class="w-[25%] sm:w-[22%] flex flex-col">
                        <div v-for="(image, index) in imagesSrc" :key="index" class="w-full h-auto p-1 cursor-pointer"
                            @click="showImage(image, index)">
                            <!-- <img :class="{ 'border-2 border-gray-700 opacity-100': image == selectedImg }" -->
                            <img :class="{ 'opacity-[1] border-2 border-gray-600': selectedImageIndex == index }"
                                class="opacity-80 h-[100px] sm:h-[130px] md:h-[135px] w-full rounded-md border hover:scale-[101.5%] transition-transform duration-200 ease-in-out"
                                :src="image" alt="Product Option" />
                        </div>
                    </div>

                    <!-- Main Image -->
                    <div class="w-[80%] md:w-[90%] h-auto p-0 sm:p-1">
                        <div class="relative overflow-hidden w-full h-auto rounded-md">
                            <img class="w-full h-[460px] sm:h-[560px]" :src="selectedImg" alt="Main Product Image" />
                            <div ref="lens" class="absolute rounded-full bg-transparent border-2 border-gray-500"
                                :style="lensStyles"></div>
                        </div>
                    </div>
                </div>
                <div class="p-2 px-0 md:px-6 w-full md:w-1/2">
                    <div class="p-2 px-4 md:px-6 w-full md:w-4/6">
                        <p class="font-bold text-2xl lg:text-4xl uppercase">{{ productTitle }}</p>
                        <div class="product-price my-4">
                            <p class="capitalize text-xl sm:text-2xl font-medium"><span
                                    class="text-xs text-gray-700">EGP
                                </span>
                                {{ calcSale(productPrice, productSale / 100) }}</p>
                            <div v-if="productSale != 0.0" class="product-price-discount">
                                <div class="flex relative mt-1">
                                    <p class="text-gray-500">
                                        <span class="text-xs">EGP</span>
                                        {{ productPrice }}
                                        <span class="w-full h-[1.5px] bg-black  left-0 absolute top-[40%]">
                                        </span>
                                    </p>
                                </div>
                                <span class="text-sm font-sans font-bold text-green-600 pl-2 mt-1">
                                    {{ productSale }}% OFF</span>
                            </div>
                        </div>
                        <div class="w-full my-4">
                            <p class="text-gray-600">
                                {{ productDescription }}
                            </p>
                        </div>
                        <hr class="my-6">
                        <!-- colours -->
                        <div>
                            <p class="capitalize text-gray-600 font-medium">provided colors</p>
                            <div class="colors mt-3 flex flex-wrap">
                                <label v-for="item in providedColors" class="not-import relative">
                                    <input name="selectedColor" type="radio" :value="item" class="appearance-none w-6 
                                        sm:w-8 h-6 sm:h-8 mr-3 border-2 border-gray-400 cursor-pointer rounded-sm"
                                        :style="{ 'background-color': `#${providedColor(item)}` }">
                                    <!-- {{ item }} -->
                                </label>
                            </div>
                        </div>
                        <hr class="my-6">
                        <!-- sizes -->
                        <div>
                            <p class="capitalize text-gray-600 font-medium">provided sizes</p>
                            <div class="colors mt-3 flex">
                                <label v-for="item in providedSizes" :key="item"
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
    <adminfooter></adminfooter>
</template>
<script>
import adminNavbar from '../../../../../components/admin/adminNavbar.vue';
import baseButton from '../../../../../components/baseButton.vue';
import adminfooter from '../../../../../components/profileFooter.vue';
import data from '../../../../../shop.categories.data.json'
export default {
    components: { adminNavbar, baseButton, adminfooter },
    data() {
        return {
            show: false,
            filesError: false,
            dropdownOpen1: false,
            dropdownOpen2: false,
            showfinal: false,
            productImage: '',
            productCategory: '',
            productPrice: '',
            productSale: null,
            productQuantity: null,
            productDescription: '',
            productTitle: '',
            providedSizes: [],
            providedColors: [],
            material: '',
            gender: '',
            mainImage: null,
            imagesSrc: [],
            categories: ['men wear', 'women wear', 'boys wear', 'girls wear', 'sport wear', 'formal wear',
                'accessories wear', 'shoes wear', 'bags & luggage'],
            materials: ['cotton', 'polyester', 'silk', 'wool', 'leather', 'denim', 'cotton twill fabric',
                'linen', 'rayon', 'spandex', 'lycra', 'viscose', 'cashmere', 'satin', 'chiffon', 'velvet',],
            sizes: ['All', '6XL', '5XL', '4XL', '3XL', 'XXL', 'XL', 'L', 'M', 'SM', 'XS'],
            colors: data.colorList,
            // show result
            selectedImg: null,
            selectedImageIndex: null,
        }
    },
    computed: {
        pArray: {
            get() {
                return this.providedSizes;
            },
            set(value) {
                this.providedSizes = value;
            }
        }
    },
    mounted() { },
    methods: {
        toggleSide() {
            this.show = !this.show;
        },
        addProduct() {
            console.log('Product added');
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                console.log('Files selected:', file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.mainImage = new URL(e.target.result, import.meta.url).href; // Add the image URL to the array
                };
                reader.readAsDataURL(file);
                console.log('Updated Main Image:', this.mainImage);
            } else {
                this.mainImage = null; // Reset if no file is selected
            }
        },
        handleFilesChange(event) {

            const files = event.target.files
            if (files.length <= 4) {
                this.imagesSrc = [];
                this.filesError = false;
                console.log('Files selected:', files);
                Array.from(files).slice(0, 4).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.imagesSrc.push(e.target.result); // Add the image URL to the array
                    };
                    reader.readAsDataURL(file);
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
            this.selectedImg = this.mainImage;
            this.showfinal = true;
            window.scrollTo(
                document.getElementById('result')
            )
        },
        calcSale(price, sale) {
            return (price * (1 - sale)).toFixed(0);
        },
        showImage(src, index) {
            this.selectedImg = src;
            this.selectedImageIndex = index;
        },
        providedColor(item) {
            const color = this.colors.find(v => v.color === item);
            return color.value;
        },

    }
}
</script>
<style scoped>
label {
    position: relative;
}

.select-size {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

label:not(label.not-import)::after {
    position: absolute;
    content: '*';
    color: rgb(204, 18, 18);
    padding-left: 5px;
}

.preview img {
    width: 250px;
    height: 300px;
    border: 1px solid #ddd;
    margin-top: 10px;
    border-radius: 8px;
}

.cancel {
    color: #000;
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
</style>