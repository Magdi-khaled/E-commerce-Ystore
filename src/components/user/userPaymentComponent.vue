<template>
    <div class="mb-36 sm:mb-28 mt-4">
        <div v-for="(item, index) in cards" :key="index" class="my-4 w-full bg-white rounded-md p-4">
            <div class="flex justify-between text-gray-600 relative">
                <h1 class="pb-2 text-md sm:text-xl font-medium capitalize ">
                    <i class="fa-regular fa-credit-card text-lg sm:text-2xl"></i> {{ item.type }}
                </h1>
                <button @click="dropOptions = !dropOptions">
                    <i class="fa-regular fa-ellipsis-stroke text-xl px-1 rounded-md hover:bg-gray-100 transition
                        duration-150"></i>
                </button>
                <div class="absolute"></div>
            </div>
            <hr class="w-11/12 m-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm sm:text-md">
                <div class="flex items-center capitalize">
                    <label :for="item.number" class="w-28 font-medium pr-2 whitespace-nowrap ">card number
                    </label>
                    <input type="text" :id="item.number" v-model="item.number" disabled
                        class="px-2 py-1 border-2 rounded-md font-medium tracking-wide w-full sm:w-6/12 text-sm sm:text-md">
                </div>
                <div class="flex items-center capitalize">
                    <label :for="item.author" class="w-28 font-medium pr-2 whitespace-nowrap ">Author
                    </label>
                    <input type="text" :id="item.author" v-model="item.author" disabled
                        class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 uppercase text-sm sm:text-md">
                </div>
                <div class="flex items-center capitalize">
                    <label :for="item.bank" class="w-28 font-medium pr-2 whitespace-nowrap capitalize ">bank name
                    </label>
                    <input type="text" :id="item.bank" v-model="item.bank" disabled
                        class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 uppercase text-sm sm:text-md">
                </div>
                <div class="flex items-center capitalize">
                    <label :for="item.cvv" class="w-28 font-medium pr-2 whitespace-nowrap uppercase ">cvv </label>
                    <input type="text" :id="item.cvv" v-model="item.cvv" disabled
                        class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 text-sm sm:text-md">
                </div>
                <div class="flex items-center capitalize">
                    <label :for="item.expiry" class="w-28 font-medium pr-2 whitespace-nowrap ">expiry date
                    </label>
                    <input type="text" :id="item.expiry" v-model="item.expiry" disabled
                        class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 text-sm sm:text-md">
                </div>
                <!-- <div class="capitalize w-full text-end">
                    <baseButton class="px-4 rounded-md" :style="{ padding: '10px 30px' }">edit card details</baseButton>
                </div> -->
            </div>

        </div>
    </div>
</template>
<script>
import baseButton from '../baseButton.vue'
export default {
    name: 'userPaymentComponent',
    props: ['cards'],
    components: { baseButton },
    data() {
        return {
            dropOptions: false
        }
    },
    methods: {}
}
</script>
<style scoped></style>