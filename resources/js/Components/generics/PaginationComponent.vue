<script setup>
    import { useOffsetPagination } from '@vueuse/core';
    import { computed, ref, watch } from 'vue';
    import { Icon } from '@iconify/vue';

    const props = defineProps({
        items: {
            type: Array,
            required: true,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
    });

    const totalLength = ref(0);

    const localItems = computed(() => {
        return props.items;
    });

    watch(localItems, () => {
        totalLength.value = localItems.value.length;
    }, { immediate: true });

    const {
        currentPage,
        pageCount,
        isFirstPage,
        isLastPage,
        prev,
        next,
    } = useOffsetPagination({
        total: totalLength,
        pageSize: props.pageSize,
    });

    const paginatedItems = computed(() => {
        return localItems.value.slice((currentPage.value - 1) * props.pageSize, currentPage.value * props.pageSize);
    });
</script>

<template>
    <div>
        <slot :paginated-items="paginatedItems"></slot>

        <div class="flex justify-center items-center mt-4 gap-4">
            <button
                :disabled="isFirstPage"
                class="-mr-2 text-4xl text-blue-700 hover:cursor-pointer hover:text-blue-800 disabled:text-gray-400"
                @click="currentPage = 1"
            >
                <Icon icon="solar:square-double-alt-arrow-left-bold" />
            </button>

            <button
                :disabled="isFirstPage"
                class="text-4xl text-blue-700 hover:cursor-pointer hover:text-blue-800 disabled:text-gray-400"
                @click="prev"
            >
                <Icon icon="solar:square-alt-arrow-left-bold" />
            </button>

            <span class="text-xl ">
                {{ currentPage }}
            </span>

            <button
                class="text-4xl text-blue-700 hover:cursor-pointer hover:text-blue-800 disabled:text-gray-400"
                :disabled="isLastPage"
                @click="next"
            >
                <Icon icon="solar:square-alt-arrow-right-bold" />
            </button>

            <button
                class="text-4xl text-blue-700 hover:cursor-pointer hover:text-blue-800 disabled:text-gray-400"
                :disabled="isLastPage"
                @click="currentPage = pageCount"
            >
                <Icon icon="solar:square-double-alt-arrow-right-bold" />
            </button>
        </div>
    </div>
</template>
