<template>
    <transition name="fade">
        <div v-if="changePass" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            @click="updateShowForm()">
            <div class="w-9/12 sm:w-6/12 md:w-5/12 lg:w-3/12  h-fit bg-white p-1 border-2 border-gray-300 rounded-md relative"
                @click.stop>

                <div class="flex items-center justify-between p-2">
                    <h1 class="font-bold capitalize text-xl">Change password</h1>
                    <button @click="updateShowForm()">
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
                        <input type="password" id="confirmNewPassword" placeholder="Confirm new password"
                            autocomplete="off" v-model="confirmNewPassword" class="p-2 my-1 border-2 rounded-sm">
                        <p v-if="newPassword != confirmNewPassword"
                            class="normal-case text-red-600 font-medium text-sm">
                            must match with new passsword *</p>
                    </div>
                    <baseButton class="mt-4 rounded-md" :style="{ padding: '12px' }"
                        :class="{ 'disabled': disabledOff }" @click="updatePassword()">
                        update password
                    </baseButton>
                </form>
            </div>
        </div>
    </transition>
</template>
<script>
import baseButton from '../baseButton.vue';
export default {
    name: 'changePasswordModal',
    components: { baseButton },
    props: {
        changePass: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            disabled: true,
            submitted: false
        }
    },
    computed: {
        showForm: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        },
        disabledOff() {
            if (this.currentPassword == '1234' && this.newPassword === this.confirmNewPassword && this.newPassword) {
                this.disabled = false;
            }
            else this.disabled = true;
            return this.disabled;
        },
    },
    watch: {
        changePass(newValue) {
            // Toggle body scroll when modal is opened or closed
            document.body.style.overflow = newValue ? "hidden" : "auto";
        },
    },
    methods: {
        updateShowForm() {
            this.showForm = false;
            this.clearForm();
        },
        updatePassword() {
            this.disabled = true;
            this.showForm = false;
            this.clearForm();
        },
        clearForm() {
            if (!this.showForm) {
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmNewPassword = '';
            }
        }
    },

}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>