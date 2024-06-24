import './assets/scss/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (
                !(el === event.target || el.contains(event.target)) &&
                !event.target
                    .closest('button')
                    ?.classList.contains('projects-list-card__options-btn')
            ) {
                binding.value(event)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    }
})

app.mount('#app')
