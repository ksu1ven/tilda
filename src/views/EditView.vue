<template>
    <HeaderApp :withOptions="true" />
    <main class="edit-view">
        <div class="container"><EditBlocksList /></div>
    </main>
    <EditBlocksModal />
    <EditBlockContentModal />
    <PageSettingsModal />
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import EditBlocksList from '@/components/Sections/EditView/EditBlocksList/EditBlocksList.vue'
import EditBlocksModal from '@/components/Modals/EditBlocksModal/EditBlocksModal.vue'
import EditBlockContentModal from '@/components/Modals/EditBlockContentModal/EditBlockContentModal.vue'
import PageSettingsModal from '@/components/Modals/PageSettingsModal/PageSettingsModal.vue'

export default {
    components: {
        HeaderApp,
        EditBlocksList,
        EditBlocksModal,
        EditBlockContentModal,
        PageSettingsModal
    }
}
</script>
