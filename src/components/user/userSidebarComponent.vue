<template>
    <div class="h-fit hidden lg:block bg-white font-bold mt-8 mb-20 pl-8 md:pl-16">
        <h1 class="text-lg"> Hala {{ user.name.split(' ')[0] }}!</h1>
        <p class="text-gray-500 text-sm"> magdikhaled23s@gmail.com</p>
        <hr class="my-4 w-11/12 bg-black">

        <div class="text-lg features">
            <button v-for="(item, index) in buttons" :key="index" @click="updateClicked(index)"
                @mouseover="hoverIndex = index" @mouseleave="hoverIndex = null"
                :class="{ 'underline text-gray-900': clicked === index }" class="w-full text-start p-2 text-md text-gray-400 
                hover:text-black capitalize transition duration-150 relative flex items-center font-medium">
                <i :class="`${item.icon} text-black border-2 border-gray-500 p-[4px] 
                rounded-sm w-[30px] text-center`"></i>
                <span class="pl-4 ">{{ item.label }}</span>
                <i v-if="hoverIndex === index" class="fa-solid fa-arrow-right text-sm absolute 
                top-[40%] right-[15%] transition-opacity duration-300"></i>
            </button>
        </div>
        <hr class="my-4 w-11/12 bg-black">
        <div>
            <p class="capitalize text-gray-500 hover:text-black cursor-pointer transition duration-150">
                <i class="fa-solid fa-door-open"></i> sign out
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'userSidebarComponent',
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
        updateClicked(index) {
            if (index === 0) this.$router.push({ name: 'user-profile' });
            else if (index === 1) this.$router.push({ name: 'user-qr-code' });
            else if (index === 2) this.$router.push({ name: 'user-cart' });
            else if (index === 3) this.$router.push({ name: 'user-orders' });
            else if (index === 4) this.$router.push({ name: 'user-returns' });
            else if (index === 5) this.$router.push({ name: 'user-payments' });
            else if (index === 6) this.$router.push({ name: 'user-notifications' });
            else if (index === 7) this.$router.push({ name: 'user-security-sittings' });
            this.value = index;
        },
    },
}
</script>
<style scoped></style>