<script setup>
    import { computed } from 'vue';
    import { Icon } from '@iconify/vue';

    const props = defineProps({
        variant: {
            type: String,
            required: false,
            default: 'primary',
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
    });

    defineEmits(['click']);

    const buttonClass = computed(() => {
        const baseClass = 'flex gap-2 items-center mt-4 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 items-center disabled:opacity-50 disabled:pointer-events-none ';

        switch (props.variant) {
            case 'primary':
                return baseClass + 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300';
            case 'secondary':
                return baseClass + 'text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300';
            case 'danger':
                return baseClass + 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300'
            case 'success':
                return baseClass + 'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300';
            case 'outline-primary':
                return baseClass + 'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 te';
            case 'outline-danger':
                return baseClass + 'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 te';
            case 'outline-success':
                return baseClass + 'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-green-300';
            default:
                return baseClass + 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300';
        }
    });
</script>

<template>
    <button
        :class="buttonClass"
        type="button"
        @click="$emit('click')"
    >
        <Icon
            v-if="icon"
            :icon="icon"
            class="text-2xl"
        />

        <slot />
    </button>
</template>
