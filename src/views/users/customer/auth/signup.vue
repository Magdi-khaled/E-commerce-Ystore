<template>
    <div class="login w-full h-fit flex items-center justify-center sm:justify-between mt-[8%] sm:mt[10%] lg:mt-0">
        <div class="w-11/12 md:w-9/12 lg:w-5/12 rounded-xl m-auto px-6 bg-white 
            lg:bg-none shadow-md lg:shadow-none shadow-gray-300 lg:shadow-none pt-8">
            <div class="flex items-center gap-2">
                <router-link to="/shop.co.seller/home" class="flex items-center gap-2 ">
                    <img src="../../../../assets/images/logo/shop-co-logo.png" alt="shop.co">
                    <i class="fa-solid fa-shop text-xl"></i>
                </router-link>
            </div>
            <div class="my-4">
                <p class="mt-1 text-sm sm:text-md font-bold text-gray-500 capitalize">
                    become a seller on shop.co <span class="lowercase">and</span> view your products for sell
                    <i class="fa-duotone fa-solid fa-money-bill-wave pl-1"></i> ...
                </p>
            </div>

            <form class="inputs my-4 font-bold font-sans capitalize flex flex-wrap" @submit.prevent="register">

                <div class="w-full flex flex-wrap justify-between">
                    <div class="w-full sm:w-[49%]">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">first name <span class="text-red-600">*</span>
                        </h1>
                        <input v-model="firstname" placeholder="Enter first name"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                    <div class="w-full sm:w-[49%] mt-2 sm:mt-0">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">last name <span class="text-red-600">*</span>
                        </h1>
                        <input v-model="lastname" placeholder="Enter last name"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                </div>

                <div class="w-full flex flex-wrap justify-between">
                    <div class="w-full sm:w-[49%]">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">phone <span class="text-red-600">*</span></h1>

                        <input v-model="phone" placeholder="Enter phone number"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                    <div class="w-full sm:w-[49%] mt-2 sm:mt-0">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">country <span class="text-red-600">*</span>
                        </h1>
                        <select id="country" class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2
                            font-light rounded-md text-sm sm:text-md capitalize font-normal">
                            <option value="" disabled selected>choose country</option>
                            <option class="capitalize font-normal hover:bg-gray-200" value="Egypt">egypt</option>
                            <option class="capitalize font-normal hover:bg-gray-200" value="KSA">KSA</option>
                            <option class="capitalize font-normal hover:bg-gray-200" value="UAE">UAE</option>
                        </select>
                    </div>
                </div>

                <div class="w-full flex flex-wrap justify-between">
                    <div class="w-full sm:w-[49%]">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">email <span class="text-red-600">*</span>
                        </h1>
                        <input type="email" v-model="email" placeholder="Enter your mail address"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">

                    </div>
                    <div class="w-full sm:w-[49%] mt-2 sm:mt-0">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">Location/address (optional)
                            <i class="fa-solid fa-circle-exclamation pl-1 cursor-pointer"
                                title="write your shop address if you have a real shop (onsite)"></i>
                        </h1>
                        <input type="text" v-model="location" placeholder="Enter shop location"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                </div>

                <div class="w-full flex flex-wrap justify-between">
                    <div class="w-full sm:w-[49%]">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">password <span class="text-red-600">*</span>
                        </h1>
                        <input type="password" v-model="password" placeholder="Enter password"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                    <div class="w-full sm:w-[49%] mt-2 sm:mt-0">
                        <h1 class="text-sm sm:text-md whitespace-nowrap">confirm password <span
                                class="text-red-600">*</span></h1>
                        <input type="password" v-model="confirmPassword" placeholder="repeat password"
                            class="outline-none bg-gray-100 w-full my-1 p-2 sm:p-3 border-2 font-light rounded-md text-sm sm:text-md">
                    </div>
                </div>
                <div class="signup-btn w-full">
                    <baseButton :disabled="!isValidForm" type="submit">
                        register
                    </baseButton>
                </div>
            </form>
        </div>
        <div
            class="border-l-[3px] border-l-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center">
            <!-- class="border-l-[3px] border-l-[#263238] w-6/12 h-screen bg-gray-500 hidden lg:flex items-center justify-center"> -->
            <img class="w-10/12 m-auto"
                src="../../../../assets/images/shop/login-4.png" alt="">
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
            phone: '',
            email: '',
            location: '',
            password: '',
            confirmPassword: '',
            isValidForm: false
        }
    },
    methods: { register() { } }
}
</script>
<style scoped>
.inputs>div {
    margin: 5px 0px;
}

.email,
.signup-btn button {
    width: 100%;
}

@media (max-width:641px) {

    .email,
    .signup-btn button {
        width: 100%;
    }
}
</style>