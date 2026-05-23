<template>
  <div>
    <h2>Добавление задачи</h2>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTitle" placeholder="Название задачи" required />
      <textarea v-model="newDescription" placeholder="Описание (необязательно)"></textarea>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newTitle = ref('')
const newDescription = ref('')
const router = useRouter()

const addTask = () => {
  if (!newTitle.value.trim()) return

  const tasksRaw = localStorage.getItem('tasks')
  const tasks = tasksRaw ? JSON.parse(tasksRaw) : []
  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1

  const newTask = {
    id: newId,
    title: newTitle.value,
    description: newDescription.value,
    completed: false
  }
  tasks.push(newTask)
  localStorage.setItem('tasks', JSON.stringify(tasks))


  router.push('/')
}
</script>