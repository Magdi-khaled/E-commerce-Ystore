<template>
    <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside
                class="relative hidden lg:block h-16 lg:h-full lg:order-last lg:col-span-5 xl:col-span-6 border-l border-l-gray-500">
                <img alt="Auth-Img" src="@/assets/media/auth/auth.avif"
                    class="absolute inset-0 h-full w-full object-cover grayscale-[1]" />
            </aside>

            <main
                class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-2 xl:col-span-6">
                <div class="max-w-xl lg:max-w-3xl">
                    <router-link :to="{ name: 'Home' }" class="block text-black w-fit">
                        <svg class="h-8 sm:h-10 text-black" viewBox="0 0 28 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                fill="currentColor" />
                        </svg>
                    </router-link>

                    <h1 class="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                        Welcome to Ystore
                    </h1>
                    <p v-if="!authUser"
                        class="mt-1  text-gray-500 text-sm sm:text-md font-mono tracking-normal capitalize">
                        become a seller on<span class="font-semibold"> ystore </span> <span class="lowercase">and</span>
                        view your products for sell <i class="fa-duotone fa-solid fa-money-bill-wave"></i> ...
                    </p>

                    <form @submit.prevent="signup" class="mt-4 grid grid-cols-6 gap-x-6 gap-y-4">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="fname" class="block text-sm font-medium text-gray-700">
                                First Name</label>
                            <input type="text" id="fname" name="fname" v-model="firstname" class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md border border-gray-400
                                bg-white text-sm text-gray-700 shadow-xs" placeholder="first name" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="fname" class="block text-sm font-medium text-gray-700">
                                Last Name</label>
                            <input type="text" id="lname" name="lname" v-model="lastname" class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md border border-gray-400
                                bg-white text-sm text-gray-700 shadow-xs" placeholder="last name" />
                        </div>

                        <div class="col-span-6">
                            <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>
                            <input type="email" id="Email" name="email" v-model="email" class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md border border-gray-400
                                bg-white text-sm text-gray-700 shadow-xs" placeholder="email address" />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>
                            <input type="password" id="Password" name="password" v-model="password" class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md border border-gray-400
                            bg-white text-sm text-gray-700 shadow-xs" placeholder="Password" />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="Password" class="block text-sm font-medium text-gray-700">
                                Password Confirmation</label>
                            <input type="password" id="Password" name="password" v-model="confirmPassword" class="mt-1 w-full px-2 py-2 sm:py-3 rounded-md border border-gray-400
                            bg-white text-sm text-gray-700 shadow-xs" placeholder="repeat password" />
                        </div>

                        <div class="col-span-6 mt-4">
                            <label for="MarketingAccept" class="flex items-center gap-2">
                                <input type="checkbox" id="MarketingAccept" name="marketing_accept"
                                    class="size-4 rounded-md border-gray-200 bg-white shadow-xs" />
                                <span class="text-sm text-gray-700">
                                    I want to receive emails about events, product updates and company
                                    announcements.
                                </span>
                            </label>
                        </div>

                        <div class="col-span-6">
                            <p class="text-sm text-gray-500">
                                By creating an account, you agree to our
                                <router-link href="#" class="text-gray-700 underline"> terms and conditions
                                </router-link> and <router-link href="#" class="text-gray-700 underline">
                                    privacy policy </router-link>
                            </p>
                        </div>

                        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <BaseButton class="w-full sm:w-4/12 text-center">
                                <p v-if="!spinnerOn">create an account</p>
                                <span v-else class="spinnerOn border-2 border-[#fff] m-auto size-7 rounded-full" />
                            </BaseButton>

                            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                Already have an account?
                                <router-link v-if="authUser" :to="{ name: 'User-Login' }"
                                    class="text-gray-700 underline">Log in</router-link>
                                <router-link v-else :to="{ name: 'AD-Login' }" class="text-gray-700 underline">Log
                                    in</router-link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </section>
</template>

<script>
import BaseButton from '../../../components/BaseButton.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
    components: { BaseButton },
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            spinnerOn: false,
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
    methods: {
        ...mapActions(['']),
        async signup() {
            try {
                const { firstname, lastname, email, password, confirmPassword } = this;
                let logged;
                if (this.authUser) logged = await this.UserSignup({ firstname, lastname, email, password, confirmPassword });
                else logged = await this.ADSignup({ firstname, lastname, email, password, confirmPassword });

                if (logged) {
                    this.spinnerOn = true;
                    setTimeout(() => {
                        this.$router.push({ name: this.authUser ? 'Home' : 'AD-dashboard' });
                    }, 1500);
                } else {
                    this.spinnerOn = false;
                    this.show = true;
                    setTimeout(() => { this.show = false; }, 2000);
                }
            } catch (error) {
                console.error('Signup Error', error);
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

@keyframes logginAnimate {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>