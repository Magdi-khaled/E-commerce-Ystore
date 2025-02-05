<template>
    <button class="py-3 bg-black text-white font-medium capitalize rounded border-2 border-black
            hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out ">
        <slot />
    </button>
</template>
<script>
export default {
    name: 'BaseButton',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.disabled {
    background-color: rgba(85, 84, 84, 0.445);
    color: gray;
    border: transparent;
    /* Example color for disabled state */
    cursor: not-allowed;
    opacity: 0.6;
}
</style>
