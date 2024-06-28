<template>
    <div class="preview-blocks-list">
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
            :image-arr="block.props.imageArr"
            :contenteditable="false"
        />
    </div>
    <RouterLink
        :to="{ name: 'EditContentView', params: { projectId, pageId } }"
        class="button-link button-link--colored preview-blocks-list__link"
        >Вернуться к редактированию</RouterLink
    >
</template>

<script>
import { useProjectsStore } from '../../../../stores'
import { mapState } from 'pinia'
import HeaderBlock from '@/components/Sections/EditContentView/EditBlocksList/EditBlock/HeaderBlock.vue'
import TextBlock from '@/components/Sections/EditContentView/EditBlocksList/EditBlock/TextBlock.vue'
import ImgTextBlock from '@/components/Sections/EditContentView/EditBlocksList/EditBlock/ImgTextBlock.vue'
import SliderBlock from './PreviewBlock/PreviewSliderBlock.vue'

export default {
    components: {
        HeaderBlock,
        TextBlock,
        ImgTextBlock,
        SliderBlock
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
        ...mapState(useProjectsStore, ['getPageContent'])
    },

    mounted() {
        this.blocksList = this.getPageContent(this.projectId, this.pageId)
        if (this.blocksList) {
            this.blocksList.forEach((block) => {
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
                }
            })
        }
    }
}
</script>
