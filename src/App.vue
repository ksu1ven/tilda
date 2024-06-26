<template>
    <main v-if="isErrorCaptured" class="main--error">
        <h2>Возникла ошибка. Вероятно, проекта или страницы по такому пути нет</h2>
    </main>
    <template v-else>
        <SVGSprite />
        <RouterView />
    </template>
</template>

<script>
import SVGSprite from './components/Global/SVGSprite.vue'

export default {
    components: {
        SVGSprite
    },
    data() {
        return {
            isErrorCaptured: false
        }
    },
    errorCaptured(err) {
        if (err) this.isErrorCaptured = true
        return false
    }
}
</script>
