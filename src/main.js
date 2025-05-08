import './assets/main.css'
import  Toast  from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// import "fontsource-variable/pacifico/wght.css";
import '@fontsource/pacifico';
import "primeicons/primeicons.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Toast)
app.use(createPinia())

app.mount('#app')
