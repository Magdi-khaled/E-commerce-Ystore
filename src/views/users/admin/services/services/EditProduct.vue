<template>

    <BaseTeleport :show="success" :type="'success'">Success Product Updated</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duraion-200"></i>
        </button>
        <p>Can't Updated Product, Wrong input data</p>
    </BaseTeleport>
    <section class="w-full h-fit bg-gray-100">
        <ADNavigation />
        <div class="px-2 sm:px-6 py-8">
            <div class="flex justify-between items-center">
                <h1 class="text-lg sm:text-xl font-bold">
                    <i class="fa-thin fa-basket-shopping-plus font-bold pr-1"></i>
                    Edit Product
                </h1>
                <BaseButton class="text-sm sm:text-md px-2 sm:px-6 py-[6px] sm:py-[10px]"
                    @click="this.$router.push({ name: 'AD-Dashboard' })">
                    back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                </BaseButton>
            </div>
            <!-- edit form -->
            <div class="bg-white w-full p-4 shadow-md my-4">
                <Form class="flex flex-col gap-2 mt-2" @submit.prevent="editProduct">
                    <Field label="Title" name="title" placeholder="Product Title" type="text" v-model="product.title"
                        :validator="vSchema.title" />
                    <!--  -->
                    <Field label="details" name="details" type="textarea"
                        placeholder="Product description like [This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style]."
                        v-model="product.details" :validator="vSchema.details" />

                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        <Field label="price" name="price" placeholder="Product Price" type="number"
                            v-model="product.price" :validator="vSchema.price" />

                        <Field label="sale" name="sale" placeholder="Product sale" type="number" v-model="product.sale"
                            :validator="vSchema.sale" />

                        <Field label="quantity" name="quantity" placeholder="How many ?" type="number"
                            v-model="product.quantity" :validator="vSchema.quantity" />

                        <!-- provided sizes  -->
                        <div class="relative col-span-3 sm:col-span-1">
                            <p class="after:content-['*'] after:text-red-600 text-sm sm:text-md font-medium capitalize">
                                provided sizes </p>
                            <div ref="dropdownSizes" @click="toggleDropdown()"
                                class="w-full mt-1 border-[2px] p-2 cursor-pointer bg-gray-100 relative border-b-[3px] border-b-gray-600">
                                <span class="select-size text-gray-700 text-sm sm:text-md"
                                    :title="product.providedSizes">
                                    {{ product.providedSizes.length ? product.providedSizes.join(", ") : "Select Sizes"
                                    }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownSizes" ref="dropdownSizesList"
                                class="absolute w-full border-[1px] border-t-0 bg-gray-50 shadow-lg z-10 h-[8em] overflow-y-auto capitalize">
                                <label v-for="(option, index) in sizes" :key="index" :for="option"
                                    @click="handleSizeChange(option)" class="not-import flex items-center text-sm sm:text-md 
                                    px-3 py-2 hover:bg-gray-100 cursor-pointer ">
                                    <input type="checkbox" :name="option" :value="option"
                                        v-model="product.providedSizes" class="mr-2" />
                                    {{ option }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- submit -->
                    <div class="w-full flex flex-row-reverse gap-2 sm:gap-4 mt-2 text-sm sm:text-md">
                        <BaseButton @click="editProduct" class="w-5/12 sm:w-4/12 md:w-2/12  py-[6px] sm:py-[10px]">
                            Update </BaseButton>
                        <BaseButton @click="this.$router.push({ name: 'AD-Dashboard' })"
                            class="cancel w-4/12 sm:w-2/12  bg-white border-none hover:bg-white">
                            cancel </BaseButton>
                    </div>
                </Form>
            </div>
        </div>
    </section>
    <!-- product result -->
    <ProductResultComponent :object="product" :show="true" />
    <InFooter />
</template>
<script>

import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import ProductResultComponent from '../../../../../components/admin/ProductResultComponent.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import BaseTeleport from '../../../../../components/BaseTeleport.vue';
import InFooter from '../../../../../components/InFooter.vue';
import Field from '../../../../../components/form/Field.vue';
import dataCategories from '../../../../../assets/db/shop.categories.data.json'
import data from '../../../../../assets/db/data.json'

import { mapActions } from 'vuex';
import { Form } from 'vee-validate';
import * as yup from 'yup';
export default {
    components: { ADNavigation, ProductResultComponent, Field, Form, BaseButton, BaseTeleport, InFooter },
    data() {
        return {
            show: false,
            success: false,
            failed: false,
            filesError: false,
            dropdownSizes: false,
            product: {},
            providedSizes: [],
            // local_db_data
            categories: dataCategories.categories.map(cat => cat.name),
            materials: dataCategories.materials,
            sizes: dataCategories.sizes,
            colors: dataCategories.colorList,
        }
    },
    setup() {
        const vSchema = {
            title: yup.string().required('Title is required'),
            price: yup.number().required('Price is required').min(10, 'Price atleast 10 EGP'),
            sale: yup.number().required('Sale is required').min(0, 'Sale atleast 0%').max(100, 'Sale must be less than 100%'),
            details: yup.string().required('Description is required').min(10, 'Description must be more than 32 characters'),
            quantity: yup.number().required('Quantity is required').min(1, 'Quantity atleast 1 product in your stock'),
        };
        return { vSchema }
    },
    created() {
        this.initData();
    },
    mounted() {
        document.addEventListener("click", this.closeDropdown);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.closeDropdown);
    },
    methods: {
        ...mapActions(['EditProduct']),
        async editProduct() {
            try {
                // Validate the form
                await this.set_product();
                const validData = Object.values(this.get_product())
                    .every(element => element !== null && element !== '' && element != []);
                console.log(validData);
                if (!validData) {
                    this.failed = true; return;
                }
                // Editing product ....
                await this.EditProduct(this.get_product());
                this.success = true;
                setTimeout(() => { this.success = false; }, 3000);
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
                    quantity: this?.quantity,
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
        initData() {
            this.product = data.find(v => v._id === Number(this.$route.params.id));
            this.providedColors = this.product.providedColors.map(v => v.color);
        },
        handleSizeChange(option) {
            if (option === 'All' && (this.providedSizes.length || this.providedSizes.find(v => v === 'All'))) { this.providedSizes = []; }
            else if (this.providedSizes.find(v => v === option)) {
                this.providedSizes = this.providedSizes.filter(v => v !== option && v !== 'All');
            }
            else if (option === 'All') { this.providedSizes = [...this.sizes]; }
            else this.providedSizes.push(option);
        },
        toggleDropdown() {
            this.dropdownSizes = !this.dropdownSizes;
        },
        closeDropdown(event) {
            if (this.$refs.dropdownSizes && !this.$refs.dropdownSizes.contains(event.target)
                && !this.$refs.dropdownSizesList.contains(event.target)) {
                this.dropdownSizes = false;
            }
        }
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

/* @import url('../../../../../assets/stylesheets/ADProduct.css'); */
</style>