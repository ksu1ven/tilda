<template>
    <ModalApp
        :modalType
        :isModalShow="editBlockContentModal.isShow"
        modalClass="modal modal--absolute"
        :withCross="true"
        contentClass="edit-block-content-modal"
        ><form action="" @submit.prevent="submitForm">
            <div v-if="!galeryVisible" class="edit-block-content-modal__fields">
                <label
                    v-if="contentType === 'block-header' || contentType === 'block-img-text'"
                    class="edit-block-content-modal__label"
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
                <label
                    v-if="contentType === 'block-header' || contentType === 'block-text'"
                    class="edit-block-content-modal__label"
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

            <div class="edit-block-content-modal__galery" v-if="contentType === 'block-slider'">
                <div v-if="!galerySliderVisible" class="edit-block-content-modal__slides">
                    <div
                        v-for="(image, index) in imageArr"
                        :key="index"
                        class="edit-block-content-modal__img-container"
                    >
                        <img class="background-img" :src="image" alt="Beidge icon" />
                        <button
                            class="button-link edit-block-content-modal__open-unsplash-button"
                            type="button"
                            @click="clickSliderImage(index)"
                        >
                            Изменить изображение
                        </button>
                        <button
                            v-if="index === imageArr.length - 1"
                            type="button"
                            class="button-link button-link--icon edit-block-wrapper__add"
                            @click="addSlide"
                        >
                            <svg
                                role="img"
                                aria-hidden="true"
                                width="50"
                                height="50"
                                aria-label="Add Element"
                            >
                                <use xlink:href="#plus-icon"></use>
                            </svg>
                        </button>

                        <button
                            type="button"
                            class="button-link button-link--icon edit-block-content-modal__slide-remove"
                        >
                            <svg
                                role="img"
                                aria-hidden="true"
                                width="30"
                                height="30"
                                aria-label="Remove Element"
                                @click="removeSlide(index)"
                            >
                                <use xlink:href="#cart-icon"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <UnsplashGalery v-else :index="galerySlideIndex" @submit-form="submitFormSlider" />
            </div>

            <button
                v-if="!galeryVisible && !galerySliderVisible"
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
            imageArr: [],
            tempImageArr: [],
            galeryVisible: false,
            galerySliderVisible: false,
            galerySlideIndex: 0
        }
    },
    computed: {
        ...mapState(useModalsStore, ['editBlockContentModal']),
        ...mapState(useProjectsStore, ['getPageContent'])
    },

    methods: {
        ...mapActions(useModalsStore, ['hideModal']),
        ...mapActions(useProjectsStore, ['editPageContent', 'updateEmitsCounter']),

        addSlide() {
            let copy = [...this.imageArr]
            copy.push('/src/assets/images/cat.jpg')
            this.imageArr = copy
        },

        removeSlide(index) {
            let copy = [...this.imageArr]
            copy.splice(index, 1)
            if (copy.length > 3) this.imageArr = copy
        },

        clickSliderImage(index) {
            this.galerySlideIndex = index
            this.galerySliderVisible = true
        },
        submitFormWithIcon(icon) {
            this.icon = icon.src
            this.galeryVisible = false
        },
        submitFormSlider(icon, index) {
            let copy = [...this.imageArr]
            copy[index] = icon.src
            this.imageArr = copy
            this.galerySliderVisible = false
        },
        submitForm() {
            this.editPageContent(this.projectId, this.pageId, this.contentIndex, {
                h2: this.h2,
                h4: this.h4,
                text: this.text,
                icon: this.icon,
                imageArr: this.imageArr
            })
            this.h2 = ''
            this.h4 = ''
            this.text = ''
            this.icon = ''
            this.imageArr = []
            this.updateEmitsCounter()
            this.hideModal(this.modalType)
        }
    },
    updated() {
        this.galeryVisible = false
        this.galerySliderVisible = false
        this.contentIndex = this.editBlockContentModal.contentIndex
        let pageContent = this.getPageContent(this.projectId, this.pageId)[this.contentIndex]
        if (pageContent) {
            this.contentType = pageContent.type
            this.h2 = pageContent.h2 || ''
            this.h4 = pageContent.h4 || ''
            this.text = pageContent.text || ''
            this.icon = pageContent.icon || '/src/assets/images/cat.jpg'
            this.imageArr = pageContent.imageArr || [
                '/src/assets/images/cat.jpg',
                '/src/assets/images/cat 2.jpg',
                '/src/assets/images/cat 3.jpg',
                '/src/assets/images/cat.jpg',
                '/src/assets/images/cat 2.jpg',
                '/src/assets/images/cat 3.jpg'
            ]
        }
    }
}
</script>
