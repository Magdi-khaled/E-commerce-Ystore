<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    productQuantity: { type: Number, required: true },
    quantity: { type: Number, required: true },
    outStock: { type: Boolean, required: true }
});

const emit = defineEmits(['update:quantity', 'update:outStock']);

const localQuantity = ref(props.quantity);

watch(localQuantity, (newQuantity) => {
    emit('update:quantity', newQuantity);
    emit('update:outStock', newQuantity >= props.productQuantity);
});

const handleQuantity = (increase) => {
    if (increase) {
        if (localQuantity.value >= props.productQuantity) return;
        localQuantity.value++;
    } else {
        if (localQuantity.value > 1) localQuantity.value--;
    }
};
</script>

<template>
    <div class="pagination font-medium grid grid-cols-3 text-lg border-2 border-black w-[30%] sm:w-[24%]"
        @click.prevent>
        <div class="bg-gray-900 text-white flex items-center justify-center">
            <button @click="handleQuantity(false)">
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <div class="bg-white flex items-center justify-center">
            <p class="px-3 text-lg">{{ localQuantity }}</p>
        </div>
        <div class="bg-gray-900 text-white flex items-center justify-center">
            <button @click="handleQuantity(true)">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    </div>
</template>
