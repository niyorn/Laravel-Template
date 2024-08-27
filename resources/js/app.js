import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { MotionPlugin } from '@vueuse/motion'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
import DashboardLayout from '@/Layouts/Main/DashboardLayout.vue';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => {
        const page = resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));

        page.then((module) => {
            module.default.layout= DashboardLayout;
        });

        return page;

    },

    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(ZiggyVue, Ziggy)
        .use(MotionPlugin)
        .mount(el);
    },

    progress: {
        color: '#5e94e0',
    },
});
