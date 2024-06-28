<template>
    <HeaderApp />
    <main class="projects-home-view">
        <div class="container">
            <ProjectsList />
        </div>
    </main>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import ProjectsList from '@/components/Sections/ProjectsMainView/ProjectsList/ProjectsList.vue'

export default {
    components: { HeaderApp, ProjectsList }
}
</script>
