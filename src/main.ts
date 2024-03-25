import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app.vue'
import router from './router'
// import store from "./store";
import Vary from './base/vary-ui/components'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Vary)

// 开启debug模式
// app.config.debug = process.env.NODE_ENV === "development";

app.mount('#root')
