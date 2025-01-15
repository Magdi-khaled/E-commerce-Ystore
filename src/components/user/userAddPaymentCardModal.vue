<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50"
            @click="updateShowForm()">
            <div class="w-11/12 md:w-7/12 lg:w-6/12  h-fit bg-white p-1 border-2 border-gray-300 rounded-md relative"
                @click.stop>
                <div class="flex items-center justify-between p-2">
                    <h1 class="font-bold capitalize text-xl">Change password</h1>
                    <button @click="updateShowForm()">
                        <i class="fa-solid fa-xmark text-2xl"></i>
                    </button>
                </div>
                <hr>
                <form @submit.prevent="onSubmit"
                    class="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mt-2 p-2">
                    <div class="flex items-center capitalize">
                        <label :for="cardNumber" class="w-28 font-medium pr-2 whitespace-nowrap text-sm md:text-md">card
                            number
                        </label>
                        <input type="text" :id="cardNumber" v-model="cardNumber" placeholder="5482 1234 5678 9999"
                            class="py-2 px-1 border-2 rounded-md font-medium tracking-wide w-full sm:w-7/12 text-xs sm:text-md">
                    </div>
                    <div class="flex items-center capitalize">
                        <label :for="author" class="w-28 font-medium pr-2 whitespace-nowrap ">Author
                        </label>
                        <input type="text" :id="author" v-model="author" placeholder="Tomas shelpy"
                            class="py-2 px-1 border-2 rounded-md font-medium w-full sm:w-7/12 uppercase  text-xs sm:text-md">
                    </div>
                    <div class="flex items-center capitalize">
                        <label :for="cvv"
                            class="w-28 font-medium pr-2 whitespace-nowrap uppercase text-xs sm:text-md">cvv
                        </label>
                        <input type="text" :id="cvv" v-model="cvv" placeholder="123"
                            class="py-2 px-1 border-2 rounded-md font-medium w-full sm:w-7/12 text-xs sm:text-md">
                    </div>
                    <div class="flex items-center capitalize">
                        <label :for="expiry" class="w-28 font-medium pr-2 whitespace-nowrap text-sm sm:text-md">
                            expiry date
                        </label>
                        <input type="text" :id="expiry" v-model="expiry" placeholder="month / year"
                            class="py-2 px-1 border-2 rounded-md font-medium w-full sm:w-7/12 text-sm sm:text-md">
                    </div>
                    <div class="flex items-center capitalize">
                        <label :for="bankname" class="w-28 font-medium pr-2 whitespace-nowrap capitalize ">
                            bank name
                        </label>
                        <input type="text" :id="bankname" v-model="bankname" placeholder="bank misr"
                            class="py-2 px-1 border-2 rounded-md font-medium w-full sm:w-7/12 uppercase text-xs sm:text-md">
                    </div>
                    <div class="m-auto w-full text-end">
                        <baseButton @click="addPaymentCard()"
                            class="w-full sm:w-10/12 md:w-10/12 mr-2 rounded-md whitespace-nowrap text-md"
                            :style="{ padding: '8px' }" :class="{ 'disabled': false }">
                            confirm payment card
                        </baseButton>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>
<script>

import baseButton from '../baseButton.vue';
export default {
    name: 'userAddPaymentCardModal',
    components: { baseButton },
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            cardNumber: '',
            author: '',
            cvv: '',
            bankname: '',
            expiry: '',
            disabled: true,
            submitted: false
        }
    },
    computed: {
        showForm: {
            get() {
                this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        },
        disabledOff() {
            if (this.cardNumber) {
                this.disabled = false;
            }
            else this.disabled = true;
            return this.disabled;
        },
    },
    watch: {
        show(newValue) {
            // Toggle body scroll when modal is opened or closed
            document.body.style.overflow = newValue ? "hidden" : "auto";
        },
    },
    methods: {
        updateShowForm() {
            this.showForm = false;
            this.clearForm();
        },
        addPaymentCard() {
            this.disabled = true;
            this.showForm = false;
            this.clearForm();
        },
        clearForm() {
            if (!this.showForm) {
                this.cardNumber = '';
                this.author = '';
                this.cvv = '';
                this.bankname = '';
                this.expiry = '';
            }
        },
    }
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