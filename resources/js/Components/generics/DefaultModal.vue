<script setup>
    import { ref } from 'vue';

    import BaseButton from '@/Components/generics/BaseButton.vue';

    const props = defineProps({
        okTittle: {
            type: String,
            required: false,
            default: 'Save',
        },
    });

    const defaultModal = ref(null);
    const isVisible = ref(false);

    function showModal() {
        // code to open the modal
        defaultModal.value.showModal();
        isVisible.value = true;
    }

    function close() {
        // code to close the modal
        defaultModal.value.close();
        isVisible.value = false;
    }

    defineExpose({
        showModal,
        close,
        isVisible,
    });
</script>

<template>
    <dialog
        ref="defaultModal"
        v-bind="$attrs"
        class="backdrop:bg-black/70 mt-40 rounded-md"
        @close="isVisible = false"
    >
        <div
            v-if="isVisible"
            v-motion-fade
            class="flex flex-col gap-4 w-[90vw] max-w-[47rem] bg-white p-4 rounded-lg overflow-hidden shadow"
        >
            <h3
                v-if="$slots.title"
                class="font-bold text-2xl"
            >
                <slot name="title" />
            </h3>

            <div v-if="$slots.default">
                <slot name="default"></slot>
            </div>

            <div
                v-if="$slots.footer"
                class="flex justify-end"
            >
                <slot name="footer" />
            </div>

            <div v-if="!$slots.footer">
                <div
                    class="flex justify-end"
                >
                    <BaseButton
                        variant="secondary"
                        icon="solar:add-square-bold"
                        @click="close"
                    >
                        Cancel
                    </BaseButton>


                    <BaseButton
                        variant="primary"
                        icon="solar:add-square-bold"
                        @click="$emit('ok')"
                    >
                        {{ props.okTittle }}
                    </BaseButton>
                </div>
            </div>
        </div>
    </dialog>
</template>
