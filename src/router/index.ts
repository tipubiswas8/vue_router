import { createRouter, createWebHistory } from 'vue-router'
import LayoutOne from '@/views/layouts/LayoutOne.vue'
import LayoutTwo from '@/views/layouts/LayoutTwo.vue'
import PageOneView from '@/views/Pages/PageOneView.vue';

const routes = [
  {
    name: '',
    path: '/', // root path
    component: LayoutOne,
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/Pages/HomeView.vue'),
        meta: { title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('@/views/Pages/SettingsView.vue'),
        meta: { title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      },
      {
        name: 'preferences',
        path: 'preferences', // ✅ fixed
        component: () => import('@/views/Pages/PreferenceView.vue'),
        meta: { title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      },
      {
        name: 'change-password',
        path: 'password-change',
        component: () => import('@/views/Pages/PasswordPage.vue'),
        meta: { title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      }
    ],
  },
  {
    path: '/layout-two',
    component: LayoutTwo,
    children: [
      {
        name: 'about',
        path: 'about',
        component: () => import('@/views/Pages/AboutView.vue'),
        meta: { title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      },
      {
        name: 'contact',
        path: 'contact',
        component: () => import('@/views/Pages/ContactView.vue'),
        meta: { title: 'Dashboard', icon: 'fas fa-tachometer-alt' }
      },
    ]
  },
  {
    path: "/page-one",
    name: "page-one",
    component: PageOneView,
    meta: { requiresAuth: true },
  },
  {
    path: "/page-two",
    name: "page-two",
    component: () => import('@/views/Pages/PageTwo.vue'),
    meta: { requiresAuth: true },
  },
  { path: "/:catchAll(.*)", redirect: "/" },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
