// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Start from './views/StartView.vue';
import Settings from './views/SettingsView.vue';
import Dashboard from './views/DashboardView.vue';
import Community from './views/CommunityView.vue';
import PostCreateView from './views/PostCreateView.vue';
import PostDetailView from './views/PostDetailView.vue';
import PostEditView from './views/PostEditView.vue';

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
        path: '/community',
        name: 'Community',
        component: Community,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/community/create',
        name: 'PostCreate',
        component: PostCreateView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/community/post',
        name: 'PostDetail',
        component: PostDetailView
    },
    {
        path: '/community/post/edit',
        name: 'PostEdit',
        component: PostEditView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Dashboard' }
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
