<template>
    <div class="edit-blocks">
        <button
            v-if="!blocksComponentsList.length"
            type="button"
            class="button-link button-link--colored edit-blocks-list__btn-add"
            @click="showModal('editBlocksModal')"
        >
            Добавить запись
        </button>
        <div class="edit-blocks-list">
            <Component
                v-for="(block, index) in blocksComponentsList"
                :is="block.component"
                :style="{
                    textAlign: block.props.textAlign,
                    backgroundImage: block.props.backgroundImage
                }"
                :key="index"
                :index
                :text="block.props.text"
                :h2="block.props.h2"
                :h4="block.props.h4"
                :imageArr="block.props.imageArr"
                :contenteditable="true"
            />
        </div>
    </div>
</template>

<script>
import { useModalsStore, useProjectsStore, useEditingRevertStore } from '../../../../stores'
import { mapState, mapActions } from 'pinia'
import HeaderBlock from './EditBlock/HeaderBlock.vue'
import TextBlock from './EditBlock/TextBlock.vue'
import ImgTextBlock from './EditBlock/ImgTextBlock.vue'
import SliderBlock from './EditBlock/SliderBlock.vue'
import YoutubeBlock from './EditBlock/YoutubeBlock.vue'
import VimeoBlock from './EditBlock/VimeoBlock.vue'

export default {
    components: {
        HeaderBlock,
        TextBlock,
        ImgTextBlock,
        SliderBlock,
        YoutubeBlock,
        VimeoBlock
    },

    data() {
        return {
            projectId: +this.$route.params.projectId,
            pageId: +this.$route.params.pageId,
            blocksList: [],
            blocksComponentsList: []
        }
    },
    computed: {
        ...mapState(useProjectsStore, ['getPageContent', 'emitsCounter']),

        selectedBlockExamples() {
            return this.blocks[this.activeBlockIndex].variants
        }
    },

    methods: {
        ...mapActions(useModalsStore, ['showModal']),
        ...mapActions(useEditingRevertStore, ['saveChanges']),
        updateBlockComponentsList(blocksList) {
            this.blocksComponentsList = []
            blocksList.forEach((block) => {
                switch (block.type) {
                    case 'block-text':
                        this.blocksComponentsList.push({
                            component: 'TextBlock',
                            props: { textAlign: block.textAlign, text: block.text }
                        })
                        break
                    case 'block-header':
                        this.blocksComponentsList.push({
                            component: 'HeaderBlock',
                            props: {
                                textAlign: block.textAlign,
                                text: block.text,
                                h2: block.h2,
                                h4: block.h4
                            }
                        })
                        break
                    case 'block-img-text':
                        this.blocksComponentsList.push({
                            component: 'ImgTextBlock',
                            props: {
                                backgroundImage: `url(${block.icon || '/src/assets/images/cat.jpg'})`,
                                text: block.text,
                                h2: block.h2
                            }
                        })
                        break
                    case 'block-slider':
                        this.blocksComponentsList.push({
                            component: 'SliderBlock',
                            props: {
                                imageArr: block.imageArr || [
                                    '/src/assets/images/cat.jpg',
                                    '/src/assets/images/cat 2.jpg',
                                    '/src/assets/images/cat 3.jpg',
                                    '/src/assets/images/cat.jpg',
                                    '/src/assets/images/cat 2.jpg',
                                    '/src/assets/images/cat 3.jpg'
                                ]
                            }
                        })
                        break
                    case 'youtube':
                        this.blocksComponentsList.push({
                            component: 'YoutubeBlock',
                            props: {}
                        })
                        break
                    case 'vimeo':
                        this.blocksComponentsList.push({
                            component: 'VimeoBlock',
                            props: {}
                        })
                        break
                }
            })
        }
    },
    watch: {
        emitsCounter: {
            handler() {
                const pageContent = this.getPageContent(this.projectId, this.pageId)
                this.updateBlockComponentsList(pageContent)
                this.saveChanges(this.projectId, this.pageId, pageContent)
            },
            immediate: true
        }
    }
}
</script>
