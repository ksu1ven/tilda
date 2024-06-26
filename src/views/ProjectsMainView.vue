<template>
    <main class="projects-home-view">
        <div class="container">
            <ProjectsList />
        </div>
    </main>
</template>

<script>
import ProjectsList from '@/components/Sections/ProjectsHomeView/ProjectsList/ProjectsList.vue'

export default {
    components: { ProjectsList }
}
</script>
