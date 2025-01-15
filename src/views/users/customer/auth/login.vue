<template>
    <baseError :show="show">
        Wrong Email or password
    </baseError>
    <div class="login w-full h-screen flex items-center justify-between">
        <div class="w-10/12 md:w-6/12 lg:w-4/12 rounded-md m-auto px-6 sm:px-10 bg-white 
            lg:bg-none shadow-md lg:shadow-none shadow-gray-300">
            <div class="flex items-center gap-2 pt-8">
                <img src="../../../../assets/images/logo/shop-co-logo.png" alt="shop.co"> <i
                    class="fa-solid fa-shop text-xl"></i>
            </div>
            <div class="my-4">
                <h1 class="text-xl sm:text-2xl font-bold capitalize">welcome back !</h1>
                <p class="mt-1 text-md font-bold text-gray-500 capitalize">sign in <span class="lowercase">and</span>
                    buy all you need
                    <i class="fa-solid fa-cart-shopping"></i>...
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
                    <baseButton type="submit" class="w-full py-[8px] sm:py-[12px]">
                        <p v-if="!loggedIn">log in</p>
                        <p v-else class="logging border-2 border-[#fff] m-auto w-7 h-7 rounded-full"></p>
                    </baseButton>
                </div>
            </form>
            <div class="w-full flex justify-center items-center">
                <hr class="h-0.5 bg-gray-200 w-4/12">
                <p class="px-2 text-gray-400 font-medium text-sm whitespace-nowrap">Or, Login with</p>
                <hr class="h-0.5 bg-gray-200 w-4/12">
            </div>
            <div class="w-full text-center my-4">
                <baseButton class="w-full py-[8px] sm:py-[12px] flex items-center justify-center">
                    <img src="../../../../assets/images/icons/Google__G__logo.svg.png" alt="google-account"
                        class="w-7 h-7 border-2 border-black p-1 mr-2 rounded-full bg-white">
                    <!-- <i class="fa-brands fa-google border-2 p-1 mr-2 rounded-full"></i>  -->
                    <p>google account</p>
                </baseButton>
                <div class="w-full font-medium text-sm sm:text-md flex items-center justify-evenly mb-6">
                    <p>Don't have an account ?
                        <router-link :to="{ name: 'customer-signup' }" class="text-gray-500 underline capitalize">
                            signup here
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
        <div
            class="border-l-[3px] border-l-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center">
            <!-- class="border-l-[3px] border-l-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center"> -->
            <img class="w-10/12 m-auto" src="../../../../assets/images/shop/login-4.png" alt="">
        </div>
    </div>
</template>
<script>
import baseButton from '../../../../components/baseButton.vue';
import baseError from '../../../../components/baseError.vue';
import { mapActions, mapGetters } from 'vuex';
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
    computed: {
        ...mapGetters(['Get_User'])
    },
    methods: {
        ...mapActions(['userLogin']),
        async login() {
            try {
                const { email, password } = this;
                const logged = await this.userLogin({ email: email, password: password });
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