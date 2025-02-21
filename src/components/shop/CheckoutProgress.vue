<template>
    <div
        class="w-8/12 mx-8 sm:mx-36 h-2 text-sm sm:text-md font-medium capitalize bg-gray-300 grid grid-cols-4 relative">
        <div class="bg-black h-2 w-0 absolute top-0 left-[2%] z-10"
            :class="{ 'w-[50%]': progress === 50, 'w-[100%]': progress === 100 }">
        </div>
        <!-- labels -->
        <div class="flex flex-col absolute top-[-100%] left-[-1%] z-20">
            <span
                class="w-6 h-6 text-sm text-center bg-black border-[3px] border-white rounded-full text-white">1</span>
            <p class="mt-2 text-center">delivery</p>
        </div>
        <div class="flex flex-col absolute top-[-100%] left-[50%] z-20">
            <span class="w-6 h-6 text-sm text-center border-[3px] border-white rounded-full"
                :class="{ 'bg-black text-white': progress >= 50, 'bg-gray-300 text-black': progress < 50 }">2</span>
            <p class="mt-2 text-center">application</p>
        </div>
        <div class="flex flex-col absolute top-[-100%] left-[100%] z-20">
            <span class="w-6 h-6 text-sm text-center border-[3px] border-white rounded-full"
                :class="{ 'bg-black text-white': progress >= 100, 'bg-gray-300 text-black': progress < 100 }">3</span>
            <p class="mt-2 text-center">confirmation</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CheckoutProgress',
    props: {
        progress: {
            type: Number,
            required: true
        }
    }
}
</script>
<style scoped>
div {
    transition: all 0.5s linear;
}
</style>