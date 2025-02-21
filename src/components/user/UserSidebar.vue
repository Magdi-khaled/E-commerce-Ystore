<template>

    <aside class="font-bold pl-12 pt-6">
        <!-- <div class="h-fit hidden lg:block bg-white font-bold mt-8 mb-20 pl-8 md:pl-16"> -->
        <h1 class="text-lg"> Hala {{ user.name.split(' ')[0] }}!</h1>
        <p class="text-gray-500 text-sm"> magdikhaled23s@gmail.com</p>
        <hr class="my-4 w-11/12 bg-black">

        <nav class="text-lg features">
            <button v-for="(item, index) in buttons" :key="index" @click="updateClicked(index)"
                @mouseover="hoverIndex = index" @mouseleave="hoverIndex = null"
                :class="{ 'underline text-gray-900': clicked === index }" class="w-full text-start p-2 pl-0 text-md text-gray-400 
                hover:text-black capitalize transition duration-150 relative flex items-center font-normal">
                <i :class="`${item.icon} text-black border-2 border-gray-500 p-[4px] 
                rounded-sm w-[30px] text-center`"></i>
                <span class="pl-4 ">{{ item.label }}</span>
                <i v-if="hoverIndex === index" class="fa-solid fa-arrow-right text-sm absolute 
                top-[40%] right-[15%] transition-opacity duration-300"></i>
            </button>
        </nav>
        <hr class="my-4 w-11/12 bg-black">
        <div>
            <button @click="uLogout"
                class="capitalize text-gray-500 hover:text-black cursor-pointer transition duration-150">
                <i class="fa-solid fa-door-open"></i> sign out
            </button>
        </div>
    </aside>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'UserSidebar',
    props: ['clicked'],
    data() {
        return {
            hoverIndex: null,
            buttons: [
                { label: "profile", icon: "fa-solid fa-user" },
                { label: "QR code", icon: "fa-solid fa-qrcode" },
                { label: "wishlist", icon: "fa-solid fa-heart" },
                { label: "orders", icon: "fa-solid fa-list-dropdown" },
                { label: "returns", icon: "fa-duotone fa-regular fa-rotate-left" },
                { label: "payments", icon: "fa-duotone fa-solid fa-wallet" },
                { label: "notifactions", icon: "fa-solid fa-bell" },
                { label: "security settings", icon: "fa-solid fa-lock" },
            ],
            user: {
                name: 'Magdi Khaled'
            }
        }
    },
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue);
            },
        },
    },
    methods: {
        ...mapActions(['UserLogout']),
        updateClicked(index) {
            if (index === 0) this.$router.push({ name: 'User-Profile' });
            else if (index === 1) this.$router.push({ name: 'User-Qrcode' });
            else if (index === 2) this.$router.push({ name: 'User-Cart' });
            else if (index === 3) this.$router.push({ name: 'User-Orders' });
            else if (index === 4) this.$router.push({ name: 'User-Returns' });
            else if (index === 5) this.$router.push({ name: 'User-Payments' });
            else if (index === 6) this.$router.push({ name: 'User-Notifications' });
            else if (index === 7) this.$router.push({ name: 'User-SecuritySittings' });
            this.value = index;
        },
        async uLogout() {
            try {
                await this.UserLogout();
                setTimeout(() => {
                    this.$router.push({ name: 'User-Login' });
                }, 1500)
            } catch (error) {
                console.error('Logout Error : ', error);
            }
        },
    },
}
</script>
<style scoped></style>