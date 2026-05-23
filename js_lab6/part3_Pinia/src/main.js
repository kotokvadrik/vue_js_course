import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HomePage from './pages/HomePage.vue'
import AddTaskPage from './pages/AddTaskPage.vue'
import TaskDetailPage from './pages/TaskDetailPage.vue'
import AboutPage from './pages/AboutPage.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/add', component: AddTaskPage },
    { path: '/task/:id', component: TaskDetailPage, props: true },
    { path: '/task/:id/delete', component: TaskDetailPage, props: true },
    { path: '/task/:id/complete', component: TaskDetailPage, props: true },
    { path: '/about', component: AboutPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')