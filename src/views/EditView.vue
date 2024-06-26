<template>
    <HeaderApp :withOptions="true" />
    <main class="edit-view">
        <div class="container"><EditBlocksList :counterEmits /></div>
    </main>
    <EditBlocksModal @block-added="counterEmits++" />
    <PageSettingsModal />
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import EditBlocksList from '@/components/Sections/EditView/EditBlocksList/EditBlocksList.vue'
import EditBlocksModal from '@/components/Modals/EditBlocksModal/EditBlocksModal.vue'
import PageSettingsModal from '@/components/Modals/PageSettingsModal/PageSettingsModal.vue'

export default {
    components: { HeaderApp, EditBlocksList, EditBlocksModal, PageSettingsModal },
    data() {
        return {
            counterEmits: 0
        }
    }
}
</script>
