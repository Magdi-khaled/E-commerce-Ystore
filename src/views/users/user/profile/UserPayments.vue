<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
import UserNavbar from '@/components/user/UserNavbar.vue';
import PaymentCard from '@/components/user/PaymentCard.vue';
import Field from '@/components/form/Field.vue';
import InFooter from '@/components/InFooter.vue';
import { reactive, ref, computed } from 'vue';

const clicked = ref(5);
const modalActive = ref(false);
const cardNumber = ref('');
const author = ref('');
const cvv = ref('');
const bankname = ref('');
const expiry = ref('');
const disabled = ref(true);
const submitted = ref(false);

const handleCardNum = (text) => {
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
};

const user = reactive({
    paymentcards: [
        {
            id: 1,
            number: handleCardNum('5482791988234456'),
            author: 'magdi khaled kelany hassouna',
            type: 'visa master card',
            bank: 'bank misr',
            expiry: '02/26',
            cvv: '336',
        },
        {
            id: 2,
            number: handleCardNum('5482791972345567'),
            author: 'youssef tarek salah',
            type: 'credit card',
            bank: 'CIB',
            expiry: '04/26',
            cvv: '412',
        },
    ],
});

const disabledOff = computed(() => {
    if (cardNumber.value) {
        disabled.value = false;
    }
    else disabled.value = true;
    return disabled.value;
});

const updateShowForm = () => {
    modalActive.value = false;
    clearForm();
};
const addPaymentCard = () => {
    disabled.value = true;
    modalActive.value = false;
    clearForm();
};
const clearForm = () => {
    if (!modalActive.value) {
        cardNumber.value = '';
        author.value = '';
        cvv.value = '';
        bankname.value = '';
        expiry.value = '';
    }
};
</script>

<template>
    <UserNavbar />
    <div class="h-full w-full flex border-t-2">
        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <UserSidebar v-model:clicked="clicked" />
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
                            <img class="rounded-full w-full" src="@/assets/media/user/customer/credit-card.svg" alt="">
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
                    </div>
                </div>
            </div>
        </div>

        <BaseModal v-model:modalActive="modalActive">
            <div class="flex items-center justify-between p-2">
                <h1 class="font-bold capitalize text-xl">Add Payment Card</h1>
                <button @click="updateShowForm">
                    <i class="fa-solid fa-xmark text-2xl"></i>
                </button>
            </div>
            <hr>
            <form @submit.prevent="onSubmit"
                class="w-full grid grid-cols-1 sm:grid-cols-2 items-end gap-y-3 gap-x-8 mt-2 p-2">
                <Field label="card number" name="cardNumber" placeholder="5482 1234 5678 9999" v-model="cardNumber" />

                <Field label="author" name="author" placeholder="Jhon Doe" v-model="author" />

                <Field label="CVV" name="cvv" placeholder="123" v-model="cvv" />

                <Field label="expiry date" name="expiry" placeholder="mm/yy" v-model="expiry" />

                <Field label="bank name" name="bankname" placeholder="Bank Misr" v-model="bankname" />

                <BaseButton @click="addPaymentCard" class="w-full mr-2 rounded-md whitespace-nowrap text-md"
                    :style="{ padding: '14px' }" :class="{ 'disabled': disabledOff }">
                    save
                </BaseButton>
            </form>
        </BaseModal>
    </div>
    <InFooter />
</template>