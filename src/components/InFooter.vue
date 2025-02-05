<template>
    <footer class="profile-footer flex items-center justify-between w-full px-8 md:px-16 py-2">
        <p class="text-gray-500 text-sm">
            © 2024 shop.co. All rights reserved
        </p>

        <div class="flex items-center flex-wrap justify-end text-sm text-gray-600">
            <router-link class="px-2 hover:underline" to="#warranty-policy">Warranty policy</router-link>
            <router-link class="px-2 hover:underline" to="#return-policy">Return policy</router-link>
            <router-link class="px-2 hover:underline" to="#terms-of-use">Terms of use</router-link>
            <router-link class="px-2 hover:underline" to="#terms-of-sale">Terms of sale</router-link>
            <router-link class="px-2 hover:underline" to="#terms-of-use">Terms of use</router-link>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'InFooter',

}
</script>
<style scoped></style>