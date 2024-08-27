<script setup>
    defineProps({
        isSidebarOpen: {
            type: Boolean,
            default: false,
        },
    });
</script>

<template>
    <div class="z-40">
        <button
            v-if="isSidebarOpen"
            v-motion-slide-left
            class="rounded-full p-2 shadow-md bg-base-100 text-base-content hover:bg-primary hover:text-base-100"
            type="button"
            @click="$emit('make-smale')"
        >
            <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m15 5l-6 7l6 7"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                />
            </svg>
        </button>
        
        <button
            v-if="!isSidebarOpen"
            v-motion-slide-right
            class="rounded-full p-2 shadow-md bg-base-100 text-base-content hover:bg-primary hover:text-base-100"
            type="button"
            @click="$emit('make-big')"
        >
            <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m9 5l6 7l-6 7"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                />
            </svg>
        </button>
    </div>
</template>

