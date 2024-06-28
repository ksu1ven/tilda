import { defineStore } from 'pinia'
import { useProjectsStore } from './useProjectsStore'

export const useEditingRevertStore = defineStore('editingRevertStore', {
    state: () => ({
        pages: {}
    }),
    actions: {
        saveChanges(projectID, pageID) {
            const key = this._generateKey(projectID, pageID)
            const projectsStore = useProjectsStore()
            if (!this.pages[key]) {
                this.pages[key] = []
            }

            const currentPageState = JSON.stringify(projectsStore.getPageContent(projectID, pageID))
            this.pages[key].push(currentPageState)
            console.log(this.pages[key])
        },
        _generateKey(projectID, pageID) {
            return `${projectID}-${pageID}`
        }
    }
})
