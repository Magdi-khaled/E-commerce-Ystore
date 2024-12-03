<template>
    <div>
        <baseNavbar></baseNavbar>
        <section class="shop w-full px-4 sm:px-8 md:px-16 py-8 flex gap-4">
            <filterShopComponent :showFilter="showFilter" @closeFilter="showFilter = false"></filterShopComponent>
            <div class="pl-0 md:pl-4 w-full md:w-11/12">
                <!-- Shop Header -->
                <div class="flex items-end capitalize font-bold">
                    <h1 class="capitalize font-sans text-2xl md:text-3xl">casual</h1>
                    <div class="flex text-gray-400 justify-end w-full">
                        <p class="px-1 md:pr-6 whitespace-nowrap hidden md:block text-md">
                            showing 1-10 <span class="lowercase">of</span> 100 products
                        </p>
                        <div v-if="!filterButton" class="flex justify-between whitespace-nowrap">
                            sort by:
                            <div class="pl-1 relative">
                                <button @click="mostPopular = !mostPopular"
                                    class="capitalize text-black transition  hover:bg-gray-200 rounded-3xl">
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

                        <div v-if="filterButton" class="hover:bg-gray-200 rounded-2xl px-2 py-2">
                            <button @click="showFilter = !showFilter" class="flex justify-end">
                                <img src="../../assets/images/icons/filter.png" alt="filter-icon" class="w-full">
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Shop Products -->
                <div class="flex flex-wrap justify-between">
                    <div v-for="product in shopProducts" class="mt-5 px-0 md:px-1 product relative">
                        <button @click="addToCart(product)"
                            class="absolute top-2 sm:top-4 right-2 sm:right-4 p-1 border-black rounded-full"
                            title="AddToCart">
                            <i class="fa-solid fa-cart-shopping text-gray-600 hover:text-black text-xl"></i>
                        </button>
                        <router-link :to="'/shop.co/shop/product'" :infoRoute="1">
                            <baseProduct :product="product">
                            </baseProduct>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <baseFooter></baseFooter>
    </div>
</template>
<script>
import baseNavbar from '../../components/baseNavbar.vue';
import filterShopComponent from '../../components/cart/filter.shop.vue';
import baseFooter from '../../components/baseFooter.vue';
import baseProduct from '../../components/product.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { baseNavbar, filterShopComponent, baseProduct, baseFooter },
    data() {
        return {
            shopProducts: []
        }
    },
    setup() {
        const mostPopular = ref(false);
        const ascending = ref(false);
        const descending = ref(false);
        const showFilter = ref(false);
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
            mostPopular, ascending, descending, showFilter, filterButton
        }
    },
    computed: {
        ...mapGetters(['Get_Products']),
    },
    async created() {
        await this.fetchData();
        console.log(this.shopProducts);
    },
    methods: {
        ...mapActions(['fetchProducts']),
        initData() {
            this.shopProducts = this.Get_Products;
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
        addToCart() {

        }
    }
};

</script>

<style scoped>
.product {
    width: 33%;
}

@media (max-width:904px) {
    .product {
        width: 48%;
    }
}

@media (max-width:772px) {
    .product {
        width: 48%;
    }
}
</style>
