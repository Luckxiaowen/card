import { createApp } from "vue"
import { globalRegister } from "./global"
import { setupStore } from "./store"

import "./assets/styles/index.css"

import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(store)
setupStore()

app.use(router)
app.use(globalRegister)

app.mount("#app")
