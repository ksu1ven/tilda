<template>
    <div class="edit-block-slider">
        <BlockWrapper v-if="contenteditable" :index="index" />
        <div class="edit-block-slider__content">
            <draggable
                v-model="currentImageArr"
                itemKey="id"
                class="edit-block-slider__content__list"
                @end="onDragEnd"
            >
                <template #item="{ element }">
                    <div :key="element.id" class="edit-block-slider__img-container">
                        <img :src="element.src" alt="Slide" class="background-img" />
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script>
import { useProjectsStore } from '../../../../../stores'
import { mapActions } from 'pinia'
import BlockWrapper from './BlockWrapper.vue'
import draggable from 'vuedraggable'

export default {
    components: {
        BlockWrapper,
        draggable
    },
    props: {
        index: {
            type: Number,
            required: true
        },
        contenteditable: {
            type: Boolean,
            required: true
        },
        imageArr: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            projectId: +this.$route.params.projectId,
            pageId: +this.$route.params.pageId,
            currentImageArr: this.imageArr.map((src, id) => ({ id, src }))
        }
    },
    methods: {
        ...mapActions(useProjectsStore, ['editPageContent']),
        onDragEnd(event) {
            let imageArrCopy = this.imageArr.slice(0)
            let spliced = imageArrCopy.splice(event.oldIndex, 1)
            imageArrCopy.splice(event.newIndex, 0, spliced[0])
            this.editPageContent(this.projectId, this.pageId, this.index, {
                imageArr: imageArrCopy
            })
        }
    },
    watch: {
        imageArr: {
            handler() {
                this.currentImageArr = this.imageArr.map((src, id) => ({ id, src }))
            }
        }
    }
}
</script>
