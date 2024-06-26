<template>
    <li class="projects-list-card">
        <button
            class="button-link button-link--icon projects-list-card__options-btn"
            @click="isOptionsVisible = true"
            ref="excludeElement"
        >
            <svg role="img" aria-hidden="true" width="30" height="30">
                <use xlink:href="#options-icon"></use>
            </svg>
        </button>
        <Transition>
            <ProjectsListCardOptions
                v-show="isOptionsVisible"
                :isOptionsVisible
                :excludeRef="excludeElement"
                :id="item.id"
                @close-options="isOptionsVisible = false"
        /></Transition>

        <h2 class="projects-list-card__h2">My project {{ item.id }}</h2>
        <hr />
        <div class="projects-list-card__footer">
            <RouterLink
                :to="{ name: 'EditView', params: { projectId: item.id, pageId: 1 } }"
                class="button-link button-link--with-icon"
                type="button"
            >
                <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                    <use xlink:href="#edit-icon"></use>
                </svg>
                <span class="button-link__text"
                    ><strong>{{ 'Редактировать сайт'.toUpperCase() }}</strong></span
                >
            </RouterLink>
            <RouterLink
                :to="{ name: 'ProjectView', params: { projectId: item.id } }"
                class="button-link button-link--with-icon"
            >
                <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                    <use xlink:href="#open-site-icon"></use>
                </svg>
                <span class="button-link__text"> {{ projectRoute }} </span></RouterLink
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

    // emits: ['edit-title'],
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isOptionsVisible: false,
            excludeElement: null
        }
    },
    methods: {
        // editTitle(newTitleValue) {
        //     this.$emit('edit-title', this.index, newTitleValue)
        // }
    },

    mounted() {
        this.excludeElement = this.$refs.excludeElement
    },
    computed: {
        projectRoute() {
            return `${window.location.origin}/project/${this.item.id}`
        }
    }
}
</script>
