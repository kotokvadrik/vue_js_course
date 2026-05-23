<template>
  <div>
    <h2>📋 Список задач</h2>
    <div v-if="tasks.length === 0">Нет задач. Добавьте первую!</div>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
      <span :class="{ completed: task.completed }">{{ task.title }}</span>
      <div class="task-actions">
        <router-link :to="`/task/${task.id}`">🔍 Подробно</router-link>
        <router-link :to="`/task/${task.id}/complete`">✅ Завершить</router-link>
        <router-link :to="`/task/${task.id}/delete`">🗑️ Удалить</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const tasks = ref([])
const router = useRouter()

const loadTasks = () => {
  const stored = localStorage.getItem('tasks')
  tasks.value = stored ? JSON.parse(stored) : []
}

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const updateTask = (task) => {
  saveTasks()
}

onMounted(() => {
  loadTasks()
})
</script>