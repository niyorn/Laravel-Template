import Fuse from 'fuse.js';
import { computed, ref, unref, watch } from 'vue';

const defaultOptions = {
    distance: 100,
    location: 0,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    searchPrimaryKey: false,
    shouldSort: false,
    threshold: 0.3,
    tokenize: false,
    verbose: false,
};

export const useFuzzySearch = (query, items, options = {}) => {
    const fuse = ref(null);

    const searchQuery = computed(() => unref(query));
    const itemsValue = computed(() => unref(items));

    watch(itemsValue, (newItems) => {
        fuse.value = new Fuse(newItems, {
            ...defaultOptions,
            ...options,
        });
    }, { immediate: true });

    return computed(() => {
        if (!searchQuery.value || !fuse.value) {
            return itemsValue.value;
        }
        return fuse.value.search(searchQuery.value).map(result => result.item);
    });
};
