<template>
    <BaseTeleport :show="success" :type="'success'">Checkout Done successfully</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <!-- <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duration-200"></i>
        </button> -->
        <p>6-digit Code is Wrong</p>
    </BaseTeleport>
    <div class="">
        <div class="flex justify-between items-center m-4">
            <BaseButton class="text-sm sm:text-md px-2 sm:px-6 py-[6px] sm:py-[10px]"
                @click="this.$router.push({ name: 'User-Cart' })">
                <i class="fa-duotone fa-regular fa-chevrons-left pr-2"></i>
                back to shopping cart
            </BaseButton>
        </div>

        <hr>
        <main class="flex h-screen">
            <div class="checkout-process w-full lg:w-8/12 p-4 bg">
                <h1 class="capitalize text-2xl font-semibold">checkout</h1>
                <div class="my-4">
                    <CheckoutProgress :progress="currentProgress" />
                </div>
                <div class="w-full md:w-10/12 m-auto mt-20">
                    <Form v-if="currentProgress === 0" class="grid grid-cols-2 gap-4">
                        <div class="col-span-2 flex gap-x-8">
                            <label for="paidMethod1" class="capitalize flex items-center gap-2">
                                <input type="radio" name="paidMethod" id="paidMethod1" value="cash"
                                    class="appearance-none w-4 h-4 rounded-full border-2 border-gray-500 transition-all duration-75"
                                    :class="{ 'fa-solid fa-circle-check border-none': paidMethod === 'cash' }"
                                    v-model="paidMethod">
                                cash
                            </label>
                            <label for="paidMethod2" class="capitalize flex items-center gap-2">
                                <input type="radio" name="paidMethod" id="paidMethod2" value="credit"
                                    class="appearance-none w-4 h-4 rounded-full border-2 border-gray-500  transition-all duration-75"
                                    :class="{ 'fa-solid fa-circle-check border-none': paidMethod === 'credit' }"
                                    v-model="paidMethod">
                                credit/bank account
                            </label>
                        </div>
                        <Field label="first name" name="fName" type="text" v-model="fName"
                            placeholder="Enter First Name" />

                        <Field label="last name" name="lName" type="text" v-model="lName"
                            placeholder="Enter Last Name" />

                        <Field label="country" name="country" type="select" v-model="country"
                            :options="countries ?? ['egypt']" :optionsType="'select country'"
                            placeholder="Enter Address" />

                        <Field label="state/city" name="state" type="select" v-model="state"
                            :options="states ?? ['giza']" :optionsType="'select state'" />
                        <Field label="address/location" name="address1" type="text" v-model="address1"
                            placeholder="Enter Address" class="col-span-2" />

                        <Field label="email address" name="email" type="email" v-model="email"
                            placeholder="Enter Email Address" class="col-span-1" />

                        <Field label="phone number" name="phone" type="text" v-model="phone"
                            placeholder="Enter Valid Phone Number" />
                        <div class="col-span-2 flex justify-end mt-4">
                            <BaseButton @click="goApplication"
                                class="w-6/12 sm:w-4/12 md:w-3/12 text-sm md:text-md py-[8px] flex justify-evenly items-center gap-0 hover:gap-4 transition-all duration-200">
                                next step <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                            </BaseButton>
                        </div>
                    </Form>

                    <Form v-else-if="currentProgress === 50" class="grid grid-cols-2 gap-4">
                        <Field label="card number" name="cardnumber" type="text" v-model="cardNumber"
                            placeholder="5482 1234 5678 9999" class="colspan" />
                        <Field label="author name" name="author" type="text" v-model="author" placeholder="John Doe" />
                        <Field label="bank name" name="bank" type="text" v-model="bank" placeholder="Enter Bank Name" />
                        <Field label="CVV" name="cvv" type="text" v-model="cvv" placeholder="CVV" maxLen="3" />
                        <Field label="expiry date" name="expiry" type="text" v-model="expiry" maxLen="5"
                            placeholder="MM/YY" />

                        <div class="col-span-2 flex justify-between mt-4">
                            <BaseButton @click="currentProgress = 0"
                                class="w-5/12 sm:w-4/12 md:w-3/12 text-sm md:text-md py-[8px] flex justify-evenly items-center gap-0 hover:gap-4 transition-all duration-200">
                                <i class="fa-duotone fa-regular fa-chevrons-left pl-2"></i>
                                previous step
                            </BaseButton>
                            <BaseButton @click="currentProgress = 100"
                                class="w-5/12 sm:w-4/12 md:w-3/12 text-sm md:text-md py-[8px] flex justify-evenly items-center gap-0 hover:gap-4 transition-all duration-200">
                                next step <i class="fa-duotone fa-regular fa-chevrons-right pl-2"></i>
                            </BaseButton>
                        </div>
                    </Form>

                    <Form v-else-if="currentProgress === 100" class="grid grid-cols-1 gap-4"
                        @submit.prevent="confirmPayment">
                        <div
                            class="col-span-1/2 sm:col-span-1 flex flex-wrap sm:flex-nowrap items-center justify-center my-4 gap-3">
                            <p class="text-gray-600 w-6/12">
                                Enter 6-digit code we sent to your mail or phone's text messages on <br>
                                <span class="font-semibold">{{ email || 'magdikhaled23s@gmail.com' }}</span> or
                                <span class="font-semibold">{{ phone || '011******48' }}</span>
                            </p>

                            <label for="Code" class="w-6/12">
                                <p class="after:content-['*'] after:text-red-500 font-medium text-sm sm:text-md">
                                    Verfication Code</p>
                                <input type="text" name="Code" id="Code" placeholder="6 digits code" maxlength="6"
                                    @change="confirmPayment()" v-model="verfiyCode" class="w-full border-[2px] border-b-[3px]
                                    border-b-gray-600 text-sm sm:text-md p-2 bg-gray-100 outline-none text-gray-700"
                                    oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                                <div v-show="verfiyError" class=" text-red-500 text-sm">Verfication code is
                                    wrong</div>
                            </label>
                        </div>
                        <div class="col-span-2 flex justify-between mt-4">
                            <BaseButton @click="currentProgress = 50"
                                class="w-5/12 sm:w-4/12 md:w-3/12 py-[8px] text-sm md:text-md flex justify-evenly items-center gap-0 hover:gap-4 transition-all duration-200">
                                <i class="fa-duotone fa-regular fa-chevrons-left pl-2"></i>
                                previous step
                            </BaseButton>
                            <BaseButton @click="confirmPayment" class="w-5/12 sm:w-4/12 md:w-3/12 py-[8px] text-sm md:text-md flex justify-evenly 
                                items-center gap-0 hover:gap-2 transition-all duration-200">
                                confirm payment <i class="fa-regular fa-circle-check"></i>
                            </BaseButton>
                        </div>
                    </Form>
                </div>
            </div>
            <div class="cart-items hidden lg:block w-4/12 bg-gray-50 p-2 md:p-4 border-l-2">
                <CheckoutComponent :checkout="true" :subTotal="subTotal" :discount="discount"
                    :deliveryFees="deliveryFees" />
                <h1 class="font-semibold text-lg capitalize my-1">cart orders</h1>
                <hr>
                <div v-for="(item, index) in cartItems" class="cart-item flex items-center border-b-2 relative">
                    <CartCardComponent :item="item" :checkout="true" />
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import BaseTeleport from '../../../../components/BaseTeleport.vue';
import BaseButton from '../../../../components/BaseButton.vue';
import CheckoutProgress from '../../../../components/shop/CheckoutProgress.vue';
import CheckoutComponent from '../../../../components/shop/CheckoutComponent.vue';
import CartCardComponent from '../../../../components/shop/CartCardComponent.vue';
import Field from '../../../../components/form/Field.vue';
import db from '../../../../assets/db/shop.categories.data.json';

import { mapActions, mapGetters } from 'vuex';
import { inject } from 'vue';
import { Form } from 'vee-validate'

import emailjs from 'emailjs-com';

export default {
    components: { BaseTeleport, BaseButton, CheckoutComponent, CheckoutProgress, CartCardComponent, Form, Field },
    data() {
        return {
            success: false,
            failed: false,
            outStock: false,
            promoCode: '',
            deliveryFees: 15.5,
            subTotal: 0,
            discount: 0,
            currentProgress: localStorage.getItem('currentProgress'),
            fName: '',
            lName: '',
            phone: '',
            email: '',
            address1: '',
            address2: '',
            state: '',
            zip: '',
            country: '',
            paidMethod: '',
            cardNumber: '',
            author: '',
            cvv: '',
            bank: '',
            expiry: '',
            randomCode: '',
            verfiyCode: '',
            verfiyError: false,
            // local_db_data
            countries: db.countries,
            states: db.states,
        }
    },
    setup() {
        const handlePrice = inject('handlePrice');
        return { handlePrice }
    },
    created() {
        this.fetchData();
    },
    computed: {
        ...mapGetters(['Get_CartItems']),
        cartItems() {
            return this.Get_CartItems;
        }
    },
    methods: {
        ...mapActions(['FetchCartItems']),
        async fetchData() {
            try {
                await this.FetchCartItems();
                this.initData();
            } catch (err) {
                console.error('Fetching Error: ', err.message);
            }
        },
        async sendEmail() {
            const serviceID = 'service_iaktjtk';
            const templateID = 'template_3myhsci';
            const userID = 'zwR9wJwvHIopE2KFI';
            this.randomCode = Math.floor(100000 + Math.random() * 900000);
            try {
                const response = await emailjs.send(serviceID, templateID, {
                    to_email: this.email,
                    code: this.randomCode,
                }, userID);
                console.log('Email sent successfully!', response);
            } catch (error) {
                console.error('Failed to send email:', error);
            }
        },
        initData() {
            this.cartItems.forEach(item => {
                this.subTotal += this.handlePrice(item.price, item.sale) * item.orderQuantity;
                this.discount += (item.sale / 100) * item.price * item.orderQuantity;
            });
            this.currentProgress = 0;
            localStorage.setItem('currentProgress', this.currentProgress)
        },
        goApplication() {
            this.currentProgress = 50;
            this.sendEmail();
            localStorage.setItem('currentProgress', this.currentProgress)
        },
        confirmPayment() {
            console.log('verfiyCode', this.verfiyCode);
            console.log('randomCode', this.randomCode);

            if (this.randomCode == this.verfiyCode) {
                this.success = true;
                setTimeout(() => { this.success = false }, 3000);
                this.verfiyError = false;
                this.success = true;
                setTimeout(() => {
                    this.success = false;
                    this.$router.push({ name: 'User-Orders' });
                }, 2000);
                localStorage.setItem('currentProgress', 0)
                return false;
            }
            this.verfiyError = true;
            this.failed = true;
            setTimeout(() => { this.failed = false }, 3000);
            return true;
        },
        handleQuantity(type, item) {
            if (type) {
                if (item.orderQuantity === item.quantity + 1) {
                    this.outStock = true;
                    return;
                }
                item.orderQuantity++;
            }
            else {
                if (item.quantity == 1) return;
                item.orderQuantity--;
                this.outStock = false;
            }
        },
    }
}
</script>
