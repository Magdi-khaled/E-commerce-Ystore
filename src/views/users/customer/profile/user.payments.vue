<template>

    <userNavbar v-if="tuser == 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="h-full w-full flex border-t-2">
        <userSidebarComponent class="w-3/12" v-model="clicked" :clicked="clicked">
        </userSidebarComponent>
        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <h1 class="font-bold  text-3xl capitalize">payment cards</h1>
                <div class="w-full mt-6 flex justify-end">
                    <baseButton @click="showAddCardForm = true" class="rounded-md" :style="{ padding: '10px 16px' }">
                        add new card <i class="fa-solid fa-plus-large pl-1 text-sm"></i>
                    </baseButton>
                </div>
                <userAddPaymentCardModal v-model="showAddCardForm" :show="showAddCardForm"></userAddPaymentCardModal>
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
                <userPaymentComponent v-else :cards="user.paymentcards"></userPaymentComponent>
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
import userPaymentComponent from '../../../../components/user/userPaymentComponent.vue';
import userAddPaymentCardModal from '../../../../components/user/userAddPaymentCardModal.vue';
import profileFooter from '../../../../components/profileFooter.vue';
export default {
    components: {
        baseNavbar, userNavbar,baseButton, userSidebarComponent, userPaymentComponent, userAddPaymentCardModal, profileFooter
    },
    data() {
        return {
            clicked: 5,
            tuser: localStorage.getItem('user'),
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
                ]
            },
            showAddCardForm: false,
        }
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
    }

}
</script>
<style scoped></style>