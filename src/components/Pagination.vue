<script setup>
import { ref, computed } from 'vue';

// Define Props
const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    nextPage: {
        type: Function,
        required: true,
    },
    prevPage: {
        type: Function,
        required: true,
    }
});

// Define Emits
const emit = defineEmits(['page-changed']);

// Reactive State
const maxVisible = ref(3);

const visiblePages = computed(() => {
    const pages = [];
    const { currentPage, totalPages } = props;
    const maxVisibleValue = maxVisible.value;

    if (totalPages <= 1) return [1];
    pages.push(1);
    if (currentPage - maxVisibleValue > 2) pages.push("...");

    // Generate middle pages dynamically
    for (let i = Math.max(2, currentPage - maxVisibleValue); i <= Math.min(totalPages - 1, currentPage + maxVisibleValue); i++) {
        pages.push(i);
    }

    if (currentPage + maxVisibleValue < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);
    return pages;
});


computed({
    get: () => props.currentPage,
    set: (val) => changePage(val)
});

// Methods
const changePage = (page) => {
    if (page === '...' || page === 0 || page === props.totalPages) return;
    emit('page-changed', page);
};
</script>

<template>
    <div class="pagination mt-12 mb-4 flex justify-center items-center gap-2">
        <!-- Prev Button -->
        <button @click="prevPage" :disabled="currentPage === 1"
            class="prev-btn bg-black text-gray-200 py-2 sm:py-3 px-3 sm:px-4 text-md sm:text-lg hover:bg-gray-600 transition duration-150"
            :class="{ 'cursor-default hover:bg-black': currentPage === 1 }">
            <i class="fa-solid fa-angle-left"></i>
        </button>

        <!-- Page Numbers -->
        <div v-for="(page, index) in visiblePages" :key="index">
            <span v-if="page === '...'" class="mx-2 text-gray-500 text-md">
                {{ page }}
            </span>
            <button v-else @click="changePage(page)"
                :class="{ 'border-2 text-gray-900 bg-white ': currentPage === page }"
                class="next-btn bg-black text-gray-200 py-2 sm:py-3 px-3 sm:px-4 text-md sm:text-lg">
                {{ page }}
            </button>
        </div>

        <!-- Next Button -->
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="next-btn bg-black text-gray-200 py-2 sm:py-3 px-3 sm:px-4 text-md sm:text-lg hover:bg-gray-600 transition duration-150"
            :class="{ 'cursor-default hover:bg-black': currentPage === totalPages }">
            <i class="fa-solid fa-angle-right "></i>
        </button>
    </div>

</template>


<style scoped>
button[disabled] {
    cursor: default;
    opacity: 0.5;
}
</style>