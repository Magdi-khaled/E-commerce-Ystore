<template>
    <baseError :show="show">
        Wrong Email or password
    </baseError>
    <div class="w-full h-screen flex items-center justify-between">
        <div
            class="w-10/12 md:w-6/12 lg:w-4/12 border-2 border-[#c9c9c9] m-auto px-6 sm:px-8 rounded shadow-sm shadow-gray-200">
            <div class="pt-8 lg:pt-8">
                <router-link :to="{ name: 'Home' }" class="flex items-center gap-2 ">
                    <img class="w-5/12 sm:w-4/12" src="../../../../assets/images/logo/logo.webp" alt="shop.co">
                    <i class="fa-solid fa-shop text-xl"></i>
                </router-link>
            </div>
            <div class="my-4">
                <h1 class="text-xl font-bold capitalize">Seller department!</h1>
                <p class="mt-1 text-sm sm:text-md font-bold text-gray-500 capitalize">
                    sign in <span class="lowercase">and</span> view all your products for sell
                    <i class="fa-duotone fa-solid fa-money-bill-wave pl-1"></i> ...
                </p>
            </div>
            <form action="" @submit.prevent="login">
                <div class="my-4 font-medium capitalize">
                    <div class="email w-full">
                        <h1 class="text-md">email <span class="text-red-600">*</span></h1>
                        <input name="email" autocomplete="off" type="text" v-model="email"
                            placeholder="Enter your mail address"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-normal rounded text-sm sm:text-md">
                    </div>
                    <div class="password mt-2 w-full">
                        <h1 class="text-md">password <span class="text-red-600">*</span></h1>
                        <input name="password" autocomplete="off" type="password" v-model="password"
                            placeholder="Enter your password"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-normal rounded text-sm sm:text-md">
                    </div>
                </div>

                <div class="w-full my-4 forget-password flex justify-between">
                    <div class="flex items-center gap-1 w-4/12 text-sm sm:text-md">
                        <input type="checkbox" @click="rememberme = !rememberme" id="rememberme" name="rememberme"
                            class="appearance-none text-gray-400 text-[12px] w-[15px] transition-all duration-150 
                            h-[14px] border-2 border-gray-400 rounded cursor-pointer"
                            :class="{ 'fa-duotone fa-solid fa-check bg-gray-700 text-white border-none px-[2px] pt-[1px]': rememberme }" />

                        <label for="rememberme" class="font-medium whitespace-nowrap">remember me</label>
                    </div>
                    <div>
                        <router-link :to="{ name: 'AD-ForgetPassword' }"
                            class="font-medium hover:underline text-sm sm:text-md">
                            Forget your password?</router-link>
                    </div>
                </div>

                <div class="w-full text-center my-1">
                    <BaseButton type="submit" class="w-full py-[12px]">
                        <p v-if="!loggedIn">log in</p>
                        <p v-else class="logging border-2 border-[#fff] m-auto w-7 h-7 rounded-full"></p>
                    </BaseButton>
                </div>
            </form>
            <div class="w-full flex justify-center items-center">
                <hr class="h-0.5 bg-gray-200 w-4/12">
                <p class="px-2 text-gray-400 font-medium text-sm whitespace-nowrap">Or, Login with</p>
                <hr class="h-0.5 bg-gray-200 w-4/12">
            </div>
            <div class="w-full text-center my-4">
                <BaseButton class="w-full py-[8px] sm:py-[12px] flex items-center justify-center">
                    <img src="../../../../assets/images/icons/Google__G__logo.svg.png" alt="google-account"
                        class="w-7 h-7 border-2 border-black p-1 mr-2 rounded-full bg-white">
                    <!-- <i class="fa-brands fa-google border-2 p-1 mr-2 rounded-full"></i>  -->
                    <p>google account</p>
                </BaseButton>
                <div class="w-full font-medium text-sm sm:text-md flex items-center justify-evenly mb-6">
                    <p>Don't have an account ?
                        <router-link :to="{ name: 'AD-Signup' }" class="text-gray-500 underline capitalize">
                            signup here
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
        <div
            class="border-l-[3px] border-l-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center">
            <img class="w-10/12 m-auto border-[3px] border-[#263238] rounded-md shadow-sm  shadow-gray-900 "
                src="../../../../assets/images/auth/admin-login.svg" alt="">
        </div>
    </div>
</template>
<script>
import BaseButton from '../../../../components/BaseButton.vue';
import baseError from '../../../../components/baseError.vue';
import { mapActions } from 'vuex';
export default {
    components: { BaseButton, baseError },
    data() {
        return {
            email: '',
            password: '',
            loggedIn: false,
            rememberme: false,
            show: false
        }
    },
    computed: {},
    methods: {
        ...mapActions(['adminLogin']),
        async login() {
            try {
                const { email, password } = this;
                const logged = await this.adminLogin({ email: email, password: password });
                if (logged) {
                    this.loggedIn = true;
                    setTimeout(() => {
                        this.$router.push({ name: 'AD-Dashboard' })
                    }, 1500);
                }
                else {
                    this.loggedIn = false;
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
.logging {
    border-bottom: none;
    border-left: none;
    border-right: none;
    animation-name: logginAnimate;
    animation-duration: 0.6s;
    animation-direction: normal;
    animation-iteration-count: infinite;
}

@keyframes logginAnimate {
    0% {
        transform: rotateZ(0deg);
    }

    50% {
        transform: rotateZ(180deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>