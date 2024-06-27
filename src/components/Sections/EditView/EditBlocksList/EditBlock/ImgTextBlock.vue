<template>
    <div class="edit-block-img">
        <BlockWrapper v-if="contenteditable" :index />
        <h2
            class="edit-block-img__h2"
            :contenteditable
            @input="changeH2($event.target.textContent)"
        >
            {{ h2 }}
        </h2>
        <div
            class="edit-block-img__p"
            :contenteditable
            @input="changeText($event.target.textContent)"
        >
            {{ text }}
        </div>
    </div>
</template>

<script>
import BlockWrapper from './BlockWrapper.vue'
import { useProjectsStore } from '../../../../../stores'
import { mapActions } from 'pinia'
export default {
    components: { BlockWrapper },
    props: {
        index: {
            type: Number,
            required: true
        },
        h2: {
            type: String,
            default: 'Заголовок'
        },

        text: {
            type: String,
            default:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nesciunt quae aliquid nisi tenetur ratione asperiores reprehenderit placeat reiciendis aspernatur quas id velit totam dicta, fugit ex nam, minima veniam.'
        },
        contenteditable: {
            type: Boolean,
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
        ...mapActions(useProjectsStore, ['editPageContent']),

        changeText(newValue) {
            this.editPageContent(this.projectId, this.pageId, this.index, { text: newValue })
        },
        changeH2(newValue) {
            this.editPageContent(this.projectId, this.pageId, this.index, { h2: newValue })
        }
    }
}
</script>
