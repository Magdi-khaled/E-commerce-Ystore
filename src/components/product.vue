<template>
    <div class="h-48 sm:h-52 md:h-56 transition duration-300">
        <img :src="product.src" alt="product" loading="lazy"
            class="h-[100%] rounded-[20px] border-[0.1px] border-gray-400">
        <!-- class="h-[100%] rounded-lg border-[1.5px] border-gray-200 shadow-sm"> -->
    </div>

    <div class="detail px-2 py-2 flex flex-col justify-between">
        <p class="product-title font-medium text-sm sm:text-md h-5 tracking-tight">{{ product.title }}</p>
        <!-- product-price -->
        <div
            class="product-price text-sm sm:text-md font-sans flex pt-1 gap-1 sm:gap-2 tracking-normal whitespace-nowrap">
            <p class="font-medium">
                <span class="text-xs text-gray-700">EGP </span>
                {{ calcSale(product.price, product.sale) }}
            </p>

            <div v-if="product.sale != 0.0" class="flex items-center">
                <div class="relative flex items-center whitespace-nowrap font-medium">
                    <p class="text-gray-500"> {{ product.price }} </p>
                    <span class="w-full h-[1px] sm:h-[1.8px] bg-gray-700 absolute top-[50%]"></span>
                </div>
                <span class="text-xs font-sans font-semibold text-green-600 pl-2 whitespace-nowrap">
                    {{ product.sale * 100 }}% OFF
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['product'],
    computed: {},
    methods: {
        calcSale(price, sale) {
            return (price * (1 - sale)).toFixed(0);
        },
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

<style scoped>
img {
    width: 100%;
}

.product-title {
    text-transform: capitalize;
}

.empty-star {
    color: rgb(186, 186, 186);
}

.fa-star,
.fa-star-half {
    padding: 2px;
}

p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.product-price .product-price-discount .sale {
    display: flex;
    align-items: center;
    color: #FF3333;
    font-weight: bold;
    font-size: x-small;
    background-color: rgba(255, 0, 0, 0.148);
    padding: 0px 2px;
    margin-left: 10px;
    border-radius: 35px;
}
</style>