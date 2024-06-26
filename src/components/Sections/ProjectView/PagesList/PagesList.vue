<template>
    <div class="pages-list-heading">
        <button
            type="button"
            class="button-link button-link--with-icon pages-list-heading__item"
            @click="showModal('domainModal')"
        >
            <span class="button-link__icon button-link__icon--rounded">
                <svg role="img" aria-hidden="true" width="15" height="15">
                    <use xlink:href="#global-icon"></use>
                </svg>
            </span>
            <span class="button-link__text">Подключить домен</span>
        </button>
        <a :href="projectRoute" class="button-link button-link--with-icon pages-list-heading__item">
            <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                <use xlink:href="#open-site-icon"></use>
            </svg>
            <span class="button-link__text"
                >Адрес сайта: <strong>{{ projectRoute }} </strong></span
            ></a
        >
        <h1 class="pages-list-heading__h1 pages-list-heading__item">Project</h1>
        <button
            type="button"
            class="button-link button-link--colored pages-list-heading__item"
            @click="addPageToProject(projectId)"
        >
            <span class="button-link__icon button-link__icon--rounded">
                <svg role="img" aria-hidden="true" width="15" height="15">
                    <use xlink:href="#add-icon"></use>
                </svg>
            </span>
            <span class="button-link__text">Создать новую страницу</span>
        </button>
    </div>

    <h2 class="pages-list__h2">Страницы сайта:</h2>

    <ul v-if="pages.length" class="pages-list">
        <TransitionGroup>
            <PagesListCard
                v-for="(page, index) in pages"
                :key="index"
                :page
                :index
                :projectId="projectId"
            />
        </TransitionGroup>
    </ul>
    <div v-else class="projects-list--empty">Страниц пока не добавлено :(</div>
</template>

<script>
import PagesListCard from './PagesListCard/PagesListCard.vue'
import { mapState, mapActions } from 'pinia'
import { useProjectsStore, useModalsStore } from '../../../../stores'

export default {
    components: { PagesListCard },
    data() {
        return {
            projectId: +this.$route.params.projectId
        }
    },

    computed: {
        ...mapState(useProjectsStore, ['getProjectById']),

        projectRoute() {
            return `${window.location.origin}/project/${this.projectId}`
        },

        pages() {
            return this.getProjectById(this.projectId)
        }
    },
    methods: {
        ...mapActions(useProjectsStore, ['addPageToProject', 'getProjectPages']),
        ...mapActions(useModalsStore, ['showModal'])
    }
}
</script>
