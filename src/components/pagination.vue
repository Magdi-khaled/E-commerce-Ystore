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
<script>
export default {
    name: 'Pagination',
    props: {
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
    },
    data() {
        return {
            maxVisible: 3,
        }
    },
    computed: {
        visiblePages() {
            const pages = [];
            const { currentPage, totalPages, maxVisible } = this;
            pages.push(1);

            if (currentPage - maxVisible > 2) pages.push("...");

            for (let i = currentPage - maxVisible; i <= currentPage + maxVisible; i++) {
                if (i > 1 && i <= totalPages) pages.push(i);
            }

            // Add ellipsis after the middle pages
            if (currentPage + maxVisible < totalPages - 1) pages.push("...");
            return pages;
        },
        value: {
            get() {
                return this.currentPage;
            },
            set(val) {
                this.changePage(val);
            }
        }
    },
    methods: {
        changePage(page) {
            if (page === '...' || page === 0 || page === this.totalPages) return;
            this.$emit('page-changed', page);
        },
    }

}
</script>
<style scoped>
button[disabled] {
    cursor: default;
    opacity: 0.5;
}
</style>