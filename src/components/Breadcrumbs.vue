<template>
    <p class="pt-4 text-gray-500 capitalize bg-white text-sm">
        <span v-for="(breadcrumb, index) in breadcrumbList" :key="index" class="hover:underline">
            <router-link :to="breadcrumb.link">
                {{ breadcrumb.name }}
            </router-link>
            <span v-if="index < breadcrumbList.length - 1"> <i class="fa-solid fa-chevron-right text-xs px-2"></i>
            </span>
        </span>
    </p>
</template>

<script>

export default {
    name: 'Breadcrumbs',
    props: {
        breadcrumbs: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            breadcrumbList: []
        }
    },
    async mounted() {
        await this.updateList();
    },
    watch: {
        '$route'() {
            this.updateList();
        }
    },
    methods: {
        updateList() {
            this.breadcrumbList = this.breadcrumbs;
        }
    }
}
</script>
<style scoped></style>
