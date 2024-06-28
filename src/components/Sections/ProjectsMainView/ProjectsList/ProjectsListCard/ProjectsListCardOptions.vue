<template>
    <div
        class="projects-list-card-options"
        :class="isOptionsVisible ? 'projects-list-card-options--active' : ''"
        v-click-outside="{ handler: closePopup, exclude: excludeRef }"
    >
        <button
            class="button-link button-link--icon projects-list-card-options__btn"
            @click="closePopup"
        >
            <svg role="img" aria-hidden="true" width="30" height="30">
                <use xlink:href="#menu-icon-cross"></use>
            </svg>
        </button>
        <form action="" @submit.prevent="editTitle">
            <input type="text" class="projects-list-card-options__input" v-model="newTitle" />
            <button type="submit" class="button-link projects-list-card-options__option">
                Переименовать
            </button>
        </form>

        <button
            type="button"
            class="button-link projects-list-card-options__option"
            @click="deleteSelectedProject"
        >
            Удалить
        </button>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useProjectsStore } from '../../../../../stores'

export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        isOptionsVisible: {
            type: Boolean,
            required: true
        },
        excludeRef: {
            type: Object
        }
    },
    data() {
        return { newTitle: '' }
    },
    emits: ['close-options'],
    methods: {
        ...mapActions(useProjectsStore, ['removeProject']),

        closePopup() {
            this.$emit('close-options')
        },

        deleteSelectedProject() {
            this.removeProject(this.id)
            this.$emit('close-options')
        }
        // editTitle() {
        //     this.$emit('edit-title', this.newTitle)
        //     this.newTitle = ''
        //     this.$emit('close-options')
        // }
    }
}
</script>
