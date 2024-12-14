<script setup>
    import { computed, defineProps, ref, toRef } from 'vue';

    import BaseButton from '@/Components/generics/BaseButton.vue';
    import { useFuzzySearch } from '@/Utils/useFuzzySearch.js';

    const props = defineProps({
        columns: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        rowKey: {
            type: String,
            required: false,
            default: 'id',
        },
        withActions: {
            type: Boolean,
            required: false,
            default: false,
        },
        withSearch: {
            type: Boolean,
            required: false,
            default: true,
        },
    });

    const emit = defineEmits(['edit', 'delete']);

    const searchInput = ref('');

    // Search keys
    const searchKeys = computed(() => {
        const keys = props.columns?.map(column => column.key);
        return keys;
    })

    const tempItems = toRef(props, 'items');

    const searchResults = useFuzzySearch(searchInput, tempItems, {
        keys: searchKeys.value,
    });
</script>

<template>
    <div class="">
        <div v-if="withSearch">
            <input
                v-model="searchInput"
                type="search"
                class="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
                placeholder="Search"
            />
        </div>

        <table
            class="w-full text-left shadow-md rounded-md overflow-hidden rtl:text-right text-gray-500"
        >
            <thead class="text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        class="px-6 py-3"
                    >
                        {{ column.label }}
                    </th>

                    <th
                        v-if="withActions || $slots.actions"
                        class="px-6 py-3 w-[0]"
                    >
                        Action
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(item, rowIndex) in searchResults"
                    :key="item[rowKey]"
                    class="odd:bg-white even:bg-gray-50"
                >
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-xl"
                        :class="column.class ?? ''"
                    >
                        <div
                            :title="item[column.key]"
                            class="truncate"
                        >
                            {{ item[column.key] }}
                        </div>
                    </td>

                    <slot
                        name="actions"
                        :item="item"
                    >
                        <td
                            v-if="withActions && !$slots.actions"
                            class="px-6 py-4"
                        >
                            <div class="flex gap-4">
                                <BaseButton
                                    variant="outline-primary"
                                    icon="solar:pen-2-bold"
                                    @click="$emit('edit', item)"
                                >
                                    Edit
                                </BaseButton>

                                <BaseButton
                                    variant="outline-danger"
                                    icon="solar:trash-bin-2-bold"
                                    @click="$emit('delete', item)"
                                >
                                    Delete
                                </BaseButton>
                            </div>
                        </td>
                    </slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>
