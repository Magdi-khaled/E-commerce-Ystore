<template>

    <userNavbar v-if="tuser == 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="h-full w-full flex">

        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">

            <userSidebarComponent v-model="clicked" :clicked="clicked">
            </userSidebarComponent>
        </div>

        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <h1 class="font-bold text-3xl capitalize">Notifications</h1>
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
                <userNotificationComponent v-else :notifications="user.notifications"></userNotificationComponent>
            </div>
        </div>
    </div>
    <profileFooter></profileFooter>
</template>
<script>
import baseNavbar from '../../../../components/baseNavbar.vue';
import userNavbar from '../../../../components/user/userNavbar.vue';
import userSidebarComponent from '../../../../components/user/userSidebarComponent.vue';
import userNotificationComponent from '../../../../components/user/userNotificationComponent.vue';
import profileFooter from '../../../../components/profileFooter.vue';
export default {
    components: {
        baseNavbar, userNavbar, userSidebarComponent, userNotificationComponent, profileFooter
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