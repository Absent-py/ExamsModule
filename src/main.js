import { createApp } from 'vue'

// Global CSS
import './style.css'

// Global components
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import RouterCard from './components/RouterCard.vue'
import ExamTitleCard from './components/ExamTitleCard.vue'

// Plugins
import router from './router'

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// import specific icons
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'

// add icons to the library
library.add(faPlus, faTrash, faPenToSquare, faList)

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)
  .component('Navbar', Navbar)
  .component('RouterCard', RouterCard)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('ExamTitleCard', ExamTitleCard)
  .mount('#app')
