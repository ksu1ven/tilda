import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', {
    state: () => ({
        settingsModal: {
            isPageSettingsModalShow: false,
            pageNumber: 1
        },
        domainModal: {
            isDomainModalShow: false
        }
    }),

    actions: {
        showModal(modalType, options) {
            switch (modalType) {
                case 'pageSettings':
                    this.settingsModal.isPageSettingsModalShow = true
                    this.settingsModal.pageNumber = options.pageNumber
                    break
                case 'domainModal':
                    this.domainModal.isDomainModalShow = true
                    break

                default:
                    break
            }
        },
        hideModal(modalType) {
            switch (modalType) {
                case 'pageSettings':
                    this.settingsModal.isPageSettingsModalShow = false
                    this.settingsModal.pageNumber = 1
                    break
                case 'domainModal':
                    this.domainModal.isDomainModalShow = false
                    break

                default:
                    break
            }
        }
    }
})
