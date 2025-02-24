<template>
    <UserNavbar />
    <div class="h-full w-full flex">
        <div class="w-3/12 hidden lg:block bg-gray-50 border-r border-gray-500">
            <UserSidebar v-model="clicked" :clicked="clicked" />
        </div>
        <div class="w-full lg:w-9/12 h-fit pb-12 bg-[#f2f2f2]">
            <div class="p-6 md:p-12">
                <UserInfoComponent :user="user" />
            </div>
        </div>
    </div>
    <hr>
    <InFooter />
</template>
<script>
import UserNavbar from '../../../../components/user/UserNavbar.vue';
import UserInfoComponent from '../../../../components/user/UserInfoComponent.vue';
import UserSidebar from '../../../../components/user/UserSidebar.vue';
import InFooter from '../../../../components/InFooter.vue';
export default {
    components: { UserNavbar, UserInfoComponent, UserSidebar, InFooter
    },
    data() {
        return {
            clicked: 0,
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