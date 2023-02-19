import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Home from '../src/views/Home.vue'
import ExamCreation from './views/ExamCreation.vue'
import ExamPreview from './views/ExamPreview.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPlus, faTrash, faPenToSquare)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/create',
            name: 'ExamCreation',
            component: ExamCreation
        },
        {
            path: '/preview',
            name: 'ExamPreview',
            component: ExamPreview
        },
    ]
})

const vuetify = createVuetify({
    components,
    directives,
})

const pinia = createPinia()

createApp(App)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
