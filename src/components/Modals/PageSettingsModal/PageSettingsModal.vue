<template>
    <ModalApp
        :modalType
        :isModalShow="settingsModal.isPageSettingsModalShow"
        modalClass="modal modal--absolute"
        :withCross="true"
        contentClass="page-settings-modal"
    >
        <h2 class="page-settings-modal__h2">Настройки страницы</h2>
        <ul class="page-settings-modal__tabs">
            <li
                v-for="(tab, index) in tabs"
                :key="index"
                class="page-settings__tab"
                :class="activeTabIndex === index ? 'page-settings-modal__tab--active' : ''"
            >
                <button type="button" @click="changeActiveTab(index)">{{ tab }}</button>
            </li>
        </ul>
        <form action="" @submit.prevent="submitForm">
            <div v-if="activeTabIndex === 0" class="page-settings-modal__content">
                <label class="page-settings-modal__label">
                    Заголовок
                    <input type="text" class="page-settings-modal__input" v-model="title" />
                </label>
                <label class="page-settings-modal__label">
                    Описание
                    <input type="text" class="page-settings-modal__input" v-model="description" />
                </label>
                <label class="page-settings-modal__label">
                    Адрес страницы
                    <input type="text" class="page-settings-modal__input" v-model="url" />
                </label>
                <button
                    type="submit"
                    class="button-link button-link--colored page-settings-modal__submit"
                >
                    Сохранить изменения
                </button>
            </div>
            <div v-else-if="activeTabIndex === 1" class="page-settings-modal__content">
                <div v-if="!galeryVisible">
                    <div class="page-settings-modal__img-container">
                        <img class="background-img" :src="icon" alt="Beidge icon" />
                        <button
                            class="button-link page-settings-modal__open-unsplash-button"
                            type="button"
                            @click="galeryVisible = true"
                        >
                            Изменить бейдж
                        </button>
                    </div>

                    <button
                        type="submit"
                        class="button-link button-link--colored page-settings-modal__submit"
                    >
                        Сохранить изменения
                    </button>
                </div>

                <UnsplashGalery v-else @submit-form="submitFormWithIcon" />
            </div>
        </form>
    </ModalApp>
</template>
<script>
import ModalApp from '../../ModalApp.vue'
import UnsplashGalery from './UnsplashGalery/UnsplashGalery.vue'
import { useModalsStore, useProjectsStore } from '../../../stores'
import { mapState, mapActions } from 'pinia'

export default {
    components: { ModalApp, UnsplashGalery },
    data() {
        return {
            projectId: +this.$route.params.projectId,
            tabs: ['Главное', 'Бейджик'],
            modalType: 'pageSettings',
            activeTabIndex: 0,
            title: '',
            description: '',
            url: '',
            icon: '',
            galeryVisible: false
        }
    },
    computed: {
        ...mapState(useModalsStore, ['settingsModal'])
    },

    methods: {
        ...mapActions(useModalsStore, ['hideModal']),
        ...mapActions(useProjectsStore, ['getPageData']),
        ...mapActions(useProjectsStore, ['editPageData', 'editPageIcon']),

        updatePageData() {
            let pageData = this.getPageData(this.projectId, this.settingsModal.pageNumber)
            if (pageData) {
                this.title = pageData.title
                this.description = pageData.description
                this.url = pageData.url
                this.icon = pageData.icon
            }
        },

        submitForm() {
            this.editPageData(this.projectId, this.settingsModal.pageNumber, {
                title: this.title,
                description: this.description,
                url: this.url,
                icon: this.icon
            })
            this.title = ''
            this.description = ''
            this.url = ''
            this.updatePageData()
            this.hideModal(this.modalType)
        },

        submitFormWithIcon(icon) {
            this.icon = icon.src
            this.galeryVisible = false
        },

        changeActiveTab(newValue) {
            this.activeTabIndex = newValue
        }
    },
    mounted() {
        this.updatePageData()
    },
    watch: {
        'settingsModal.isPageSettingsModalShow'() {
            if (this.settingsModal.isPageSettingsModalShow === false) {
                this.galeryVisible = false
            }
        }
    }
}
</script>
