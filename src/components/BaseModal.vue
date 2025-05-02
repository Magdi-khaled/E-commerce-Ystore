<script setup>
const modalActive = defineModel('modalActive', { required: true });
const emit = defineEmits(['clear']);

const closeModal = () => {
    modalActive.value = !modalActive.value;
    emit('clear')
};
</script>
<template>
    <Teleport to='body'>
        <Transition name="modal-outer">
            <div v-show="modalActive" class="fixed inset-0 flex items-center justify-center bg-[#00000065] z-50"
                @click="closeModal">
                <Transition class="modal-inner">
                    <div v-if="modalActive" class="base-modal p-1 bg-white border-2 border-gray-300 rounded relative"
                        @click.stop>
                        <slot />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>