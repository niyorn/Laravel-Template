<script setup>
    defineProps({
        isSidebarOpen: {
            type: Boolean,
            required: false,
            default: false,
        },
    });
</script>

<template>
    <div
        class="flex h-40 items-center justify-center"
    >
        <img
            v-if="isSidebarOpen"
            v-motion-fade
            alt="image"
            class="h-28 w-28 rounded"
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        >
    </div>
</template>
