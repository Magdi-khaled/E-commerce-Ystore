<template>
    <div class="footer w-full mt-40 bg-[#f0eeed]">
        <div class="footer-header bg-black w-11/12 m-auto rounded-3xl relative px-8
        sm:px-16 py-8 flex flex-wrap items-center justify-between ">
            <div class="w-full md:w-5/12">
                <h1 class=" text-white font-sans font-bold text-3xl lg:text-4xl uppercase">
                    stay upto date about
                    our latest offers
                </h1>
            </div>
            <div class="w-full md:w-5/12">
                <div class="flex justify-center md:justify-end relative mb-5  mt-5 md:mt-0">
                    <div class="pointer-events-none absolute z-10 left-3 top-1 lg:top-3 flex items-center">
                        <span class="text-gray-600 text-md md:text-xl">
                            <i class="fa-duotone fa-solid fa-envelopes"></i>
                        </span>
                    </div>
                    <input v-model="email"
                        class="relative rounded-3xl outline-none py-2 lg:py-3 pl-12 w-full text-black font-bold placeholder:text-sm "
                        placeholder="Enter your email address">
                </div>
                <div class="flex justify-center md:justify-end">
                    <button
                        class="capitalize bg-white text-black w-full py-3 font-bold hover:text-white hover:bg-[#2f2f2f] rounded-3xl">
                        subscribe <span class="lowercase">to</span> newsletter
                    </button>
                </div>
            </div>
        </div>
        <!-- Footer Content -->
        <div class="footer-content flex flex-col md:flex-row  justify-between w-full px-8 md:px-16 ">

            <!-- first column -->
            <div class="footer-content-1 w-full sm:w-4/12 flex flex-col gap-5">
                <div class="mb-2">
                    <img src="../assets/images/logo/shop-co-logo.png" alt="SHOP.CO">
                </div>
                <div class="w-full sm:w-8/12 text-sm text-gray-600 mb-2 md:mb-6">
                    <p>
                        We have clothes that suits your style and which you’re proud to wear. From women to men.
                    </p>
                </div>
                <!-- Social Media Links -->
                <div class="flex justify-between w-4/12 gap-1">
                    <router-link to="" title="Twitter-X-link">
                        <i class="fa-brands fa-twitter rounded-full border-2 border-gray-500 bg-white p-1"></i>
                    </router-link>
                    <router-link to="" title="Facebook-link">
                        <i
                            class="fa-brands fa-facebook-f rounded-full border-2 border-gray-500 py-1 px-2 bg-white bg-black">
                        </i>
                    </router-link>
                    <router-link to="" title="Instgram-link">
                        <i
                            class="fa-brands fa-instagram rounded-full border-2 border-gray-600 border-gray-500 bg-white  px-2 py-1"></i>
                    </router-link>
                    <router-link to="" title="GitHub-link">
                        <i class="fa-brands fa-github rounded-full border-2 border-gray-500 bg-white p-1"></i>
                    </router-link>
                </div>
            </div>

            <!-- rest columns -->
            <div class="footer-links flex flex-wrap justify-between  w-full">

                <div class="w-6/12 md:w-3/12 pt-4">
                    <h1 class="uppercase">company</h1>
                    <ul class="list-none flex flex-col gap-3">
                        <li>
                            <router-link to="">about</router-link>
                        </li>
                        <li>
                            <router-link to="">features</router-link>
                        </li>
                        <li>
                            <router-link to="">works</router-link>
                        </li>
                        <li>
                            <router-link to="">career</router-link>
                        </li>
                    </ul>
                </div>
                <div class="w-6/12 md:w-3/12 pt-4">
                    <h1 class="uppercase">help</h1>
                    <ul class="list-none flex flex-col gap-3">
                        <li>
                            <router-link to="">custom support</router-link>
                        </li>
                        <li>
                            <router-link to="">delivery details</router-link>
                        </li>
                        <li>
                            <router-link to="">terms & conditions</router-link>
                        </li>
                        <li>
                            <router-link to="">privacy policy</router-link>
                        </li>
                    </ul>
                </div>
                <div class="w-6/12 md:w-3/12 pt-4">
                    <h1 class="uppercase">faq</h1>
                    <ul class="list-none flex flex-col gap-3">
                        <li>
                            <router-link to="">account</router-link>
                        </li>
                        <li>
                            <router-link to="">manage deliveries</router-link>
                        </li>
                        <li>
                            <router-link to="">orders</router-link>
                        </li>
                        <li>
                            <router-link to="">payments</router-link>
                        </li>
                    </ul>
                </div>
                <div class="w-6/12 md:w-3/12 pt-4">
                    <h1 class="uppercase">resources</h1>
                    <ul class="list-none flex flex-col gap-3">
                        <li>
                            <router-link to="">free <span class="lowercase">e</span>Books</router-link>
                        </li>
                        <li>
                            <router-link to="">development tutorial</router-link>
                        </li>
                        <li>
                            <router-link to="">how <span class="lowercase">to</span> - blog </router-link>
                        </li>
                        <li>
                            <router-link to="">youtube playlist</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- inner footer -->
        <hr class="mx-8 md:mx-16 bg-gray-300 h-0.5 m-auto">
        <div class="mx-8 md:mx-16 pt-3 pb-8 flex flex-wrap justify-between">
            <div class="w-full sm:w-4/12 text-gray-500 text-sm">
                <p>
                    Shop.co © 2002-2023, All rights reserved
                </p>
            </div>
            <div class="w-8/12 sm:w-5/12">
                <ul class="flex justify-end">
                    <li>
                        <img src="../assets/images/payment-methods/visa.png" alt="visa">
                    </li>
                    <li>
                        <img src="../assets/images/payment-methods/credit-card.png" alt="credit-card">
                    </li>
                    <li>
                        <img src="../assets/images/payment-methods/PayPal.png" alt="paypal">
                    </li>
                    <li>
                        <img src="../assets/images/payment-methods/IphonePay.png" alt="applePay">
                    </li>
                    <li>
                        <img src="../assets/images/payment-methods/Gpay.png" alt="Gpay">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseFooter',
    data() {
        return {
            email: '',
        }
    },
}
</script>

<style scoped>
.footer-header {
    color: white;
    top: -6rem;
}

.footer-header h1 {
    text-align: start;
}

.footer-content {
    position: relative;
    top: -3rem;
}

.footer-links h1 {
    letter-spacing: 2px;
    margin-bottom: 16px;
}

.footer-links ul li {
    text-transform: capitalize;
    color: gray;
}

.footer-links ul li a:hover {
    text-decoration: underline;
}

@media (max-width:656px) {
    .footer-header {
        color: white;
        top: -5rem;
    }

}
</style>