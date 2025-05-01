<script setup>
defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <button :class="{ 'pointer-events-none cursor-default bg-gray-400': disabled }" class="py-3 px-[6px] text-sm sm:text-md bg-black text-white whitespace-nowrap font-medium 
    capitalize rounded-md hover:bg-gray-200 hover:text-black
    hover:scale-[1.002] transform hover:translate-x-[-2px] hover:translate-y-[-1px] hover:shadow-sm hover:shadow-gray-600
    active:bg-gray-300 transition-all duration-200">
        <slot />
    </button>
</template>