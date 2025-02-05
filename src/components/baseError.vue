<template>
    <Teleport to='body'>
        <div :class="{ active: show }"
            class="bg-red-400 p-4 font-bold text-gray-900 w-4/12 fixed top-5 rounded-md border-2 border-gray-600">
            <i class="fa-solid fa-circle-exclamation text-gray-900"></i>
            <slot></slot>
        </div>
    </Teleport>
</template>
<script>
export default {
    name: 'baseError',
    props: ['show']
}
</script>
<style scoped>
div {
    left: -35%;
}

div.active {
    left: 2%;
    transition: all 0.3s ease-in-out;
}
</style>