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
            />
        </div>
    </div>
</template>

<script>
import pageIcon from '../../../../assets/images/cat.jpg'
import { useModalsStore, useProjectsStore } from '../../../../stores'
import { mapState, mapActions } from 'pinia'
import HeaderBlock from './EditBlock/HeaderBlock.vue'
import TextBlock from './EditBlock/TextBlock.vue'
import ImgTextBlock from './EditBlock/ImgTextBlock.vue'

export default {
    components: {
        HeaderBlock,
        TextBlock,
        ImgTextBlock
    },
    props: {
        counterEmits: {
            type: Number,
            required: true
        }
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
        ...mapState(useProjectsStore, ['getPageContent']),

        selectedBlockExamples() {
            return this.blocks[this.activeBlockIndex].variants
        }
    },

    methods: {
        ...mapActions(useModalsStore, ['showModal']),

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
                                backgroundImage: `url(${pageIcon})`,
                                text: block.text,
                                h2: block.h2
                            }
                        })
                        break
                }
            })
        }
    },
    watch: {
        counterEmits: {
            handler() {
                this.updateBlockComponentsList(this.getPageContent(this.projectId, this.pageId))
            },
            immediate: true
        }
    }
}
</script>
