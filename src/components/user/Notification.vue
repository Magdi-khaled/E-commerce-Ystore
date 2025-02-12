<template>
    <div>
        <router-link :to="`#`" class="w-full flex justify-between sm:justify-start border-2 border-white 
        hover:border-gray-400 transition duration-300 p-3 sm:p-4">
            <div class="w-[25%] sm:w-[20%] h-24 sm:h-32">
                <img class="h-full w-[100%] border-2 border-gray-400 rounded-md" src="/assets/shop/product18.webp"
                    alt="">
            </div>
            <div class="pl-2 sm:pl-4 w-9/12 h-24 overflow-hidden sm:w-full">
                <div class="w-full flex justify-between notifications-center whitespace-nowrap">
                    <h1 class="text-sm sm:text-lg text-gray-700 font-medium">{{ notification.title }}</h1>
                    <span class="text-gray-500 text-xs ">
                        {{ `${notification.date.getDay()} / ${notification.date.getMonth()} /
                        ${notification.date.getFullYear()}` }}
                    </span>
                </div>
                <hr class="w-3/12 my-1">
                <p class="text-xs sm:text-sm tracking-wide text-gray-600 py-1 leading-4">
                    {{ notification.message }}
                    <span class="text-gray-600">...</span>
                </p>
            </div>
        </router-link>
        <hr>
    </div>
</template>
<script>
export default {
    name: 'Notification',
    props: {
        notification: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped></style>