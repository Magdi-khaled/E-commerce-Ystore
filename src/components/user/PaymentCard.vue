<script setup>
import Field from '@/components/form/Field.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';
defineProps({ card: Object });
const dropOptions = ref(false);
const save = () => {
    console.log('Card Updated Successfully');
}
</script>

<template>
    <div>
        <div class="flex justify-between relative">
            <h1 class="pb-2 text-md sm:text-xl font-medium capitalize ">
                <i class="fa-regular fa-credit-card text-lg sm:text-2xl"></i> {{ card.type }}
            </h1>
            <div class="flex items-center gap-4">
                <button @click="dropOptions = !dropOptions">
                    <i class="fa-solid fa-trash px-1 rounded-md text-red-700 hover:text-red-400 transition
                    duration-150"></i>
                </button>
                <button @click="dropOptions = !dropOptions">
                    <i class="fa-solid fa-pen px-1 rounded-md text-black hover:text-gray-600 transition
                    duration-150"></i>
                </button>
            </div>
        </div>
        <hr class="w-11/12 m-auto">
        <form @submit.prevent="save" class="grid grid-cols-1 sm:grid-cols-2 items-end gap-4 mt-4 text-sm sm:text-md">

            <Field label="card number" name="cardNumber" placeholder="5482 1234 5678 9999" v-model="card.number" />

            <Field label="author" name="author" placeholder="Jhon Doe" v-model="card.author" />

            <Field label="CVV" name="cvv" placeholder="123" v-model="card.cvv" />

            <Field label="expiry date" name="expiry" placeholder="mm/yy" v-model="card.expiry" />

            <Field label="bank name" name="bankname" placeholder="Bank Misr" v-model="card.bank" />
            <div class="w-full text-end">
                <BaseButton @click="save" class="w-6/12">save</BaseButton>
            </div>
        </form>
    </div>
</template>