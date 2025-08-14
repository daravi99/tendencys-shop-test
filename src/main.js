import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/styles/main.css';
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'

library.add(faCartShopping);
library.add(faTrashCan);
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
