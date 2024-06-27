<template>
    <div class="edit-block-slider">
        <BlockWrapper v-if="contenteditable" :index />
        <div class="edit-block-slider__content">
            <div
                v-for="(image, index) in imageArr"
                :key="index"
                class="edit-block-slider__img-container"
            >
                <img :src="image" alt="Slide" class="background-img" />
            </div>
        </div>
    </div>
</template>

<script>
import BlockWrapper from './BlockWrapper.vue'

export default {
    components: { BlockWrapper },
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
            currentImageArr: []
        }
    }
}
</script>
