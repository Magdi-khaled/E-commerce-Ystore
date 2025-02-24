<template>
    <button v-show="!checkout" @click="removeCartItem(item._id)" class="absolute right-[4%] top-[10%]"
        title="remove-item">
        <i class="fa-solid fa-trash-can text-red-600 hover:text-red-400 cursor-pointer"></i>
    </button>
    <div class="w-3/12 m-3">
        <router-link :to="{ name: 'Product', params: { id: item._id } }">
            <img class="rounded" :src="item.src" alt="cart-product">
        </router-link>
    </div>
    <div class="w-8/12 h-[120px] flex flex-col justify-between">
        <div class="w-10/12 h-8/12">
            <h1 class="font-bold text-sm sm:text-md capitalize overflow-hidden text-ellipsis max-h-[22px]">
                {{ item.title }}
            </h1>
            <p class="font-medium text-sm sm:text-mdtext-md capitalize">
                size: <span class="text-gray-500">{{ item.providedSizes[1] }}</span>
            </p>
            <p class="font-medium text-sm sm:text-mdtext-md capitalize">
                color: <span class="text-gray-500">{{ item.providedColors[1].color }}</span>
            </p>
            <p v-show="checkout" class="font-medium text-sm sm:text-mdtext-md capitalize">
                quantity: <span class="text-gray-500">{{ item.orderQuantity }}</span>
            </p>
        </div>
        <div class="h-4/12 flex items-center justify-between">
            <p class="font-bold text-sm sm:text-md"><span class="text-xs text-gray-700">
                    EGP</span>{{ handlePrice(item.price, item.sale) }}
                <span v-if="item.sale" class="text-green-600"> -{{ item.sale }}% off</span>
            </p>
            <div v-show="!checkout" class="pagination font-medium grid grid-cols-3 text-lg
                                        border-2 border-black w-[30%] sm:w-[24%]">
                <div class="bg-gray-900 text-white flex items-center justify-center">
                    <button @click="handleQuantity(false, item)">
                        <i class="fa-solid fa-minus text-sm sm:text-md"></i></button>
                </div>
                <div class="text-black bg-white flex items-center justify-center">
                    <p class="px-3 text-sm sm:text-md">{{ item.orderQuantity }}</p>
                </div>
                <div class="bg-gray-900 text-white flex items-center justify-center">
                    <button @click="handleQuantity(true, item)"><i
                            class="fa-solid fa-plus text-sm sm:text-md"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { inject } from 'vue';
import { mapActions } from 'vuex';
export default {
    name: 'CartCardComponent',
    props: {
        item: { type: Object, required: true },
        checkout: { type: Boolean, default: false }
    },
    data() {
        return {
            outStock: false,
        }
    },
    methods: {
        ...mapActions(['RemoveCartItem']),
        async removeCartItem(id) {
            try {
                await this.RemoveCartItem(id);
                this.show = true;
                setTimeout(() => { this.show = false }, 1500);
            }
            catch (error) {
                console.error('Remove Item Error: ', error);
            }
        },
    },
    setup() {
        const handlePrice = inject('handlePrice');
        const handleQuantity = inject('handleQuantity');
        return { handlePrice, handleQuantity }
    },
}
</script>
<style scoped>
img {
    width: 8rem;
    height: 8rem;
}

@media (max-width:419px) {
    img {
        height: 7rem;
    }
}
</style>