<template>
    <userNavbar v-if="tuser === 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="h-full w-full flex border-t-2">

        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <userSidebarComponent v-model="clicked" :clicked="clicked">
            </userSidebarComponent>
        </div>
        <div class="w-full lg:w-9/12 h-fit bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <h1 class="font-bold text-3xl">QR Code</h1>
                <p class="text-gray-400 text-lg font-medium py-1"> Use the Shop.co QR code to pickup your orders with
                    sale
                    <i class="fa-solid fa-badge-percent pr-1"></i>
                </p>
                <div class="w-full h-fit bg-white mt-6 p-6 sm:p-16 mb-32 flex flex-col items-center">
                    <img class="w-[10rem] border-2 border-gray-600 rounded-xl"
                        src="../../../../assets/images/user/customer/qrcode.png" alt="">
                    <p class="font-medium text-md py-2 text-gray-400"><i
                            class="fa-sharp fa-solid fa-circle-exclamation"></i>
                        QR Code is updated
                        automatically every 2 months</p>
                </div>
            </div>
        </div>
    </div>
    <profileFooter></profileFooter>
</template>
<script>
import baseNavbar from '../../../../components/baseNavbar.vue';
import userSidebarComponent from '../../../../components/user/userSidebarComponent.vue';
import userNavbar from '../../../../components/user/userNavbar.vue';
import profileFooter from '../../../../components/profileFooter.vue';
export default {
    components: {
        baseNavbar, userNavbar, userSidebarComponent, profileFooter
    },
    data() {
        return {
            clicked: 1,
            tuser: localStorage.getItem('user'),
        }
    }

}
</script>
<style scoped></style>