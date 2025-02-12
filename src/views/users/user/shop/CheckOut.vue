<template>
    <BaseTeleport :show="success" :type="'success'">Success Product Added</BaseTeleport>
    <BaseTeleport :show="failed" :type="'error'">
        <button @click="failed = false">
            <i class="fa-regular fa-xmark font-semibold hover:text-gray-500 transition duraion-200"></i>
        </button>
        <p>Can't Add Product, Wrong input data</p>
    </BaseTeleport>
    <div class="p-3 md:p-6">
        <div class="flex justify-between items-center my-4">
            <BaseButton class="text-sm sm:text-md px-2 sm:px-6 py-[6px] sm:py-[10px]"
                @click="this.$router.push({ name: 'User-Cart' })">
                <i class="fa-duotone fa-regular fa-chevrons-left pr-2"></i>
                back to shopping cart
            </BaseButton>
        </div>
        <hr>
        <div>
        </div>
    </div>
</template>
<script>
import BaseTeleport from '../../../../components/BaseTeleport.vue'
import BaseButton from '../../../../components/BaseButton.vue'
export default {
    components: { BaseTeleport, BaseButton },
    data() {
        return {
            success: false,
            failed: false,
        }
    }
}
</script>