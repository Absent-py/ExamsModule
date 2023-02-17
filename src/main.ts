import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Home from '../src/views/Home.vue'
import ExamCreation from './views/ExamCreation.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPlus)

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
    ]
})

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
    .use(vuetify)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
