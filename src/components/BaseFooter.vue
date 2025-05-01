<script setup>
import { ref } from 'vue';
import { footerSections, paylinks } from '@/composables/footerData.js';
const emailupto = ref("");
</script>

<template>
    <footer class="footer w-full mt-32 bg-[#f0eeed]">
        <div class="footer-header text-white top-[-6rem] bg-black w-11/12 m-auto rounded-md relative px-4
        sm:px-16 py-4 sm:py-8 flex flex-wrap items-center justify-between ">
            <div class="w-full md:w-5/12">
                <h1 class=" text-white font-sans font-bold text-xl sm:text-3xl lg:text-4xl uppercase">
                    stay upto date about
                    our latest offers
                </h1>
            </div>
            <div class="w-full md:w-5/12">
                <div class="flex justify-end relative mb-5 mt-5 md:mt-0">
                    <label for="uptodate-email" class="w-full">
                        <input v-model="emailupto" id="uptodate-email" type="email" class="rounded outline-none py-2
                        sm:py-3 pl-9 w-full text-black font-medium  text-sm sm:text-md "
                            placeholder="Enter your email address...">
                        <i
                            class="fa-solid fa-at absolute z-30 left-2 top-[30%] sm:top-[23%] text-md sm:text-xl text-gray-500"></i>
                    </label>
                </div>
                <div class="flex justify-center md:justify-end">
                    <button class="capitalize bg-white text-black w-full py-2 font-medium hover:text-white
                        hover:bg-[#2f2f2f] rounded transition duration-300">
                        subscribe <span class="lowercase">to</span> newsletter
                    </button>
                </div>
            </div>
        </div>
        <!-- Footer Content -->
        <div class="relative top[-3rem] flex flex-col md:flex-row  justify-between w-full px-8 md:px-16 ">

            <!-- first column -->
            <div class="w-full md:w-4/12 flex flex-col gap-5">
                <div class="mb-2 w-4/12 md:w-7/12">
                    <img loading="lazy" src="@/assets/media/logo/footer-logo.png" alt="YSTORE-LOGO">
                </div>
                <div class="w-full md:w-8/12 text-sm text-gray-600 mb-2 md:mb-5">
                    <p>
                        We have clothes that suits your style and which you’re proud to wear. From women to men.
                    </p>
                </div>
                <!-- Social Media Links -->
                <div class="flex justify-between w-4/12 gap-1">
                    <router-link to="" title="Twitter-X-link">
                        <i class="fa-brands fa-twitter text-white bg-black rounded-md border-2 border-gray-500 p-1"></i>
                    </router-link>
                    <router-link to="" title="Facebook-link">
                        <i
                            class="fa-brands fa-facebook-f text-white bg-black rounded-md border-2 border-gray-500 px-2 py-1">
                        </i>
                    </router-link>
                    <router-link to="" title="Instgram-link">
                        <i
                            class="fa-brands fa-instagram text-white bg-black rounded-md border-2 border-gray-500 px-2 py-1"></i>
                    </router-link>
                    <router-link to="" title="GitHub-link">
                        <i class="fa-brands fa-github text-white bg-black rounded-md border-2 border-gray-500 p-1"></i>
                    </router-link>
                </div>
            </div>

            <!-- rest columns -->
            <div class="footer-links flex flex-wrap justify-between w-full tracking-wide ">
                <div v-for="(section, index) in footerSections" :key="index" class="w-6/12 md:w-3/12 pt-4">
                    <h1 class="uppercase mb-5">{{ section.title }}</h1>
                    <ul class="list-none flex flex-col gap-3">
                        <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                            <router-link :to="link.path">{{ link.name }}</router-link>
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
                    YSTORE © 2002-2024, All rights reserved
                </p>
            </div>
            <div class="w-8/12 sm:w-5/12">
                <ul class="flex justify-end">
                    <li v-for="(item, index) in paylinks" :key="index">
                        <img loading="lazy" :src="item.src" :alt="item.alt">
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style scoped>
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