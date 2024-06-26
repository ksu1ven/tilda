import { createRouter, createWebHistory } from 'vue-router'
import ProjectsMainView from '../views/ProjectsMainView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'ProjectHomeView',
            component: ProjectsMainView
        },
        {
            path: '/project/:projectId',
            name: 'ProjectView',
            component: () => import('../views/ProjectView.vue')
        },
        {
            path: '/project/:projectId/edit/:pageId',
            name: 'EditView',
            component: () => import('../views/EditView.vue')
        },
        {
            path: '/project/:projectId/preview/:pageId',
            name: 'PreviewView',
            component: () => import('../views/PreviewView.vue')
        },
        {
            path: '/profile',
            name: 'ProfileView',
            component: ProfileView
        }
    ]
})

export default router
