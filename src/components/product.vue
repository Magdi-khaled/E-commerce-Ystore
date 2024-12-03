<template>
    <img :src="product.src" alt="product"
        class="transition duration-500 ease-in-out rounded-2xl  shadow-md shadow-gray-300">
    
    <div>
        <p class="product-title">{{ product.title }}</p>
        <div class="product-rate">
            <div class="stars-rate flex items-center">
                <div v-for="item in Math.floor(product.rate)">
                    <i class="fa-solid fa-star text-[#FFD43B]"></i>
                </div>
                <i v-if="isHalf(product.rate)" class="fa-duotone fa-solid fa-star-half"
                    style="--fa-primary-color: #FFD43B; --fa-secondary-color: #cdcdcd"></i>
                <div v-for="item in clacStars(product.rate)">
                    <i class="fa-duotone fa-solid fa-star empty-star"></i>
                </div>
                <p class="pl-1 font-semibold">
                    {{ product.rate }}<span class="text-gray-400">/5</span>
                </p>
            </div>
            <!-- product-price -->
            <div class="product-price text-md sm:text-xl">
                <p>${{ calcSale(product.price, product.sale) }}</p>
                <div v-if="product.sale != 0.0" class="product-price-discount">
                    <div class="flex relative">
                        <p class="text-gray-400 ">
                            ${{ product.price }}</p>
                        <span class="w-full border-2 border-gray-500 rounded-full absolute left-0 top-3"></span>
                    </div>
                    <span class="sale">-{{ product.sale * 100 }}%</span>
                </div>
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
        }
    }
}
</script>

<style scoped>
img {
    width: 100%;
}

.product-title {
    text-transform: capitalize;
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 5px;
}

.empty-star {
    color: rgb(186, 186, 186);
}

.fa-star,
.fa-star-half {
    padding: 2px;
}

.product-price {
    display: flex;
    gap: 10px;
}

.product-price p:not(.product-price-discount) {
    font-weight: bold;
}

.product-price .product-price-discount {
    display: flex;
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

@media (max-width:656px) {
    .product-price p:not(.product-price-discount) {
        font-weight: bold;
        font-size: 100%;
    }


}
</style>