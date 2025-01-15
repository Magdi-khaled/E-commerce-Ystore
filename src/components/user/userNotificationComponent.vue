<template>
    <div class="w-full h-fit rounded-md bg-white mb-60 mt-8 " :class="{ 'mb-[6rem] ': (notifications.length > 1) }">
        <div class="px-4 pt-2 w-full flex justify-between ">
            <h1 class="font-bold capitalize text-md sm:text-xl text-gray-500">notifications history</h1>
            <button class="hover:bg-gray-200 transition duration-150 p-1 rounded-lg">
                <i class="fa-solid fa-ellipsis-stroke text-md sm:text-xl"></i>
            </button>
        </div>
        <hr>
        <div v-for="(item, index) in notifications" :key="index" class="">
            <router-link :to="`#${index + 1}`" class="w-full flex justify-between sm:justify-start border-2 border-white 
                hover:border-gray-400 transition duration-300 p-3 sm:p-4">
                <div class="w-[25%] sm:w-[20%] h-24 sm:h-32">
                    <img class="h-full w-[100%] border-2 border-gray-400 rounded-md"
                        src="../../../../../public/assets/new-arrivals/na-img-1.png" alt="">
                </div>
                <div class="pl-2 sm:pl-4 w-9/12 h-24 overflow-hidden sm:w-full">
                    <div class="w-full flex justify-between items-center whitespace-nowrap">
                        <h1 class="text-sm sm:text-lg text-gray-700 font-medium">{{ item.title }}</h1>
                        <span class="text-gray-500 text-xs ">
                            {{ `${item.date.getDay()} / ${item.date.getMonth()} / ${item.date.getFullYear()}` }}
                        </span>
                    </div>
                    <hr class="w-3/12 my-1">
                    <p class="text-xs sm:text-sm tracking-wide text-gray-600 py-1 leading-4">
                        {{ item.message }}
                        <span class="text-gray-600">...</span>
                    </p>
                </div>
            </router-link>
            <hr>
        </div>
    </div>
</template>
<script>
export default {
    name: 'userNotificationComponent',
    props: ['notifications']
}
</script>
<style scoped></style>