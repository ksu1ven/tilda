import './assets/scss/index.scss'
import { clickOutsideDirective } from '../src/helpers/directives'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', clickOutsideDirective)

app.mount('#app')
