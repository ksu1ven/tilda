import './assets/scss/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', {
    updated(el, binding) {
        el.clickOutsideEvent = function (event) {
            const { handler, exclude } = binding.value
            const clickedOnExcludedEl = exclude?.contains(event.target)
            if (!el.contains(event.target) && !clickedOnExcludedEl) {
                handler(event)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    }
})

app.mount('#app')
