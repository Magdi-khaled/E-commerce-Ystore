<template>
    <UserNavbar />
    <div class="h-full w-full flex border-t-2">
        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <UserSidebar v-model="clicked" :clicked="clicked" />
        </div>
        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <div class="w-full flex justify-between items-center">
                    <h1 class="font-bold text-xl sm:text-2xl capitalize">payment cards</h1>
                    <baseButton @click="modalActive = true" class="rounded-md text-sm sm:text-md"
                        :style="{ padding: '10px 16px' }">
                        add new card <i class="fa-solid fa-plus-large pl-1 text-sm"></i>
                    </baseButton>
                </div>
                <div v-if="!user.paymentcards.length">
                    <div class="flex flex-col items-center my-12">
                        <div class="grayscale w-7/12 sm:w-4/12 text-center">
                            <img class="rounded-full w-full"
                                src="../../../../assets/images/user/customer/credit-card.svg" alt="">
                        </div>
                        <div class="text-center mt-4">
                            <h1 class="font-bold text-lg text-gray-700 ">
                                No saved cards</h1>
                            <p class="font-medium text-gray-400 text-sm sm:text-md">
                                Cards saved during the checkout process will display here.
                                We use encrypted methods to store your details securely</p>
                        </div>
                    </div>
                </div>

                <div v-else class="mb-36 sm:mb-28 mt-4">
                    <div v-for="(item, index) in user.paymentcards" :key="index"
                        class="my-4 w-full bg-white rounded-md p-4">
                        <PaymentCard :card="item" />
                        <!-- <userPaymentComponent :cards="user.paymentcards"></userPaymentComponent> -->
                    </div>
                </div>
            </div>
        </div>

        <BaseModal :modalActive="modalActive" @close-modal="modalActive = false">
            <div class="flex items-center justify-between p-2">
                <h1 class="font-bold capitalize text-xl">Change password</h1>
                <button @click="updateShowForm">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </button>
            </div>
            <hr>
            <form @submit.prevent="onSubmit" class="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mt-2 p-2">
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
                    <label :for="cvv" class="w-28 font-medium pr-2 whitespace-nowrap uppercase text-xs sm:text-md">cvv
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
                    <BaseButton @click="addPaymentCard"
                        class="w-full sm:w-10/12 md:w-10/12 mr-2 rounded-md whitespace-nowrap text-md"
                        :style="{ padding: '8px' }" :class="{ 'disabled': disabledOff }">
                        confirm payment card
                    </BaseButton>
                </div>
            </form>
        </BaseModal>
    </div>
    <InFooter />
</template>
<script>
import BaseButton from '../../../../components/BaseButton.vue';
import BaseModal from '../../../../components/BaseModal.vue';
import UserSidebar from '../../../../components/user/UserSidebar.vue';
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import PaymentCard from '../../../../components/user/PaymentCard.vue';
import InFooter from '../../../../components/InFooter.vue';
export default {
    components: {
        UserNavbar, BaseButton, UserSidebar, PaymentCard, BaseModal, InFooter
    },
    data() {
        return {
            clicked: 5,
            user: {
                paymentcards: [
                    {
                        id: 1,
                        number: this.handleCardNum('5482791988234456'),
                        author: 'magdi khaled kelany hassouna',
                        type: 'visa master card',
                        bank: 'bank misr',
                        expiry: '02/26',
                        cvv: '336',
                    },
                    {
                        id: 2,
                        number: this.handleCardNum('5482791972345567'),
                        author: 'youssef tarek salah',
                        type: 'credit card',
                        bank: 'CIB',
                        expiry: '04/26',
                        cvv: '412',
                    },
                ],
            },
            modalActive: false,
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
        disabledOff() {
            if (this.cardNumber) {
                this.disabled = false;
            }
            else this.disabled = true;
            return this.disabled;
        },
    },
    methods: {
        handleCardNum(text) {
            console.log(text);
            let lastIndex = 0;
            let newText = '';
            for (let index = 1; index <= text.length; index++) {
                if (index % 4 === 0) {
                    newText += text.slice(lastIndex, index) + ' ';
                    lastIndex = index;
                }
            }
            return newText;
        },
        updateShowForm() {
            this.modalActive = false;
            this.clearForm();
        },
        addPaymentCard() {
            this.disabled = true;
            this.modalActive = false;
            this.clearForm();
        },
        clearForm() {
            if (!this.modalActive) {
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