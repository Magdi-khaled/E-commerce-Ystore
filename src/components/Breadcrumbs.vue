<template>
    <p class="pt-4 text-gray-500 capitalize bg-white text-sm">
        <span v-for="(breadcrumb, index) in breadcrumbList" :key="index" class="hover:underline">
            <!-- Add a clickable link for all breadcrumbs except the last one -->
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
    data() {
        return {
            breadcrumbList: []
        }
    },
    mounted() {
        this.updateList();
    },
    watch: {
        '$route'() {
            this.updateList();
        }
    },
    methods: {
        routerTo(pRouterTo) {
            if (this.breadcrumbList[pRouterTo].link)
                this.$router.push(this.breadcrumbList[pRouterTo].link);
        },
        updateList() {
            this.breadcrumbList = this.$route.meta.breadcrumb;
        }
    }
}
</script>
<style scoped></style>
