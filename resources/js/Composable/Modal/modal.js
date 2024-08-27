import { reactive } from 'vue';

export const modal = reactive({
    state: {},
});

export const useModal = () => {
    const state = modal.state;
    
    const open = (id) => {
        modal.state[id] = true;
        
        document.querySelector((`#${id}`))?.showModal();
    };
    
    const close = (id) => {
        modal.state[id] = false;
        document.querySelector((`#${id}`))?.close();
    };
    
    const toggle = (id) => {
        modal.state[id] = !modal.state[id];
    };
    
    return {
        state,
        
        open,
        close,
        toggle,
    };
};
