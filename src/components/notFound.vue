<template>
    <div
        class="p-8 flex flex-wrap justify-center grayscale uppercase items-center text-gray-400 font-bold text-2xl md:text-3xl w-full">
        <p>404 | NOT-FOUND PAGE</p>
        <img class="w-96" src="../assets/images/shop/notFound.png" alt="notFound">
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
div {
    height: 95vh;
}

@media (max-width:775px) {
    div {
        height: 80vh;
    }
}
</style>