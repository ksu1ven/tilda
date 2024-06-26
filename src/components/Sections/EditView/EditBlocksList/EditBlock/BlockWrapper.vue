<template>
    <div class="edit-block-wrapper">
        <button
            type="button"
            class="button-link button-link--colored edit-block-wrapper__content"
            @click="openContentModal"
        >
            Контент
        </button>
        <button
            type="button"
            class="button-link button-link--icon edit-block-wrapper__add"
            @click="showModal('editBlocksModal')"
        >
            <svg role="img" aria-hidden="true" width="50" height="50" aria-label="Add Element">
                <use xlink:href="#plus-icon"></use>
            </svg>
        </button>
        <div class="edit-block-wrapper__buttons">
            <button
                type="button"
                class="button-link button-link--icon edit-block-wrapper__btn"
                @click="upBlock"
            >
                <svg role="img" aria-hidden="true" width="30" height="30" aria-label="Up Element">
                    <use xlink:href="#up-icon"></use>
                </svg>
            </button>
            <button
                type="button"
                class="button-link button-link--icon edit-block-wrapper__btn"
                @click="copyBlock"
            >
                <svg role="img" aria-hidden="true" width="30" height="30" aria-label="Copy Element">
                    <use xlink:href="#copy-icon"></use>
                </svg>
            </button>
            <button type="button" class="button-link button-link--icon edit-block-wrapper__btn">
                <svg
                    role="img"
                    aria-hidden="true"
                    width="30"
                    height="30"
                    aria-label="Remove Element"
                    @click="removeBlock"
                >
                    <use xlink:href="#cart-icon"></use>
                </svg>
            </button>
            <button
                type="button"
                class="button-link button-link--icon edit-block-wrapper__btn"
                @click="downBlock"
            >
                <svg role="img" aria-hidden="true" width="30" height="30" aria-label="Down Element">
                    <use xlink:href="#down-icon"></use>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import { useProjectsStore, useModalsStore } from '../../../../../stores'
import { mapActions } from 'pinia'
export default {
    props: {
        index: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            projectId: +this.$route.params.projectId,
            pageId: +this.$route.params.pageId
        }
    },

    methods: {
        ...mapActions(useModalsStore, ['showModal']),
        ...mapActions(useProjectsStore, ['manipulateWithBlocks', 'updateEmitsCounter']),
        openContentModal() {
            this.showModal('editBlockContentModal', { contentIndex: this.index })
        },
        removeBlock() {
            this.manipulateWithBlocks(this.projectId, this.pageId, this.index, {
                type: 'remove'
            })
            this.updateEmitsCounter()
        },
        upBlock() {
            this.manipulateWithBlocks(this.projectId, this.pageId, this.index, {
                type: 'up'
            })
            this.updateEmitsCounter()
        },
        downBlock() {
            this.manipulateWithBlocks(this.projectId, this.pageId, this.index, {
                type: 'down'
            })
            this.updateEmitsCounter()
        },
        copyBlock() {
            this.manipulateWithBlocks(this.projectId, this.pageId, this.index, {
                type: 'copy'
            })
            this.updateEmitsCounter()
        }
    }
}
</script>
