import { reactive } from 'vue';

export const sidebar = reactive({
    state: {},
});

export const useSideBar = () => {
    const state = sidebar.state;
    
    // When press on ESC close all modals
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
            for(const key in sidebar.state) {
                sidebar.state[key] = false;
            }
        }
    });
    
    const open = (id) => {
        closeAll(); 
        
        sidebar.state[id] = true;
        
        // const element = document.querySelector((`#${id}`));
        //
        // if(!element) return;
        //
        // element.style.display = 'block';
    };
    
    const close = (id) => {
        sidebar.state[id] = false;
        
        // const element = document.querySelector((`#${id}`));
        
        // if(!element) return;
        //
        // element.style.display = 'none';
    };
    
    const closeAll = () => {
        for(const key in sidebar.state) {
            sidebar.state[key] = false;
        }
    }
    
    return {
        state,
        
        open,
        close,
        closeAll,
    };
};
