import { defineStore } from 'pinia'
import { useProjectsStore } from './useProjectsStore'

export const useEditingRevertStore = defineStore('editingRevertStore', {
    state: () => ({
        pages: JSON.parse(localStorage.getItem('revertion')) || {}
    }),
    actions: {
        saveChanges(projectID, pageID) {
            const key = this._generateKey(projectID, pageID)
            const projectsStore = useProjectsStore()
            if (!this.pages[key]) {
                this.pages[key] = []
            }
            localStorage.setItem('revertion', JSON.stringify(this.pages))
            const currentPageState = JSON.stringify(projectsStore.getPageContent(projectID, pageID))
            this.pages[key].push(currentPageState)
        },
        getRevertedContent(projectID, pageID) {
            const key = this._generateKey(projectID, pageID)
            if (this.pages[key]) {
                this.pages[key].pop()
                const lastIndex = this.pages[key].length - 2

                return this.pages[key][lastIndex]
            }

            return ['']
        },
        _generateKey(projectID, pageID) {
            return `${projectID}-${pageID}`
        }
    }
})
