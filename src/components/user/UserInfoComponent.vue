<template>
    <div class="w-full h-fit bg-white mb-12 p-6 sm:p-10">
        <h1 class="font-bold text-xl"> Profile Info</h1>
        <div class="">
            <form @submit.prevent="onSubmit" class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
                <!-- <Field label="email" name="email" v-model="user.email" :hide="true" /> -->
                <!-- <Field label="fname" name="fname" v-model="user.fname" :hide="true" class="deep:capitalize" /> -->
                <div class="flex flex-col capitalize">
                    <label for="email" class="">email</label>
                    <input type="email" id="email" autocomplete="off" disabled v-model="user.email"
                        class="cursor-not-allowed user-none p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="fname" class="">first name</label>
                    <input type="text" id="fname" v-model="user.fname" disabled
                        class="cursor-not-allowed capitalize p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="lname" class="">last name</label>
                    <input type="text" id="lname" v-model="user.lname" disabled
                        class="cursor-not-allowed capitalize p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="birthdate" class="">birthday </label>
                    <input type="date" id="birthdate" v-model="user.birthdate" disabled
                        class="cursor-not-allowed p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="gender" class="">gender </label>
                    <input type="text" id="gender" v-model="user.gender" disabled
                        class="cursor-not-allowed p-2 border-2 rounded-sm">
                    <!-- <select id="gender" v-model="user.gender" disabled class=" p-2 border-2 rounded-sm">
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                    </select> -->
                </div>
                <div class="flex flex-col capitalize">
                    <label for="nationality" class="">nationality </label>
                    <input type="text" id="nationality" v-model="user.nationality" disabled
                        class="cursor-not-allowed p-2 border-2 rounded-sm">
                    <!-- <select id="nationality" v-model="user.nationality" @change="disabled = false" disabled
                    class="cursor-not-allowed p-2 border-2 rounded-sm">
                    <option value="Egypt" selected>Egypt</option>
                    <option value="UAE">UAE</option>
                    <option value="KSA">KSA</option>
                </select> -->
                </div>
                <div class="flex flex-col capitalize">
                    <label for="address" class="">address</label>
                    <input type="text" id="address" autocomplete="off" v-model="user.address"
                        @keydown="disabled = false" class="p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="phone" class="">phone number </label>
                    <input type="text" maxlength="14" id="phone" autocomplete="off" v-model="user.phone"
                        @change="disabled = true" @keydown="disabled = false" class=" p-2 border-2 rounded-sm">
                </div>
            </form>
            <div class="w-full text-end">
                <BaseButton class="w-6/12 sm:w-2/12 py-[8px] sm:py-[12px] text-sm sm:text-md mt-4 rounded"
                    :disabled="disabled" :class="{ 'disabled': disabled }" @click="disabled = true">
                    save
                </BaseButton>
            </div>
        </div>
    </div>
</template>
<script>

import BaseButton from '../BaseButton.vue';
import Field from '../form/Field.vue';
export default {
    name: 'UserInfoComponent',
    components: { BaseButton, Field },
    props: ['user'],
    data() {
        return {
            clicked: 0,
            disabled: true,
        }
    }
}
</script>
<style scoped></style>