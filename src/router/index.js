import { createRouter, createWebHistory } from 'vue-router'
import ProjectsMainView from '../views/ProjectsMainView.vue'
import ProfileView from '../views/ProfileView.vue'
import { getCookie } from '../helpers/getSetCookie'

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
            path: '/login',
            name: 'ProfileView',
            component: ProfileView
        }
    ]
})

router.beforeEach(async (to) => {
    const token = getCookie('token')
    let expires = getCookie('expires')
    if (expires) expires = Date.parse(decodeURIComponent(expires))

    if (
        (!token && to.name !== 'ProfileView') ||
        (token && expires < Date.now() && to.name !== 'ProfileView')
    ) {
        return { name: 'ProfileView' }
    } else if (token && to.name === 'ProfileView' && expires > Date.now()) {
        return { name: 'ProjectHomeView' }
    }
})

export default router
