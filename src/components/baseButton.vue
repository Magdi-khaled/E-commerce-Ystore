<template>
    <button class="w-full py-4 bg-black text-white font-bold capitalize rounded-2xl border-2 border-black
            hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out ">
        <slot />
    </button>
</template>
<script>
export default {
    name: 'baseButton',
}
</script>
<style scoped></style>