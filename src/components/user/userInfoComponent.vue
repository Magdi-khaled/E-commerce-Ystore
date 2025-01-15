<template>
    <div class="w-full h-fit bg-white mb-12 p-6 sm:p-10">
        <h1 class="font-bold text-xl"> Profile Info</h1>
        <div class="">
            <form @submit.prevent="onSubmit" class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
                <div class="flex flex-col capitalize">
                    <label for="email" class="">email</label>
                    <input type="email" id="email" autocomplete="off" disabled v-model="user.email"
                        class="cursor-not-allowed user-none p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="fname" class="">first name</label>
                    <input type="text" id="fname" v-model="user.fname" @keydown="disabled = false"
                        class="capitalize p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="lname" class="">last name</label>
                    <input type="text" id="lname" v-model="user.lname" @keydown="disabled = false"
                        class="capitalize p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="phone" class="">phone number </label>
                    <input type="text" id="phone" autocomplete="off" v-model="user.phone" @keydown="disabled = false"
                        class=" p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="birthdate" class="">birthday </label>
                    <input type="date" id="birthdate" v-model="user.birthdate" @change="disabled = false"
                        class=" p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="gender" class="">gender </label>
                    <select id="gender" v-model="user.gender" @change="disabled = false"
                        class=" p-2 border-2 rounded-sm">
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="flex flex-col capitalize">
                    <label for="address" class="">address</label>
                    <input type="text" id="address" autocomplete="off" v-model="user.address"
                        @keydown="disabled = false" class="p-2 border-2 rounded-sm">
                </div>
                <div class="flex flex-col capitalize">
                    <label for="nationality" class="">nationality </label>
                    <select id="nationality" v-model="user.nationality" @change="disabled = false"
                        class=" p-2 border-2 rounded-sm">
                        <option value="Egypt" selected>Egypt</option>
                        <option value="UAE">UAE</option>
                        <option value="KSA">KSA</option>
                    </select>
                </div>
            </form>
            <div class="w-full text-end">
                <baseButton class="w-7/12 sm:w-5/12 md:w-3/12 px-8 py-4 mt-4 rounded-md whitespace-nowrap" disabled
                    :class="{ 'disabled': disabled }" @click="disabled = true">
                    update profile
                </baseButton>
            </div>
        </div>
    </div>
</template>
<script>

import baseButton from '../baseButton.vue';
export default {
    name: 'userInfoComponent',
    components: { baseButton },
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