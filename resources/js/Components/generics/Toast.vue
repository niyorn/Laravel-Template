<script setup>
    import {ref} from 'vue';

    import {eventBus} from '@/Utils/emitter.js';
    import {TOAST_SHOW_ERROR, TOAST_SHOWN} from '@/Constants/eventbus.js';

    const isVisible = ref(false);

    const localMessage = ref('');
    const hasError = ref(false);

    eventBus.on(TOAST_SHOWN, (message = '', isError = false) => {
        isVisible.value = true;
        localMessage.value = message;

        setTimeout(() => {
            isVisible.value = false;
            localMessage.value = '';
        }, 1500);
    });

    eventBus.on(TOAST_SHOW_ERROR, (message = '') => {
        isVisible.value = true;
        localMessage.value = message;
        hasError.value = true;

        setTimeout(() => {
            isVisible.value = false;
            localMessage.value = '';
            hasError.value = false;
        }, 3000);
    });
</script>

<template>
    <div
        v-if="isVisible"
        class="fixed top-4 right-4 max-w-xs bg-green-700 text-sm text-white rounded-xl shadow-lg overflow-auto"
        :class="{ 'bg-red-700': hasError }"
        v-motion-slide-top
    >
        <div class="flex p-4">
            <span class="overflow-auto">
                {{ localMessage ? localMessage : 'Success!' }}
            </span>
        </div>
    </div>
</template>
