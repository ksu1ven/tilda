<template>
    <li class="pages-list-card">
        <div class="pages-list-card__data">
            <RouterLink :to="{ name: 'EditView', params: { projectId, pageId: page.id } }">
                <div class="pages-list-card__img-container">
                    <img class="background-img" :src="page.icon" alt="Page icon" />
                </div>
            </RouterLink>
            <RouterLink :to="{ name: 'EditView', params: { projectId, pageId: page.id } }">
                <h3 class="pages-list-card__h3">{{ page.title }}</h3>
                <div class="pages-list-card__description">Описание: {{ page.description }}</div>
                <div class="pages-list-card__description">Адрес: {{ page.url }}</div>
            </RouterLink>
        </div>
        <div class="pages-list-card__options">
            <button
                class="button-link button-link--with-icon"
                type="button"
                @click="showModal('pageSettings', { pageNumber: page.id })"
            >
                <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                    <use xlink:href="#settings-icon"></use>
                </svg>
                <span class="button-link__text"><strong>НАСТРОЙКИ</strong></span>
            </button>
            <button
                class="button-link button-link--with-icon"
                type="button"
                @click="removePageFromProject(projectId, page.id)"
            >
                <svg role="img" aria-hidden="true" width="20" height="20" class="button-link__icon">
                    <use xlink:href="#cart-icon"></use>
                </svg>
                <span class="button-link__text"><strong>УДАЛИТЬ</strong></span>
            </button>
        </div>
    </li>
</template>

<script>
import { mapActions } from 'pinia'
import { useProjectsStore, useModalsStore } from '../../../../../stores'

export default {
    props: {
        page: {
            type: Object,
            required: true
        },

        projectId: {
            type: Number,
            required: true
        }
    },

    methods: {
        ...mapActions(useProjectsStore, ['removePageFromProject']),
        ...mapActions(useModalsStore, ['showModal'])
    }
}
</script>
