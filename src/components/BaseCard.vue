<template>
    <div class="p-4 border-2 border-solid rounded-md">

        <div class="">
            <div class="card-author flex pt-2 items-center gap-2">
                <img class="w-8" src="../assets/images/user/customer/user.webp" alt="">
                <p class="capitalize font-medium text-gray-700">{{ card.name }}</p>
                <!-- <p class="capitalize font-medium text-gray-700">{{ card.name | 'nour selim' }}</p> -->
            </div>
            <div class="stars-rate my-1 flex items-center gap-1">
                <div v-for="item in Math.floor(card.rating)">
                    <i class="fa-sharp fa-solid fa-star text-[#db9454]"></i>
                </div>
                <i v-if="isHalf(card.rating)" class="ffa-sharp fa-regular fa-star-half-stroke text-[#db9454]"></i>
                <div v-for="item in clacStars(card.rating)">
                    <i class="fa-sharp fa-regular fa-star empty-star text-[#db9454]"></i>
                </div>
                <p class="pl-1 font-semibold">
                    {{ card.rating }}<span class="text-gray-400">/5</span>
                </p>
            </div>
            <h1 class="font-bold">{{ card.title }}</h1>
        </div>
        <div class="card-content my-2">
            <p class="overflow-hidden h-6 text-ellipsis text-sm md:text-md">
                {{ card.feedback }}</p>
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
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    methods: {

        isHalf(rate) {
            var b = +Math.trunc(rate);
            return rate != b;
        },
        clacStars(rate) {
            return 5 - Math.ceil(rate);
        },
    }
}
</script>
<style scoped></style>