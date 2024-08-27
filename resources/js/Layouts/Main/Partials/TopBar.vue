<script setup>
    import { ref } from 'vue';
    import { useDark, useToggle } from '@vueuse/core';

    const isDark = useDark({
        onChanged(value) {
            if (value) {
                document.body.classList.add('dark');
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.classList.remove('dark');
                document.body.setAttribute('data-theme', 'light');
            }
        },
    });

    const toggleDark = useToggle(isDark);

    const test = ref(0);
</script>

<template>
    <div class="sticky top-0 z-10 bg-white navbar dark:bg-gray-800">
        <div class="flex-1">
            <a class="text-xl normal-case btn btn-ghost">
                Dashboard
            </a>
        </div>

        <div class="flex-none">
            <ul class="px-1 menu menu-horizontal">
                <li>
                    <button
                        class=""
                        @click="toggleDark()"
                    >
                        {{ isDark ? 'Dark' : 'Light' }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>
