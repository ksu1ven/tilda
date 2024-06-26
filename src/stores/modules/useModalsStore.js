import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', {
    state: () => ({
        settingsModal: {
            isShow: false,
            pageNumber: 1
        },
        domainModal: {
            isShow: false
        },
        editBlocksModal: {
            isShow: false
        },
        editBlockContentModal: {
            isShow: false,
            contentIndex: 0
        }
    }),

    actions: {
        showModal(modalType, options) {
            switch (modalType) {
                case 'pageSettings':
                    this.settingsModal.isShow = true
                    this.settingsModal.pageNumber = options.pageNumber
                    break
                case 'domainModal':
                    this.domainModal.isShow = true
                    break

                case 'editBlocksModal':
                    this.editBlocksModal.isShow = true
                    break
                case 'editBlockContentModal':
                    this.editBlockContentModal.isShow = true
                    this.editBlockContentModal.contentIndex = options.contentIndex
                    break

                default:
                    break
            }
        },
        hideModal(modalType) {
            switch (modalType) {
                case 'pageSettings':
                    this.settingsModal.isShow = false
                    this.settingsModal.pageNumber = 1
                    break
                case 'domainModal':
                    this.domainModal.isShow = false
                    break

                case 'editBlocksModal':
                    this.editBlocksModal.isShow = false
                    break
                case 'editBlockContentModal':
                    this.editBlockContentModal.isShow = false
                    this.editBlockContentModal.contentIndex = 0
                    break

                default:
                    break
            }
        }
    }
})
