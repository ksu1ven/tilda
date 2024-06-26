<template>
    <SVGSprite />
    <HeaderApp />
    <RouterView />
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue'
import SVGSprite from './components/Global/SVGSprite.vue'

export default {
    components: {
        HeaderApp,
        SVGSprite
    }
}
</script>
