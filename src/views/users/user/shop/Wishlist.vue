<template>
    <UserNavbar />
    <BaseTeleport :show="unwish" :type="'message'">
        <i class="fa-regular fa-heart-crack"></i> Product removed from Wishlist
    </BaseTeleport>
    <div class="px-2 sm:px-6 lg:px-12 bg-gray-100">
        <div v-if="!wishlist?.length" class="w-full h-screen flex flex-col items-center justify-center">
            <div class="grayscale w-7/12 sm:w-4/12">
                <img class="m-auto" src="../../../../assets/images/user/customer/orders.svg" alt="">
            </div>
            <div class="text-center mt-4 w-8/12 sm:w-4/12">
                <h1 class="font-bold text-lg text-gray-700 ">Your Wishlist is Empty</h1>
                <p class="font-medium text-gray-400 text-sm sm:text-md">
                    We couldn't find any items in your mind....</p>
                <router-link :to="{ name: 'Shop' }" class="w-full">
                    <BaseButton class="w-11/12 mt-4 text-sm sm:text-md">
                        go shopping now
                        <i class="fa-solid fa-up-right-from-square pl-2"></i>
                    </BaseButton>
                </router-link>
            </div>
        </div>
        <div v-else class="py-8">
            <h1 class="capitalize font-semibold text-xl sm:text-2xl mb-2">
                <i class="fa-solid fa-heart border-2 border-gray-500 rounded-full p-1 mr-2"></i>your wishlist
            </h1>
            <hr class="my-3 border-b-2 border-b-gray-400">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-[7em]">
                <div v-for="(item, index) in wishlist" class="relative">
                    <router-link :to="{ name: 'Product', params: { id: item._id } }">
                        <ProductComponent :product="item" />
                    </router-link>
                    <!-- small screen -->
                    <transition name="fade">
                        <button v-if="smallWished" @mouseover="wished = item._id" @mouseleave="wished = null"
                            @click="addToWishlist(item)"
                            class="absolute z-10 font-extrabold text-md sm:text-2xl top-2 right-2 opacity-[1] flex flex-col transition-all duration-150"
                            title="Add To Wishlist">
                            <i class="text-gray-900" :class="{
                                'fa-regular fa-heart': wished !== item._id,
                                'fa-solid fa-heart': wished === item._id
                            }"></i>
                        </button>
                    </transition>
                    <!-- x-large screen -->
                    <transition name="fade">
                        <button v-if="(hovereditemId === item._id && !smallWished) || isWished(item)"
                            @mouseover="wished = item._id" @mouseleave="wished = null" @click="addToWishlist(item)"
                            class="absolute z-10 font-extrabold text-sm sm:text-[15px] p-[2px]
                                    opacity-[1] border border-black rounded-full top-2 right-[3%] flex flex-col transition-all duration-150"
                            title="Add To Wishlist">
                            <i class="text-gray-900" :class="{
                                'fa-regular fa-heart': wished !== item._id && !isWished(item),
                                'fa-solid fa-heart': wished === item._id || isWished(item)
                            }"></i>
                        </button>
                    </transition>
                    <transition name="fade">
                        <button @click="addToCart(item)" class="absolute z-10 font-extrabold 
                                text-md sm:text-xl bottom-[77%] sm:bottom-4 right-[4%] sm:right-0  opacity-[1] flex flex-col
                                transition-all duration-150" title="Add To Cart">
                            <i class="fa-solid fa-cart-plus text-gray-900 hover:text-gray-500"></i>
                        </button>
                    </transition>
                </div>
            </div>

            <div v-if="wishlist.length > pageSize" class="w-full">
                <Pagination class="" :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage"
                    :prevPage="prevPage" @page-changed="changePage" />
            </div>
        </div>
    </div>
    <IFoorer />
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { inject } from 'vue';
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import ProductComponent from '../../../../components/shop/ProductComponent.vue';
import BaseButton from '../../../../components/BaseButton.vue';
import BaseTeleport from '../../../../components/BaseTeleport.vue';
import IFoorer from '../../../../components/InFooter.vue';


export default {
    components: { UserNavbar, BaseButton, BaseTeleport, ProductComponent, IFoorer },
    data() {
        return {
            user: localStorage.getItem('user'),
            pageSize: 15,
            hoveredProductId: null,
            unwish: false
        }
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        ...mapGetters(['Get_Wishlist']),
        wishlist() {
            return this.Get_Wishlist;
        }
    },
    methods: {
        ...mapActions(['FetchWishlist', 'AddItemToCart', 'AddToWishlist', 'RemoveWishItem']),
        async fetchData() {
            try {
                await this.FetchWishlist();
            } catch (error) {
                console.error('Fetch Wishlist Error:', error);
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
    },

}
</script>
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