import { createRouter, createWebHistory } from 'vue-router'
import ProjectsHomeView from '../views/ProjectsHomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditView from '../views/EditView.vue'
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
            path: '/profile',
            name: 'ProfileView',
            component: ProfileView
        },
        {
            path: '/edit',
            name: 'EditView',
            component: EditView
        },
        {
            path: '/preview',
            name: 'PreviewView',
            component: PreviewView
        }
    ]
})

export default router
