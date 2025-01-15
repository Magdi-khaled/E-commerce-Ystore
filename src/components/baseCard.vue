<template>
    <div class="p-4 border-2 border-solid rounded-md">

        <div class="">
            <div class="card-author flex py-2 items-center gap-2">
                <img class="w-8" src="../assets/images/user/customer/user.webp" alt="">
                <p class="capitalize font-medium text-gray-700">nour selim</p>
            </div>
            <div class="card-rate flex items-center gap-[1px]">
                <i v-for="i in 3" class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                <i class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                <i class="ffa-sharp fa-regular fa-star text-[#db9454]"></i>
                <p class="font-bold pl-2">تحفة</p>
            </div>
        </div>
        <div class="card-content h-auto h-max-24 my-2">
            <p class="overflow-hidden text-ellipsis text-sm md:text-md">
                الجاكيت تحفة فعلًا! اختيار موفق جدًا ومميز</p>
        </div>
        <div>
            <p class="font-medium text-sm text-gray-600">commented on <span class="text-gray-800">augest 15, 2024</span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'baseCard',
    props: ['review']
}
</script>
<style scoped></style>