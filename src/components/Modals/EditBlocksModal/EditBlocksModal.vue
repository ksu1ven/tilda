<template>
    <ModalApp
        :modalType
        :isModalShow="editBlocksModal.isEditBlocksModal"
        modalClass="modal-left-50"
        :withCross="false"
        contentClass="edit-blocks-modal"
        transitionName="slide"
    >
        <div class="edit-blocks-modal-library">
            <form action="" class="edit-blocks-modal-library__form" @submit.prevent="">
                <input
                    type="text"
                    class="edit-blocks-modal-library__input"
                    placeholder="Библиотека блоков"
                />
                <div class="edit-blocks-modal-library__buttons">
                    <button
                        type="submit"
                        aria-label="Search block"
                        class="button-link button-link--icon edit-blocks-modal-library__btn"
                    >
                        <svg role="img" aria-hidden="true" width="20" height="20">
                            <use xlink:href="#search-icon"></use>
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="button-link button-link--icon edit-blocks-modal-library__btn"
                        @click="hideModal(modalType)"
                    >
                        <svg role="img" aria-hidden="true" width="20" height="20">
                            <use xlink:href="#menu-icon-cross"></use>
                        </svg>
                    </button>
                </div>
            </form>
            <ul class="edit-blocks-modal-library__list">
                <li
                    v-for="(block, index) in blocks"
                    :key="index"
                    class="edit-blocks-modal-library__item"
                    :class="
                        index === activeBlockIndex ? 'edit-blocks-modal-library__item--active' : ''
                    "
                >
                    <button type="button" @click="activeBlockIndex = index">
                        {{ block.title }}
                    </button>
                </li>
            </ul>
        </div>
        <ul class="edit-blocks-examples">
            <li
                v-for="(example, index) in selectedBlockExamples"
                :key="index"
                class="edit-blocks-examples__item"
            >
                <button type="button" @click="addNewBlock(example.type, example.textAlign)">
                    <h4 class="edit-blocks-examples__h4">{{ example.title }}</h4>
                    <div class="edit-blocks-examples__p">{{ example.alignTitle }}</div>
                </button>
            </li>
        </ul>
    </ModalApp>
</template>

<script>
import ModalApp from '../../ModalApp.vue'
import { useModalsStore, useBlocksStore, useProjectsStore } from '../../../stores'
import { mapState, mapActions } from 'pinia'

export default {
    components: { ModalApp },
    emits: ['block-added'],
    data() {
        return {
            projectId: +this.$route.params.projectId,
            pageId: +this.$route.params.pageId,
            modalType: 'editBlocksModal',
            activeBlockIndex: 0
        }
    },
    computed: {
        ...mapState(useModalsStore, ['editBlocksModal']),
        ...mapState(useBlocksStore, ['blocks']),

        selectedBlockExamples() {
            return this.blocks[this.activeBlockIndex].variants
        }
    },

    methods: {
        ...mapActions(useModalsStore, ['hideModal']),
        ...mapActions(useProjectsStore, ['addPageContent']),

        addNewBlock(type, textAlign) {
            let content = { type, textAlign }
            this.addPageContent(this.projectId, this.pageId, content)
            this.$emit('block-added')
        }
    }
}
</script>
