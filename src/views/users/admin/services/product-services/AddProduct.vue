<template>
    <baseError :show="failed">wrong data , product not added</baseError>
    <baseSuccess :show="success">product added successfully</baseSuccess>
    <section class="w-full h-fit bg-gray-100">
        <ADNavigation />
        <div class="px-4 sm:px-12 py-8">
            <div class="flex justify-between items-center">
                <h1 class="text-lg sm:text-xl font-bold">
                    <i class="fa-thin fa-basket-shopping-plus font-bold pr-1"></i>
                    Add Product
                </h1>
                <BaseButton class="text-sm sm:text-md px-2 sm:px-6 py-[6px] sm:py-[10px]"
                    @click="this.$router.push({ name: 'AD-Dashboard' })">
                    back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                </BaseButton>
            </div>
            <!-- add form -->
            <div class="bg-white w-full p-4 shadow-md my-4 ">
                <Form class="flex flex-col gap-2 mt-2 px-2 sm:px-4 py-2" @submit.prevent="addProduct">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 ">
                        <div class="flex flex-col gap-1">
                            <label for="title" class="text-sm sm:text-md font-medium capitalize">Title</label>
                            <Field as="input" type="text" name="title" id="title" placeholder="Product Title"
                                v-model="title"
                                class="text-sm sm:text-md py-2 px-2 bg-gray-100 border-[1px] outline-none text-gray-700" />
                            <ErrorMessage name="title" class="text-red-400 after:content-['*']" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label for="price" class="text-sm sm:text-md font-medium capitalize">price</label>
                            <input type="number" name="price" id="price" placeholder="Product price" min="1" max="12000"
                                rules="required" v-model="price"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px]  outline-none text-gray-700">
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 mt-0 sm:mt-2">
                        <label for="details" class="text-sm sm:text-md font-medium capitalize">
                            Description</label>
                        <textarea name="details" id="details"
                            placeholder="Details ... Cotton T-shirt which is perfect for any occasion. Crafted from a soft...."
                            v-model="details"
                            class="h-[4em] sm:h-[2.7em] text-sm sm:text-md p-2 bg-gray-100 border-[1px]  outline-none text-gray-700" />
                    </div>
                    <div class="grid grid-cols-2 gap-2 sm:gap-4  mt-0 sm:mt-2">
                        <div class="flex flex-col gap-1">
                            <label for="sale" class="text-sm sm:text-md font-medium capitalize">sale</label>
                            <input type="number" name="sale" id="sale" min="0" max="100" v-model="sale"
                                placeholder="(1-100)"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px]  outline-none text-gray-700">
                        </div>

                        <div class="flex flex-col gap-1">
                            <label for="quantity" class="text-sm sm:text-md font-medium capitalize">
                                quantity</label>
                            <input type="number" name="quantity" id="quantity" v-model="quantity"
                                placeholder="How many ?"
                                class="text-sm sm:text-md p-2 bg-gray-100 border-[2px]  outline-none text-gray-700">
                        </div>

                        <div class="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <label for="category" class="text-sm sm:text-md font-medium capitalize">
                                category</label>
                            <select name="category" id="category" v-model="category" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px]  outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" selected disabled>Choose Category</option>
                                <option v-for="item in categories.slice(1)" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <label for="material" class="text-sm sm:text-md font-medium capitalize">
                                material</label>
                            <select name="material" id="material" v-model="material" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px]  outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" disabled selected>select material</option>
                                <option v-for="(item, index) in materials" :key="index" :value="item">{{ item }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-0 sm:mt-2">
                        <div class="flex flex-col gap-1 col-span-2 sm:col-span-1">
                            <label for="gender" class="text-sm sm:text-md font-medium capitalize">
                                <i class="fa-solid fa-venus-mars"></i> for : </label>
                            <select name="gender" id="gender" v-model="gender" class="text-sm sm:text-md p-2 bg-gray-100
                                border-[2px]  outline-none capitalize cursor-pointer relative text-gray-700">
                                <option value="" disabled selected>Select gender</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="both">good for both</option>
                            </select>
                        </div>
                        <div class="relative col-span-2 sm:col-span-1">
                            <p class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-medium capitalize">
                                provided sizes
                            </p>
                            <div ref="dropdown1" @click="toggleDropdown(1)"
                                class="w-full mt-1 border-[2px] p-2 cursor-pointer bg-gray-100 relative">
                                <span class="select-size text-gray-700 text-sm sm:text-md">
                                    {{ providedSizes.length ? providedSizes.join(", ") : "Select Sizes" }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownOpen1" ref="dropdownList1"
                                class="absolute w-full border-[1px] border-t-0 bg-gray-50 shadow-lg z-10 h-[150px] sm:h-[200px] overflow-y-auto capitalize">
                                <label v-for="(option, index) in sizes" :key="index" :for="option"
                                    @click="handleSizeChange(option)"
                                    class="not-import flex items-center text-sm sm:text-md px-3 py-2 hover:bg-gray-100 cursor-pointer ">
                                    <input type="checkbox" :name="option" :value="option" v-model="providedSizes"
                                        class="mr-2" />
                                    {{ option }}
                                </label>
                            </div>
                        </div>
                        <div class="relative col-span-2 sm:col-span-1">
                            <p class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-medium capitalize">
                                provided colors
                            </p>
                            <div ref="dropdown2" @click="toggleDropdown(2)"
                                class="w-full mt-1 border-[2px] p-2 cursor-pointer bg-gray-100 relative">
                                <span :title="providedColors.map(c => c[0]).join(', ')"
                                    class="select-size  text-gray-700 text-sm sm:text-md capitalize">
                                    {{ providedColors.length ? providedColors.map(c => c[0]).join(", ")
                                        : "select colors" }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownOpen2" ref="dropdownList2"
                                class="absolute w-full border-[1px] border-t-0 bg-gray-50 shadow-lg z-10 h-[150px] sm:h-[200px] overflow-y-auto capitalize">
                                <label v-for="(option, index) in colors" :key="index" :for="option.color"
                                    @click="handelColorChange(option)"
                                    class="not-import flex items-center text-sm sm:text-md px-3 py-2 hover:bg-gray-100 cursor-pointer ">
                                    <input type="checkbox" :name="option.color" :value="option.value"
                                        v-model="providedColors" class="mr-2" />
                                    {{ option.color }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4 ">
                        <div class="flex flex-col gap-1 mt-0 sm:mt-2">
                            <label for="image" class="text-sm sm:text-md font-medium capitalize">
                                Product Image</label>
                            <input type="file" name="image" accept="image/webp" id="image" @change="handleFileChange"
                                class=" text-sm sm:text-md border-2 text-slate-500 file:cursor-pointer file:mr-4 file:py-2
                            file:px-4 file:sm:px-8 file:border-none file:border-r-2 file:border-r-gray-200
                            file:text-md file:font-medium file:bg-gray-100 hover:file:bg-gray-200 file:transition file:duration-150">
                            <p class="text-medium text-red-600 text-sm">{{ imageErr }}</p>
                        </div>

                        <div class="flex flex-col gap-1 mt-0 sm:mt-2">
                            <label for="providedImages" class="text-sm sm:text-md font-medium capitalize">
                                provided Images</label>
                            <input type="file" name="providedImages" accept="image/webp" id="providedImages" multiple
                                @change="handleFilesChange"
                                class=" text-sm sm:text-md border-2 text-slate-500 file:cursor-pointer file:mr-4 file:py-2
                            file:px-4 file:sm:px-8 file:border-none file:border-r-2 file:border-r-gray-200
                            file:text-md file:font-medium file:bg-gray-100 hover:file:bg-gray-200 file:transition file:duration-150">
                            <div class="flex flex-wrap  gap-2 mt-2">
                                <p v-if="filesError" class="text-red-400">You can only select less than or equal 4
                                    images</p>
                                <p class="text-medium text-red-600 text-sm">{{ providedImagesErr }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex gap-2 sm:gap-4 justify-end mt-2 text-sm sm:text-md">
                        <BaseButton @click="this.$router.push({ name: 'AD-Dashboard' })"
                            class="cancel w-4/12 sm:w-2/12  bg-white border-none hover:bg-white">
                            cancel
                        </BaseButton>
                        <BaseButton @click="addProduct" class="w-5/12 sm:w-4/12 md:w-2/12  py-[6px] sm:py-[10px]">
                            add product
                        </BaseButton>
                    </div>
                </Form>
            </div>
        </div>
    </section>
    <!-- product result -->
    <span id="presult"></span>
    <ProductResultComponent :object="product" :show="showfinal" />

    <InFooter />
</template>
<script>
import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import ProductResultComponent from '../../../../../components/admin/ProductResultComponent.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import baseSuccess from '../../../../../components/baseSuccess.vue';
import baseError from '../../../../../components/baseError.vue';
import InFooter from '../../../../../components/InFooter.vue';
import data from '../../../../../assets/db/shop.categories.data.json'
import productsData from '../../../../../assets/db/data.json'

import { useForm, Field } from "vee-validate";

import * as yup from 'yup';
import { mapActions } from 'vuex';
export default {
    components: { ADNavigation, ProductResultComponent, BaseButton, baseSuccess, baseError, InFooter },
    data() {
        return {
            success: false,
            failed: false,
            filesError: false,
            dropdownOpen1: false,
            dropdownOpen2: false,
            showfinal: false,
            product: {},
            title: '',
            details: '',
            price: '',
            sale: null,
            quantity: null,
            category: '',
            material: '',
            gender: '',
            providedSizes: [],
            providedColors: [],
            image: null,
            providedImages: [],
            // 
            imageErr: '',
            providedImagesErr: '',
            categories: [],
            materials: data.materials,
            sizes: data.sizes,
            colors: data.colorList,
        }
    },
    created() {
        this.categories = data.categories.map((v) => v.name);
    },
    mounted() {
        document.addEventListener("click", this.closeDropdown);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.closeDropdown);
    },
    methods: {
        ...mapActions(['AddProduct']),
        async addProduct() {
            try {
                this.onSubmit();
                console.log('Inventory Before ', productsData.length);
                this.set_product();
                await this.AddProduct(this.get_product());
                this.showfinal = true;
                // 
                this.success = true;
                setTimeout(() => { this.success = false; }, 1500);
                setTimeout(() => { document.getElementById("presult").scrollIntoView({ behavior: "smooth" }) }, 300);
                console.log('Product Added');
                console.log('Inventory After ', productsData.length);
            } catch (err) {
                console.error("Failed to Add Product: ", err);
                this.failed = true;
                setTimeout(() => { this.failed = false; }, 1500);
            }
        },
        set_product() {
            this.product.title = this.title;
            this.product.details = this.details;
            this.product.price = this.price;
            this.product.sale = this.sale;
            this.product.quantity = this.quantity;
            this.product.for = this.gender;
            this.product.providedColors = this.providedColors;
            this.product.providedSizes = this.providedSizes;
            this.product.providedImages = this.providedImages;
            this.product.src = this.image;
            return this.product;
        },
        get_product() {
            return this.product;
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const isWebP = file.type === 'image/webp';
            if (file && isWebP) {
                this.imageErr = '';
                console.log('Files selected:', file.name);
                this.image = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result; // Add the image URL to the array
                };
                reader.readAsDataURL(file);
                console.log('Updated Main Image:', this.image);
            } else {
                this.imageErr = 'Only images.webp are allowed!';
                event.target.value = ''; // Clear the input
                this.image = null; // Reset if no file is selected
            }
        },

        handleFilesChange(event) {
            const files = event.target.files
            let isWebP = true;
            if (files.length <= 4) {
                this.providedImages = [];
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
                            this.providedImages.push(e.target.result); // Add the image URL to the array
                        };
                        reader.readAsDataURL(file);
                    }
                });
                console.log('providedImages:', this.providedImages);
            }
            else {
                return this.filesError = true;
            }
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
            else if (this.providedColors.find(v => v.color === option.color)) {
                this.providedColors = this.providedColors.filter(v => v.color !== option.color && v.color !== 'all');
            }
            else if (option.value === '') { this.providedColors = [...this.colors]; }

            else this.providedColors.push(option);
        },
        toggleDropdown(dropdown) {
            if (dropdown === 1) {
                this.dropdownOpen1 = !this.dropdownOpen1;
            } else if (dropdown === 2) {
                this.dropdownOpen2 = !this.dropdownOpen2;
            }
        },
        closeDropdown(event) {
            if (this.$refs.dropdown1 && this.$refs.dropdownList1) {
                if (!this.$refs.dropdown1.contains(event.target) && !this.$refs.dropdownList1.contains(event.target)) {
                    this.dropdownOpen1 = false;
                }
            }
            if (this.$refs.dropdown2 && this.$refs.dropdownList2) {
                if (!this.$refs.dropdown2.contains(event.target) && !this.$refs.dropdownList2.contains(event.target)) {
                    this.dropdownOpen2 = false;
                }
            }
        }
    },
    setup() {
        const { handleSubmit } = useForm({
            validationSchema: yup.object({
                title: yup.string().required("This field is required").min(12, "Title must be informative"),
                price: yup.number().required("This field is required").min(1, "Price must be greater than 0"),
                details: yup.string().required("This field is required").min(18, "details must be greater than 18 characters"),
            })
        })
        // const { value: title } = useField("title");
        // const { value: details } = useField("details");
        // const { value: price } = useField("price");
        // const { value: sale } = useField("sale");
        // const { value: category } = useField("category");
        // const { value: quantity } = useField("quantity");
        // const { value: material } = useField("material");
        // const { value: gender } = useField("gender");

        // Handle form submission
        const onSubmit = handleSubmit(values => {
            console.log("Form submitted : ", values);
        });
        return { onSubmit };
    },

}
</script>
<style scoped>
@import url('../../../../../assets/stylesheets/AdProduct.css');
</style>