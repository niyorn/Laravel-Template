<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        items: {
            type: Array,
            default: () => [],
        },
    });

    const emit = defineEmits(['update:modelValue', 'update:activeItem']);

    const selectedItem = ref(null);
    const activeItem = ref(null);

    const selectedDocumentTemplate = ref(null);

    watch(selectedDocumentTemplate, (value) => {
        emit('update:modelValue', value);
    });

    function setActiveItem() {
        activeItem.value = props.items.find((item) => item.value === selectedItem.value);
        emit('update:activeItem', activeItem.value);
    }
</script>

<template>
    <div>
        <label
            for="document-type"
            class="block mb-2 font-medium"
        >
            <slot name="label" />
        </label>

        <select
            id="document-type"
            class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="selectedItem"
            @change="setActiveItem"
        >
            <option
                v-for="item in items"
                :key="item.value"
                :value="item.value"
            >
                {{ item.text }}
            </option>
        </select>
    </div>
</template>
