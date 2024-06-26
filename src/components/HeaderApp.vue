<template>
    <header class="header">
        <div class="container header__content">
            <nav>
                <ul class="nav__ul">
                    <li>
                        <RouterLink to="/" class="header__link">
                            <svg role="img" aria-hidden="true" width="35" height="35">
                                <use xlink:href="#logo-icon"></use>
                            </svg>
                        </RouterLink>
                    </li>
                    <li><RouterLink to="/" class="header__link"> Мои сайты </RouterLink></li>
                    <li>
                        <RouterLink to="/profile" class="header__link"> Профиль </RouterLink>
                    </li>
                </ul>
            </nav>
            <div class="header-right-block">
                <button type="button" class="button-link header__link">Выйти</button>
                <div v-if="withOptions" class="header-options">
                    <RouterLink
                        :to="{ name: 'PreviewView', params: { projectId, pageId } }"
                        class="header__link"
                    >
                        Предпросмотр
                    </RouterLink>
                    <button
                        type="button"
                        class="header__link header__link--more"
                        @click="isDropdownVisible = !isDropdownVisible"
                    >
                        Eщё
                    </button>
                    <div v-show="isDropdownVisible" class="header-options__dropdown">
                        <button type="button" class="button-link" @click="openModal">
                            Настройки страницы
                        </button>
                        <RouterLink to="/" class="button-link"> Мой сайты</RouterLink>
                        <RouterLink to="/profile" class="button-link"> Профиль</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'pinia'
import { useModalsStore } from '../stores'
export default {
    props: {
        withOptions: {
            type: Boolean
        }
    },
    data() {
        return {
            projectId: +this.$route.params.projectId,
            pageId: +this.$route.params.pageId,
            isDropdownVisible: false
        }
    },
    methods: {
        ...mapActions(useModalsStore, ['showModal']),
        openModal() {
            this.isDropdownVisible = false
            this.showModal('pageSettings', { pageNumber: this.pageId })
        }
    }
}
</script>
