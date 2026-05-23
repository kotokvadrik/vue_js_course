import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'


import HomePage from './pages/HomePage.vue'
import AddTaskPage from './pages/AddTaskPage.vue'
import TaskDetailPage from './pages/TaskDetailPage.vue'
import AboutPage from './pages/AboutPage.vue'


const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/add', name: 'add', component: AddTaskPage },
    { path: '/task/:id', name: 'taskDetail', component: TaskDetailPage, props: true },
    { path: '/task/:id/delete', name: 'taskDelete', component: TaskDetailPage, props: true }, // будет обрабатываться в компоненте
    { path: '/task/:id/complete', name: 'taskComplete', component: TaskDetailPage, props: true },
    { path: '/about', name: 'about', component: AboutPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')