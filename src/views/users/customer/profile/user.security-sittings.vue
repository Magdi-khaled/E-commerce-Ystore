<template>
    <userNavbar v-if="tuser == 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="h-full w-full flex border-t-2">
        <userSidebarComponent class="w-3/12" v-model="clicked" :clicked="clicked">
        </userSidebarComponent>

        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-8 md:p-12">
                <h1 class="font-bold text-3xl">Security Sittings</h1>
                <div class="w-full h-fit bg-white p-6 sm:p-10 mt-8 ">
                    <h1 class="font-bold capitalize text-xl">Security</h1>
                    <div class="w-full flex flex-wrap gap-4 my-4 items-end">
                        <div class="w-5/12 sm:w-4/12 flex flex-col capitalize">
                            <label :for="user.password">password</label>
                            <input type="password" :id="user.password" autocomplete="off" disabled
                                v-model="user.password"
                                class="w-full mt-2 cursor-not-allowed user-none py-3 px-2 border-2 rounded-sm">
                        </div>
                        <baseButton @click="changePass = true" :style="{ padding: '13px 0', color: '#000000' }"
                            class="w-6/12 sm:w-3/12 bg-gray-100 border-2 border-gray-300 rounded-md whitespace-nowrap">
                            Change password
                        </baseButton>
                    </div>
                </div>
                <userChangePasswordModal v-model="changePass" :changePass="changePass"></userChangePasswordModal>

                <div class="w-full h-fit bg-white p-6 sm:p-10 mt-8 ">
                    <h1 class="font-bold  capitalize text-xl">Account Deletion</h1>
                    <button class="font-bold text-lg text-red-500 underline underline-offset-8 hover:no-underline my-2">
                        Delete your account
                    </button>
                    <p class="font-medium text-gray-500">
                        We are sad to see you go, but hope to see you again!
                    </p>
                </div>
            </div>
        </div>

    </div>
    <profileFooter></profileFooter>
</template>
<script>

import baseNavbar from '../../../../components/baseNavbar.vue';
import baseButton from '../../../../components/baseButton.vue';
import userSidebarComponent from '../../../../components/user/userSidebarComponent.vue';
import userNavbar from '../../../../components/user/userNavbar.vue';
import userChangePasswordModal from '../../../../components/user/userChangePasswordModal.vue';
import profileFooter from '../../../../components/profileFooter.vue';

export default {
    components: {
        baseNavbar, userNavbar, baseButton, userSidebarComponent, userChangePasswordModal, profileFooter
    },
    data() {
        return {
            clicked: 7,
            tuser: localStorage.getItem('user'),
            changePass: false,
            user: {
                email: 'magdikhaled23s@gmail.com',
                password: '123412341234',
            },
        }
    }

}
</script>
<style scoped></style>