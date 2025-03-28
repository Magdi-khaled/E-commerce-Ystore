<template>
    <UserNavbar v-if="user === 'customer'" :currentlyShop="true" />
    <BaseNavbar v-else />
    <!-- ADD TO CART BASE TELEPORT -->

    <BaseTeleport :show="show" :type="'message'">
        <i class="fa-solid fa-cart-plus text-gray-200"></i>
        Product Added to shopping cart
    </BaseTeleport>
    <BaseTeleport :show="wish" :type="'message'">
        <i class="fa-regular fa-heart"></i> Product Added to Wishlist
    </BaseTeleport>
    <BaseTeleport :show="unwish" :type="'message'">
        <i class="fa-regular fa-heart-crack"></i> Product removed from Wishlist
    </BaseTeleport>
    <div class="bg-gray-100">
        <Breadcrumbs class="mt-2 px-3 md:px-4 pt-[3px] pb-4" :breadcrumbs="this.$route.meta.breadcrumb" />
        <section class="px-3 md:px-6 pb-4 m-auto bg-white">
            <div class="flex gap-4">

                <FilterComponent class="w-[25%] md:w-[20%]" :showFilter="showFilter"
                    @closeFilter="showFilter = false" />
                <div class="pl-0 md:pl-2 w-full">
                    <!-- Shop Header -->
                    <div class="flex items-center justify-between font-medium mr-1 sm:mr-2 md:mr-3 mt-3 sm:mt-0">
                        <div class="flex items-center gap-4">
                            <p class="whitespace-nowrap text-xs sm:text-[14px] text-gray-400 font-medium">
                                Showing 1-20 from total <span class="text-black"> {{ shopProducts.length }}</span> for
                                "<span class="text-black capitalize"> {{ allT }}</span>"
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
                        <div v-if="!filterButton"
                            class="flex justify-between whitespace-nowrap text-sm sm:text-md capitalize">
                            showed by:
                            <div class="pl-1 relative z-30 ">
                                <button @click="mostPopular = !mostPopular"
                                    class="capitalize text-sm sm:text-md text-black transition hover:bg-gray-200 rounded-md">
                                    {{ asUsual ? 'as usual' : 'as popular' }} <i
                                        class="fa-solid fa-chevron-down text-md"></i>
                                </button>
                                <div v-if="mostPopular"
                                    class="w-fit rounded-sm border-2 mt-1 text-black bg-white absolute right-[0%]">
                                    <button @click="asPopular = true, mostPopular = false, asUsual = false"
                                        class="w-full text-sm sm:text-md capitalize px-1 hover:bg-gray-200 flex items-center justify-between">
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
                    <!-- <div class="flex flex-wrap gap-2"> -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <div v-for="(product, index) in paginatedItems" :key="product._id"
                            class="mt-4 rounded-sm product relative " @mouseover="hoveredProductId = product._id"
                            @mouseleave="hoveredProductId = null">
                            <!-- small screen -->
                            <transition name="fade">
                                <button v-if="smallWished" @mouseover="wished = product._id" @mouseleave="wished = null"
                                    @click="addToWishlist(product)"
                                    class="absolute z-10 font-extrabold text-md sm:text-2xl top-2 right-[3%] text-sm sm:text-[15px] p-[2.5px]
                                    opacity-[1] border border-black rounded-full flex flex-col transition-all duration-150" title="Add To Wishlist">
                                    <i class="text-gray-900" :class="{
                                        'fa-regular fa-heart': wished !== product._id && !isWished(product),
                                        'fa-solid fa-heart': wished === product._id || isWished(product)
                                    }"></i>
                                </button>
                            </transition>
                            <!-- x-large screen -->
                            <transition name="fade" v-if="!smallWished">
                                <button v-if="hoveredProductId === product._id && !smallWished || isWished(product)"
                                    @mouseover="wished = product._id" @mouseleave="wished = null"
                                    @click="addToWishlist(product)"
                                    class="absolute z-10 font-extrabold top-2 right-2 text-sm sm:text-[15px] p-[2px]
                                    opacity-[1] border border-black rounded-full flex flex-col transition-all duration-150" title="Add To Wishlist">
                                    <i class="text-gray-900" :class="{
                                        'fa-regular fa-heart': wished !== product._id && !isWished(product),
                                        'fa-solid fa-heart': wished === product._id || isWished(product)
                                    }"></i>
                                </button>
                            </transition>
                            <transition name="fade">
                                <button @click="addToCart(product)" class="absolute z-10 font-extrabold 
                                text-md sm:text-xl bottom-[77%] sm:bottom-4 right-[4%] sm:right-0 opacity-[1] flex flex-col
                                transition-all duration-150" title="Add To Cart">
                                    <i class="fa-solid fa-cart-plus text-gray-900 hover:text-gray-500"></i>
                                </button>
                            </transition>
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
<script>
import BaseNavbar from '../../components/BaseNavbar.vue';
import UserNavbar from '../../components/user/UserNavbar.vue';
import FilterComponent from '../../components/shop/FilterComponent.vue';
import ProductComponent from '../../components/shop/ProductComponent.vue';
import BaseFooter from '../../components/BaseFooter.vue';
import BaseTeleport from '../../components/BaseTeleport.vue';

import { onMounted, onBeforeUnmount, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { BaseNavbar, UserNavbar, FilterComponent, ProductComponent, BaseTeleport, BaseFooter },
    data() {
        return {
            user: localStorage.getItem('user'),
            allT: sessionStorage.getItem('allT') || '',
            show: false,
            wish: false,
            unwish: false,
            shopProducts: [],
            currentPage: 1,
            pageSize: 20,
            asPopular: false,
            asUsual: true,
            showFilter: false,
            mostPopular: false,
            hoveredProductId: null,
            wished: null,
        }
    },
    watch: {
        $route(to, from) {
            this.$nextTick(() => {
                this.allT = sessionStorage.getItem('allT') || '';
            });
        },
    },
    setup() {
        const filterButton = ref(window.innerWidth < 775);
        const smallWished = ref(window.innerWidth < 645);
        const updateShow = () => {
            filterButton.value = window.innerWidth < 775;
            smallWished.value = window.innerWidth < 645;
        };

        onMounted(() => {
            addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            addEventListener('resize', updateShow);
        });
        return {
            filterButton, smallWished
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.updateAllT(); // Update allT on route change
        next();
    },
    mounted() {
        this.$nextTick(() => {
            this.allT = sessionStorage.getItem('allT') || '';
        });
        this.fetchData();

    },
    computed: {
        ...mapGetters(['Get_Products', 'Get_Wishlist',]),
        totalPages() {
            return Math.ceil(this.shopProducts.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.Get_Products.slice(startIndex, endIndex);
        },

    },
    methods: {
        ...mapActions(['FetchProducts', 'FetchWishlist', 'AddItemToCart', 'AddToWishlist', 'RemoveWishItem']),
        initData() {
            this.shopProducts = this.Get_Products;
        },
        async fetchData() {
            try {
                await this.FetchProducts();
                await this.FetchWishlist();
                this.initData();
            }
            catch (err) {
                console.error('fetching shop products error : ', err);
            }
        },
        async addToCart(cartItem) {
            try {
                await this.AddItemToCart(cartItem);
                this.show = true;
                setTimeout(() => { this.show = false }, 1500);
            }
            catch (err) {
                console.error('Add to Cart : ', err);
            }
        },
        async addToWishlist(wishItem) {
            try {
                const exist = await this.AddToWishlist(wishItem);
                if (exist) {
                    this.unwish = true;
                    setTimeout(() => {
                        this.unwish = false;
                    }, 1500);
                    return;
                }
                this.wish = true;
                setTimeout(() => {
                    this.wish = false;
                }, 1500);
            }
            catch (err) {
                console.error('Add to Wishlist : ', err);
            }
        },
        isWished(product) {
            const existed = this.Get_Wishlist.find(v => v._id === product._id);
            if (existed) return true
            else return false
        },
        updateAllT() {
            this.allT = sessionStorage.getItem('allT') || '';
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
@import "@/assets/css/shop/shop-style.css";
</style>
