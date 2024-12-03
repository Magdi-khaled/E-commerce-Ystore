<template>
    <div class="login w-full h-screen flex items-center justify-between">
        <div class="w-10/12 md:w-7/12 lg:w-5/12 rounded-xl m-auto pl-6 sm:pl-20 bg-white 
            lg:bg-none shadow-md lg:shadow-none shadow-gray-300 lg:shadow-none ">
            <div class="flex items-center gap-2 pt-12 lg:pt-0">
                <img src="../../../../assets/images/logo/shop-co-logo.png" alt="shop.co"> <i
                    class="fa-solid fa-shop text-xl"></i>
            </div>
            <div class="my-4">
                <h1 class="text-2xl font-bold font-sans capitalize">welcome back !</h1>
                <p class="mt-1 text-md font-bold text-gray-500 capitalize">sign in <span class="lowercase">and</span>
                    buy all you need
                    <i class="fa-solid fa-cart-shopping"></i>...
                </p>
            </div>
            <div class="my-4 font-bold font-sans capitalize">
                <div class="email  w-11/12 sm:w-10/12">
                    <h1 class="text-md">email <span class="text-red-600">*</span></h1>
                    <input v-model="email" placeholder="Enter your mail address" class="outline-none w-full my-1 p-3 border-2
                    focus:border-black font-normal rounded-xl">
                </div>
                <div class="password mt-2 w-11/12 sm:w-10/12">
                    <h1 class="text-md">password <span class="text-red-600">*</span></h1>
                    <input type="password" v-model="password" placeholder="Enter password" class="outline-none w-full my-1 p-3 border-2 
                    focus:border-black font-normal rounded-xl">
                </div>
            </div>

            <div class="w-11/12 sm:w-10/12 my-4 forget-password flex justify-between">
                <div class="flex items-center gap-1 w-4/12">
                    <input id="remember" type="checkbox" class="w-5 h-5 border-2 border-gray-200 rounded-sm text-white appearance-none 
                        checked:bg-black text-center fa-solid fa-check">
                    <label for="remember" class="font-bold whitespace-nowrap ">remember me</label>
                </div>
                <div>
                    <router-link :to="'/shop.co/user/forget-password'"
                        class="font-bold hover:underline text-sm sm:text-md">
                        Forget your password?</router-link>
                </div>
            </div>

            <div class="w-11/12 sm:w-10/12 text-center my-4">
                <baseButton>log in
                </baseButton>
            </div>
            <div class="w-11/12 sm:w-10/12 flex justify-center items-center">
                <hr class="h-0.5 bg-gray-200 w-4/12">
                <p class="px-2 text-gray-400 font-bold text-sm sm:text-md whitespace-nowrap">Or, Login with</p>
                <hr class="h-0.5 bg-gray-200 w-4/12">
            </div>
            <div class="w-11/12 sm:w-10/12 text-center my-4">
                <baseButton>
                    <i class="fa-brands fa-google border-2 p-1 mr-2 rounded-full"></i> google account
                </baseButton>
                <p class="py-1 font-bold">Don't have an account ?
                    <router-link :to="'/shop.co/signup'" class="text-gray-500 underline font-bold capitalize">
                        signup here
                    </router-link>
                </p>
            </div>
        </div>
        <div class=" w-6/12 h-screen bg-gray-400 hidden lg:flex items-center justify-center">
            <img class="w-10/12 m-auto" src="../../../../assets/images/shop/login-4.png" alt="">
        </div>
    </div>
</template>
<script>
import baseButton from '../../../../components/baseButton.vue'
export default {
    components: { baseButton },
    data() {
        return {
            email: '',
            password: ''
        }
    }
}
</script>
<style scoped>
/*
@media (max-width:980px) {
    .login {
        background-image: url('../../../../assets/shop/rb_2149628702.png');
        filter: grayscale(1);
        height: 100vh;
    }
}*/
</style>