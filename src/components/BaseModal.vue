<template>
    <Teleport to='body'>
        <Transition name="modal-outer">
            <div v-show="modalActive" class="fixed inset-0 flex items-center justify-center bg-[#00000065] z-50"
                @click="$emit('close-modal'), $emit('clear')">
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
<script>
export default {
    name: 'BaseModal',
    props: {
        modalActive: {
            type: Boolean,
            required: true
        }
    },
}
</script>
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