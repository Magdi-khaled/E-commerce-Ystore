<template>
    <hr>
    <div class="w-full h-fit">
        <ADNavigation />
        <section class="bg-gray-100 flex">
            <div class="w-full flex flex-wrap justify-between p-2 sm:p-6">
                <div class="w-full flex flex-row sm:flex-row-reverse flex-wrap justify-between items-center">
                    <div class="w-full sm:w-fit mt-2 sm:mt-0 flex justify-end">
                        <BaseButton
                            class="text text-sm sm:text-md rounded px-4 sm:px-6 py-[8px] sm:py-[10px] whitespace-nowrap justify-end"
                            @click="this.$router.push({ name: 'AD-Dashboard' })">
                            back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                        </BaseButton>
                    </div>
                    <h1 class="capitalize font-semibold text-lg sm:text-xl">
                        <i class="fa-sharp fa-regular fa-cart-flatbed-boxes pr-2"></i> your inventory <span
                            class="text-gray-600 text-xs">({{ inventory.length }} products)</span>
                    </h1>
                </div>
                <hr>
                <!-- Inventory Products -->
                <div class="pl-0 sm:pl-2 lg:pl-4 h-fit w-full" :class="{ 'h-screen': paginatedItems.length <= 6 }">
                    <div class="mt-6 flex flex-wrap gap-y-4 gap-x-2 justify-between sm:justify-start">
                        <div v-for="(product, index) in paginatedItems" :key="product._id"
                            class="relative w-[48%] sm:w-[32%] md:w-[24%] lg:w-[16%]">
                            <div class="absolute top-[2%] right-[5%] text-gray-700 hover:text-gray-900">
                                <button @click="showOptions[product._id] = !showOptions[product._id]"
                                    class="  rounded transition duration-200">
                                    <i class="fa-regular fa-sliders "></i>
                                </button>
                            </div>
                            <div v-if="showOptions[product._id]"
                                class="absolute top-[10%] right-[4%] bg-white rounded border-2 border-gray-400 text-gray-800 ">
                                <ul class="capitalize text-sm">
                                    <router-link :to="{ name: 'Product', params: { id: product._id } }">
                                        <li class="hover:bg-gray-200 p-[3px]">
                                            view
                                        </li>
                                    </router-link>
                                    <hr>
                                    <router-link :to="{ name: 'Edit-Product', params: { id: product._id } }">
                                        <li class="hover:bg-gray-200 p-[3px]">
                                            edit
                                        </li>
                                    </router-link>
                                    <hr>
                                    <button @click="modalActive = !modalActive" @close-modal="modalActive = false">
                                        <li class="hover:bg-gray-200 p-[3px] capitalize">
                                            delete
                                        </li>
                                    </button>
                                </ul>
                            </div>
                            <BaseModal :modalActive="modalActive" class="">
                                <p class="p-2 text-xl w-full font-semibold">You are sure about deleting this product?
                                </p>
                                <div class="flex justify-end items-end gap-2 h-[5em] ">
                                    <BaseButton class="py-[4px] w-4/12 h-fit " @click="deleteProduct(product._id)">
                                        Confirm
                                    </BaseButton>
                                    <BaseButton class="py-[4px] w-4/12 h-fit" @click="modalActive = !modalActive"> No
                                    </BaseButton>
                                </div>
                            </BaseModal>
                            <router-link :to="infoRoute(product._id)" class="product">
                                <ProductComponent :product="product" />
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-if="inventory.length !== pageSize" class="w-full">
                    <Pagination class="" :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage"
                        :prevPage="prevPage" @page-changed="changePage" />
                </div>
            </div>
        </section>
    </div>
    <InFooter />
</template>

<script>
import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import BaseModal from '../../../../../components/BaseModal.vue';
import ProductComponent from '../../../../../components/ProductComponent.vue';
import InFooter from '../../../../../components/InFooter.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { ADNavigation, BaseButton, BaseModal, ProductComponent, InFooter },
    data() {
        return {
            inventory: [],
            currentPage: 1,
            pageSize: 18,
            modalActive: false,
            showFilter: false,
            showOptions: {},
        };
    },
    setup() {
        const medium = ref(window.innerWidth < 1080);
        const updateShow = () => {
            medium.value = window.innerWidth < 1080;
        };
        onMounted(() => {
            window.addEventListener('resize', updateShow);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateShow);
        });
        return { medium };
    },
    created() {
        this.fetchData();
    },
    computed: {
        ...mapGetters(['Get_Inventory']),
        totalPages() {
            return Math.ceil(this.inventory.length / this.pageSize);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.Get_Inventory.slice(startIndex, endIndex);
        },
    },
    methods: {
        ...mapActions(['FetchInventory']),
        initData() {
            this.inventory = this.Get_Inventory;
            this.inventory.forEach(v => { this.showOptions[v._id] = false; });
            console.log(this.showOptions);
        },
        async fetchData() {
            try {
                await this.FetchInventory();
                this.initData();
            }
            catch (err) {
                console.error('fetching shop products error : ', err);
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
    },
    mounted() { }
};
</script>

<style scoped>
.toggle-small-side {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-100%);
    transition: transform 0.5s ease, opacity 0.5s ease, visibility 0.5s;
}

.toggle-small-side-active {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
}

.nav-links-hidden {
    display: none;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.5s ease-in-out;
}

.nav-links-hidden.active {
    display: block;
    transform: translateX(0);
    opacity: 1;
}
</style>