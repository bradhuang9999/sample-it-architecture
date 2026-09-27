import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './app/router'
import './styles/bootstrap-overrides.css'
import './styles/app.css'

createApp(App)
  .use(router)
  .mount('#app')
