<template>
    <li class="projects-list-card">
        <button
            class="button-link button-link--icon projects-list-card__options-btn"
            @click="isOptionsVisible = true"
        >
            <svg role="img" aria-hidden="true" width="30" height="30">
                <use xlink:href="#options-icon"></use>
            </svg>
        </button>
        <Transition>
            <ProjectsListCardOptions
                v-show="isOptionsVisible"
                :isOptionsVisible
                @close-options="isOptionsVisible = false"
                @delete-project="deleteProject"
                @edit-title="editTitle"
        /></Transition>

        <h2 class="projects-list-card__h2">
            {{ item.title }}{{ item.defaultTitle ? `  ${index + 1}` : '' }}
        </h2>
        <hr />
        <div class="projects-list-card__footer">
            <router-link
                :to="{ name: 'EditView', params: { id: index + 1 } }"
                class="button-link button-link--with-icon"
                type="button"
            >
                <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                    <use xlink:href="#edit-icon"></use>
                </svg>
                <span class="button-link__text"
                    ><strong>{{ 'Редактировать сайт'.toUpperCase() }}</strong></span
                >
            </router-link>
            <router-link
                :to="{ name: 'ProjectView', params: { id: index + 1 } }"
                class="button-link button-link--with-icon"
            >
                <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                    <use xlink:href="#open-site-icon"></use>
                </svg>
                <span class="button-link__text"> {{ projectRoute }} </span></router-link
            >
        </div>
    </li>
</template>

<script>
import ProjectsListCardOptions from './ProjectsListCardOptions.vue'
export default {
    components: {
        ProjectsListCardOptions
    },
    emits: ['delete-project', 'edit-title'],
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isOptionsVisible: false
        }
    },
    methods: {
        deleteProject() {
            this.$emit('delete-project', this.index)
        },
        editTitle(newTitleValue) {
            this.$emit('edit-title', this.index, newTitleValue)
        }
    },
    computed: {
        projectRoute() {
            return `${window.location.origin}/project/${this.index + 1}`
        }
    }
}
</script>
