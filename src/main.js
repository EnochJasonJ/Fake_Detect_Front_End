import './assets/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import "@fontsource-variable/nunito/wght.css";
import "@fontsource/pacifico";
import { MotionPlugin } from '@vueuse/motion'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)  // ✅ Pinia first!
app.use(router)
app.use(Toast)
app.use(MotionPlugin)

app.mount('#app')
