import { defineStore } from 'pinia'
import pageIcon from '../../assets/images/cat.jpg'

export const usePagesStore = defineStore('pages', {
    state: () => ({
        pages: [{ title: 'Page 1', description: '', url: '', icon: pageIcon }]
    }),
    getters: {
        getPages: (state) => {
            return state.pages
        }
    },

    actions: {
        addPage() {
            this.pages.push({
                title: `Page ${this.pages.length + 1}`,
                description: '',
                url: '',
                icon: pageIcon
            })
        },
        removePage(page) {
            this.pages = this.pages.filter((p) => p.title !== page)
        }
    }
})
