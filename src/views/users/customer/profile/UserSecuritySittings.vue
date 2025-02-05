<template>
    <UserNavbar v-if="tuser == 'customer'" />
    <BaseNavbar v-else />
    <div class="h-full w-full flex border-t-2">

        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <UserSidebar v-model="clicked" :clicked="clicked" />
        </div>

        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-8 md:p-12">
                <h1 class="font-bold text-2xl">Security Sittings</h1>
                <div class="w-full h-fit bg-white p-6 sm:p-10 mt-8 ">
                    <h1 class="font-bold capitalize text-xl">Security</h1>
                    <div class="w-full flex flex-wrap gap-4 my-4 items-end">
                        <div class="w-5/12 sm:w-4/12 flex flex-col capitalize">
                            <label :for="user.password">password</label>
                            <input type="password" :id="user.password" autocomplete="off" disabled
                                v-model="user.password"
                                class="w-full mt-2 cursor-not-allowed user-none py-3 px-2 border-2 rounded-sm">
                        </div>
                        <BaseButton @click="modalActive = true" :style="{ padding: '13px 0', color: '#000000' }"
                            class="w-6/12 sm:w-3/12 bg-gray-100 border-2 border-gray-300 rounded-md whitespace-nowrap">
                            Change password
                        </BaseButton>
                    </div>
                </div>
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

        <BaseModal v-model="modalActive" @close-modal="modalActive = false" @clear="clearForm"
            :modalActive="modalActive">
            <div class="flex items-center justify-between p-2">
                <h1 class="font-bold capitalize text-xl">Change password</h1>
                <button @click="updateShowForm">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </button>
            </div>
            <hr>
            <form @submit.prevent="onSubmit" class="w-full grid grid-cols-1 mt-2 p-2">
                <div class="flex flex-col capitalize my-2">
                    <label for="currentPassword" class="font-medium">Current password</label>
                    <input type="password" id="currentPassword" placeholder="Current password" autocomplete="off"
                        v-model="currentPassword" class="p-2 my-1 border-2 rounded-sm">
                    <p v-if="currentPassword != '1234' && submitted" class="text-red-600 font-medium text-sm">
                        current password incorrect *</p>
                </div>
                <div class="flex flex-col capitalize my-2">
                    <label for="newPassword" class="font-medium">new password</label>
                    <input type="password" id="newPassword" placeholder="New password" autocomplete="off"
                        v-model="newPassword" class="p-2 my-1 border-2 rounded-sm font-medium">
                </div>
                <div class="flex flex-col capitalize my-2">
                    <label for="confirmNewPassword" class="font-medium">repeat new password</label>
                    <input type="password" id="confirmNewPassword" placeholder="Confirm new password" autocomplete="off"
                        v-model="confirmNewPassword" class="p-2 my-1 border-2 rounded-sm">
                    <p v-if="newPassword != confirmNewPassword" class="normal-case text-red-600 font-medium text-sm">
                        must match with new passsword *</p>
                </div>
                <BaseButton class="mt-4 rounded-md" :style="{ padding: '12px' }" :class="{ 'disabled': disabledOff }"
                    @click="updatePassword">
                    update password
                </BaseButton>
            </form>
        </BaseModal>

    </div>
    <InFooter />
</template>
<script>

import BaseNavbar from '../../../../components/BaseNavbar.vue';
import BaseButton from '../../../../components/BaseButton.vue';
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import UserSidebar from '../../../../components/user/UserSidebar.vue';
import BaseModal from '../../../../components/BaseModal.vue';
import InFooter from '../../../../components/InFooter.vue';

export default {
    components: {
        BaseNavbar, UserNavbar, BaseButton, UserSidebar, BaseModal, InFooter
    },
    data() {
        return {
            clicked: 7,
            tuser: localStorage.getItem('user'),
            modalActive: false,
            user: {
                email: 'magdikhaled23s@gmail.com',
                password: '123412341234',
            },

            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            disabled: true,
            submitted: false
        }
    },
    computed: {
        disabledOff() {
            if (this.currentPassword == '1234' && this.newPassword === this.confirmNewPassword && this.newPassword) {
                this.disabled = false;
            }
            else this.disabled = true;
            return this.disabled;
        },
    },
    watch: {
        modalActive(newValue) {
            // Toggle body scroll when modal is opened or closed
            document.body.style.overflow = newValue ? "hidden" : "auto";
        },
    },
    methods: {
        updateShowForm() {
            this.modalActive = false;
            this.clearForm();
        },
        updatePassword() {
            this.disabled = true;
            this.modalActive = false;
            this.clearForm();
        },
        clearForm() {
            if (!this.modalActive) {
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmNewPassword = '';
            }
        }
    }
}
</script>
<style scoped></style>