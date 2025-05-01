<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import BaseNavbar from '@/components/BaseNavbar.vue';
import UserNavbar from '@/components/user/UserNavbar.vue';
import FilterComponent from '@/components/shop/FilterComponent.vue';
import ProductComponent from '@/components/shop/ProductComponent.vue';
import ProductOptions from '@/components/shop/ProductOptions.vue';
import ShopHeader from '@/components/shop/ShopHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';

const store = useStore();
const route = useRoute();

const user = ref(localStorage.getItem('user'));
const allT = ref(sessionStorage.getItem('allT') || '');

const shopProducts = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const toggleFilter = ref(false);
const smallWished = ref(window.innerWidth < 645);

const wished = ref(null);
const hoveredProductId = ref(null);

const updateShow = () => {
    smallWished.value = window.innerWidth < 645;
};

watch(() => route.path, () => {
    allT.value = sessionStorage.getItem('allT') || '';
});

const totalPages = computed(() => {
    return Math.ceil(shopProducts.value.length / pageSize.value);
});

const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    return store.getters.Get_Products.slice(startIndex, startIndex + pageSize.value);
});

const fetchData = async () => {
    try {
        await store.dispatch('FetchProducts');
        await store.dispatch('FetchWishlist');
        shopProducts.value = store.getters.Get_Products;
    } catch (err) {
        console.error('Fetching shop products error:', err);
    }
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
const changePage = (page) => {
    currentPage.value = page;
};
onMounted(() => {
    window.addEventListener('resize', updateShow);
    fetchData();
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateShow);
});
</script>

<template>
    <UserNavbar v-if="user === 'customer'" :currentlyShop="true" />
    <BaseNavbar v-else />

    <div class="bg-gray-100">
        <Breadcrumbs class="mt-2 px-3 md:px-4 pt-[3px] pb-4" />
        <section class="px-3 md:px-6 pb-4 m-auto bg-white">
            <div class="flex gap-4">

                <FilterComponent class="w-[25%] md:w-[20%]" :show="toggleFilter" v-model:toggleFilter="toggleFilter" />
                <div class="pl-0 md:pl-2 w-full">
                    <!-- Shop Header -->
                    <ShopHeader :shopType="allT" :shopLength="shopProducts.length"
                        v-model:toggleFilter="toggleFilter" />
                    <!-- Shop Products -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <div v-for="(product, index) in paginatedItems" :key="product._id"
                            class="mt-4 rounded-sm product relative " @mouseover="hoveredProductId = product._id"
                            @mouseleave="hoveredProductId = null">
                            <ProductOptions :product="product" :smallWished="smallWished" v-model:wished="wished"
                                v-model:hoveredProductId="hoveredProductId" />

                            <router-link :to="{ name: 'Product', params: { id: product._id } }">
                                <ProductComponent :product="product" />
                            </router-link>
                        </div>
                    </div>

                    <Pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage"
                        :prevPage="prevPage" @page-changed="changePage" />
                </div>
            </div>
        </section>
        <hr>
    </div>
    <BaseFooter />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-1px);
}
</style>