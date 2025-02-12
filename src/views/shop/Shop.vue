<template>
    <UserNavbar v-if="user == 'customer'" :currentlyShop="true" />
    <BaseNavbar v-else />
    <div class="bg-gray-100">
        <Breadcrumbs class="mt-2 px-3 md:px-4 pt-[3px] pb-4" :breadcrumbs="this.$route.meta.breadcrumb" />
        <section class="px-3 md:px-6 pb-4 m-auto bg-white">
            <div class="flex gap-4">

                <FilterComponent class=" w-[19%]" :showFilter="showFilter" @closeFilter="showFilter = false" />
                <div class="pl-0 md:pl-2 w-full">
                    <!-- Shop Header -->
                    <div class="flex items-center justify-between font-medium mr-1 sm:mr-2 md:mr-3 mt-3 sm:mt-0">
                        <div class="flex items-center gap-4">
                            <p class="whitespace-nowrap text-xs sm:text-[14px] text-gray-400 font-medium">
                                Showing 1-20 from total <span class="text-black"> {{ shopProducts.length }}</span> for
                                "<span class="text-black capitalize"> {{ allv }}</span>"
                            </p>
                            <div v-if="this.asPopular" class="w-5/12 flex items-center gap-2 text-black border-2
                            border-gray-500 cursor-pointer p-[5px] text-sm rounded-full transition-all duration-100">
                                <button @click="this.asUsual = true, this.asPopular = !this.asPopular">
                                    <i class="fa-regular fa-xmark hover:text-gray-500 "></i>
                                </button>
                                <p>
                                    {{ asUsual ? '' : 'Most popular' }}
                                </p>
                            </div>
                        </div>
                        <div v-if="!filterButton" class="flex justify-between whitespace-nowrap text-sm capitalize">
                            showed by:
                            <div class="pl-1 relative z-30 ">
                                <button @click="mostPopular = !mostPopular"
                                    class="capitalize text-black transition hover:bg-gray-200 rounded-md">
                                    {{ asUsual ? 'as usual' : 'as popular' }} <i
                                        class="fa-solid fa-chevron-down text-md"></i>
                                </button>
                                <div v-if="mostPopular"
                                    class="w-fit rounded-sm border-2 mt-1 text-black bg-white absolute right-[0%]">
                                    <button @click="asPopular = true, mostPopular = false, asUsual = false"
                                        class="w-full capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
                                        most popular <i class="fa-solid fa-arrow-up-wide-short pl-2"></i>
                                    </button>
                                    <hr>
                                    <button @click="asUsual = true, mostPopular = false, asPopular = false"
                                        class="w-full capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
                                        as usual <i class="fa-solid fa-arrow-down-wide-short pl-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full flex justify-end">
                            <button @click="showFilter = !showFilter"
                                class="rounded hover:text-gray-500 transition duration-150">
                                <i class="fa-sharp fa-regular fa-filters text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Shop Products -->
                    <div class="flex flex-wrap gap-2">
                        <div v-for="(product, index) in paginatedItems" :key="product._id"
                            class="mt-4 rounded-sm product relative ">
                            <!-- class="mt-4 border-[0.2px] border-gray-300 rounded-md p-[4px] product relative"> -->
                            <button @click="addToCart(product)"
                                class="absolute z-10 top-2 right-2 border-black rounded-full" title="Add To Cart">
                                <i class="fa-solid fa-cart-shopping text-gray-600 hover:text-gray-700 text-xl"></i>
                            </button>
                            <router-link :to="infoRoute(product._id)">
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
<script>
import BaseNavbar from '../../components/BaseNavbar.vue';
import UserNavbar from '../../components/user/UserNavbar.vue';
import FilterComponent from '../../components/shop/FilterComponent.vue';
import ProductComponent from '../../components/shop/ProductComponent.vue';
import BaseFooter from '../../components/BaseFooter.vue';

import { onMounted, onBeforeUnmount, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { BaseNavbar, UserNavbar, FilterComponent, ProductComponent, BaseFooter },
    data() {
        return {
            user: localStorage.getItem('user'),
            shopProducts: [],
            currentPage: 1,
            pageSize: 20,
            asPopular: false,
            asUsual: true,
            showFilter: false,
            mostPopular: false
        }
    },
    setup() {
        const filterButton = ref(window.innerWidth < 775);
        const updateShow = () => {
            filterButton.value = window.innerWidth < 775;
        };
        onMounted(() => {
            addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            addEventListener('resize', updateShow);
        });
        return {
            filterButton
        }
    },
    computed: {
        ...mapGetters(['Get_Products']),
        totalPages() {
            return Math.ceil(this.shopProducts.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.Get_Products.slice(startIndex, endIndex);
        },
        allv() {
            // this.$router.go();
            return sessionStorage.getItem('allT');
        }
    },
    async created() {
        await this.fetchData();
    },
    methods: {
        ...mapActions(['fetchProducts', 'addItemToCart']),
        initData() {
            this.shopProducts = this.Get_Products;
            // console.log('shopProducts:', this.shopProducts);
        },
        async fetchData() {
            try {
                await this.fetchProducts();
                this.initData();
            }
            catch (err) {
                console.error('fetching shop products error : ', err);
            }
        },
        async addToCart(cartItem) {
            try {
                await this.addItemToCart(cartItem);
            }
            catch (err) {
                console.error('adding item to cart error : ', err);
            }
        },
        infoRoute(id) {
            return `/shop.co/shop/product/${id}`;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        changePage(page) {
            this.currentPage = page;
        }
    }
};

</script>

<style scoped>
/* Product */
.product {
    cursor: pointer;
    width: 19.2%;
    height: 100%;

    transition: all 0.2s ease-in;
    /*
    border: 0px solid rgb(155, 155, 155);
    background-color: rgba(238, 238, 238, 0.23);
    border-radius: 5px;
    box-shadow: 1px 1px  gray;
    padding: 1px;
    */
}

:deep(.product img) {
    opacity: 0.88;
    box-shadow: 0.6px 0px 0.2px rgb(144, 144, 144);

    transition: all 0.2s ease-in;

}

:deep(.product img):hover {
    opacity: 1;
}

:deep(.product .detail) {
    /* box-shadow: 1px 1px red; */
    border-radius: 0;
}

@media (max-width:1080px) {
    .product {
        width: 24%;
    }
}

@media (max-width:832px) {
    .product {
        width: 24%;
    }
}

@media (max-width:772px) {
    .product {
        width: 32%;
    }
}

@media (max-width:572px) {
    .product {
        width: 48.2%;
    }
}
</style>
