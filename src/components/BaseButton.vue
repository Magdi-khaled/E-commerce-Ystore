<template>
    <button :class="{ disabled: disabled }" class="py-3 px-[6px] text-sm sm:text-md bg-black text-white whitespace-nowrap font-medium 
    capitalize rounded-md border-[1px] border-black
            hover:bg-gray-200 hover:text-black transition duration-150 ease-in-out ">
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
    cursor: auto;
    opacity: 0.6;
}
</style>