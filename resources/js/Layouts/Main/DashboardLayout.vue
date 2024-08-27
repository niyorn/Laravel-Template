<script setup>
    import SideBar from '@/Layouts/Main/Partials/Sidebar/SideBar.vue';
    import TopBar from '@/Layouts/Main/Partials/TopBar.vue';
</script>

<template>
    <div class="grid h-full md:grid-cols-[auto_1fr] bg-base-100 dark:bg-gray-800">
        <SideBar />

        <div class="grid overflow-y-auto grid-rows-[auto_1fr] h-full">
            <TopBar class="px:4 md:px-10" />

            <main
                class="overflow-x-auto px-4 md:px-10 pb-10"
                scroll-region
            >
                <slot name="default" />
            </main>
        </div>
    </div>
</template>
