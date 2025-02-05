<template>

    <Teleport to='body'>
        <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="text-green-900 bg-green-200 p-8 font-bold rounded border-2
            border-green-900 text-xl flex items-center gap-4 capitalize">
                <i class="fa-sharp fa-solid fa-badge-check text-green-900"></i>
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>
<script>
export default {
    name: 'baseSuccess',
    props: ['show'],
}
</script>
<style scoped></style>
