<template>
    <HeaderApp />
    <main class="project-view">
        <div class="container">
            <div class="project-view__content"><PagesList /></div>
        </div>
    </main>
    <PageSettingsModal />
    <DomainModal />
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import PagesList from '@/components/Sections/ProjectView/PagesList/PagesList.vue'
import PageSettingsModal from '@/components/Modals/PageSettingsModal/PageSettingsModal.vue'
import DomainModal from '@/components/Modals/DomainModal/DomainModal.vue'

export default {
    components: { HeaderApp, PagesList, PageSettingsModal, DomainModal }
}
</script>
