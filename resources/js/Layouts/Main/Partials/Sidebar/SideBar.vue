<script setup>
    import ArrowButton from '@/Layouts/Main/Partials/Sidebar/Partials/ArrowButton.vue';
    import AuthorImage from '@/Layouts/Main/Partials/Sidebar/Partials/AuthorImage.vue';
    import SideBarMenu from '@/Layouts/Main/Partials/Sidebar/Partials/SideBarMenu.vue';
    import { onMounted, ref, watch } from 'vue';

    const isSidebarOpen = ref(true);

    onMounted(() => {
        setSideBarState();
    });

    // Save state to local storage for better user experience
    watch(isSidebarOpen, (value) => {
        localStorage.setItem('isSidebarOpen', value);
    });

    function makeSmale() {
        isSidebarOpen.value = false;
    }

    function makeBig() {
        isSidebarOpen.value = true;
    }

    function setSideBarState () {
        let state = localStorage.getItem('isSidebarOpen');
        state = JSON.parse(state);

        if (!state) {
            isSidebarOpen.value = false;
        }
    }
</script>

<template>
    <div
        :class="{ 'w-56': isSidebarOpen, 'w-18': !isSidebarOpen}"
        class="relative h-full bg-base-200 hidden md:block"
    >
        <ArrowButton
            class="absolute top-16 -right-4"
            :isSidebarOpen="isSidebarOpen"
            @make-smale="makeSmale"
            @make-big="makeBig"
        />

        <AuthorImage :is-sidebar-open="isSidebarOpen" />

        <SideBarMenu :is-sidebar-open="isSidebarOpen" />
    </div>
</template>
