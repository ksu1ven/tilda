import { defineStore } from 'pinia'
import pageIcon from '../../assets/images/cat.jpg'
// я не смогла сделать pages=usePagesStore(), т.к. везде один экземпляр стора и при добавлении/ удалении страницы добавляется/удаляется на всех проектах
// Чат GPT Не помог(

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [
            {
                id: 1,
                pages: [
                    {
                        id: 1,
                        title: 'Page',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon
                    }
                ]
            },
            {
                id: 2,
                pages: [
                    {
                        id: 1,
                        title: 'Page',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon
                    }
                ]
            },
            {
                id: 3,
                pages: [
                    {
                        id: 1,
                        title: 'Page',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon
                    }
                ]
            },
            {
                id: 4,
                pages: [
                    {
                        id: 1,
                        title: 'Page',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon
                    }
                ]
            }
        ]
    }),
    getters: {
        getProjectById: (state) => (id) => {
            return state.projects.find((project) => project.id === id)?.pages
        }
    },

    actions: {
        addProject() {
            const newId = this.projects.at(-1).id + 1
            this.projects.push({
                id: newId,
                pages: [
                    {
                        id: 1,
                        title: 'Page',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon
                    }
                ]
            })
        },
        removeProject(id) {
            this.projects = this.projects.filter((project) => project.id !== id)
        },
        findProjectById(projectId) {
            return this.projects.find((project) => project.id === projectId)
        },
        addPageToProject(projectId) {
            const project = this.findProjectById(projectId)
            if (project) {
                project.pages.push({
                    id: project.pages.at(-1).id + 1,
                    title: 'Page',
                    description: 'Тестовое описание',
                    url: 'Тестовый адрес',
                    icon: pageIcon
                })
            }
        },
        removePageFromProject(projectId, pageId) {
            const project = this.findProjectById(projectId)
            if (project) {
                project.pages = project.pages.filter((p) => p.id !== pageId)
            }
        },
        getPageData(projectId, pageId) {
            const project = this.findProjectById(projectId)
            if (project) {
                return project.pages.find((p) => p.id === pageId)
            }
        },
        editPageData(projectId, pageId, newData) {
            const project = this.findProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                const { title, description, url } = newData
                page.title = title
                page.description = description
                page.url = url
            }
        },
        editPageIcon(projectId, pageId, icon) {
            const project = this.findProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                page.icon = icon
            }
        }
    }
})
