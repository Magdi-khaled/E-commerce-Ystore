<template>
    <userNavbar v-if="tuser == 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="h-full w-full flex border-t-2">
        <userSidebarComponent class="w-3/12" v-model="clicked" :clicked="clicked">
        </userSidebarComponent>

        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <h1 class="font-bold text-3xl capitalize">returns</h1>
                <p class="text-gray-400 text-lg font-medium py-1">
                    View your returns history or file a new return
                </p>
                <div class="w-full mt-6 flex justify-end ">
                    <label for="refundhistory" class="w-6/12 sm:w-4/12 relative border-2 rounded-md">
                        <select id="refundhistory" class="w-full appearance-none cursor-pointer p-3 sm:p-4 rounded-md"
                            v-model="refundhistory">
                            <option value="" selected disabled>Select</option>
                            <option value="Last 3 months">Last 3 months</option>
                            <option value="Last 6 months">Last 6 months</option>
                        </select>
                        <i class="fa-sharp fa-solid fa-caret-down absolute top-4 sm:top-5 right-3"></i>
                    </label>
                </div>

                <div v-if="!user.returns">
                    <div class="flex flex-col items-center my-20">
                        <div class="grayscale">
                            <img src="../../../../assets/images/user/customer/returns.svg" alt="">
                        </div>
                        <div class="text-center mt-4">
                            <h1 class="font-bold text-lg text-gray-700 ">
                                No returns requested</h1>
                            <p class="font-medium text-gray-400 text-sm sm:text-md">
                                You have not requested any previous returns
                            </p>
                        </div>
                    </div>
                </div>
                <userOrderComponent v-else :orders="user.returns" :type="'return'"></userOrderComponent>
            </div>
        </div>
    </div>
    <profileFooter></profileFooter>
</template>
<script>
import baseNavbar from '../../../../components/baseNavbar.vue';
import userSidebarComponent from '../../../../components/user/userSidebarComponent.vue';
import userNavbar from '../../../../components/user/userNavbar.vue';
import userOrderComponent from '../../../../components/user/userOrderComponent.vue';
import profileFooter from '../../../../components/profileFooter.vue';
export default {
    components: {
        baseNavbar, userNavbar, userSidebarComponent, userOrderComponent, profileFooter
    },
    data() {
        return {
            clicked: 4,
            tuser: localStorage.getItem('user'),
            refundhistory: '',
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
                returns: [
                    {
                        orderId: '886542412',
                        title: 'Vertical T-shirt Order',
                        message: `order is returned to us and money is saved in your shop.co wallet.`,
                        date: new Date(),
                    },
                    {
                        orderId: '8454232122',
                        title: 'Vertical T-shirt Order',
                        message: `order is returned to us and money is saved in your shop.co wallet.`,
                        date: new Date(),
                    },
                ],
            },
        }
    }

}
</script>
<style scoped></style>