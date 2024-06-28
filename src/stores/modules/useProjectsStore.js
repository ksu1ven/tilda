import { defineStore } from 'pinia'
import { projectsDefault } from '@/data/projectsDefault'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: JSON.parse(localStorage.getItem('projects')) ?? projectsDefault,
        emitsCounter: 0
    }),
    getters: {
        getProjectById: (state) => (projectId) => {
            return state.projects.find((project) => project.id === projectId)
        },
        getProjectPagesById: (state) => (id) => {
            return state.projects.find((project) => project.id === id)?.pages
        },
        getPageData: (state) => (projectId, pageId) => {
            const project = state.getProjectById(projectId)
            if (project) {
                return project.pages.find((p) => p.id === pageId)
            }
        },
        getPageContent: (state) => (projectId, pageId) => {
            const project = state.projects.find((project) => project.id === projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                return page?.content
            }
        }
    },

    actions: {
        updateEmitsCounter() {
            this.emitsCounter += 1
        },
        updateLocalStorageProjects() {
            localStorage.setItem('projects', JSON.stringify(this.projects))
        },
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
                        icon: '/src/assets/images/cat.jpg',
                        content: []
                    }
                ]
            })
            this.updateLocalStorageProjects()
        },
        removeProject(id) {
            this.projects = this.projects.filter((project) => project.id !== id)
            this.updateLocalStorageProjects()
        },

        addPageToProject(projectId) {
            const project = this.getProjectById(projectId)
            if (project) {
                const id = project.pages?.at(-1)?.id + 1 || 1
                project.pages.push({
                    id,
                    title: `Page ${id}`,
                    description: 'Тестовое описание',
                    url: 'Тестовый адрес',
                    icon: '/src/assets/images/cat.jpg',
                    content: []
                })
                this.updateLocalStorageProjects()
            }
        },
        removePageFromProject(projectId, pageId) {
            const project = this.getProjectById(projectId)
            if (project) {
                project.pages = project.pages.filter((p) => p.id !== pageId)
                this.updateLocalStorageProjects()
            }
        },

        editPageData(projectId, pageId, newData) {
            const project = this.getProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                const { title, description, url, icon } = newData
                page.title = title
                page.description = description
                page.url = url
                page.icon = icon
                this.updateLocalStorageProjects()
            }
        },

        addPageContent(projectId, pageId, newContent) {
            const project = this.getProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                page.content.push(newContent)
                this.updateLocalStorageProjects()
                this.updateEmitsCounter()
            }
        },

        editPageContent(projectId, pageId, contentIndex, newContent) {
            const project = this.getProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                page.content[contentIndex] = { ...page.content[contentIndex], ...newContent }
                this.updateLocalStorageProjects()
            }
        },

        manipulateWithBlocks(projectId, pageId, contentIndex, action) {
            const project = this.getProjectById(projectId)
            if (project) {
                const page = project.pages.find((p) => p.id === pageId)
                let contentItem = { ...page.content[contentIndex] }
                if (contentItem) {
                    switch (action.type) {
                        case 'remove':
                            page.content.splice(contentIndex, 1)
                            break
                        case 'up':
                            if (contentIndex - 1 >= 0) {
                                page.content.splice(contentIndex, 1)
                                page.content.splice(contentIndex - 1, 0, contentItem)
                            }
                            break

                        case 'down':
                            page.content.splice(contentIndex, 1)
                            page.content.splice(contentIndex + 1, 0, contentItem)

                            break

                        case 'copy':
                            page.content.splice(contentIndex, 0, contentItem)
                            break

                        default:
                            break
                    }
                }
                this.updateLocalStorageProjects()
            }
        }
    }
})
