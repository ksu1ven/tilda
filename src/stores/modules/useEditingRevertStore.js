import { defineStore } from 'pinia'
import { useProjectsStore } from './useProjectsStore'

export const useEditingRevertStore = defineStore('editingRevertStore', {
    state: () => ({
        pages: {},
        count: 1,
        prevKey: ''
    }),
    actions: {
        saveChanges(projectID, pageID) {
            const key = this._generateKey(projectID, pageID)
            if (key !== this.prevKey) {
                this.count = 1
            }
            this.prevKey = key
            const projectsStore = useProjectsStore()
            if (!this.pages[key]) {
                this.pages[key] = []
            }
            const currentPageState = JSON.stringify(projectsStore.getPageContent(projectID, pageID))
            this.pages[key].push(currentPageState)
        },
        getRevertedContent(projectID, pageID) {
            const key = this._generateKey(projectID, pageID)
            if (this.pages[key]) {
                this.pages[key].pop()
                const lastIndex = this.pages[key].length - this.count
                this.count++
                return this.pages[key][lastIndex]
            }

            return ['']
        },
        _generateKey(projectID, pageID) {
            return `${projectID}-${pageID}`
        }
    }
})
