import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLayerGroup, faUser)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).mount('#app')
