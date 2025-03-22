<template>
    <BaseTeleport :show="success" :type="'success'">Success Product Added</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duraion-200"></i>
        </button>
        <p>Can't Add Product, Wrong input data</p>
    </BaseTeleport>
    <section class="w-full h-fit bg-gray-100">
        <ADNavigation />
        <div class="px-2 sm:px-6 py-8">
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
                        <Field label="Title" name="title" placeholder="Product Title" type="text" v-model="title"
                            :validator="vSchema.title" />
                        <Field label="price" name="price" placeholder="Product Price" type="number" v-model="price"
                            :validator="vSchema.price" />
                    </div>
                    <Field label="Description" name="details"
                        placeholder="Details ... Cotton T-shirt which is perfect for any occasion. Crafted from a soft...."
                        type="textarea" v-model="details" :validator="vSchema.details" />

                    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                        <Field label="sale" name="sale" placeholder="Product sale" type="number" v-model="sale"
                            :validator="vSchema.sale" />

                        <Field label="quantity" name="quantity" placeholder="How many ?" type="number"
                            v-model="quantity" :validator="vSchema.quantity" />

                        <div class="col-span-2 sm:col-span-1">
                            <Field label="category" name="category" type="select" v-model="category"
                                :options="categories.slice(1)" optionsType="Select Category"
                                :validator="vSchema.category" />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <Field label="material" name="material" type="select" v-model="material"
                                :options="materials" optionsType="Select material" :validator="vSchema.material" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 ">
                        <div class="col-span-2 sm:col-span-1">
                            <Field label="for" name="gender" type="select" v-model="gender"
                                :options="['male', 'female', 'both']" optionsType="Select Gender"
                                :validator="vSchema.gender" />
                        </div>
                        <!-- provided sizes  -->
                        <div class="relative col-span-2 sm:col-span-1">
                            <p class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-medium capitalize">
                                provided sizes </p>
                            <div ref="dropdown1" @click="toggleDropdown(1)" class="w-full mt-1 p-2 cursor-pointer bg-gray-100 relative border-[2px]
                            border-b-[3px] border-b-gray-600">
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
                                        class="mr-3 border-b-[3px] border-gray-600" />
                                    {{ option }}
                                </label>
                            </div>
                        </div>
                        <!-- provided colors  -->
                        <div class="relative col-span-2 sm:col-span-1">
                            <p class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-medium capitalize">
                                provided colors </p>
                            <div ref="dropdown2" @click="toggleDropdown(2)" class="w-full mt-1 p-2 cursor-pointer bg-gray-100 relative border-[2px]
                                border-b-[3px] border-b-gray-600">
                                <span :title="providedColors.map(c => c.color).join(', ')"
                                    class="select-size  text-gray-700 text-sm sm:text-md capitalize">
                                    {{providedColors.length ? providedColors.map(c => c.color).join(", ")
                                        : "select colors"}}
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
                                        v-model="providedColors" class="mr-3 order-b-[3px] border-gray-600" />
                                    {{ option.color }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 ">
                        <!-- <Field label="Product Image" name="image" type="file" accept="image/*" v-model="image"
                            :validator="vSchema.image" /> -->
                        <label for="image" class="mt-4 border-2 border-gray-400 bg-gray-100 border-dashed rounded-md
                        flex justify-center items-center h-32 sm:h-36 not-import">
                            <input type="file" name="image" id="image" accept="image/*" @input="handleFileUpload"
                                class="w-10/12 file:bg-gray-900 file:rounded-md file:text-white file:text-sm file:md:text-sm">
                        </label>
                        <label for="images" class="mt-4 border-2 border-gray-400 bg-gray-100 border-dashed rounded-md
                        flex justify-center items-center h-32 sm:h-36 not-import">
                            <input type="file" name="images" id="images" accept="image/*" multiple
                                @input="handleFilesUpload"
                                class="w-10/12 file:bg-gray-900 file:rounded-md file:text-white file:text-sm file:md:text-sm">
                        </label>
                        <!-- <Field label="Provided Images" name="providedImages" type="file" accept="image/*"
                            v-model="providedImages" :multiple="true" :validator="vSchema.providedImages" /> -->
                    </div>
                    <div class="w-full flex flex-row-reverse gap-2 sm:gap-4 mt-2 text-sm sm:text-md">
                        <BaseButton @click="addProduct" class="w-5/12 sm:w-4/12 md:w-2/12  py-[6px] sm:py-[10px]">
                            add product </BaseButton>
                        <BaseButton @click="this.$router.push({ name: 'AD-Dashboard' })"
                            class="cancel w-4/12 sm:w-2/12  bg-white border-none hover:bg-white">
                            cancel </BaseButton>
                    </div>
                </Form>
            </div>
        </div>
    </section>
    <InFooter />
</template>
<script>
import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import BaseTeleport from '../../../../../components/BaseTeleport.vue';
import Field from '../../../../../components/form/Field.vue';
import InFooter from '../../../../../components/InFooter.vue';
import data from '../../../../../assets/db/shop.categories.data.json';

import axios from 'axios';
import { mapActions } from 'vuex';
import { Form } from 'vee-validate';
import * as yup from 'yup';
export default {
    components: { ADNavigation, Field, Form, BaseButton, BaseTeleport, InFooter },
    data() {
        return {
            success: false,
            failed: false,
            filesError: false,
            dropdownOpen1: false,
            dropdownOpen2: false,
            product: {},
            title: '',
            details: '',
            price: null,
            sale: null,
            quantity: null,
            category: '',
            material: '',
            gender: '',
            image: '',
            providedSizes: [],
            providedColors: [],
            providedImages: [],
            // outputImage: null,
            // local_db_data
            categories: data.categories.map((v) => v.name),
            materials: data.materials,
            sizes: data.sizes,
            colors: data.colorList,
        }
    },
    mounted() {
        document.addEventListener("click", this.closeDropdown);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.closeDropdown);
    },
    setup() {
        const vSchema = {
            title: yup.string().required('Title is required'),
            price: yup.number().required('Price is required').min(10, 'Price atleast 10 EGP'),
            sale: yup.number().required('Sale is required').min(0, 'Sale atleast 0%').max(100, 'Sale must be less than 100%'),
            details: yup.string().required('Description is required').min(2, 'Description must be more than 32 characters'),
            quantity: yup.number().required('Quantity is required').min(1, 'Quantity atleast 1 product in your stock'),
            category: yup.string().required('Category is required'),
            material: yup.string().required('Material is required'),
            gender: yup.string().required('Gender is required'),
            image: yup.string().required('Image is required'),
            // providedImages: yup.array().required('Images are required')
        };
        return { vSchema }
    },
    methods: {
        ...mapActions(['AddProduct']),
        handleFileUpload(event) {
            const file = event.target.files[0];

            if (file) {
                this.image = `/assets/shop/${file.name}`; // Store the file object
            }
        }, handleFilesUpload(event) {
            const files = Array.from(event.target.files);

            files.forEach(v => {
                this.providedImages.push(`/assets/shop/${v.name}`)
            })
        },
        async addProduct() {
            try {
                // Validate the form
                await this.set_product();
                const validData = Object.values(this.get_product())
                    .every(element => element !== null && element !== '' && element != []);
                console.log(validData);
                if (!validData) {
                    this.failed = true; return;
                }
                // Adding product ....
                await this.AddProduct(this.get_product());
                this.success = true;
                setTimeout(() => { this.success = false; }, 3000);
                setTimeout(() => { this.clearForm(); }, 700);
                console.log('Product Added, Inventory Updated');
            } catch (err) {
                console.error("Failed to Add Product: ", err);
                this.failed = true;
            }
        },
        async set_product() {
            try {
                this.product = await {
                    title: this.title,
                    details: this.details,
                    price: this.price,
                    sale: this.sale,
                    quantity: this.quantity,
                    for: this.gender,
                    category: this.category,
                    material: this.material,
                    providedColors: this.providedColors,
                    providedSizes: this.providedSizes,
                    providedImages: this.providedImages,
                    src: this.image
                }
                console.log('Sent Object : ', this.product);
                return this.product;
            }
            catch (err) {
                console.error('Error Sending Product: ', err);
            }
        },
        get_product() {
            return this.product;
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
        },
        clearForm() {
            this.title = '';
            this.details = '';
            this.price = null;
            this.sale = null;
            this.quantity = null;
            this.category = '';
            this.material = '';
            this.gender = '';
            this.image = '';
            this.providedSizes = [];
            this.providedColors = [];
            this.providedImages = [];
            window.location.reload();
        },
    },
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
    content: "*";
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
    color: #ff3333;
    font-weight: bold;
    background-color: rgba(255, 0, 0, 0.148);
    padding: 0px 12px;
    margin-left: 10px;
    border-radius: 35px;
}

/* @import url('../../../../../assets/stylesheets/AdProduct.css'); */
</style>