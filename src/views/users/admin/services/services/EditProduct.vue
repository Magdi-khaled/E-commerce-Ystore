<script setup>
import ADNavbar from '@/components/admin/ADNavbar.vue';
import ProductPreview from '@/components/shop/ProductPreview.vue';
import ProductOrder from '@/components/shop/ProductOrder.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseTeleport from '@/components/BaseTeleport.vue';
import InFooter from '@/components/InFooter.vue';
import Field from '@/components/form/Field.vue';
import dataCategories from '@/composables/shop.categories.data.js';
import data from '@/composables/data.js';
import { handleSizeChange } from '@/composables/useUtils';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import * as yup from 'yup';

const store = useStore();
const route = useRoute();
const router = useRouter();

const success = ref(false);
const failed = ref(false);
const dropdownSizes = ref(false);
const product = ref({});
const providedSizes = ref([]);
const sizes = dataCategories.sizes;
const vSchema = {
    title: yup.string().required('Title is required'),
    price: yup.number().required('Price is required').min(10, 'Price atleast 10 EGP'),
    sale: yup.number().required('Sale is required').min(0, 'Sale atleast 0%').max(100, 'Sale must be less than 100%'),
    details: yup.string().required('Description is required').min(10, 'Description must be more than 32 characters'),
    quantity: yup.number().required('Quantity is required').min(1, 'Quantity atleast 1 product in your stock'),
};

const editProduct = async () => {
    try {
        product.value = {
            ...product.value,
            title: title,
            details: details,
            price: price,
            sale: sale,
            quantity: quantity,
            providedSizes: providedSizes
        };
        const validData = Object.values(product.value).every(element => element !== null
            && element !== '' && element != []);
        console.log(validData);
        if (!validData) {
            failed.value = true; return;
        }
        // Editing product ....
        await store.dispatch('EditProduct', product.value);
        success.value = true;
        setTimeout(() => { success.value = false; }, 3000);
        console.log('Product Added, Inventory Updated');
    } catch (err) {
        console.error("Failed to Add Product: ", err);
        failed.value = true;
    }
};

const fetchData = async () => {
    await store.dispatch('FetchInventory');
    console.log(store.getters['Get_Inventory']);
    product.value = await store.getters['Get_Inventory'].find(v => v._id === Number(route.params.id));
    console.log('updated product=> ', product.value);
};
const closeDropdown = (event) => {
    const dropdownSizes = document.getElementById('dropdownSizes');
    const dropdownSizesList = document.getElementById('dropdownSizesList');
    if (dropdownSizes && !dropdownSizes.contains(event.target)
        && dropdownSizesList.contains(event.target)) {
        dropdownSizes.value = false;
    }
};
onMounted(() => {
    fetchData();
    // document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
    // document.removeEventListener("click", closeDropdown);
});
</script>

<template>
    <BaseTeleport :show="success" :type="'success'">Success Product Updated</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duraion-200"></i>
        </button>
        <p>Can't Updated Product, Wrong input data</p>
    </BaseTeleport>
    <section class="w-full h-fit bg-gray-100">
        <ADNavbar />
        <div class="px-2 sm:px-6 py-8">
            <div class="flex justify-between items-center">
                <h1 class="text-lg sm:text-xl font-bold">
                    <i class="fa-thin fa-basket-shopping-plus font-bold pr-1"></i>
                    Edit Product
                </h1>
                <BaseButton class="text-sm sm:text-md px-2 sm:px-6 py-[6px] sm:py-[10px]"
                    @click="router.push({ name: 'AD-Dashboard' })">
                    back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                </BaseButton>
            </div>
            <!-- edit form -->
            <div class="bg-white w-full p-4 shadow-md my-4">
                <form class="flex flex-col gap-2 mt-2" @submit.prevent="editProduct">
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
                            <div id="dropdownSizes" @click="dropdownSizes = !dropdownSizes" class="w-full mt-1 py-[8px] lg:py-[11px] px-2 cursor-pointer bg-white relative outline-0 border-[1px]
                                border-gray-400 focus:border-gray-600 rounded-lg focus:bg-[#f8f8f8] focus:scale-[1.001] 
                                transition-all duration-200">
                                <span class="select-size text-gray-700 text-sm sm:text-md"
                                    :title="product?.providedSizes">
                                    {{ product?.providedSizes?.length ? product.providedSizes.join(", ")
                                        : "Select Sizes" }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownSizes" id="dropdownSizesList"
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
                    <!-- submit -->product
                    <div class="w-full flex flex-row-reverse gap-2 sm:gap-4 mt-2 text-sm sm:text-md">
                        <BaseButton @click="editProduct" class="w-5/12 sm:w-4/12 md:w-2/12  py-[6px] sm:py-[10px]">
                            update product</BaseButton>
                        <BaseButton @click="router.push({ name: 'AD-Dashboard' })" class="text-[#000] w-4/12 sm:w-2/12">
                            cancel </BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <!-- product result -->
    <div class="w-full h-fit px-4 sm:px-6 py-2 bg-gray-100 flex flex-wrap">
        <ProductPreview v-model:product="product" :isView="false" />
        <ProductOrder v-model:product="product" :isView="false" />
    </div>
    <InFooter />
</template>
