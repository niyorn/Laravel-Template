<script setup>
    import { Link } from '@inertiajs/vue3';
    
    defineProps({
        isSidebarOpen: {
            type: Boolean,
            required: false,
            default: true,
        },
        href: {
            type: String,
            required: false,
            default: '#',
        },
    });
</script>

<template>
    <li class="font-semibold">
        <Link 
            :href="href"
            preserve-scroll
            class="hover:!text-primary"
        >
            <slot
                v-if="$slots.icon"
                name="icon"
            />
            
            <span
                v-if="isSidebarOpen"
            >
                <slot name="default">
                    Menu Item
                </slot>
            </span>
        </Link>
    </li>
</template>
