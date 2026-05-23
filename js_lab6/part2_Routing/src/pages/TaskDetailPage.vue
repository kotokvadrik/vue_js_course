<template>
  <div>
    <h2>Детали задачи</h2>
    <div v-if="task">
      <h3>{{ task.title }}</h3>
      <p><strong>Описание:</strong> {{ task.description || 'Нет описания' }}</p>
      <p><strong>Статус:</strong> {{ task.completed ? 'Выполнена' : 'Не выполнена' }}</p>
      <p><strong>ID:</strong> {{ task.id }}</p>
      <div>
        <button @click="toggleComplete">Изменить статус</button>
        <button class="danger" @click="deleteTask">Удалить задачу</button>
        <router-link to="/">Назад к списку</router-link>
      </div>
    </div>
    <div v-else>
      <p>Задача не найдена.</p>
      <router-link to="/">На главную</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const task = ref(null)

const loadTask = () => {
  const id = parseInt(route.params.id)
  const tasksRaw = localStorage.getItem('tasks')
  const tasks = tasksRaw ? JSON.parse(tasksRaw) : []
  task.value = tasks.find(t => t.id === id) || null
}

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const deleteTask = () => {
  const id = task.value.id
  const tasksRaw = localStorage.getItem('tasks')
  let tasks = tasksRaw ? JSON.parse(tasksRaw) : []
  tasks = tasks.filter(t => t.id !== id)
  saveTasks(tasks)
  alert('Task deleted')
  router.push('/')
}

const toggleComplete = () => {
  const id = task.value.id
  const tasksRaw = localStorage.getItem('tasks')
  let tasks = tasksRaw ? JSON.parse(tasksRaw) : []
  const index = tasks.findIndex(t => t.id === id)
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed
    saveTasks(tasks)
    task.value.completed = tasks[index].completed
    alert('Task status has been changed')
  }
}


onMounted(() => {
  loadTask()
  const path = route.path
  if (path.includes('/delete')) {
    if (task.value) deleteTask()
    else alert('Task not found')
  } else if (path.includes('/complete')) {
    if (task.value) toggleComplete()
    else alert('Task not found')
  }
})
</script>