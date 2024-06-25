import { createRouter, createWebHistory } from 'vue-router'
import ProjectsHomeView from '../views/ProjectsHomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import PreviewView from '../views/PreviewView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'ProjectHomeView' }
        },
        {
            path: '/home',
            name: 'ProjectHomeView',
            component: ProjectsHomeView
        },
        {
            path: '/project/:id',
            name: 'ProjectView',
            component: () => import('../views/ProjectView.vue')
        },
        {
            path: '/project/:id/edit',
            name: 'EditView',
            component: () => import('../views/EditView.vue')
        },
        {
            path: '/project/:id/preview',
            name: 'PreviewView',
            component: PreviewView
        },
        {
            path: '/profile',
            name: 'ProfileView',
            component: ProfileView
        }
    ]
})

export default router
