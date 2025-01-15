<template>
    <baseError :show="show">
        Wrong Email or password
    </baseError>
    <div class="login w-full h-screen flex items-center justify-between">
        <div class="w-10/12 md:w-6/12 lg:w-4/12 rounded-md m-auto px-6 sm:px-10 bg-white 
            lg:bg-none shadow-md lg:shadow-none shadow-gray-300">
            <div class="pt-8 lg:pt-8">
                <router-link to="/shop.co.seller/home" class="flex items-center gap-2 ">
                    <img src="../../../../assets/images/logo/shop-co-logo.png" alt="shop.co">
                    <i class="fa-solid fa-shop text-xl"></i>
                </router-link>
            </div>
            <div class="my-4">
                <h1 class="text-xl sm:text-2xl font-bold capitalize">Seller department!</h1>
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
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                    <div class="password mt-2 w-full">
                        <h1 class="text-md">password <span class="text-red-600">*</span></h1>
                        <input name="password" autocomplete="off" type="password" v-model="password"
                            placeholder="Enter your password"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                </div>

                <div class="w-full my-4 forget-password flex justify-between">
                    <div class="flex items-center gap-1 w-4/12 text-sm sm:text-md">
                        <input id="remember" type="checkbox" class="w-4 sm:w-5 h-4 sm:h-5 border-2 border-gray-200 rounded-sm text-white
                    appearance-none checked:bg-black text-center fa-solid fa-check">
                        <label for="remember" class="font-medium whitespace-nowrap">remember me</label>
                    </div>
                    <div>
                        <router-link :to="{ name: 'customer-forget-password' }"
                            class="font-medium hover:underline text-sm sm:text-md">
                            Forget your password?</router-link>
                    </div>
                </div>

                <div class="w-full text-center my-1">
                    <baseButton type="submit" class="w-full py-[12px]">
                        <p v-if="!loggedIn">log in</p>
                        <p v-else class="logging border-2 border-[#fff] m-auto w-7 h-7 rounded-full"></p>
                    </baseButton>
                </div>
            </form>
            <div class="w-full font-medium text-sm sm:text-md flex items-center justify-evenly mb-6">
                <p>Don't have an account ?
                    <router-link :to="{ name: 'seller-signup' }" class="text-gray-500 underline ">
                        Become a seller on shop.co
                    </router-link>
                </p>
            </div>
        </div>
        <div
            class="border-l-[3px] border-l-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center">
            <img class="w-10/12 m-auto border-[3px] border-[#263238] rounded-md shadow-sm  shadow-gray-900 "
                src="../../../../assets/images/admin/login-2.svg" alt="">
        </div>
    </div>
</template>
<script>
import baseButton from '../../../../components/baseButton.vue';
import baseError from '../../../../components/baseError.vue';
import { mapActions } from 'vuex';
export default {
    components: { baseButton, baseError },
    data() {
        return {
            email: '',
            password: '',
            loggedIn: false,
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
                        this.$router.push({ name: 'shop.co-home' })
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
                console.log('login error vue : ', err);
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