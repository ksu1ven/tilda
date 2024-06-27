<template>
    <div class="projects-list-heading">
        <h1 class="projects-list-heading__h1">Мои сайты</h1>
        <button type="button" class="button-link button-link--with-icon" @click="addProject">
            <span class="button-link__icon button-link__icon--rounded">
                <svg role="img" aria-hidden="true" width="15" height="15">
                    <use xlink:href="#add-icon"></use>
                </svg>
            </span>
            <span class="button-link__text">Создать новый сайт</span>
        </button>
    </div>

    <ul class="projects-list" v-if="projects.length">
        <TransitionGroup>
            <ProjectsListCard v-for="item in projects" :key="item.id" :item />
        </TransitionGroup>
    </ul>
    <div class="projects-list--empty" v-else>Сайтов пока не добавлено</div>
</template>

<script>
import ProjectsListCard from './ProjectsListCard/ProjectsListCard.vue'
import { mapState, mapActions } from 'pinia'
import { useProjectsStore } from '../../../../stores'

export default {
    components: { ProjectsListCard },

    computed: {
        ...mapState(useProjectsStore, ['projects'])
    },
    methods: {
        ...mapActions(useProjectsStore, ['addProject'])

        // editTitle(ind, newTitle) {
        //     this.projectsList[ind] = {
        //         title: newTitle,
        //         defaultTitle: false
        //     }
        // }
    }
}
</script>
