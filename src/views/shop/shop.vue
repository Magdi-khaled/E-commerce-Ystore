<template>
    <userNavbar v-if="user == 'customer'" :currentlyShop="true"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="bg-gray-100">
        <section class="shop w-[100%] px-3 md:px-6 pb-4 m-auto bg-white ">
            <breadcrumbs></breadcrumbs>
            <div class="flex gap-4 ">

                <filterShopComponent class=" w-[19%]" :showFilter="showFilter" @closeFilter="showFilter = false">
                </filterShopComponent>
                <div class="pl-0 md:pl-2 w-full">
                    <!-- Shop Header -->
                    <div class="flex items-center justify-between font-medium mr-0 sm:mr-4">
                        <p class="px-1 md:pr-6 whitespace-nowrap text-sm text-gray-400 font-medium">
                            Showing 1-20 from total <span class="text-black"> {{ shopProducts.length }}</span> for
                            "<span class="text-black "> {{ allT }}</span>"
                        </p>
                        <div v-if="!filterButton" class="flex justify-between whitespace-nowrap text-sm capitalize">
                            sort by:
                            <div class="pl-1 relative z-30 ">
                                <button @click="mostPopular = !mostPopular"
                                    class="capitalize text-black transition hover:bg-gray-200 rounded-md">
                                    most popular <i class="fa-solid fa-chevron-down text-md"></i>
                                </button>
                                <div v-if="mostPopular"
                                    class="w-full rounded-sm border-2 mt-1 text-black bg-white absolute">
                                    <button @click="ascending = true"
                                        class="w-full text-start capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
                                        ascending <i class="fa-solid fa-arrow-up-wide-short"></i>
                                    </button>
                                    <hr>
                                    <button @click="descending = true"
                                        class="w-full text-start capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
                                        descending <i class="fa-solid fa-arrow-down-wide-short"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="hover:bg-gray-200 rounded-md p-2 mt-2">
                            <button @click="showFilter = !showFilter" class="flex justify-end">
                                <img src="../../assets/images/icons/filter.png" alt="filter-icon" class="w-full">
                            </button>
                        </div>
                    </div>

                    <!-- Shop Products -->
                    <div class="flex flex-wrap justify-start sm:justify-start gap-2">
                        <div v-for="product in paginatedItems" :key="product" class="mt-4 rounded-sm product relative ">
                            <!-- class="mt-4 border-[0.2px] border-gray-300 rounded-md p-[4px] product relative"> -->
                            <button @click="addToCart(product)"
                                class="absolute z-10 top-2 right-2 border-black rounded-full" title="Add To Cart">
                                <i class="fa-solid fa-cart-shopping text-gray-600 hover:text-gray-700 text-xl"></i>
                            </button>
                            <router-link :to="infoRoute(product._id)">
                                <baseProduct :product="product">
                                </baseProduct>
                            </router-link>
                        </div>
                    </div>

                    <pagination :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage"
                        :prevPage="prevPage" @page-changed="changePage"></pagination>
                </div>
            </div>
        </section>
        <hr>
    </div>
    <baseFooter></baseFooter>
</template>
<script>
import userNavbar from '../../components/user/userNavbar.vue';
import baseNavbar from '../../components/baseNavbar.vue';
import filterShopComponent from '../../components/cart/filter.shop.vue';
import baseFooter from '../../components/baseFooter.vue';
import baseProduct from '../../components/product.vue';
import pagination from '../../components/pagination.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { baseNavbar, userNavbar, filterShopComponent, baseProduct, pagination, baseFooter },
    data() {
        return {
            user: localStorage.getItem('user'),
            allT: sessionStorage.getItem('allT'),
            shopProducts: [],
            currentPage: 1,
            pageSize: 20,
            ascending: false,
            descending: false,
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
    watch: {
        allT(newValue, oldValue) {
            this.$router.go()
            console.log('Value changed from', oldValue, 'to', newValue);
        },
    },
    computed: {
        ...mapGetters(['Get_Products']),
        totalPages() {
            return Math.ceil(this.shopProducts.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.shopProducts.slice(startIndex, endIndex);
        },
    },
    async created() {
        await this.fetchData(this.currentPage);
    },
    methods: {
        ...mapActions(['fetchProducts', 'addItemToCart']),
        initData() {
            this.shopProducts = this.Get_Products;
            // console.log('shopProducts:', this.shopProducts);
        },
        async fetchData(page) {
            try {
                await this.fetchProducts(page);
                await this.initData();
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
