<template>
    <div class="login w-full h-screen flex items-center justify-between">
        <div class="w-10/12 md:w-7/12 lg:w-5/12 rounded-xl m-auto pl-6 sm:pl-20 bg-white 
            lg:bg-none shadow-md lg:shadow-none shadow-gray-300 lg:shadow-none ">
            <div class="flex items-center gap-2 pt-12 lg:pt-0">
                <img src="../../../../assets/images/logo/shop-co-logo.png" alt="shop.co">
                <i class="fa-solid fa-shop text-xl"></i>
            </div>
            <div class="my-4">
                <p class="mt-1 text-sm sm:text-md font-bold text-gray-500 capitalize">
                    sign up <span class="lowercase">and</span> buy all you need
                    <i class="fa-solid fa-cart-shopping"></i>...
                </p>
            </div>

            <div class="inputs my-4 font-bold font-sans capitalize flex flex-wrap">

                <div class="w-11/12 sm:w-full flex flex-wrap gap-2">
                    <div class="w-full sm:w-5/12">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">first name <span class="text-red-600">*</span>
                        </h1>
                        <input v-model="firstname" placeholder="Enter first name" class="outline-none w-full my-1 p-2 sm:p-3 border-2
                    focus:border-black font-normal rounded-xl">
                    </div>
                    <div class="w-full sm:w-5/12 flex-wrap ">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">last name <span class="text-red-600">*</span>
                        </h1>
                        <input v-model="lastname" placeholder="Enter last name" class="outline-none w-full my-1 p-2 sm:p-3 border-2
                    focus:border-black font-normal rounded-xl">
                    </div>
                </div>

                <div class="w-11/12 sm:w-full flex flex-wrap gap-2">
                    <div class="w-full sm:w-5/12">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">phone <span class="text-red-600">*</span></h1>
                        <input v-model="phone" placeholder="Enter your phone number" class="outline-none w-full my-1 p-2 sm:p-3 border-2
                    focus:border-black font-normal rounded-xl">
                    </div>
                    <div class="w-full sm:w-5/12 relative">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">country <span class="text-red-600">*</span>
                        </h1>
                        <i class="fa-solid fa-arrow-down-a-z font-normal absolute right-4 top-10 "></i>
                        <select id="country" class="appearance-none outline-none w-full my-1 p-2 sm:p-3 border-2
                        focus:border-black font-normal rounded-xl capitalize">
                            <option value="" disabled selected>choose country</option>
                            <option class="capitalize font-normal hover:bg-gray-200" value="Egypt">egypt</option>
                            <option class="capitalize font-normal hover:bg-gray-200" value="KSA">KSA</option>
                            <option class="capitalize font-normal hover:bg-gray-200" value="UAE">UAE</option>
                        </select>
                    </div>
                </div>

                <div class="w-11/12 sm:w-full">
                    <h1 class="text-sm sm:text-md whitespace-nowrap">email <span class="text-red-600">*</span></h1>
                    <input v-model="email" placeholder="Enter your mail address" class="email outline-none my-1 p-2 sm:p-3 border-2
                    focus:border-black font-normal rounded-xl">
                </div>

                <div class="w-11/12 sm:w-full flex flex-wrap gap-2">
                    <div class="w-full sm:w-5/12">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">password <span class="text-red-600">*</span>
                        </h1>
                        <input type="password" v-model="password" placeholder="Enter password" class="outline-none w-full my-1 p-2 sm:p-3 border-2 
                    focus:border-black font-normal rounded-xl">
                    </div>
                    <div class="w-full sm:w-5/12">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">confirm password <span
                                class="text-red-600">*</span></h1>
                        <input type="password" v-model="confirmPassword" placeholder="Enter password" class="outline-none w-full my-1 p-2 sm:p-3 border-2 
                    focus:border-black font-normal rounded-xl">
                    </div>
                </div>
            </div>

            <div class="signup-btn w-11/12 sm:w-full my-4">
                <baseButton>
                    sign up
                </baseButton>
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
            firstname: '',
            lastname: '',
            country: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }
}
</script>
<style scoped>
.inputs>div {
    margin: 5px 0px;
}

.email,
.signup-btn button {
    width: 84.5%;
}

@media (max-width:641px) {

    .email,
    .signup-btn button {
        width: 100%;
    }
}
</style>