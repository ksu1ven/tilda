<template>
    <div
        class="edit-block-text"
        contenteditable="true"
        @input="changeText($event.target.textContent)"
    >
        {{ text }}
    </div>
</template>

<script>
import { useProjectsStore } from '../../../../../stores'
import { mapActions } from 'pinia'
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            default:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nesciunt quae aliquid nisi tenetur ratione asperiores reprehenderit placeat reiciendis aspernatur quas id velit totam dicta, fugit ex nam, minima veniam.'
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
        }
    }
}
</script>
