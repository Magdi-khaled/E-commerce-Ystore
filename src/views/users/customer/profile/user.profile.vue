<template>
    <userNavbar v-if="tuser == 'customer'"></userNavbar>
    <baseNavbar v-else></baseNavbar>
    <div class="h-full w-full flex border-t-2">
        <userSidebarComponent class="w-3/12" v-model="clicked" :clicked="clicked">
        </userSidebarComponent>
        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <userInfoComponent :user="user"></userInfoComponent>
            </div>
        </div>
    </div>
    <hr>
    <profileFooter></profileFooter>
</template>
<script>
import baseNavbar from '../../../../components/baseNavbar.vue';
import userNavbar from '../../../../components/user/userNavbar.vue';
import userInfoComponent from '../../../../components/user/userInfoComponent.vue';
import userSidebarComponent from '../../../../components/user/userSidebarComponent.vue';
import profileFooter from '../../../../components/profileFooter.vue';
export default {
    components: {
        baseNavbar, userNavbar, userInfoComponent, userSidebarComponent, profileFooter
    },
    data() {
        return {
            clicked: 0,
            tuser: localStorage.getItem('user'),
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
            },
        }
    },
    methods: {}
}
</script>
<style scoped></style>