<template>
    <ADNavigation />
    <BaseTeleport :show="success" :type="'success'">Information Updated Successfully</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <!-- <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duraion-200"></i>
        </button> -->
        Wrong input data
    </BaseTeleport>
    <section class="bg-gray-100 p-2 sm:p-6">
        <div class="flex justify-end">
            <BaseButton class="text-sm sm:text-md px-2 sm:px-6 py-[6px] sm:py-[10px]"
                @click="this.$router.push({ name: 'AD-Dashboard' })">
                back to dashboard <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
            </BaseButton>
        </div>
        <div class="bg-white px-6 py-4 my-4 shadow-sm">
            <h1 class="text-lg font-semibold mb-4 capitalize">seller info</h1>
            <form @submit.prevent="!hideChangeInfo && updateInfo()" class="w-full my-2">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <Field type="text" label="name" name="name" v-model="seller.name" :hide="true" />
                    <Field type="email" label="email" name="email" v-model="seller.email" :hide="true" />
                    <Field type="text" label="phone" name="phone" placeholder="Phone Number" v-model="seller.phone"
                        @handleChange="handleChangeInfo" />
                    <Field type="text" label="address" name="address" placeholder="Adress" v-model="seller.address"
                        @handleChange="handleChangeInfo" />
                </div>
                <div class="w-full mt-4 flex justify-end">
                    <BaseButton @click="!hideChangeInfo && updateInfo()"
                        class="w-5/12 sm:w-2/12 py-[8px] text-sm sm:text-md" :disabled="hideChangeInfo">
                        confirm
                    </BaseButton>
                </div>
            </form>
        </div>
        <div class="bg-white p-6 my-4 shadow-sm">
            <h1 class="text-lg font-semibold mb-4 capitalize">shopping info</h1>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Field type="text" label="shop_Id" name="sId" v-model="shop.id" :hide="true" />
                <Field type="text" label="name" name="sName" v-model="shop.name" :hide="true" />
                <Field type="text" label="hotline (phone)" name="sPhone" v-model="shop.hotline" :hide="true" />
                <Field type="text" label="address (Onsite)" name="sAddress" v-model="shop.address" :hide="true" />
                <Field type="text" label="rate" name="rate" v-model="shop.rate" :hide="true" />
                <Field type="text" label="in stock (availble products)" name="stock" v-model="shop.stock"
                    :hide="true" />
            </div>
        </div>
        <div class="bg-white p-6 my-4 shadow-sm">
            <h1 class="text-lg font-semibold mb-4 capitalize">{{ shop.name }} wallet (Net Revenue)</h1>
            <div class="grid grid-cols-1">
                <p class="font-semibold capitalize text">total balance:
                    <span class="text-blue-800 text-xl">{{ shop.balance }} l.e</span>
                </p>
            </div>
            <hr class="my-4">
            <div>
                <h1 class="text-lg font-semibold mb-4 capitalize">Your Bank Account</h1>
                <div class="grid grid-cols-4 gap-4">
                    <Field type="text" label="owner name" name="ownerName" v-model="seller.bankAccount.name"
                        :hide="true" />
                    <Field type="text" label="card number" name="cardNumber" v-model="hashCardNumber" :hide="true" />
                    <Field type="text" label="bank name" name="bankName" v-model="seller.bankAccount.bankName"
                        :hide="true" />
                </div>
            </div>
        </div>
        <div class="bg-white p-6 my-4 shadow-sm">
            <h1 class="text-lg font-semibold mb-4 capitalize">security sittings</h1>
            <hr class="my-4">
            <div>
                <div>
                    <form class="grid grid-cols-1 gap-4" @submit.prevent="!hideChangePassword && updatePassword()">
                        <Field type="password" label="current password" name="currentPassword"
                            placeholder="current password" v-model="currentPassword"
                            @handleChange="handleChangePassword" />

                        <Field type="password" label="new password" name="newPassword" v-model="newPassword"
                            placeholder="new password" @handleChange="handleChangePassword" />

                        <Field type="password" label="repeate new password" name="confirmNewPassword"
                            v-model="confirmNewPassword" placeholder="repeate new password"
                            @handleChange="handleChangePassword" />

                        <div class="w-full mt-4 flex justify-end">
                            <BaseButton @click="!hideChangePassword && updatePassword"
                                class="w-5/12 sm:w-2/12 py-[8px] text-sm sm:text-md" :disabled="hideChangePassword">
                                update
                            </BaseButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <ADFooter />
</template>

<script>
import ADNavigation from '../../../../../components/admin/ADNavigation.vue';
import BaseButton from '../../../../../components/BaseButton.vue';
import Field from '../../../../../components/form/Field.vue';
import BaseTeleport from '../../../../../components/BaseTeleport.vue';
import ADFooter from '../../../../../components/InFooter.vue';

export default {
    components: { ADNavigation, Field, BaseTeleport, BaseButton, ADFooter },
    data() {
        return {
            success: false,
            failed: false,
            seller: {
                name: 'Magdi Khaled',
                email: 'magdikhaled23s@gmail.com',
                phone: '+02 01122368948',
                address: 'Egypt, Giza, Al Jizah',
                bankAccount: {
                    name: 'Magdi Khaled Kelany Hassouna',
                    accountNumber: '5842 3456 8201 0091',
                    bankName: 'Egyptian Arab Land Bank',
                }
            },
            shop: {
                id: this.$route.params.sId,
                name: this.$route.params.shopName,
                address: 'Egypt, Cairo, Nasr City',
                hotline: '19611 / +201065390754',
                rate: `${4.4}/5`,
                stock: 156,
                balance: 5635.0
            },
            hideChangeInfo: true,
            hideChangePassword: true,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    },
    computed: {
        hashCardNumber() {
            let hashedCard = this.seller.bankAccount.accountNumber;
            hashedCard = hashedCard.split(' ')[0] + ' **** **** **' + hashedCard.split(' ')[3].split('').slice(2).join('');
            return hashedCard;
        }
    },
    methods: {
        updateInfo() {
            console.log(this.seller.name);
            console.log(this.seller.address);
            console.log(this.seller.phone);
            this.success = true;
            setTimeout(() => { this.success = false }, 2000)
        },
        updatePassword() {
            if (!this.currentPassword) {
                console.log("Current password is incorrect");
                this.failed = true;
                setTimeout(() => { this.failed = false }, 2000);
                return;
            }
            if (this.newPassword !== this.confirmNewPassword) {
                console.log("New passwords do not match");
                this.failed = true;
                setTimeout(() => { this.failed = false }, 2000);
                return;
            }
            console.log(this.currentPassword, this.newPassword, this.confirmNewPassword);
            this.success = true;
            setTimeout(() => { this.success = false }, 2000);
        },
        handleChangeInfo() {
            this.hideChangeInfo = false;
        },
        handleChangePassword() {
            this.hideChangePassword = false;  // Allow the button to be enabled
        }
    }
}
</script>