<script setup>
import ADNavbar from '@/components/admin/ADNavbar.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseTeleport from '@/components/BaseTeleport.vue';
import Field from '@/components/form/Field.vue';
import InFooter from '@/components/InFooter.vue';
import data from '@/composables/shop.categories.data';
import { handelColorChange, handleSizeChange } from '@/composables/useUtils';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';

const store = useStore();
const router = useRouter();
const success = ref(false);
const failed = ref(false);
const dropdownOpen1 = ref(false);
const dropdownOpen2 = ref(false);
const product = ref({});
const title = ref('');
const details = ref('');
const price = ref(null);
const sale = ref(null);
const quantity = ref(null);
const category = ref('');
const material = ref('');
const gender = ref('');
const image = ref('');
const providedSizes = ref([]);
const providedColors = ref([]);
const providedImages = ref([]);
// local_db_data
const categories = data.categories.map((v) => v.name);
const materials = data.materials;
const sizes = data.sizes;
const colors = data.colorList;
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
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        image.value = `/assets/shop/${file.name}`;
    }
};
const handleFilesUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(v => {
        providedImages.value.push(`/assets/shop/${v.name}`)
    })
};
const addProduct = async () => {
    try {
        // Validate the form
        await set_product();
        const validData = Object.values(product.value)
            .every(element => element !== null && element !== '' && element != []);
        console.log(validData);
        if (!validData) {
            failed.value = true;
            return;
        }
        // Adding product ....
        await store.dispatch('AddProduct', product.value);
        success.value = true;
        setTimeout(() => { success.value = false; }, 3000);
        setTimeout(() => { clearForm(); }, 700);
        console.log('Product Added, Inventory Updated');
    } catch (err) {
        console.error("Failed to Add Product: ", err);
        failed.value = true;
    }
};
const set_product = () => {
    product.value = {
        title: title.value,
        details: details.value,
        price: price.value,
        sale: sale.value,
        quantity: quantity.value,
        for: gender.value,
        category: category.value,
        material: material.value,
        providedColors: providedColors.value,
        providedSizes: providedSizes.value,
        providedImages: providedImages.value,
        image: image.value
    }
    console.log('Sent Object : ', product.value);
    return product.value;
};

const toggleDropdown = (dropdown) => {
    (dropdown === 1) ? dropdownOpen1.value = !dropdownOpen1.value : dropdownOpen2.value = !dropdownOpen2.value;
};
const closeDropdown = (event) => {
    const dropdown1 = document.getElementById('dropdown1');
    const dropdownList1 = document.getElementById('dropdownList1');
    const dropdown2 = document.getElementById('dropdown2');
    const dropdownList2 = document.getElementById('dropdownList2');

    if (dropdown1 && dropdownList1) {
        if (!dropdown1.contains(event.target) && !dropdownList1.contains(event.target)) {
            dropdownOpen1.value = false;
        }
    }
    if (dropdown2 && dropdownList2) {
        if (!dropdown2.contains(event.target) && !dropdownList2.contains(event.target)) {
            dropdownOpen2.value = false;
        }
    }
};


const clearForm = () => {
    title.value = '';
    details.value = '';
    price.value = null;
    sale.value = null;
    quantity.value = null;
    category.value = '';
    material.value = '';
    gender.value = '';
    image.value = '';
    providedSizes.value = [];
    providedColors.value = [];
    providedImages.value = [];
    window.location.reload();
};
onMounted(() => {
    document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdown);
});
</script>

<template>
    <BaseTeleport :show="success" :type="'success'">Success Product Added</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duraion-200"></i>
        </button>
        <p>Can't Add Product, Wrong input data</p>
    </BaseTeleport>
    <section class="w-full h-fit bg-gray-100">
        <ADNavbar />
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
                        placeholder="Produect details, Ex :Cotton T-shirt which is perfect for any occasion. Crafted from a soft, and so on...."
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
                            <div id="dropdown1" @click="toggleDropdown(1)" class="w-full mt-1 py-3 px-2 cursor-pointer bg-white relative outline-0 border-[1px] border-gray-400 focus:border-gray-600
                                rounded-lg focus:bg-[#f8f8f8] focus:scale-[1.001] transition-all duration-200">
                                <span class="select-size text-gray-700 text-sm sm:text-md">
                                    {{ providedSizes.length ? providedSizes.join(", ") : "Select Sizes" }}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownOpen1" id="dropdownList1"
                                class="absolute w-full border-[1px] border-t-0 rounded-lg bg-white shadow-lg z-10 h-[150px] sm:h-[200px] overflow-y-auto capitalize">
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
                            <div id="dropdown2" @click="toggleDropdown(2)" class="w-full mt-1 py-3 px-2 cursor-pointer bg-white relative outline-0 border-[1px] border-gray-400 focus:border-gray-600
                            rounded-lg focus:bg-[#f8f8f8] focus:scale-[1.001] transition-all duration-200">
                                <span :title="providedColors.map(c => c.color).join(', ')"
                                    class="select-size  text-gray-700 text-sm sm:text-md capitalize">
                                    {{providedColors.length ? providedColors.map(c => c.color).join(", ")
                                        : "select colors"}}
                                </span>
                                <i
                                    class="fa-solid fa-chevron-down text-xs text-gray-600 absolute right-[1%] top-[25%]"></i>
                            </div>
                            <!-- Dropdown Options -->
                            <div v-if="dropdownOpen2" id="dropdownList2"
                                class="absolute w-full border-[1px] border-t-0 rounded-lg bg-white shadow-lg z-10 h-[150px] sm:h-[200px] overflow-y-auto capitalize">
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
                    <!-- Files -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mt-3">
                        <input type="file" name="image" id="image" accept="image/*" @input="handleFileUpload"
                            class="hidden" />
                        <label for="image" class="cursor-pointer h-[5em] md:h-[7em] flex flex-col items-center justify-center 
                                    w-full border-2 border-dashed border-gray-400 rounded-2xl 
                                    text-gray-600 hover:bg-gray-100 transition not-import">
                            <i class="fa-solid fa-image text-2xl"></i>
                            <span v-if="!image" class="ml-2 text-sm sm:text-md">Upload Image</span>
                            <span v-else class="ml-2 text-sm sm:text-md">{{ image.slice(13) }}</span>
                        </label>
                        <input type="file" name="images" id="images" accept="image/*" @input="handleFilesUpload"
                            multiple class="hidden" />
                        <label for="images" class="cursor-pointer flex flex-col items-center justify-center 
                                    w-full border-2 border-dashed border-gray-400 rounded-2xl 
                                    text-gray-600 hover:bg-gray-100 transition not-import">
                            <i class="fa-solid fa-images text-2xl"></i>
                            <span v-if="!providedImages.length || providedImages.length > 4"
                                class="ml-2 text-sm sm:text-md">
                                Upload Alternative Images
                            </span>
                            <ul v-else class="ml-2 text-sm sm:text-md max-h-[4.2em] overflow-hidden">
                                <li v-for="(item, index) in providedImages.map(c => c.slice(18))" :key="index"
                                    class="flex">
                                    {{ item }}
                                    <p v-if="index === 2" class="ml-2 font-medium"> ...</p>
                                </li>
                            </ul>
                        </label>
                    </div>
                    <div class="w-full flex flex-row-reverse gap-2 sm:gap-4 mt-2 text-sm sm:text-md">
                        <BaseButton @click="addProduct" class="w-5/12 sm:w-4/12 md:w-2/12  py-[6px] sm:py-[10px]">
                            add product </BaseButton>
                        <BaseButton @click="router.push({ name: 'AD-Dashboard' })" class="cancel w-4/12 sm:w-2/12">
                            cancel </BaseButton>
                    </div>
                </Form>
            </div>
        </div>
    </section>
    <InFooter />
</template>

<style scoped>
@import "@/assets/css/adproduct.css";
</style>