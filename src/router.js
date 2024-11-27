// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Start from './views/StartView.vue';
import Settings from './views/SettingsView.vue';
import Dashboard from './views/DashboardView.vue';

const routes = [
    {
        path: '/',
        name: 'StartPage',
        component: Start
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'StartPage' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    let is_allowed = true;
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwtToken') === null) {
            is_allowed = false;
        }
    }

    if (is_allowed) {
        next();
    } else {
        next({ name: 'StartPage' });
    }

});

export default router;
