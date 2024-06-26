import { defineStore } from 'pinia'
import pageIcon from '../../assets/images/cat.jpg'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [
            {
                id: 1,
                pages: [
                    {
                        id: 1,
                        title: 'Page 1',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon,
                        content: []
                    }
                ]
            },
            {
                id: 2,
                pages: [
                    {
                        id: 1,
                        title: 'Page 1',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon,
                        content: []
                    }
                ]
            },
            {
                id: 3,
                pages: [
                    {
                        id: 1,
                        title: 'Page 1',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon,
                        content: []
                    }
                ]
            },
            {
                id: 4,
                pages: [
                    {
                        id: 1,
                        title: 'Page 1',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon,
                        content: []
                    }
                ]
            }
        ]
    }),
    getters: {
        getProjectById: (state) => (id) => {
            return state.projects.find((project) => project.id === id)?.pages
        },
        getPageContent: (state) => (projectId, pageId) => {
            const project = state.projects.find((project) => project.id === projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                return page.content
            }
        }
    },

    actions: {
        addProject() {
            const newId = this.projects?.at(-1)?.id + 1 || 1
            this.projects.push({
                id: newId,
                pages: [
                    {
                        id: 1,
                        title: 'Page 1',
                        description: 'Тестовое описание',
                        url: 'Тестовый адрес',
                        icon: pageIcon,
                        content: []
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
                    id: project.pages?.at(-1)?.id + 1 || 1,
                    title: `Page ${project.pages?.at(-1)?.id + 1 || 1}`,
                    description: 'Тестовое описание',
                    url: 'Тестовый адрес',
                    icon: pageIcon,
                    content: []
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
                const { title, description, url, icon } = newData
                page.title = title
                page.description = description
                page.url = url
                page.icon = icon
            }
        },

        addPageContent(projectId, pageId, newContent) {
            const project = this.findProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                page.content.push(newContent)
            }
        },

        editPageContent(projectId, pageId, contentIndex, newContent) {
            const project = this.findProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                page.content[contentIndex] = { ...page.content[contentIndex], ...newContent }
            }
        }
    }
})
