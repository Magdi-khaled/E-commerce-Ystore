<template>
    <BaseTeleport :show="show" :type="'error'">
        Wrong Email or password
    </BaseTeleport>
    <div class="w-full h-screen flex flex-row-reverse justify-between">
        <div class="w-10/12 md:w-6/12 lg:w-4/12 border-2 border-gray-400 m-auto px-6 sm:px-8 rounded-sm
            shadow-md shadow-gray-300">
            <div class="flex items-center gap-2 pt-8">
                <router-link :to="{ name: 'Home' }" class="flex items-center gap-2 ">
                    <img class="w-5/12 sm:w-4/12" src="../../../assets/images/logo/logo.webp" alt="shop.co">
                    <i class="fa-solid fa-shop text-xl"></i>
                </router-link>
            </div>

            <div class="my-4">
                <h1 v-if="authUser" class="text-xl font-bold capitalize">welcome back !</h1>
                <h1 v-else class="text-xl font-bold capitalize">Seller department!</h1>

                <p v-if="authUser" class="mt-1 text-sm sm:text-md font-bold text-gray-500 capitalize">sign in <span
                        class="lowercase">and</span>
                    buy all you need <i class="fa-solid fa-cart-shopping"></i>...
                </p>
                <p v-else class="mt-1 text-sm sm:text-md font-bold text-gray-500 capitalize">
                    sign in <span class="lowercase">and</span> view all your products for sell
                    <i class="fa-duotone fa-solid fa-money-bill-wave pl-1"></i> ...
                </p>
            </div>
            <Form @submit.prevent="login" class="grid gap-y-4">

                <Field label="email address" name="email" type="email" v-model="email"
                    placeholder="Enter your mail address" class="border-b-[3px] border-gray-600" />
                <Field label="password" name="password" type="password" v-model="password"
                    placeholder="Enter your password" class="border-b-[3px] border-gray-600" />

                <div class="w-full my-2 forget-password flex justify-between">
                    <div class="flex items-center gap-1 w-4/12 text-sm sm:text-md">
                        <input type="checkbox" @click="rememberme = !rememberme" id="rememberme" name="rememberme"
                            class="appearance-none text-gray-400 text-[12px] w-[15px] transition-all duration-150 
                        h-[14px] border-2 border-gray-400 rounded cursor-pointer"
                            :class="{ 'fa-duotone fa-solid fa-check bg-gray-700 text-white border-none px-[2px] pt-[1px]': rememberme }" />
                        <label for="rememberme" class="font-medium whitespace-nowrap">remember me</label>
                    </div>
                    <div>
                        <router-link :to="{ name: 'User-ForgetPassword' }"
                            class="font-medium hover:underline text-sm sm:text-md">
                            Forget your password?</router-link>
                    </div>
                </div>

                <div class="w-full text-center my-1">
                    <BaseButton @click="login" class="w-full py-[8px] sm:py-[10px]">
                        <p v-if="!spinnerOn">log in</p>
                        <div v-else class="spinnerOn border-2 border-[#fff] m-auto w-7 h-7 rounded-full" />
                    </BaseButton>
                </div>
            </Form>
            <div class="w-full flex justify-center items-center">
                <hr class="w-4/12">
                <p class="px-2 text-gray-500 font-medium text-xs whitespace-nowrap">Or, Login with</p>
                <hr class="w-4/12">
            </div>
            <div class="w-full text-center my-2">
                <BaseButton class="w-full py-[8px] sm:py-[10px] flex items-center justify-center">
                    <img src="../../../assets/images/icons/Google__G__logo.svg.png" alt="google-account"
                        class="w-7 h-7 border-2 border-black p-1 mr-2 rounded-full bg-white">
                    <p>google account</p>
                </BaseButton>
                <div class="w-full font-medium text-sm sm:text-md flex items-center justify-evenly mb-6">
                    <p>Don't have an account ?
                        <router-link :to="{ name: 'User-Signup' }" class="text-gray-500 underline capitalize">
                            signup here
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
        <div
            class="border-r-[3px] border-r-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center">
            <img v-if="authUser" class="w-10/12 m-auto" src="../../../assets/images/auth/user-login.webp" alt="">
            <img v-else class="w-10/12 m-auto" src="../../../assets/images/auth/admin-login.svg" alt="">
        </div>
    </div>
</template>
<script>
import BaseButton from '../../../components/BaseButton.vue';
import BaseTeleport from '../../../components/BaseTeleport.vue';
import Field from '../../../components/form/Field.vue';
import { Form } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: { BaseButton, BaseTeleport, Field, Form },
    data() {
        return {
            email: '',
            password: '',
            spinnerOn: false,
            rememberme: false,
            show: false
        }
    },
    setup() {

    },
    computed: {
        ...mapGetters(['Get_User']),
        authUser() {
            const user = this.$route.name.split('-')[0] === 'User';
            if (user)
                return true;
            else return false;
        }
    },
    methods: {
        ...mapActions(['UserLogin', 'ADLogin']),
        async login() {
            try {
                const { email, password } = this;
                let logged;
                if (this.authUser)
                    logged = await this.UserLogin({ email: email, password: password });
                else logged = await this.ADLogin({ email: email, password: password });

                if (logged) {
                    this.spinnerOn = true;
                    if (this.authUser) {
                        setTimeout(() => {
                            this.$router.push({ name: 'Home' })
                        }, 1500);
                    }
                    else {
                        setTimeout(() => {
                            this.$router.push({ name: 'AD-dashboard' })
                        }, 1500);
                    }
                }
                else {
                    this.spinnerOn = false;
                    this.show = true;
                    setTimeout(() => {
                        this.show = false;
                    }, 2000)
                }
            }
            catch (err) {
                console.log('Login Error : ', err);
            }
        }
    }
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

:deep(input:not(input[type='checkbox'])) {
    padding: 12px 6px;
}
</style>