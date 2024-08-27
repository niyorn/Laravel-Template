<script setup>
    import MenuLink from '@/Layouts/Main/Partials/Sidebar/Partials/MenuLink.vue';
    import { Icon } from '@iconify/vue';

    defineProps({
        isSidebarOpen: {
            type: Boolean,
            required: false,
            default: false,
        },
    });

</script>

<template>
    <ul class="gap-2 menu">
        <MenuLink
            :is-sidebar-open="isSidebarOpen"
        >
            <template #icon>
                <Icon
                    class="text-2xl"
                    icon="solar:chat-round-line-bold-duotone"
                />
            </template>

            <template #default>
                Chats
            </template>
        </MenuLink>

        <MenuLink
            :is-sidebar-open="isSidebarOpen"
        >
            <template #icon>
                <Icon
                    class="text-2xl"
                    icon="solar:library-bold-duotone"
                />
            </template>

            <template #default>
                Prompts
            </template>
        </MenuLink>
    </ul>
</template>
