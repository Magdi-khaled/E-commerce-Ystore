<template>
    <div class="w-full border-r-2 border-r-gray-300 bg-white h-full">
        <div class="flex flex-wrap mb-2">
            <div class="w-6/12 m-auto opacity-[0.8]" :class="{ 'w-full flex justify-between px-4': medium }">
                <!-- <img class="w-4/12 lg:w-full" src="../../../../../assets/images/logo/shop-co-logo2.jpg"
                    alt="shop.co"> -->
                <button v-if="medium" @click="this.$emit('toggleSide', false)">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>
            <div class="w-full px-2 text-center text-gray-700 mt-4">
                <div class="w-full pb-2">
                    <i class="fa-solid fa-shop text-4xl border-2 border-gray-600 rounded-md p-2"></i>
                </div>
                <span class="text-md capitalize font-semibold">{{ shopName }}</span>
            </div>
        </div>
        <ul lass="list-none w-full lg:W-8/12">
            <!-- <li class=" py-3">
                <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 font-medium capitalize text-black hover:text-gray-600">
                    <i class="fa-sharp fa-regular fa-house p-1 mr-2"></i>
                    home
                </router-link>
            </li>
            <hr> -->
            <li class=" py-3">
                <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 font-medium capitalize text-black hover:text-gray-600">
                    <i class="fa-sharp fa-solid fa-chart-line p-1 mr-2"></i>
                    Dashboard
                </router-link>
            </li>
            <hr>
            <li class="w-full relative text-start">
                <!-- <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 w-full font-medium capitalize text-black hover:text-gray-600"> -->
                <button @click="servShow = !servShow"
                    class="p-2 py-3 font-medium capitalize text-black hover:text-gray-700">
                    <i class="fa-regular fa-box-open-full p-1 mr-1"></i>
                    services
                    <i v-if="!servShow" class="fa-solid fa-angle-right text-gray-600 absolute top-[35%] right-[8%]"></i>
                    <i v-else class="fa-solid fa-angle-down text-gray-600 absolute top-[35%] right-[8%]"></i>
                </button>
                <!-- </router-link> -->
            </li>
            <div v-if="servShow" class="pl-4 w-full">
                <li class="border-l-[1px] border-b-2 border-l-gray-300 py-2">
                    <router-link :to="{ name: 'shop.co-home' }"
                        class="p-3 font-medium capitalize text-black hover:text-gray-600">
                        <i class="fa-thin fa-basket-shopping-plus font-bold text-sm pr-1"></i> add product
                    </router-link>
                </li>
                <li class="border-l-[1px] border-b-2 border-l-gray-300 py-2">
                    <router-link :to="{ name: 'shop.co-home' }"
                        class="p-3 font-medium capitalize text-black hover:text-gray-600">
                        <i class="fa-sharp fa-light fa-pen text-sm pr-1"></i> update product
                    </router-link>
                </li>
                <li class="border-l-[1px] border-l-gray-300 py-2">
                    <router-link :to="{ name: 'shop.co-home' }"
                        class="p-3 font-medium capitalize text-black hover:text-gray-600">
                        <i class="fa-regular fa-trash text-sm pr-1"></i> delete product
                    </router-link>
                </li>
            </div>
            <hr>
            <li class=" py-3">
                <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 font-medium capitalize text-black hover:text-gray-600">
                    <i class="fa-sharp fa-regular fa-store p-1 mr-2"></i>
                    store
                </router-link>
            </li>
            <hr>
            <li class=" py-3">
                <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 font-medium capitalize text-black hover:text-gray-600">
                    <i class="fa-light fa-envelope p-1 mr-2"></i>
                    inbox
                </router-link>
            </li>
            <hr>
            <li class=" py-3">
                <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 font-medium capitalize text-black hover:text-gray-600">
                    <i class="fa-regular fa-megaphone p-1 mr-2"></i>
                    ads manager
                </router-link>
            </li>
            <hr>
            <li class=" py-3">
                <router-link :to="{ name: 'shop.co-home' }"
                    class="p-2 font-medium capitalize text-black hover:text-gray-600">
                    <i class="fa-sharp fa-light fa-square-question  rounded-md border-black p-1 mr-2"></i>
                    FAQ
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'adminSidebarComponent',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        medium: {
            type: Boolean,
            default: false
        },
        shopName: {
            type: String,
            default: 'shop.co'
        }
    },
    data() {
        return {
            servShow: false,
        }
    },
    computed: {

    },
    methods: {
    },
}
</script>
<style scoped></style>