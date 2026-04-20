import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseDialog from './components/BaseDialog.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('BaseDialog', BaseDialog)
app.component('BaseButton', BaseButton)

app.use(router)
app.mount('#app')
