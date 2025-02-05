<template>
    <div>
        <div class="flex justify-between text-gray-600 relative">
            <h1 class="pb-2 text-md sm:text-xl font-medium capitalize ">
                <i class="fa-regular fa-credit-card text-lg sm:text-2xl"></i> {{ card.type }}
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
                <label :for="card.number" class="w-28 font-medium pr-2 whitespace-nowrap ">card number
                </label>
                <input type="text" :id="card.number" v-model="card.number" disabled
                    class="px-2 py-1 border-2 rounded-md font-medium tracking-wide w-full sm:w-6/12 text-sm sm:text-md">
            </div>
            <div class="flex items-center capitalize">
                <label :for="card.author" class="w-28 font-medium pr-2 whitespace-nowrap ">Author
                </label>
                <input type="text" :id="card.author" v-model="card.author" disabled
                    class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 uppercase text-sm sm:text-md">
            </div>
            <div class="flex items-center capitalize">
                <label :for="card.bank" class="w-28 font-medium pr-2 whitespace-nowrap capitalize ">bank name
                </label>
                <input type="text" :id="card.bank" v-model="card.bank" disabled
                    class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 uppercase text-sm sm:text-md">
            </div>
            <div class="flex items-center capitalize">
                <label :for="card.cvv" class="w-28 font-medium pr-2 whitespace-nowrap uppercase ">cvv </label>
                <input type="text" :id="card.cvv" v-model="card.cvv" disabled
                    class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 text-sm sm:text-md">
            </div>
            <div class="flex items-center capitalize">
                <label :for="card.expiry" class="w-28 font-medium pr-2 whitespace-nowrap ">expiry date
                </label>
                <input type="text" :id="card.expiry" v-model="card.expiry" disabled
                    class="px-2 py-1 border-2 rounded-md font-medium w-full sm:w-6/12 text-sm sm:text-md">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PaymentCard',
    props: ['card'],
    data() {
        return {
            dropOptions: false
        }
    },
}
</script>