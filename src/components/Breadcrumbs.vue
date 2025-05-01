<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const breadcrumbList = ref([]);

const updateList = (breadcrumbs) => {
    breadcrumbList.value = breadcrumbs;
};
onMounted(() => {
    updateList(route.meta.breadcrumb);
});
// watch(() => route.fullPath, () => {
//     updateList(route.meta.breadcrumbs);
// });
</script>

<template>
    <ul class="pt-4 text-gray-500 capitalize bg-white text-sm flex gap-1">
        <li v-for="(breadcrumb, index) in breadcrumbList" :key="index">
            <router-link :to="breadcrumb.link" class="hover:underline">
                {{ breadcrumb.name }}
            </router-link>
            <span v-if="index < breadcrumbList.length - 1"> / </span>
        </li>
    </ul>
</template>
