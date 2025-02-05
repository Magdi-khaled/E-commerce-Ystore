<template>

    <UserNavbar v-if="tuser == 'customer'" />
    <BaseNavbar v-else />
    <div class="h-full w-full flex">

        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <UserSidebar v-model="clicked" :clicked="clicked" />
        </div>

        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <h1 class="font-bold text-2xl capitalize">Notifications</h1>
                <div v-if="!user.notifications.length" class="flex flex-col items-center my-32 sm:my-16">
                    <div class="grayscale w-5/12 sm:w-3/12">
                        <img src="../../../../assets/images/user/customer/notifications.webp" alt="no-notifications">
                    </div>
                    <div class="text-center mt-4">
                        <h1 class="font-bold text-lg text-gray-700 ">
                            No notifications yet</h1>
                        <p class="font-medium text-gray-400 text-sm sm:text-md">
                            Notifactions saved during the checkout process or sent product delivery status.
                        </p>
                    </div>
                </div>

                <div v-else class="w-full h-fit rounded-md bg-white mb-60 mt-8 "
                    :class="{ 'mb-[6rem] ': (user.notifications.length > 1) }">
                    <div class="px-4 pt-2 w-full flex justify-between ">
                        <h1 class="font-bold capitalize text-md sm:text-xl text-gray-500">history</h1>
                        <button class="hover:bg-gray-200 transition duration-150 p-1 rounded-lg">
                            <i class="fa-solid fa-ellipsis-stroke text-md sm:text-xl"></i>
                        </button>
                    </div>
                    <div v-for="(item, index) in user.notifications" :key="index">
                        <Notification :notification="item" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <InFooter />
</template>
<script>
import BaseNavbar from '../../../../components/BaseNavbar.vue';
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import UserSidebar from '../../../../components/user/UserSidebar.vue';
import Notification from '../../../../components/user/Notification.vue';
import InFooter from '../../../../components/InFooter.vue';
export default {
    components: {
        BaseNavbar, UserNavbar, UserSidebar, Notification, InFooter
    },
    data() {
        return {
            clicked: 6,
            tuser: localStorage.getItem('user'),
            user: {
                notifications: [
                    {
                        title: 'Vertical T-shirt Order',
                        message: `The delivery on way to you br at location at time so, our delivery can connect
                            with you.so, please check your location and time again and connect with
                                        delivery in details`,
                        date: new Date(),
                    },
                    {
                        title: 'Vertical T-shirt Order',
                        message: `The delivery on way to you br at location at time so, our delivery can connect
                            with you.so, please check your location and time again and connect with
                                        delivery in details`,
                        date: new Date(),
                    },
                ],
            },
        }
    }

}
</script>
<style scoped></style>