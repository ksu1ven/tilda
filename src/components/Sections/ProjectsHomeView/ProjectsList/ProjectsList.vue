<template>
    <div class="projects-list-heading">
        <h1 class="projects-list-heading__h1">Мои сайты</h1>
        <button type="button" class="button-link button-link--with-icon" @click="addNewProject">
            <span class="button-link__icon button-link__icon--rounded">
                <svg role="img" aria-hidden="true" width="15" height="15">
                    <use xlink:href="#add-icon"></use>
                </svg>
            </span>
            <span class="button-link__text">Создать новый сайт</span>
        </button>
    </div>

    <ul class="projects-list" v-if="projectsList.length">
        <TransitionGroup>
            <ProjectsListCard
                v-for="(project, index) in projectsList"
                :key="index"
                :item="project"
                :index="index"
                @delete-project="deleteProject"
                @edit-title="editTitle"
            />
        </TransitionGroup>
    </ul>
    <div class="projects-list--empty" v-else>Сайтов пока не добавлено :(</div>
</template>

<script>
import ProjectsListCard from './ProjectsListCard/ProjectsListCard.vue'

export default {
    components: { ProjectsListCard },

    data() {
        return {
            projectsList: [
                { title: 'My project', defaultTitle: true },
                { title: 'My project', defaultTitle: true },
                { title: 'My project', defaultTitle: true },
                { title: 'My project', defaultTitle: true }
            ]
        }
    },
    methods: {
        addNewProject() {
            this.projectsList.push({
                title: 'My project',
                defaultTitle: true
            })
        },

        deleteProject(ind) {
            this.projectsList.splice(ind, 1)
        },

        editTitle(ind, newTitle) {
            this.projectsList[ind] = {
                title: newTitle,
                defaultTitle: false
            }
        }
    }
}
</script>
