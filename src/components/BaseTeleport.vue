<template>
    <Teleport to='body'>
        <div :class="{
            active: show, 'bg-red-400 text-gray-700': type === 'error', 'bg-gray-700 text-gray-200': type === 'message', 'bg-green-500 text-white': type === 'success'
        }"
            class="font-semibold capitalize text-sm sm:text-md p-4 w-fit fixed left-[2%] top-5 flex items-center flex-wrap gap-2">
            <i v-if="type === 'success'" class="fa-sharp fa-solid fa-badge-check pr-2"></i>
            <slot></slot>
            <i v-if="type === 'error'" class="fa-solid fa-circle-exclamation pr-2"></i>
        </div>
    </Teleport>
</template>
<script>

export default {
    name: 'BaseTeleport',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
div {
    opacity: 0;
    /* left: -100%; */
    z-index: -200;
    transition: all 0.3s ease-in-out;
}

div.active {
    left: 2%;
    opacity: 1;
    z-index: 200;
    transition: opacity 0.7s ease-in-out;
}
</style>