<template>

    <UserNavbar />
    <div class="h-full w-full flex border-t-2">

        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <UserSidebar v-model="clicked" :clicked="clicked" />
        </div>
        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <h1 class="font-bold text-2xl capitalize">orders</h1>
                <p class="text-gray-400 text-lg font-medium py-1">
                    View the delivery status for items and your orders history
                </p>
                <div class="w-full mt-6 flex gap-4 justify-end ">
                    <label for="order-search"
                        class="w-full sm:w-4/12 p-3 sm:p-4 bg-white border-2 rounded-md flex flex-nowrap items-center">
                        <i class="fa-solid fa-magnifying-glass text-gray-400 pr-2"></i>
                        <input id="order-search" type="text" placeholder="Find Items" class="pr-4 w-10/12 outline-none">
                    </label>
                    <label for="orderhistory" class="relative border-2 rounded-md">
                        <select id="orderhistory" class="appearance-none cursor-pointer p-3 sm:p-4 rounded-md"
                            v-model="orderhistory">
                            <option value="Last 3 months" selected>Last 3 months</option>
                            <option value="Last 6 months">Last 6 months</option>
                            <option :value="currentDate.getFullYear()">{{ currentDate.getFullYear() }}</option>
                        </select>
                        <i class="fa-sharp fa-solid fa-caret-down absolute top-4 sm:top-5 right-3"></i>
                    </label>
                </div>

                <div v-if="!user.orders" class="flex flex-col items-center my-20">
                    <div class="grayscale">
                        <img src="@/assets/media/user/customer/orders.svg" alt="">
                    </div>
                    <div class="text-center mt-4">
                        <h1 class="font-bold text-lg text-gray-700 "> No items found </h1>
                        <p class="font-medium text-gray-400 text-sm sm:text-md"> We couldn't find any items that
                            matched
                            your search in the
                            given time period</p>
                    </div>
                </div>
                <OrderCard v-else :orders="user.orders" :type="'order'" />

            </div>
        </div>
    </div>
    <InFooter />
</template>
<script>

import UserNavbar from '../../../../components/user/UserNavbar.vue';
import UserSidebar from '../../../../components/user/UserSidebar.vue';
import OrderCard from '../../../../components/user/OrderComponent.vue';
import InFooter from '../../../../components/InFooter.vue';

export default {
    components: {
        UserNavbar, UserSidebar, OrderCard, InFooter
    },
    data() {
        return {
            clicked: 3,
            currentDate: new Date(),
            orderhistory: new Date().getFullYear(),
            user: {
                email: 'magdikhaled23s@gmail.com',
                password: '123412341234',
                fname: 'magdi',
                lname: 'khaled',
                gender: 'Male',
                phone: '+0201065390754',
                address: 'Giza - El Warrak',
                birthdate: '2002-02-23',
                nationality: 'Egypt',
                orders: [
                    {
                        orderId: '886542412',
                        title: 'Vertical T-shirt Order',
                        message: `order is delivered to you successfully.`,
                        date: new Date(),
                    }, {
                        orderId: '8454232122',
                        title: 'Vertical T-shirt Order',
                        message: `order is delivered to you successfully.`,
                        date: new Date(),
                    },
                ]
            },
        }
    }

}
</script>
<style scoped></style>