<script setup>
import BaseButton from '@/components/BaseButton.vue';
import Field from '@/components/form/Field.vue';
import { ref } from 'vue';

defineProps(['user']);
const disabled = ref(true);

const showButton = () => { disabled.value = false; };
const save = async () => {
    try {
        disabled.value = true
    } catch (error) {
        console.error(error);
    }
}
</script>
<template>
    <div class="w-full h-fit bg-white mb-12 p-6 sm:p-10">
        <h1 class="font-bold text-xl"> Profile Info</h1>
        <div class="">
            <form @submit.prevent="onSubmit" class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
                <Field label="email" name="email" v-model="user.email" :hide="true" />
                <Field label="first name" name="fname" v-model="user.fname" :hide="true" />
                <Field label="last name" name="lname" v-model="user.lname" :hide="true" />
                <Field label="birthday" name="birthdate" v-model="user.birthdate" :hide="true" />
                <Field label="gender" name="gender" v-model="user.gender" :hide="true" />
                <Field label="nationality" name="nationality" v-model="user.nationality" :hide="true" />
                <Field label="address" name="address" v-model="user.address" :handleChange="showButton()" />
                <Field label="phone number" name="phone" v-model="user.phone" :handleChange="showButton()" />
            </form>
            <div class="w-full text-end">
                <BaseButton @click="save" class="w-6/12 sm:w-2/12 py-[8px] sm:py-[12px] text-sm sm:text-md mt-4 rounded"
                    :disabled="disabled" :class="{ 'disabled': disabled }">
                    save </BaseButton>
            </div>
        </div>
    </div>
</template>