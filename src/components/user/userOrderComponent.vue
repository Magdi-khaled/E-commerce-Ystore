<template>
    <div class="mb-36 sm:mb-44">
        <div v-for="(item, index) in orders" :key="index"
            class="bg-white h-fit p-4 border-2 rounded-md hover:border-gray-600 transition duration-300 cursor-pointer mt-4 ">
            <router-link :to="`#${item.orderId}`" class="w-full h-full my-6 rounded-md">
                <h1 class="text-sm sm:text-lg font-bold text-gray-700">
                    <span v-if="type == 'order'" class="text-green-600 text-lg font-bold text-lg">
                        Delivered</span>
                    <span v-else class="text-red-600 text-lg font-bold text-lg">
                        Returned</span>
                    on Monday, 16th Sep, 02:08 PM
                </h1>
                <div class="w-full my-4 flex">
                    <div class="w-36">
                        <img class="w-full border-2 border-gray-400"
                            src="../../../../../public/assets/new-arrivals/na-img-1.png" alt="">
                    </div>
                    <div class="pl-4">
                        <h1 class="text-gray-900 text-md sm:text-xl font-bold whitespace-nowrap">
                            Title : {{ item.title }}
                        </h1>
                        <hr>
                        <p class="text-sm sm:text-lg mt-4 font-medium  text-gray-600">
                            {{ item.message }}
                        </p>
                    </div>
                </div>
                <div>
                </div>
                <div class="w-full text-end">
                    <p class="text-gray-600 text-sm w-full font-bold whitespace-nowrap">
                        Order ID : {{ item.orderId }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'userOrderComponent',
    props: ['orders', 'type'],

}
</script>
<style scoped></style>