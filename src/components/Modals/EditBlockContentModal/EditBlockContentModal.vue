<template>
    <ModalApp
        :modalType
        :isModalShow="editBlockContentModal.isShow"
        modalClass="modal modal--absolute"
        :withCross="true"
        contentClass="edit-block-content-modal"
        ><form action="" @submit.prevent="submitForm">
            <div v-if="!galeryVisible" class="edit-block-content-modal__fields">
                <label v-if="contentType !== 'block-text'" class="edit-block-content-modal__label"
                    >Заголовок
                    <textarea
                        v-model="h2"
                        rows="5"
                        class="edit-block-content-modal__textarea"
                    ></textarea>
                </label>
                <label v-if="contentType === 'block-header'" class="edit-block-content-modal__label"
                    >Подзаголовок
                    <textarea
                        v-model="h4"
                        rows="5"
                        class="edit-block-content-modal__textarea"
                    ></textarea>
                </label>
                <label class="edit-block-content-modal__label"
                    >Текст
                    <textarea
                        v-model="text"
                        rows="5"
                        class="edit-block-content-modal__textarea"
                    ></textarea>
                </label>
            </div>

            <div class="edit-block-content-modal__galery" v-if="contentType === 'block-img-text'">
                <div v-if="!galeryVisible" class="edit-block-content-modal__img-container">
                    <img class="background-img" :src="icon" alt="Beidge icon" />
                    <button
                        class="button-link edit-block-content-modal__open-unsplash-button"
                        type="button"
                        @click="galeryVisible = true"
                    >
                        Изменить изображение
                    </button>
                </div>
                <UnsplashGalery v-else @submit-form="submitFormWithIcon" />
            </div>

            <button
                v-if="!galeryVisible"
                type="submit"
                class="button-link button-link--colored edit-block-content-modal__submit"
            >
                Сохранить
            </button>
        </form>
    </ModalApp>
</template>

<script>
import ModalApp from '../../ModalApp.vue'
import { useModalsStore, useProjectsStore } from '../../../stores'
import UnsplashGalery from '../PageSettingsModal/UnsplashGalery/UnsplashGalery.vue'
import { mapState, mapActions } from 'pinia'
import pageIcon from '../../../assets/images/cat.jpg'

export default {
    components: { ModalApp, UnsplashGalery },

    data() {
        return {
            projectId: +this.$route.params.projectId,
            pageId: +this.$route.params.pageId,
            modalType: 'editBlockContentModal',
            contentIndex: '',
            contentType: '',
            h2: '',
            h4: '',
            text: '',
            icon: '',
            galeryVisible: false
        }
    },
    computed: {
        ...mapState(useModalsStore, ['editBlockContentModal']),
        ...mapState(useProjectsStore, ['getPageContent'])
    },

    methods: {
        ...mapActions(useModalsStore, ['hideModal']),
        ...mapActions(useProjectsStore, ['editPageContent', 'updateEmitsCounter']),
        submitFormWithIcon(icon) {
            this.icon = icon.src
            this.galeryVisible = false
        },
        submitForm() {
            this.editPageContent(this.projectId, this.pageId, this.contentIndex, {
                h2: this.h2,
                h4: this.h4,
                text: this.text,
                icon: this.icon
            })
            this.h2 = ''
            this.h4 = ''
            this.text = ''
            this.icon = ''
            this.updateEmitsCounter()
            this.hideModal(this.modalType)
        }
    },
    updated() {
        this.galeryVisible = false
        this.contentIndex = this.editBlockContentModal.contentIndex
        let pageContent = this.getPageContent(this.projectId, this.pageId)[this.contentIndex]
        if (pageContent) {
            this.contentType = pageContent.type
            this.h2 = pageContent.h2 || ''
            this.h4 = pageContent.h4 || ''
            this.text = pageContent.text || ''
            this.icon = pageContent.icon || pageIcon
        }
    }
}
</script>
