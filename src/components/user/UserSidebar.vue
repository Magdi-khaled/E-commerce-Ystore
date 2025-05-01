<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const clicked = defineModel('clicked');
const store = useStore();
const router = useRouter();

const hoverIndex = ref(null);
const buttons = reactive([
    { label: "profile", icon: "fa-solid fa-user" },
    { label: "QR code", icon: "fa-solid fa-qrcode" },
    { label: "wishlist", icon: "fa-solid fa-heart" },
    { label: "orders", icon: "fa-solid fa-list-dropdown" },
    { label: "returns", icon: "fa-duotone fa-regular fa-rotate-left" },
    { label: "payments", icon: "fa-duotone fa-solid fa-wallet" },
    { label: "notifactions", icon: "fa-solid fa-bell" },
    { label: "security settings", icon: "fa-solid fa-lock" },
]);
const user = reactive({ name: 'Magdi Khaled' })

const updateClicked = (index) => {
    const routes = [
        'User-Profile',
        'User-Qrcode',
        'User-Wishlist',
        'User-Orders',
        'User-Returns',
        'User-Payments',
        'User-Notifications',
        'User-SecuritySittings'
    ];

    router.push({ name: routes[index] });
    clicked.value = index;
};
const uLogout = async () => {
    try {
        await store.dispatch('UserLogout');
        setTimeout(() => {
            router.push({ name: 'User-Login' });
        }, 1500)
    } catch (error) {
        console.error('Logout Error : ', error);
    }
};
</script>

<template>
    <aside class="font-bold pl-12 pt-6">
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