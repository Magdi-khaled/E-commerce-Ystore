<template>
    <div
        class="login w-full h-fit flex flex-row-reverse items-center justify-center sm:justify-between my-[8%] sm:my[10%] lg:my-0">
        <div class="w-11/12 md:w-9/12 lg:w-5/12 pt-6 m-auto border-2 border-[#c9c9c9] px-6  rounded-sm
            shadow-md shadow-gray-300">
            <div class="flex items-center gap-2">
                <router-link :to="{ name: 'Home' }" class="flex items-center gap-2 ">
                    <img class="w-5/12 sm:w-4/12" src="../../../assets/images/logo/logo.png" alt="shop.co">
                    <!-- <i class="fa-solid fa-shop text-xl"></i> -->
                </router-link>
            </div>

            <div class="my-4">
                <p v-if="!authUser" class="mt-1 text-sm sm:text-md font-bold text-gray-500 capitalize">
                    become a seller on shop.co <span class="lowercase">and</span> view your products for sell
                    <i class="fa-duotone fa-solid fa-money-bill-wave pl-1"></i> ...
                </p>
            </div>

            <Form class="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4" @submit.prevent="register">
                <Field label="first name" name="firstname" type="text" v-model="firstname"
                    placeholder="Enter first name" />

                <Field label="last name" name="lastname" type="text" v-model="lastname" placeholder="Enter last name" />

                <Field label="phone" name="phone" type="text" v-model="phone" placeholder="Enter phone number" />

                <Field label="country" name="country" type="select" v-model="country" placeholder="Enter last name"
                    :options="countries" optionsType="choose country" />

                <Field label="Location/address" name="location" type="text" v-model="location"
                    placeholder="address Line" />

                <Field label="email address" name="email" type="email" v-model="email"
                    placeholder="Enter email address" />

                <Field label="password" name="password" type="password" v-model="password"
                    placeholder="Enter password" />

                <Field label="repeat password" name="confirmPassword" type="password" v-model="confirmPassword"
                    placeholder="repeat password" />

                <BaseButton @click="register" class="mt-2 col-span-2 rounded-sm py-[10px]">
                    register
                </BaseButton>
            </Form>
        </div>
        <div
            class="border-r-[3px] border-r-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center">
            <img v-if="authUser" class="w-10/12 m-auto" src="../../../assets/images/auth/user-login.webp" alt="">
            <img v-else class="w-10/12 m-auto" src="../../../assets/images/auth/admin-login.svg" alt="">
        </div>
    </div>
</template>

<script>
import BaseButton from '../../../components/BaseButton.vue'
import Field from '../../../components/form/Field.vue';
import { Form } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: { BaseButton, Field, Form },
    data() {
        return {
            firstname: '',
            lastname: '',
            country: '',
            countries: ['Egypt', 'UAE', 'KSA', 'Qatar'],
            phone: '',
            email: '',
            location: '',
            password: '',
            confirmPassword: '',
            isValidForm: false
        }
    },
    computed: {
        authUser() {
            const user = this.$route.name.split('-')[0] === 'User';
            if (user)
                return true;
            else return false;
        }
    },
    methods: { register() { } }
}
</script>
<style scoped>
.spinnerOn {
    border: 3px solid #d2d2d2;
    border-top: 3px solid #202020;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1.5s linear infinite;
}

@keyframes logginAnimate {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>