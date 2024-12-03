<template>
    <div class="p-10 sm:p-16 pb-5 sm:pb-10">
        <h1
            class="text-black whitespace-nowrap tracking-tighter text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-center uppercase">
            <slot />
        </h1>
    </div>
</template>
<script>
export default {
    name: 'section-title',
}
</script>

<style></style>